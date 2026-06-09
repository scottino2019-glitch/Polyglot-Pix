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
  const getLayoutConfig = (
    ratio: "instagram" | "pinterest" | "square",
    count: number
  ) => {
    if (ratio === "square") {
      if (count <= 3) {
        return {
          avatarSize: 84,
          paddingClass: "p-[26px] py-[22px]",
          spacingClass: "space-y-[32px]",
          headerMarginClass: "mt-[12px] mb-[24px] shrink-0 text-center",
          titleSizeClass: "text-[34px] font-extrabold filter drop-shadow-xs mb-1 opacity-90 tracking-tight uppercase",
          subtitleSizeClass: "text-[14px] font-medium tracking-wide opacity-80",
          bubbleTextSize: "text-[28px] font-extrabold tracking-tight mb-1 leading-snug",
          romanizationTextSize: "text-[18px]",
          translationTextSize: "text-[18px]",
          footerMarginClass: "text-center mt-[14px] shrink-0 border-t border-dashed border-gray-400/20 pt-2",
        };
      } else if (count === 4) {
        return {
          avatarSize: 72,
          paddingClass: "p-[20px] py-[16px]",
          spacingClass: "space-y-[22px]",
          headerMarginClass: "mt-[10px] mb-[18px] shrink-0 text-center",
          titleSizeClass: "text-[30px] font-extrabold filter drop-shadow-xs mb-0.5 tracking-tight uppercase",
          subtitleSizeClass: "text-[12px] font-medium tracking-wide opacity-80",
          bubbleTextSize: "text-[24px] font-extrabold tracking-tight mb-0.5 leading-snug",
          romanizationTextSize: "text-[16px]",
          translationTextSize: "text-[16px]",
          footerMarginClass: "text-center mt-[12px] shrink-0 border-t border-dashed border-gray-400/20 pt-1.5",
        };
      } else if (count === 5) {
        return {
          avatarSize: 62,
          paddingClass: "p-[16px] py-[12px]",
          spacingClass: "space-y-[14px]",
          headerMarginClass: "mt-[8px] mb-[12px] shrink-0 text-center",
          titleSizeClass: "text-[26px] font-extrabold filter drop-shadow-xs mb-0.5 tracking-tight uppercase",
          subtitleSizeClass: "text-[11px] font-medium tracking-wide opacity-70",
          bubbleTextSize: "text-[21px] font-extrabold tracking-tight mb-0.5 leading-tight",
          romanizationTextSize: "text-[15px]",
          translationTextSize: "text-[15px]",
          footerMarginClass: "text-center mt-[10px] shrink-0 border-t border-dashed border-gray-400/20 pt-1",
        };
      } else {
        return {
          avatarSize: 52,
          paddingClass: "p-[14px] py-[10px]",
          spacingClass: "space-y-[10px]",
          headerMarginClass: "mt-[6px] mb-[10px] shrink-0 text-center",
          titleSizeClass: "text-[22px] font-extrabold filter drop-shadow-xs mb-0.5 tracking-tight uppercase",
          subtitleSizeClass: "text-[10px] font-medium tracking-wide opacity-70",
          bubbleTextSize: "text-[18px] font-extrabold tracking-tight leading-snug",
          romanizationTextSize: "text-[14px]",
          translationTextSize: "text-[14px]",
          footerMarginClass: "text-center mt-[8px] shrink-0 border-t border-dashed border-gray-400/20 pt-0.5",
        };
      }
    } else if (ratio === "instagram") {
      if (count <= 3) {
        return {
          avatarSize: 96,
          paddingClass: "p-[32px] py-[26px]",
          spacingClass: "space-y-[44px]",
          headerMarginClass: "mt-[24px] mb-[36px] shrink-0 text-center",
          titleSizeClass: "text-[42px] font-extrabold filter drop-shadow-xs mb-2 tracking-tight uppercase",
          subtitleSizeClass: "text-[16px] font-medium tracking-wide opacity-85",
          bubbleTextSize: "text-[34px] font-extrabold tracking-tight mb-2 leading-snug",
          romanizationTextSize: "text-[20px]",
          translationTextSize: "text-[20px]",
          footerMarginClass: "text-center mt-[32px] shrink-0 border-t border-dashed border-gray-400/20 pt-3.5",
        };
      } else if (count === 4) {
        return {
          avatarSize: 84,
          paddingClass: "p-[26px] py-[20px]",
          spacingClass: "space-y-[32px]",
          headerMarginClass: "mt-[18px] mb-[28px] shrink-0 text-center",
          titleSizeClass: "text-[36px] font-extrabold filter drop-shadow-xs mb-1.5 tracking-tight uppercase",
          subtitleSizeClass: "text-[14px] font-medium tracking-wide opacity-85",
          bubbleTextSize: "text-[28px] font-extrabold tracking-tight mb-1.5 leading-snug",
          romanizationTextSize: "text-[18px]",
          translationTextSize: "text-[18px]",
          footerMarginClass: "text-center mt-[24px] shrink-0 border-t border-dashed border-gray-400/20 pt-3",
        };
      } else if (count === 5) {
        return {
          avatarSize: 74,
          paddingClass: "p-[22px] py-[16px]",
          spacingClass: "space-y-[22px]",
          headerMarginClass: "mt-[14px] mb-[22px] shrink-0 text-center",
          titleSizeClass: "text-[30px] font-extrabold filter drop-shadow-xs mb-1 tracking-tight uppercase",
          subtitleSizeClass: "text-[13px] font-medium tracking-wide opacity-85",
          bubbleTextSize: "text-[24px] font-extrabold tracking-tight mb-1 leading-snug",
          romanizationTextSize: "text-[16px]",
          translationTextSize: "text-[16px]",
          footerMarginClass: "text-center mt-[18px] shrink-0 border-t border-dashed border-gray-400/20 pt-2.5",
        };
      } else {
        return {
          avatarSize: 64,
          paddingClass: "p-[18px] py-[13px]",
          spacingClass: "space-y-[15px]",
          headerMarginClass: "mt-[10px] mb-[16px] shrink-0 text-center",
          titleSizeClass: "text-[26px] font-extrabold filter drop-shadow-xs mb-1 tracking-tight uppercase",
          subtitleSizeClass: "text-[12px] font-medium tracking-wide opacity-80",
          bubbleTextSize: "text-[21px] font-extrabold tracking-tight mb-0.5 leading-snug",
          romanizationTextSize: "text-[15px]",
          translationTextSize: "text-[15px]",
          footerMarginClass: "text-center mt-[14px] shrink-0 border-t border-dashed border-gray-400/25 pt-2",
        };
      }
    } else {
      // pinterest: Height 1200
      if (count <= 3) {
        return {
          avatarSize: 104,
          paddingClass: "p-[36px] py-[30px]",
          spacingClass: "space-y-[52px]",
          headerMarginClass: "mt-[28px] mb-[48px] shrink-0 text-center",
          titleSizeClass: "text-[46px] font-extrabold filter drop-shadow-xs mb-2 tracking-tight uppercase",
          subtitleSizeClass: "text-[18px] font-medium tracking-wide opacity-85",
          bubbleTextSize: "text-[38px] font-extrabold tracking-tight mb-2 leading-snug",
          romanizationTextSize: "text-[22px]",
          translationTextSize: "text-[22px]",
          footerMarginClass: "text-center mt-[40px] shrink-0 border-t border-dashed border-gray-400/20 pt-4.5",
        };
      } else if (count === 4) {
        return {
          avatarSize: 92,
          paddingClass: "p-[30px] py-[24px]",
          spacingClass: "space-y-[40px]",
          headerMarginClass: "mt-[20px] mb-[38px] shrink-0 text-center",
          titleSizeClass: "text-[40px] font-extrabold filter drop-shadow-xs mb-1.5 tracking-tight uppercase",
          subtitleSizeClass: "text-[16px] font-medium tracking-wide opacity-85",
          bubbleTextSize: "text-[32px] font-extrabold tracking-tight mb-1.5 leading-snug",
          romanizationTextSize: "text-[19px]",
          translationTextSize: "text-[19px]",
          footerMarginClass: "text-center mt-[32px] shrink-0 border-t border-dashed border-gray-400/20 pt-3.5",
        };
      } else if (count === 5) {
        return {
          avatarSize: 82,
          paddingClass: "p-[26px] py-[20px]",
          spacingClass: "space-y-[32px]",
          headerMarginClass: "mt-[16px] mb-[30px] shrink-0 text-center",
          titleSizeClass: "text-[34px] font-extrabold filter drop-shadow-xs mb-1 tracking-tight uppercase",
          subtitleSizeClass: "text-[14px] font-medium tracking-wide opacity-85",
          bubbleTextSize: "text-[28px] font-extrabold tracking-tight mb-1 leading-snug",
          romanizationTextSize: "text-[17px]",
          translationTextSize: "text-[17px]",
          footerMarginClass: "text-center mt-[24px] shrink-0 border-t border-dashed border-gray-400/20 pt-3",
        };
      } else {
        return {
          avatarSize: 72,
          paddingClass: "p-[22px] py-[16px]",
          spacingClass: "space-y-[22px]",
          headerMarginClass: "mt-[12px] mb-[24px] shrink-0 text-center",
          titleSizeClass: "text-[30px] font-extrabold filter drop-shadow-xs mb-1 tracking-tight uppercase",
          subtitleSizeClass: "text-[13px] font-medium tracking-wide opacity-85",
          bubbleTextSize: "text-[24px] font-extrabold tracking-tight mb-0.5 leading-snug",
          romanizationTextSize: "text-[16px]",
          translationTextSize: "text-[16px]",
          footerMarginClass: "text-center mt-[18px] shrink-0 border-t border-dashed border-gray-400/25 pt-2.5",
        };
      }
    }
  };

  const layout = getLayoutConfig(aspectRatioMode, bubbleCount);

  // Apply bubbleSpacing adjustment elegantly if requested
  let finalSpacingClass = layout.spacingClass;
  if (design.bubbleSpacing === "snug") {
    if (bubbleCount <= 4) finalSpacingClass = "space-y-[12px]";
    else finalSpacingClass = "space-y-[6px]";
  } else if (design.bubbleSpacing === "cozy") {
    if (bubbleCount <= 4) finalSpacingClass = "space-y-[32px]";
    else finalSpacingClass = "space-y-[18px]";
  }

  // Alias layout options for template compatibility
  const avatarSize = layout.avatarSize;
  const paddingClass = layout.paddingClass;
  const headerMarginClass = layout.headerMarginClass;
  const titleSizeClass = layout.titleSizeClass;
  const subtitleSizeClass = layout.subtitleSizeClass;
  const bubbleTextSize = layout.bubbleTextSize;
  const romanizationTextSize = layout.romanizationTextSize;
  const translationTextSize = layout.translationTextSize;
  const footerMarginClass = layout.footerMarginClass;

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
            className="relative overflow-hidden flex flex-col justify-between border-8 p-10 select-none shadow-2xl shrink-0 h-full w-full"
            style={{
              borderColor: currentTheme.borderColor,
              background: currentTheme.bgGradient,
              boxSizing: "border-box",
            }}
          >
            {/* Floral/Star background Decos */}
            <ThemeDecoOverlay themeId={design.backgroundTheme} />

            {/* Card Frame Content Wrap (z-index 10 to stand above overlay graphics) */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between">
              
              {/* 1. Header Portion with Title */}
              <header className={headerMarginClass}>
                {design.title && (
                  <h1
                    className={`${titleSizeClass} ${currentTheme.textColor}`}
                    style={{
                      fontFamily: design.backgroundTheme === "cosmic_sparkle" ? "monospace" : "inherit",
                    }}
                  >
                    {design.title}
                  </h1>
                )}
                {design.subtitle && (
                  <div
                    className={subtitleSizeClass}
                    style={{
                      color: design.backgroundTheme === "cosmic_sparkle" ? "#94A3B8" : "rgba(30, 30, 30, 0.7)",
                    }}
                  >
                    {design.subtitle}
                  </div>
                )}
                {/* Colored underline decor */}
                <div
                  className="w-20 h-1 mx-auto mt-2.5 rounded-full"
                  style={{
                    backgroundColor: design.backgroundTheme === "cosmic_sparkle" ? "#00E5FF" : "#8E24AA",
                    opacity: 0.6,
                  }}
                ></div>
              </header>

              {/* 2. Middle Portion: Dialogues Scroll Area */}
              <main className={`flex-1 flex flex-col justify-center my-auto overflow-hidden px-4 ${finalSpacingClass}`}>
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
                      <div className="relative max-w-[70%]">
                        <div
                          className={`${paddingClass} relative ${getRoundnessClass(
                            design.bubbleRoundness
                          )} ${getShadowClass(design.shadowDepth)} border`}
                          style={{
                            backgroundColor: activeSpeaker.bubbleBg || "#FFFFFF",
                            borderColor: design.backgroundTheme === "cosmic_sparkle" ? "#334155" : "rgba(0,0,0,0.06)",
                            color: activeSpeaker.textColor || "#1e293b",
                          }}
                        >
                          {/* Native/Target Text (Line 1) */}
                          <div className={`${bubbleTextSize} font-extrabold`} style={{ color: activeSpeaker.textColor || "inherit" }}>
                            {bub.text || "..."}
                          </div>

                          {/* Pronunciation Transliteration (Line 2) */}
                          {bub.romanization && (
                            <div className={`${romanizationTextSize} font-semibold italic mt-1`} style={{ color: activeSpeaker.textColor || "inherit", opacity: 0.85 }}>
                              {bub.romanization}
                            </div>
                          )}

                          {/* Translation (Line 3) */}
                          {bub.translation && (
                            <div className={`${translationTextSize} font-medium border-t pt-1.5 mt-1.5`} style={{ color: activeSpeaker.textColor || "inherit", opacity: 0.72, borderColor: design.backgroundTheme === "cosmic_sparkle" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)" }}>
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
              <footer className={footerMarginClass}>
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
