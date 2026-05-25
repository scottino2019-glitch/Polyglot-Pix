import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API router endpoint to generate custom dialogue scripts with Gemini 3.5-flash
  app.post("/api/generate-dialogue", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({
          error: "Chiave API Gemini mancante. Impostala nella sezione Secrets o contattaci se serve."
        });
      }

      const { topic, targetLanguage, baseLanguage, numTurns = 5 } = req.body;

      if (!targetLanguage || !baseLanguage) {
        return res.status(400).json({ error: "Parametri targetLanguage e baseLanguage sono obbligatori." });
      }

      // Initialize the GoogleGenAI SDK client with a custom User-Agent for modern diagnostics
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const prompt = `Generate a high-quality educational language learning dialogue scene.
Topic context: ${topic || "Daily polite conversation"}
Learning/Target Language (written in correct official native alphabet script): ${targetLanguage}
User's Base/Translation Language: ${baseLanguage}

Instructions:
1. Provide a script of exactly ${numTurns} turns alternating between user Speaker A and Speaker B.
2. The dialog must be authentic, natural, and helpful for learning ${targetLanguage}.
3. Each turn must fit a card graphic and provide:
   - "text": The sentence written perfectly in native script of ${targetLanguage} (like Hangul for Korean, Hiragana/Kanji for Japanese, Hanzi for Chinese, Arabic, Cyrillic, Devanagari, Greek, etc.). Keep it authentic!
   - "romanization": The full phonetical romanization or Latin pronunciation helper (e.g. 'Annyeonghaseyo', 'Konnichiwa', 'Ni hao'). If the target language is already Latin-based (like Italian, French, Spanish, German, Portuguese), write a small helpful guide or phonetic hint on accents/intonation in parentheses, or the raw sentence. It must never be left empty.
   - "translation": The sentence translated accurately and naturally in ${baseLanguage}.
   - "speaker": 'A' or 'B' (represents Left or Right speaker).
   - "id": A clean, simple id string (e.g. "turn_1", "turn_2").
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: "Short title in the baseLanguage representing the dialogue theme, e.g., 'Incontrare un amico' or 'Al Ristorante'."
              },
              bubbles: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    text: { type: Type.STRING, description: "Native language script sentence of the character" },
                    romanization: { type: Type.STRING, description: "Phonetic transliteration or Latin spelling to speak it out loud" },
                    translation: { type: Type.STRING, description: "Human translation in the user's native language" },
                    speaker: { type: Type.STRING, description: "Speaker code: 'A' or 'B'" }
                  },
                  required: ["id", "text", "romanization", "translation", "speaker"]
                }
              }
            },
            required: ["title", "bubbles"]
          }
        }
      });

      const resultText = response.text || "";
      const parsed = JSON.parse(resultText);
      return res.json(parsed);

    } catch (err: any) {
      console.error("Gemini API dialogue generator failure:", err);
      return res.status(500).json({ error: err?.message || "Impossibile generare la conversazione via AI." });
    }
  });

  // Serve static assets or mount Vite dev middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

startServer();
