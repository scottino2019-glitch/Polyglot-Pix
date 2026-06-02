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

  // Helper classes for bubble spacing
  const bubbleCount = bubbles.length;

  const getSpacingClass = (spacing: "snug" | "regular" | "cozy") => {
    if (bubbleCount >= 6) {
      return "space-y-2";
    }
    if (bubbleCount === 5) {
      return "space-y-3";
    }
    if (bubbleCount === 4) {
      return "space-y-5";
    }
    switch (spacing) {
      case "snug":
        return "space-y-3.5";
      case "cozy":
        return "space-y-8";
      default:
        return "space-y-6";
    }
  };

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

  // Adaptive values downscaling according to row count
  const avatarSize = bubbleCount >= 6 ? 50 : bubbleCount === 5 ? 58 : bubbleCount === 4 ? 66 : 74;
  const paddingClass = bubbleCount >= 6 ? "p-3.5 py-2.5" : bubbleCount === 5 ? "p-4 py-3" : bubbleCount === 4 ? "p-4.5 py-3.5" : "p-5 py-4";

  // Margins and text sizes
  const headerMarginClass = bubbleCount >= 6 ? "mt-1 mb-2 shrink-0 text-center" : bubbleCount === 5 ? "mt-1.5 mb-3 shrink-0 text-center" : "mt-2 mb-4 shrink-0 text-center";
  const titleSizeClass = bubbleCount >= 6 ? "text-2.5xl font-extrabold filter drop-shadow-xs mb-0.5 tracking-tight uppercase" : bubbleCount === 5 ? "text-3xl font-extrabold filter drop-shadow-xs mb-1 tracking-tight uppercase" : "text-3.5xl font-extrabold tracking-tight filter drop-shadow-xs mb-1 uppercase";
  const subtitleSizeClass = bubbleCount >= 6 ? "text-xs font-medium tracking-wide opacity-80" : "text-base font-medium tracking-wide opacity-85";

  const bubbleTextSize = bubbleCount >= 6 ? "text-lg sm:text-lg font-extrabold tracking-tight mb-0.5 leading-snug" : bubbleCount === 5 ? "text-lg sm:text-xl font-extrabold tracking-tight mb-0.5 leading-snug" : bubbleCount === 4 ? "text-xl sm:text-2x1 font-extrabold tracking-tight mb-1 leading-snug" : "text-2.5xl sm:text-3xl font-extrabold tracking-tight mb-1 leading-snug";
  const romanizationTextSize = bubbleCount >= 6 ? "text-xs sm:text-base italic font-semibold text-indigo-700/85 mb-0.5" : bubbleCount === 5 ? "text-base sm:text-lg font-semibold italic text-indigo-700/85 mb-0.5" : "text-lg sm:text-lg font-semibold italic text-indigo-700/85 mb-1";
  const translationTextSize = bubbleCount >= 6 ? "text-xs sm:text-base font-medium text-zinc-650 border-t border-zinc-150/60 pt-0.5 mt-0.5" : bubbleCount === 5 ? "text-sm sm:text-lg font-medium text-zinc-650 border-t border-zinc-150/60 pt-0.5 mt-0.5" : "text-lg sm:text-lg font-medium text-zinc-600 border-t border-zinc-100/80 pt-1 mt-1";

  const footerMarginClass = bubbleCount >= 6 ? "text-center mt-3 shrink-0 border-t border-dashed border-gray-400/20 pt-2" : "text-center mt-6 shrink-0 border-t border-dashed border-gray-400/20 pt-3";

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
              <main className={`flex-1 flex flex-col justify-center my-auto overflow-hidden px-4 ${getSpacingClass(design.bubbleSpacing)}`}>
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
                          <div className={`${bubbleTextSize} text-zinc-900`}>
                            {bub.text || "..."}
                          </div>

                          {/* Pronunciation Transliteration (Line 2) */}
                          {bub.romanization && (
                            <div className={romanizationTextSize}>
                              {bub.romanization}
                            </div>
                          )}

                          {/* Translation (Line 3) */}
                          {bub.translation && (
                            <div className={translationTextSize}>
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
