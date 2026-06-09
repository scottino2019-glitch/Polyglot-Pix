import { RefObject } from "react";
import { DialogueBubble, CardDesignSettings, SpeakerConfig, ThemeID } from "../types";
import { THEME_CONFIGS } from "../data";
import { ChibiAvatar } from "./ChibiAvatar";
import { ThemeDecoOverlay } from "./ThemeDecoOverlay";

interface CardCanvasProps {
  canvasRef: RefObject<HTMLDivElement | null>;
  bubbles: DialogueBubble[];
  design: CardDesignSettings;
  speakerA: SpeakerConfig;
  speakerB: SpeakerConfig;
  aspectRatioMode: "instagram" | "pinterest" | "square";
  scalePercent: number; // for zoom preview
}

export function CardCanvas({
  canvasRef,
  bubbles,
  design,
  speakerA,
  speakerB,
  aspectRatioMode,
  scalePercent,
}: CardCanvasProps) {
  const currentTheme = THEME_CONFIGS.find((t) => t.id === design.backgroundTheme) || THEME_CONFIGS[0];

  // Map aspect ratios to standard px sizes
  // We use fixed sizes inside the canvas to guarantee high resolution export
  const sizeMap = {
    instagram: { width: 800, height: 1000, label: "Instagram 4:5 (800x1000)" },
    pinterest: { width: 800, height: 1200, label: "Pinterest 2:3 (800x1200)" },
    square: { width: 800, height: 800, label: "Quadrato 1:1 (800x800)" },
  };

  const currentSize = sizeMap[aspectRatioMode];
  const bubbleCount = bubbles.length;

  // Helper classes for bubble roundness
  const getRoundnessClass = (roundness: "sm" | "md" | "lg" | "full") => {
    switch (roundness) {
      case "sm":
        return "rounded-sm";
      case "md":
        return "rounded-lg";
      case "lg":
        return "rounded-2xl";
      case "full":
        return "rounded-3xl";
    }
  };

  // Helper classes for shadow
  const getShadowClass = (shadow: "none" | "sm" | "md" | "lg") => {
    switch (shadow) {
      case "none":
        return "shadow-none";
      case "sm":
        return "shadow-xs";
      case "md":
        return "shadow-md";
      case "lg":
        return "shadow-xl";
    }
  };

  // Dynamic Layout Configurator based on Aspect Ratio and Dialogue density to prevent overflows
  const getBaseLayout = (ratio: "instagram" | "pinterest" | "square", count: number) => {
    if (ratio === "square") {
      if (count <= 3) {
        return {
          avatarSize: 84,
          cardPadding: 32,
          bubblePaddingX: 24,
          bubblePaddingY: 18,
          spacing: 32,
          titleSize: 34,
          subtitleSize: 15,
          bubbleTextSize: 26,
          romanizationTextSize: 17,
          translationTextSize: 17,
        };
      } else if (count === 4) {
        return {
          avatarSize: 72,
          cardPadding: 26,
          bubblePaddingX: 20,
          bubblePaddingY: 14,
          spacing: 22,
          titleSize: 30,
          subtitleSize: 13,
          bubbleTextSize: 22,
          romanizationTextSize: 15,
          translationTextSize: 15,
        };
      } else if (count === 5) {
        return {
          avatarSize: 60,
          cardPadding: 20,
          bubblePaddingX: 16,
          bubblePaddingY: 11,
          spacing: 14,
          titleSize: 24,
          subtitleSize: 12,
          bubbleTextSize: 18,
          romanizationTextSize: 13,
          translationTextSize: 13,
        };
      } else {
        return {
          avatarSize: 52,
          cardPadding: 16,
          bubblePaddingX: 12,
          bubblePaddingY: 8,
          spacing: 8,
          titleSize: 20,
          subtitleSize: 11,
          bubbleTextSize: 15,
          romanizationTextSize: 12,
          translationTextSize: 12,
        };
      }
    } else if (ratio === "instagram") {
      if (count <= 3) {
        return {
          avatarSize: 96,
          cardPadding: 40,
          bubblePaddingX: 28,
          bubblePaddingY: 22,
          spacing: 44,
          titleSize: 38,
          subtitleSize: 16,
          bubbleTextSize: 30,
          romanizationTextSize: 19,
          translationTextSize: 19,
        };
      } else if (count === 4) {
        return {
          avatarSize: 84,
          cardPadding: 34,
          bubblePaddingX: 24,
          bubblePaddingY: 18,
          spacing: 32,
          titleSize: 34,
          subtitleSize: 14,
          bubbleTextSize: 25,
          romanizationTextSize: 17,
          translationTextSize: 17,
        };
      } else if (count === 5) {
        return {
          avatarSize: 74,
          cardPadding: 28,
          bubblePaddingX: 20,
          bubblePaddingY: 14,
          spacing: 20,
          titleSize: 28,
          subtitleSize: 13,
          bubbleTextSize: 21,
          romanizationTextSize: 15,
          translationTextSize: 15,
        };
      } else {
        return {
          avatarSize: 64,
          cardPadding: 22,
          bubblePaddingX: 16,
          bubblePaddingY: 11,
          spacing: 12,
          titleSize: 24,
          subtitleSize: 12,
          bubbleTextSize: 17,
          romanizationTextSize: 13,
          translationTextSize: 13,
        };
      }
    } else {
      // pinterest
      if (count <= 3) {
        return {
          avatarSize: 104,
          cardPadding: 48,
          bubblePaddingX: 32,
          bubblePaddingY: 26,
          spacing: 52,
          titleSize: 42,
          subtitleSize: 18,
          bubbleTextSize: 34,
          romanizationTextSize: 21,
          translationTextSize: 21,
        };
      } else if (count === 4) {
        return {
          avatarSize: 92,
          cardPadding: 42,
          bubblePaddingX: 28,
          bubblePaddingY: 20,
          spacing: 36,
          titleSize: 38,
          subtitleSize: 16,
          bubbleTextSize: 28,
          romanizationTextSize: 18,
          translationTextSize: 18,
        };
      } else if (count === 5) {
        return {
          avatarSize: 82,
          cardPadding: 36,
          bubblePaddingX: 24,
          bubblePaddingY: 16,
          spacing: 24,
          titleSize: 32,
          subtitleSize: 14,
          bubbleTextSize: 24,
          romanizationTextSize: 16,
          translationTextSize: 16,
        };
      } else {
        return {
          avatarSize: 72,
          cardPadding: 28,
          bubblePaddingX: 20,
          bubblePaddingY: 13,
          spacing: 16,
          titleSize: 28,
          subtitleSize: 13,
          bubbleTextSize: 20,
          romanizationTextSize: 15,
          translationTextSize: 15,
        };
      }
    }
  };

  const cardHeight = currentSize.height;
  const cardWidth = currentSize.width;
  const baseLayout = getBaseLayout(aspectRatioMode, bubbleCount);

  // Precision scale search logic to balance typography readability and visual boundaries
  const estimateTotalHeight = (tScale: number, lScale: number) => {
    const avatarSz = Math.round(baseLayout.avatarSize * lScale);
    const bPaddingY = Math.round(baseLayout.bubblePaddingY * lScale);
    let itemSp = baseLayout.spacing;
    
    if (design.bubbleSpacing === "snug") {
      itemSp = Math.round(itemSp * 0.55);
    } else if (design.bubbleSpacing === "cozy") {
      itemSp = Math.round(itemSp * 1.35);
    }
    const finalItemSp = Math.round(itemSp * lScale);

    const txtSize = Math.round(baseLayout.bubbleTextSize * tScale);
    const romSize = Math.round(baseLayout.romanizationTextSize * tScale);
    const transSize = Math.round(baseLayout.translationTextSize * tScale);

    let totalH = 0;
    
    const paddingX = Math.round(baseLayout.cardPadding * lScale);
    const avatarArea = design.showAvatars ? (avatarSz + 24) : 0;
    const bubbleMaxW = cardWidth - (2 * paddingX) - avatarArea - 60; // safe interior width for text wrapper

    for (const bub of bubbles) {
      const txtLen = bub.text?.length || 0;
      // Asian full-width char estimation vs Latin/alphabetical fonts
      const isCJK = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/.test(bub.text || "");
      const charWidthRatio = isCJK ? 0.92 : 0.50;
      const charW = txtSize * charWidthRatio;
      const tLines = Math.max(1, Math.ceil((txtLen * charW) / bubbleMaxW));

      const romLen = bub.romanization?.length || 0;
      const rLines = romLen > 0 ? Math.max(1, Math.ceil((romLen * romSize * 0.50) / bubbleMaxW)) : 0;

      const transLen = bub.translation?.length || 0;
      const trLines = transLen > 0 ? Math.max(1, Math.ceil((transLen * transSize * 0.50) / bubbleMaxW)) : 0;

      const tHeight = tLines * (txtSize * 1.30);
      const rHeight = rLines > 0 ? (rLines * (romSize * 1.25) + 3) : 0;
      const trHeight = trLines > 0 ? (trLines * (transSize * 1.25) + 8) : 0;

      const bubbleBoxH = (2 * bPaddingY) + tHeight + rHeight + trHeight;
      const avatarStackH = design.showAvatars ? (avatarSz + 24) : 0;

      const turnH = Math.max(bubbleBoxH, avatarStackH);
      totalH += turnH;
    }

    totalH += (bubbles.length - 1) * finalItemSp;
    return totalH;
  };

  let textScale = 1.0;
  let layoutScale = 1.0;
  
  const maxIterations = 25;
  let iteration = 0;
  
  while (iteration < maxIterations) {
    const estimatedH = estimateTotalHeight(textScale, layoutScale);
    const paddingX = Math.round(baseLayout.cardPadding * layoutScale);
    const titleSizeMultiplier = Math.round(baseLayout.titleSize * textScale);
    const subtitleSizeMultiplier = Math.round(baseLayout.subtitleSize * textScale);
    
    // Header height including text and margin styles
    const hHeader = (design.title ? titleSizeMultiplier * 1.25 : 0) + (design.subtitle ? subtitleSizeMultiplier * 1.35 : 0) + (24 * layoutScale);
    const hFooter = 16 + (20 * layoutScale);
    const hMainAvailable = cardHeight - (2 * paddingX) - hHeader - hFooter;

    if (estimatedH <= hMainAvailable) {
      break;
    }

    // Shrink structural padding & spacing first to prioritize text accessibility
    if (layoutScale > 0.55) {
      layoutScale -= 0.05;
    } else if (textScale > 0.90) {
      textScale -= 0.02;
    } else if (layoutScale > 0.40) {
      layoutScale -= 0.05;
    } else if (textScale > 0.82) {
      textScale -= 0.02;
    } else {
      break;
    }
    iteration++;
  }

  // Precision scaled dimensions - shrink bubble padding more in line with layout scale to avoid huge empty balloons
  const avatarSize = Math.round(baseLayout.avatarSize * layoutScale);
  const cardPadding = Math.round(baseLayout.cardPadding * layoutScale);
  const bubblePaddingX = Math.round(baseLayout.bubblePaddingX * (layoutScale * 0.65 + 0.35));
  const bubblePaddingY = Math.round(baseLayout.bubblePaddingY * (layoutScale * 0.75 + 0.25));

  let baseSpacing = baseLayout.spacing;
  if (design.bubbleSpacing === "snug") {
    baseSpacing = Math.round(baseSpacing * 0.55);
  } else if (design.bubbleSpacing === "cozy") {
    baseSpacing = Math.round(baseSpacing * 1.35);
  }
  const itemSpacing = Math.round(baseSpacing * layoutScale);

  // Scaled typography sizes
  const titleSize = Math.round(baseLayout.titleSize * textScale);
  const subtitleSize = Math.round(baseLayout.subtitleSize * textScale);
  const bubbleTextSizePx = Math.round(baseLayout.bubbleTextSize * textScale);
  const romanizationTextSizePx = Math.round(baseLayout.romanizationTextSize * textScale);
  const translationTextSizePx = Math.round(baseLayout.translationTextSize * textScale);

  const headerMarginStyle = {
    marginTop: `${Math.round(12 * layoutScale)}px`,
    marginBottom: `${Math.round(20 * layoutScale)}px`,
  };
  const footerMarginStyle = {
    marginTop: `${Math.round(10 * layoutScale)}px`,
  };

  // True scaled footprint width and height
  const scaleRatio = scalePercent / 100;
  const scaledWidth = currentSize.width * scaleRatio;
  const scaledHeight = currentSize.height * scaleRatio;

  return (
    <div className="overflow-auto border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 p-4 flex justify-center items-center h-[52rem]">
      {/* Precision container footprint mapping scaled size to prevent top/bottom cuts */}
      <div
        className="flex items-center justify-center shrink-0 transition-all duration-300 relative"
        style={{
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
        }}
      >
        <div
          className="transition-all duration-300 shrink-0"
          style={{
            transform: `scale(${scaleRatio})`,
            transformOrigin: "top left",
            width: `${currentSize.width}px`,
            height: `${currentSize.height}px`,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          {/* Renderable Target Div */}
          <div
            id="language-export-card"
            ref={canvasRef}
            className="relative overflow-hidden flex flex-col justify-between border-8 select-none shadow-2xl shrink-0 h-full w-full"
            style={{
              borderColor: currentTheme.borderColor,
              background: currentTheme.bgGradient,
              padding: `${cardPadding}px`,
              boxSizing: "border-box",
            }}
          >
            {/* Floral/Star background Decos */}
            <ThemeDecoOverlay themeId={design.backgroundTheme} />

            {/* Card Frame Content Wrap (z-index 10 to stand above overlay graphics) */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between">
              
              {/* 1. Header Portion with Title */}
              <header className="shrink-0 text-center" style={headerMarginStyle}>
                {design.title && (
                  <h1
                    className={`${currentTheme.textColor} font-extrabold filter drop-shadow-xs tracking-tight uppercase`}
                    style={{
                      fontSize: `${titleSize}px`,
                      lineHeight: "1.2",
                      marginBottom: `${Math.round(4 * textScale)}px`,
                      fontFamily: design.backgroundTheme === "cosmic_sparkle" ? "monospace" : "inherit",
                    }}
                  >
                    {design.title}
                  </h1>
                )}
                {design.subtitle && (
                  <div
                    style={{
                      fontSize: `${subtitleSize}px`,
                      color: design.backgroundTheme === "cosmic_sparkle" ? "#94A3B8" : "rgba(30, 30, 30, 0.7)",
                    }}
                  >
                    {design.subtitle}
                  </div>
                )}
                {/* Colored underline decor */}
                <div
                  className="w-20 h-1 mx-auto mt-2 rounded-full"
                  style={{
                    backgroundColor: design.backgroundTheme === "cosmic_sparkle" ? "#00E5FF" : "#8E24AA",
                    opacity: 0.6,
                  }}
                ></div>
              </header>

              {/* 2. Middle Portion: Dialogues Scroll Area */}
              <main 
                className="flex-1 flex flex-col justify-center my-auto overflow-hidden px-4"
                style={{ gap: `${itemSpacing}px` }}
              >
                {bubbles.map((bub, index) => {
                  const isLeft = bub.speaker === "A";
                  const activeSpeaker = isLeft ? speakerA : speakerB;

                  return (
                    <div
                      key={bub.id || index}
                      className={`flex items-end gap-3.5 w-full ${isLeft ? "justify-start" : "justify-end"}`}
                    >
                      {/* Speaker A Avatar on Left */}
                      {isLeft && design.showAvatars && (
                        <div className="flex flex-col items-center shrink-0">
                          <ChibiAvatar
                            avatarId={activeSpeaker.avatar}
                            size={avatarSize}
                            className="shadow-md border-2 border-white rounded-full bg-white/90"
                          />
                          <span className="text-[10px] text-xxs font-semibold mt-1 px-1.5 py-0.5 rounded-full bg-black/5 text-gray-700 select-none uppercase tracking-wider scale-90 origin-top">
                            {activeSpeaker.name || "A"}
                          </span>
                        </div>
                      )}

                      {/* Chat Bubble Box */}
                      <div className="relative w-fit" style={{ maxWidth: design.showAvatars ? "78%" : "86%" }}>
                        <div
                          className={`relative w-fit ${getRoundnessClass(
                            design.bubbleRoundness
                          )} ${getShadowClass(design.shadowDepth)} border`}
                          style={{
                            backgroundColor: activeSpeaker.bubbleBg || "#FFFFFF",
                            borderColor: design.backgroundTheme === "cosmic_sparkle" ? "#334155" : "rgba(0,0,0,0.06)",
                            color: activeSpeaker.textColor || "#1e293b",
                            paddingLeft: `${bubblePaddingX}px`,
                            paddingRight: `${bubblePaddingX}px`,
                            paddingTop: `${bubblePaddingY}px`,
                            paddingBottom: `${bubblePaddingY}px`,
                          }}
                        >
                          {/* Native/Target Text (Line 1) */}
                          <div 
                            className="font-extrabold leading-snug" 
                            style={{ 
                              color: activeSpeaker.textColor || "inherit",
                              fontSize: `${bubbleTextSizePx}px`
                            }}
                          >
                            {bub.text || "..."}
                          </div>

                          {/* Pronunciation Transliteration (Line 2) */}
                          {bub.romanization && (
                            <div 
                              className="font-semibold italic leading-normal" 
                              style={{ 
                                color: activeSpeaker.textColor || "inherit", 
                                opacity: 0.85,
                                fontSize: `${romanizationTextSizePx}px`,
                                marginTop: `${Math.round(4 * textScale)}px`
                              }}
                            >
                              {bub.romanization}
                            </div>
                          )}

                          {/* Translation (Line 3) */}
                          {bub.translation && (
                            <div 
                              className="font-medium border-t leading-normal" 
                              style={{ 
                                color: activeSpeaker.textColor || "inherit", 
                                opacity: 0.72, 
                                borderColor: design.backgroundTheme === "cosmic_sparkle" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)",
                                fontSize: `${translationTextSizePx}px`,
                                paddingTop: `${Math.round(5 * textScale)}px`,
                                marginTop: `${Math.round(5 * textScale)}px`
                              }}
                            >
                              {bub.translation}
                            </div>
                          )}

                          {/* Speech Bubble Tail Arrow decoration */}
                          <div
                            className="absolute bottom-4 w-3 h-3 rotate-45 border-b border-r select-none"
                            style={{
                              backgroundColor: activeSpeaker.bubbleBg || "#FFFFFF",
                              borderColor: design.backgroundTheme === "cosmic_sparkle" ? "#334155" : "rgba(0,0,0,0.06)",
                              left: isLeft ? "-6px" : "auto",
                              right: !isLeft ? "-6px" : "auto",
                              borderLeft: isLeft ? "1px solid rgba(0,0,0,0.06)" : "none",
                              borderBottom: isLeft ? "1px solid rgba(0,0,0,0.06)" : "none",
                              borderTop: !isLeft ? "1px solid rgba(0,0,0,0.06)" : "none",
                              borderRight: !isLeft ? "1px solid rgba(0,0,0,0.06)" : "none",
                              boxSizing: "border-box",
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Speaker B Avatar on Right */}
                      {!isLeft && design.showAvatars && (
                        <div className="flex flex-col items-center shrink-0">
                          <ChibiAvatar
                            avatarId={activeSpeaker.avatar}
                            size={avatarSize}
                            className="shadow-md border-2 border-white rounded-full bg-white/90"
                          />
                          <span className="text-[10px] text-xxs font-semibold mt-1 px-1.5 py-0.5 rounded-full bg-black/5 text-gray-700 select-none uppercase tracking-wider scale-90 origin-top">
                            {activeSpeaker.name || "B"}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </main>

              {/* 3. Footer Segment: Watermark Handle decor */}
              <footer 
                className="text-center shrink-0 border-t border-dashed border-gray-400/20 pt-2"
                style={footerMarginStyle}
              >
                <div
                  className="text-xs font-mono font-medium tracking-widest uppercase opacity-85 select-none"
                  style={{
                    color: design.customWatermarkColor || (design.backgroundTheme === "cosmic_sparkle" ? "#818CF8" : "#9C27B0"),
                  }}
                >
                  {design.watermark || "@LanguageStudio"}
                </div>
              </footer>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
