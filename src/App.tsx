import { useState, useRef, useEffect } from "react";
import { toPng } from "html-to-image";
import {
  DialogueBubble,
  CardDesignSettings,
  SpeakerConfig,
  ThemeID,
  AvatarID,
} from "./types";
import { LANGUAGE_OPTIONS, THEME_CONFIGS, PRESET_DIALOGUES } from "./data";
import { CardCanvas } from "./components/CardCanvas";
import { ChibiAvatar } from "./components/ChibiAvatar";
import {
  Sparkles,
  Plus,
  Trash2,
  Download,
  Sliders,
  Users,
  Image as ImageIcon,
  ArrowUp,
  ArrowDown,
  Languages,
  Eye,
  RefreshCw,
  X,
  PlusCircle,
  FileText,
  Palette,
  Check,
  AlertCircle
} from "lucide-react";

export default function App() {
  // --- 1. State Configurations ---
  
  // Dialogues state (initialised with the Korean preset)
  const [bubbles, setBubbles] = useState<DialogueBubble[]>(PRESET_DIALOGUES[0].bubbles);
  
  // Design settings state
  const [design, setDesign] = useState<CardDesignSettings>({
    title: "IMPARA IL COREANO",
    subtitle: "Dialogo 1: Presentazioni e Saluti Base",
    watermark: "@LetsLearnKorean",
    backgroundTheme: "lavender_field",
    customWatermarkColor: "",
    showAvatars: true,
    bubbleSpacing: "regular",
    bubbleRoundness: "lg",
    shadowDepth: "md",
    targetLanguageName: "Coreano",
    baseLanguageName: "Italiano",
  });

  // Speaker configuration state (Speaker A - Left, Speaker B - Right)
  const [speakerA, setSpeakerA] = useState<SpeakerConfig>({
    name: "Minho",
    avatar: "chibi_hiro",
    bgColor: "#E6F4EA",
    bubbleBg: "#FFFFFF",
    textColor: "#1E293B",
  });

  const [speakerB, setSpeakerB] = useState<SpeakerConfig>({
    name: "Yuna",
    avatar: "chibi_yuna",
    bgColor: "#FCE4EC",
    bubbleBg: "#FFFFFF",
    textColor: "#1E293B",
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<"ai_generator" | "manual_editor" | "speakers" | "styling">("ai_generator");

  // Canvas display controls
  const [aspectRatioMode, setAspectRatioMode] = useState<"instagram" | "pinterest" | "square">("instagram");
  const [scalePercent, setScalePercent] = useState<number>(60); // Preview zoom percent

  // AI Dialog Generator input state
  const [aiLanguageSelection, setAiLanguageSelection] = useState<string>("ja"); // Default to Japanese for AI generation
  const [aiBaseLanguageSelection, setAiBaseLanguageSelection] = useState<string>("it"); // Default to Italian
  const [aiTopic, setAiTopic] = useState<string>("Ordinare cibo tipico in un ristorante");
  const [numTurns, setNumTurns] = useState<number>(5);

  // General app statuses
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Reference for the node to print
  const canvasRef = useRef<HTMLDivElement | null>(null);

  // Handle auto-fitting scaling based on window size to keep preview text incredibly readable
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScalePercent(45); // increased zoom for clear mobile view
      } else if (window.innerWidth < 1024) {
        setScalePercent(54); // improved safe visual zoom for small layouts
      } else if (window.innerWidth < 1280) {
        setScalePercent(62);
      } else {
        setScalePercent(68); // generous scale for desktop visualizers
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- 2. Action Logic handlers ---

  // Generate Dialogue with Gemini model API
  const generateDialogueWithAI = async () => {
    setIsGenerating(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const targetLangObj = LANGUAGE_OPTIONS.find((l) => l.code === aiLanguageSelection);
    const baseLangObj = LANGUAGE_OPTIONS.find((l) => l.code === aiBaseLanguageSelection);

    const targetLangName = targetLangObj ? targetLangObj.name.split(" ")[0] : "Lingua Straniera";
    const baseLangName = baseLangObj ? baseLangObj.name.split(" ")[0] : "Italiano";

    try {
      const response = await fetch("/api/generate-dialogue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: aiTopic,
          targetLanguage: targetLangName,
          baseLanguage: baseLangName,
          numTurns,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Impossibile contattare il servizio di traduzione AI.");
      }

      if (data.bubbles && Array.isArray(data.bubbles)) {
        // Set bubbles retrieved from Gemini
        setBubbles(data.bubbles);

        // Update card headers
        setDesign((prev) => ({
          ...prev,
          title: `IMPARA IL ${targetLangName.toUpperCase()}`,
          subtitle: data.title || `Dialogo: ${aiTopic}`,
          targetLanguageName: targetLangName,
          baseLanguageName: baseLangName,
        }));

        setSuccessMsg(`Conversazione in ${targetLangName} generata con successo!`);
        
        // Auto jump to manual editor so user can review the texts
        setActiveTab("manual_editor");
      } else {
        throw new Error("Formato risposta non valido ricevuto dall'AI.");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || "C'è stato un problema durante la generazione AI.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Convert HTML to PNG dynamic drawing and trigger browser preserve
  const downloadCardAsImage = async () => {
    if (!canvasRef.current) return;
    setIsDownloading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    // Save current scale and set it to 100 to ensure perfect bounds
    const originalScale = scalePercent;
    setScalePercent(100);

    const sizeMap = {
      instagram: { width: 800, height: 1000 },
      pinterest: { width: 800, height: 1200 },
      square: { width: 800, height: 800 },
    };
    const currentSize = sizeMap[aspectRatioMode];

    try {
      // Small warm timeout for rendering safety (let layout settle at 1x)
      await new Promise((r) => setTimeout(r, 200));

      const dataUrl = await toPng(canvasRef.current, {
        cacheBust: true,
        pixelRatio: 2.2, // Crisp export
        width: currentSize.width,
        height: currentSize.height,
        style: {
          transform: "none",
          transformOrigin: "top left",
          margin: "0",
        },
      });

      const link = document.createElement("a");
      const cleanTitle = design.title.toLowerCase().replace(/[^a-z0-9]/g, "_");
      link.download = `language_dialogue_${cleanTitle || "card"}.png`;
      link.href = dataUrl;
      link.click();

      setSuccessMsg("L'immagine è stata creata e salvata con successo!");
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Impossibile salvare la scheda grafico. Prova a ricaricare.");
    } finally {
      // Restore previous zoom scale
      setScalePercent(originalScale);
      setIsDownloading(false);
    }
  };

  // Manual Editor: Add new turn line
  const addManualBubble = () => {
    const nextSpeaker = bubbles.length % 2 === 0 ? "A" : "B";
    const selectedLang = LANGUAGE_OPTIONS.find((l) => l.name.toLowerCase().includes(design.targetLanguageName.toLowerCase())) || LANGUAGE_OPTIONS[0];

    const newBub: DialogueBubble = {
      id: `manual_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      text: selectedLang.placeholderText,
      romanization: selectedLang.placeholderRom,
      translation: selectedLang.placeholderTrans,
      speaker: nextSpeaker,
    };
    setBubbles([...bubbles, newBub]);
  };

  // Manual Editor: update bubble parameters
  const updateBubbleField = (id: string, field: keyof DialogueBubble, value: string) => {
    setBubbles(
      bubbles.map((b) => (b.id === id ? { ...b, [field]: value } : b))
    );
  };

  const deleteBubbleField = (id: string) => {
    if (bubbles.length <= 1) {
      setErrorMsg("La scheda deve contenere almeno una riga di dialogo.");
      return;
    }
    setBubbles(bubbles.filter((b) => b.id !== id));
  };

  // Manual Editor: re-order rows positioning
  const moveBubble = (index: number, direction: "up" | "down") => {
    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= bubbles.length) return;

    const updated = [...bubbles];
    const temp = updated[index];
    updated[index] = updated[nextIndex];
    updated[nextIndex] = temp;
    setBubbles(updated);
  };

  // Switch preset visual cards quickly
  const loadPresetDialogue = (presetId: string) => {
    const found = PRESET_DIALOGUES.find((p) => p.id === presetId);
    if (found) {
      setBubbles(found.bubbles);
      setDesign((prev) => ({
        ...prev,
        title: `IMPARA IL ${found.targetLanguage.toUpperCase()}`,
        subtitle: found.title,
        targetLanguageName: found.targetLanguage,
        baseLanguageName: found.baseLanguage,
      }));
      setSuccessMsg(`Preset "${found.title}" caricato correttamente!`);
    }
  };

  // Synchronise design themes quickly
  const updateThemeChoice = (themeId: ThemeID) => {
    setDesign((prev) => ({ ...prev, backgroundTheme: themeId }));
  };

  // Character library configurations
  const chibiAvatarsList: { id: AvatarID; label: string; emoji: string }[] = [
    { id: "chibi_hiro", label: "Hiro (Felpa Verde)", emoji: "👦" },
    { id: "chibi_yuna", label: "Yuna (Codini)", emoji: "👧" },
    { id: "chibi_haru", label: "Haru (Occhiali Tondi)", emoji: "🧑" },
    { id: "chibi_sakura", label: "Sakura (Capelli Rosa)", emoji: "👩" },
    { id: "chibi_kenji", label: "Kenji (Capelli Castani)", emoji: "👨" },
    { id: "neko_sensei", label: "Neko Sensei (Gatto)", emoji: "🐱" },
    { id: "shiba_kun", label: "Shiba Kun (Cane)", emoji: "🐶" },
    { id: "usagi_chan", label: "Usagi Chan (Coniglio)", emoji: "🐰" },
    { id: "panda_san", label: "Panda San (Panda)", emoji: "🐼" },
  ];

  // --- 3. View Presentation ---

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans select-none antialiased">
      
      {/* Dynamic Toast / Feedback alerts box */}
      {(errorMsg || successMsg) && (
        <div className="fixed top-4 right-4 z-50 max-w-md shadow-2xl animate-bounce">
          {errorMsg && (
            <div className="bg-red-500 text-white px-5 py-3.5 rounded-2xl flex items-center gap-3 border border-red-400">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div className="text-sm font-semibold">{errorMsg}</div>
              <button onClick={() => setErrorMsg(null)} className="ml-auto hover:scale-110 active:scale-95 text-white/80">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          {successMsg && (
            <div className="bg-emerald-600 text-white px-5 py-3.5 rounded-2xl flex items-center gap-3 border border-emerald-500">
              <Check className="w-5 h-5 shrink-0" />
              <div className="text-sm font-semibold">{successMsg}</div>
              <button onClick={() => setSuccessMsg(null)} className="ml-auto hover:scale-110 active:scale-95 text-white/80">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main App Bar Header block */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2.5 rounded-xl text-white shadow-lg shadow-purple-500/20">
            <Languages className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-wide bg-gradient-to-r from-white via-slate-100 to-purple-300 bg-clip-text text-transparent">
              Crea-Cartoline Multilingua
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Elegante editor grafico con traduzioni e pronunce automatiche via Gemini AI
            </p>
          </div>
        </div>

        {/* Action Controls Toolbar segment */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="hidden xl:flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-400">
            <span>Preset di prova:</span>
            <select
              onChange={(e) => loadPresetDialogue(e.target.value)}
              className="bg-transparent text-slate-100 font-bold border-none focus:outline-hidden cursor-pointer"
            >
              <option value="" className="bg-slate-900 text-gray-400">--- Carica un esempio ---</option>
              {PRESET_DIALOGUES.map((p) => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-slate-100">
                  {p.title} ({p.targetLanguage})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={downloadCardAsImage}
            disabled={isDownloading}
            id="download_png_image_btn"
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-purple-800 disabled:to-pink-800 active:scale-97 text-white font-black text-sm rounded-xl shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {isDownloading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Conversione...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Salva Immagine PNG</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Grid View area split into Left side settings & Right side live canvas preview */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* LEFT COLUMN: Sidebar controllers tab sheets and configurations container */}
        <div className="lg:col-span-5 xl:col-span-4 border-r border-slate-800 bg-slate-950 flex flex-col overflow-y-auto">
          
          {/* Sub Navigation Tabs bar menu */}
          <div className="grid grid-cols-4 border-b border-slate-800 text-center text-xs font-semibold select-none sticky top-0 bg-slate-950 z-20">
            <button
              onClick={() => setActiveTab("ai_generator")}
              className={`py-3.5 flex flex-col items-center gap-1.5 transition-colors border-b-2 cursor-pointer ${
                activeTab === "ai_generator"
                  ? "border-purple-500 text-purple-400 bg-slate-900/30"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Sparkles className="w-4.5 h-4.5" />
              <span>Generatore AI</span>
            </button>
            <button
              onClick={() => setActiveTab("manual_editor")}
              className={`py-3.5 flex flex-col items-center gap-1.5 transition-colors border-b-2 cursor-pointer ${
                activeTab === "manual_editor"
                  ? "border-purple-500 text-purple-400 bg-slate-900/30"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <FileText className="w-4.5 h-4.5" />
              <span>Testi</span>
            </button>
            <button
              onClick={() => setActiveTab("speakers")}
              className={`py-3.5 flex flex-col items-center gap-1.5 transition-colors border-b-2 cursor-pointer ${
                activeTab === "speakers"
                  ? "border-purple-500 text-purple-400 bg-slate-900/30"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Users className="w-4.5 h-4.5" />
              <span>Personaggi</span>
            </button>
            <button
              onClick={() => setActiveTab("styling")}
              className={`py-3.5 flex flex-col items-center gap-1.5 transition-colors border-b-2 cursor-pointer ${
                activeTab === "styling"
                  ? "border-purple-500 text-purple-400 bg-slate-900/30"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Sliders className="w-4.5 h-4.5" />
              <span>Stile</span>
            </button>
          </div>

          {/* Nav Tab Sheets display contents */}
          <div className="p-5 flex-1 space-y-6">
            
            {/* TAB SHEET 1: AI Prompt Generator powered by Gemini */}
            {activeTab === "ai_generator" && (
              <div className="space-y-5 animate-fadeIn">
                <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl">
                  <div className="flex items-center gap-2.5 mb-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <h3 className="font-bold text-sm text-slate-200">Genera con AI</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Scegli una lingua e inserisci il contesto del dialogo. Gemini tradurrà, romanizzerà e correggerà la conversazione creando una cartolina pronta per i tuoi canali!
                  </p>
                </div>

                {/* Form fields */}
                <div className="space-y-4">
                  {/* Target Language Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Lingua che vuoi insegnare / studiare
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {LANGUAGE_OPTIONS.slice(0, 10).map((l) => (
                        <button
                          key={l.code}
                          onClick={() => setAiLanguageSelection(l.code)}
                          className={`p-2 rounded-xl text-left font-semibold border transition-all ${
                            aiLanguageSelection === l.code
                              ? "bg-purple-600/20 border-purple-500 text-purple-300"
                              : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80"
                          }`}
                        >
                          {l.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Topic selection input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Contesto o situazione d&apos;uso
                    </label>
                    <textarea
                      value={aiTopic}
                      onChange={(e) => setAiTopic(e.target.value)}
                      placeholder="E.g., Chiedere un caffè espresso extra forte al bancone, Chiedere dov'è l'uscita della metro..."
                      className="w-full text-sm bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 focus:border-purple-500 focus:outline-hidden min-h-24 leading-relaxed"
                    />
                  </div>

                  {/* Num bubbles selector */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Numero di battute (Righe)
                      </label>
                      <select
                        value={numTurns}
                        onChange={(e) => setNumTurns(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 text-sm focus:border-purple-500 focus:outline-hidden"
                      >
                        <option value={4}>4 righe (Consigliato)</option>
                        <option value={5}>5 righe</option>
                        <option value={6}>6 righe (Massimo)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Tradotta in lingua
                      </label>
                      <select
                        value={aiBaseLanguageSelection}
                        onChange={(e) => setAiBaseLanguageSelection(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 text-sm focus:border-purple-500 focus:outline-hidden"
                      >
                        <option value="it">Italiano (Italian)</option>
                        <option value="ko">Coreano (Korean)</option>
                        <option value="ja">Giapponese (Japanese)</option>
                        <option value="it">Spagnolo (Spanish)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={generateDialogueWithAI}
                    disabled={isGenerating}
                    id="ai_generate_prompt_btn"
                    className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-900/60 active:scale-98 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Analitica Gemini in corso...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4.5 h-4.5" />
                        <span>Genera Dialogo con Gemini AI</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* TAB SHEET 2: Manual Dialogue Script Content Editor */}
            {activeTab === "manual_editor" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xs text-slate-300 uppercase tracking-wider">
                    Contenuto Righe di Dialogo
                  </h3>
                  <button
                    onClick={addManualBubble}
                    className="text-xs bg-slate-800 hover:bg-slate-700/80 text-purple-400 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Aggiungi Battuta</span>
                  </button>
                </div>

                <div className="space-y-4 overflow-y-auto max-h-[35rem] pr-1">
                  {bubbles.map((bub, index) => {
                    const activeChar = bub.speaker === "A" ? speakerA : speakerB;

                    return (
                      <div
                        key={bub.id || index}
                        className="bg-slate-900/65 border border-slate-800 p-3.5 rounded-xl space-y-3 relative group"
                      >
                        {/* Row stats and alignment controller */}
                        <div className="flex items-center justify-between text-xs font-semibold pb-2 border-b border-slate-800/80">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xxs font-black">
                              {index + 1}
                            </span>
                            <span className="text-slate-400">Interlocutore:</span>
                            <select
                              value={bub.speaker}
                              onChange={(e) => updateBubbleField(bub.id, "speaker", e.target.value as "A" | "B")}
                              className="bg-slate-950 border border-slate-800 text-slate-100 rounded-md px-2 py-0.5"
                            >
                              <option value="A">Interlocutore A (Sinistra: {speakerA.name})</option>
                              <option value="B">Interlocutore B (Destra: {speakerB.name})</option>
                            </select>
                          </div>

                          {/* Order and delete actions */}
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => moveBubble(index, "up")}
                              disabled={index === 0}
                              className="text-slate-400 hover:text-white disabled:opacity-30 p-1 rounded hover:bg-slate-800"
                              title="Sposta Su"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => moveBubble(index, "down")}
                              disabled={index === bubbles.length - 1}
                              className="text-slate-400 hover:text-white disabled:opacity-30 p-1 rounded hover:bg-slate-800"
                              title="Sposta Giù"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteBubbleField(bub.id)}
                              className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10"
                              title="Elimina"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Input texts fields */}
                        <div className="space-y-2">
                          <div>
                            <span className="block text-xxs font-extrabold text-slate-450 uppercase mb-1 tracking-wider">
                              Scrittura nella Lingua Originale ({design.targetLanguageName})
                            </span>
                            <input
                              type="text"
                              value={bub.text}
                              onChange={(e) => updateBubbleField(bub.id, "text", e.target.value)}
                              className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 focus:border-purple-500 focus:outline-hidden font-medium text-white"
                            />
                          </div>

                          <div>
                            <span className="block text-xxs font-extrabold text-slate-455 uppercase mb-1 tracking-wider">
                              Pronuncia Romanizzata / Trascrizione Fonetica
                            </span>
                            <input
                              type="text"
                              value={bub.romanization}
                              onChange={(e) => updateBubbleField(bub.id, "romanization", e.target.value)}
                              className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 focus:border-purple-500 focus:outline-hidden font-medium text-slate-200"
                            />
                          </div>

                          <div>
                            <span className="block text-xxs font-extrabold text-slate-460 uppercase mb-1 tracking-wider">
                              Traduzione in Lingua Nativa ({design.baseLanguageName})
                            </span>
                            <input
                              type="text"
                              value={bub.translation}
                              onChange={(e) => updateBubbleField(bub.id, "translation", e.target.value)}
                              className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 focus:border-purple-500 focus:outline-hidden font-medium text-slate-300"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB SHEET 3: Speakers Characters configurations */}
            {activeTab === "speakers" && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Speaker A Config Card */}
                <div className="bg-slate-900/40 border border-slate-850 p-4 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <h3 className="font-extrabold text-xs text-slate-200 uppercase tracking-widest">
                      Interlocutore A (Sinistra)
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-3 items-center">
                    <div className="col-span-1 flex flex-col items-center justify-center p-2 rounded-xl bg-slate-950 border border-slate-800">
                      <ChibiAvatar avatarId={speakerA.avatar} size={64} className="bg-white/5 rounded-full" />
                      <span className="text-xxs text-slate-500 mt-1 font-semibold uppercase">Preview</span>
                    </div>

                    <div className="col-span-2 space-y-3">
                      <div>
                        <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Nome / Sigla
                        </label>
                        <input
                          type="text"
                          value={speakerA.name}
                          onChange={(e) => setSpeakerA((prev) => ({ ...prev, name: e.target.value }))}
                          className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 focus:border-purple-500 focus:outline-hidden font-bold"
                        />
                      </div>

                      {/* Custom bubble colors inside Card */}
                      <div>
                        <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Sfondo fumetto
                        </label>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="color"
                            value={speakerA.bubbleBg}
                            onChange={(e) => setSpeakerA((prev) => ({ ...prev, bubbleBg: e.target.value }))}
                            className="bg-transparent border border-slate-700 w-8 h-7 cursor-pointer"
                          />
                          <button
                            onClick={() => setSpeakerA((prev) => ({ ...prev, bubbleBg: "#FFFFFF" }))}
                            className="text-xxs bg-slate-850 hover:bg-slate-800 text-slate-300 px-2 py-1 rounded"
                          >
                            Usa Bianco
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Avatar Picker GRID A */}
                  <div>
                    <label className="block text-xxs font-black text-slate-400 uppercase tracking-wider mb-2">
                      Cambia Avatar
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {chibiAvatarsList.map((a) => (
                        <button
                          key={a.id}
                          onClick={() => setSpeakerA((prev) => ({ ...prev, avatar: a.id }))}
                          className={`p-1.5 rounded-lg border text-left text-xxs flex items-center gap-1.5 transition-all cursor-pointer ${
                            speakerA.avatar === a.id
                              ? "bg-emerald-500/10 border-emerald-500 text-emerald-300 font-bold"
                              : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                          }`}
                        >
                          <span className="text-xs">{a.emoji}</span>
                          <span className="truncate">{a.label.split(" (")[0]}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Speaker B Config Card */}
                <div className="bg-slate-900/40 border border-slate-850 p-4 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span>
                    <h3 className="font-extrabold text-xs text-slate-200 uppercase tracking-widest">
                      Interlocutore B (Destra)
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-3 items-center">
                    <div className="col-span-1 flex flex-col items-center justify-center p-2 rounded-xl bg-slate-950 border border-slate-800">
                      <ChibiAvatar avatarId={speakerB.avatar} size={64} className="bg-white/5 rounded-full" />
                      <span className="text-xxs text-slate-500 mt-1 font-semibold uppercase">Preview</span>
                    </div>

                    <div className="col-span-2 space-y-3">
                      <div>
                        <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Nome / Sigla
                        </label>
                        <input
                          type="text"
                          value={speakerB.name}
                          onChange={(e) => setSpeakerB((prev) => ({ ...prev, name: e.target.value }))}
                          className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 focus:border-purple-500 focus:outline-hidden font-bold"
                        />
                      </div>

                      {/* Custom bubble colors inside Card */}
                      <div>
                        <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wider mb-1">
                          Sfondo fumetto
                        </label>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="color"
                            value={speakerB.bubbleBg}
                            onChange={(e) => setSpeakerB((prev) => ({ ...prev, bubbleBg: e.target.value }))}
                            className="bg-transparent border border-slate-700 w-8 h-7 cursor-pointer"
                          />
                          <button
                            onClick={() => setSpeakerB((prev) => ({ ...prev, bubbleBg: "#FDF4F5" }))}
                            className="text-xxs bg-slate-850 hover:bg-slate-800 text-slate-300 px-2 py-1 rounded"
                          >
                            Usa Rosa tenue
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Avatar Picker GRID B */}
                  <div>
                    <label className="block text-xxs font-black text-slate-400 uppercase tracking-wider mb-2">
                      Cambia Avatar
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {chibiAvatarsList.map((a) => (
                        <button
                          key={a.id}
                          onClick={() => setSpeakerB((prev) => ({ ...prev, avatar: a.id }))}
                          className={`p-1.5 rounded-lg border text-left text-xxs flex items-center gap-1.5 transition-all cursor-pointer ${
                            speakerB.avatar === a.id
                              ? "bg-pink-500/10 border-pink-500 text-pink-300 font-bold"
                              : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                          }`}
                        >
                          <span className="text-xs">{a.emoji}</span>
                          <span className="truncate">{a.label.split(" (")[0]}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB SHEET 4: Styling & format customize panel */}
            {activeTab === "styling" && (
              <div className="space-y-5 animate-fadeIn">
                
                {/* 1. Theme picker */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-350 uppercase tracking-widest mb-2 flex items-center gap-1">
                    <Palette className="w-3.5 h-3.5 text-purple-400" />
                    <span>Seleziona Tema Sfondo</span>
                  </label>
                  <div className="space-y-2">
                    {THEME_CONFIGS.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => updateThemeChoice(theme.id)}
                        className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          design.backgroundTheme === theme.id
                            ? "bg-slate-800 border-purple-500 text-white font-extrabold scale-102"
                            : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-5 h-5 rounded-full shadow-inner border border-white/20"
                            style={{ background: theme.bgGradient }}
                          ></div>
                          <span className="text-xs">{theme.name}</span>
                        </div>
                        {design.backgroundTheme === theme.id && (
                          <span className="text-[10px] uppercase font-black tracking-wide bg-purple-600/35 border border-purple-500 text-purple-300 px-2 py-0.5 rounded-md">
                            Attivo
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Format custom card sizing */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Formato Immagine (Rapporto d&apos;Aspetto)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setAspectRatioMode("instagram")}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        aspectRatioMode === "instagram"
                          ? "bg-purple-600/25 border-purple-500 text-purple-300 font-extrabold"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="text-xs">Instagram</div>
                      <div className="text-[10px] opacity-75">4:5 (Post)</div>
                    </button>
                    <button
                      onClick={() => setAspectRatioMode("pinterest")}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        aspectRatioMode === "pinterest"
                          ? "bg-purple-600/25 border-purple-500 text-purple-300 font-extrabold"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="text-xs">Pinterest</div>
                      <div className="text-[10px] opacity-75">2:3 (Verticale)</div>
                    </button>
                    <button
                      onClick={() => setAspectRatioMode("square")}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        aspectRatioMode === "square"
                          ? "bg-purple-600/25 border-purple-500 text-purple-300 font-extrabold"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <div className="text-xs">Square</div>
                      <div className="text-[10px] opacity-75">1:1 (Quadrato)</div>
                    </button>
                  </div>
                </div>

                {/* 3. Text customisations titles */}
                <div className="space-y-3.5 bg-slate-900/35 border border-slate-850 p-4 rounded-xl">
                  <h4 className="font-bold text-xs text-slate-200 uppercase tracking-wider">
                    Titoli e Watermark
                  </h4>
                  
                  <div>
                    <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Titolo Principale (Intestazione)
                    </label>
                    <input
                      type="text"
                      value={design.title}
                      onChange={(e) => setDesign((p) => ({ ...p, title: e.target.value }))}
                      className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Sottotitolo (Descrizione)
                    </label>
                    <input
                      type="text"
                      value={design.subtitle}
                      onChange={(e) => setDesign((p) => ({ ...p, subtitle: e.target.value }))}
                      className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Watermark Firma Social (Piè di pagina)
                    </label>
                    <input
                      type="text"
                      value={design.watermark}
                      placeholder="@MioCanaleLingue"
                      onChange={(e) => setDesign((p) => ({ ...p, watermark: e.target.value }))}
                      className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-slate-100 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Colore Watermark personalizzato
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={design.customWatermarkColor || "#8E24AA"}
                        onChange={(e) => setDesign((p) => ({ ...p, customWatermarkColor: e.target.value }))}
                        className="bg-transparent border border-slate-700 w-8 h-7 cursor-pointer"
                      />
                      <button
                        onClick={() => setDesign((p) => ({ ...p, customWatermarkColor: "" }))}
                        className="text-xxs bg-slate-800 text-slate-300 px-2 rounded"
                      >
                        Reset Di Default
                      </button>
                    </div>
                  </div>
                </div>

                {/* 4. Formatting adjustments */}
                <div className="space-y-4 bg-slate-900/35 border border-slate-850 p-4 rounded-xl">
                  <h4 className="font-bold text-xs text-slate-200 uppercase tracking-wider">
                    Opzioni Layout Card
                  </h4>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">Mostra Avatar Interlocutori</span>
                    <input
                      type="checkbox"
                      checked={design.showAvatars}
                      onChange={(e) => setDesign((p) => ({ ...p, showAvatars: e.target.checked }))}
                      className="w-4 h-4 text-purple-600 bg-slate-950 border-slate-800 rounded-sm focus:ring-purple-500 accent-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xxs text-slate-400 font-bold uppercase tracking-wider mb-1">
                      Spaziatura tra fumetti
                    </label>
                    <select
                      value={design.bubbleSpacing}
                      onChange={(e) => setDesign((p) => ({ ...p, bubbleSpacing: e.target.value as "snug" | "regular" | "cozy" }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-slate-200 focus:outline-hidden"
                    >
                      <option value="snug">Molto Compatto (snug)</option>
                      <option value="regular">Regolare (regular)</option>
                      <option value="cozy">Largo / Letargico (cozy)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xxs text-slate-400 font-bold uppercase tracking-wider mb-1">
                      Arrotondamento Angoli Fumetti
                    </label>
                    <select
                      value={design.bubbleRoundness}
                      onChange={(e) => setDesign((p) => ({ ...p, bubbleRoundness: e.target.value as "sm" | "md" | "lg" | "full" }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-slate-200 focus:outline-hidden"
                    >
                      <option value="sm">Squadrato (sm)</option>
                      <option value="md">Medio (md)</option>
                      <option value="lg">Arrotondato Moderno (lg)</option>
                      <option value="full">Curva Ovale (full)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xxs text-slate-400 font-bold uppercase tracking-wider mb-1">
                      Ombra dei fumetti
                    </label>
                    <select
                      value={design.shadowDepth}
                      onChange={(e) => setDesign((p) => ({ ...p, shadowDepth: e.target.value as "none" | "sm" | "md" | "lg" }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-slate-200 focus:outline-hidden"
                    >
                      <option value="none">Senza Ombra (Piatti)</option>
                      <option value="sm">Sottile</option>
                      <option value="md">Rilevante (Standard)</option>
                      <option value="lg">Profonda Professionale</option>
                    </select>
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Quick info helper at the bottom of panel */}
          <div className="p-4 border-t border-slate-850 bg-slate-950/60 text-[10px] text-slate-500 font-medium">
            <span>Selezionando </span>
            <span className="font-extrabold text-slate-400">Salva Immagine PNG</span>
            <span>, l&apos;applicazione genererà un file a doppia risoluzione (2.2x pixel-ratio) per mantenere i caratteri stranieri e i dettagli degli avatar nitidi per Instagram o Stampa.</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Live Visualizer & zoom mounting card */}
        <div className="lg:col-span-7 xl:col-span-8 bg-slate-900 border-l border-slate-850 p-6 flex flex-col justify-start overflow-y-auto">
          
          {/* Zoom & format controls banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 bg-slate-950/60 border border-slate-800 p-3 rounded-2xl select-none">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-slate-200">
                Anteprima Real-time ({aspectRatioMode.toUpperCase()} {aspectRatioMode === "instagram" ? "4:5" : aspectRatioMode === "pinterest" ? "2:3" : "1:1"})
              </span>
            </div>

            {/* Slider to scale size inside workspace preview */}
            <div className="flex items-center gap-3.5 w-full sm:w-auto">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Zoom visuale:</span>
              <input
                type="range"
                min="30"
                max="100"
                value={scalePercent}
                onChange={(e) => setScalePercent(Number(e.target.value))}
                className="w-28 sm:w-36 accent-purple-500 bg-slate-800"
              />
              <span className="text-xxs font-mono bg-slate-800 px-2 py-0.5 rounded text-white">{scalePercent}%</span>
            </div>
          </div>

          {/* Card Canvas mounting area */}
          <CardCanvas
            canvasRef={canvasRef}
            bubbles={bubbles}
            design={design}
            speakerA={speakerA}
            speakerB={speakerB}
            aspectRatioMode={aspectRatioMode}
            scalePercent={scalePercent}
          />
        </div>

      </div>

    </div>
  );
}
