export interface DialogueBubble {
  id: string;
  text: string;           // Original script (Korean, Japanese, etc.)
  romanization: string;   // Transliteration / Romanization pronunciation helper
  translation: string;    // Base language translation (Italian, etc.)
  speaker: "A" | "B";     // Left or Right alignment
}

export type AvatarID =
  | "chibi_hiro"
  | "chibi_yuna"
  | "chibi_haru"
  | "chibi_sakura"
  | "chibi_kenji"
  | "neko_sensei"
  | "shiba_kun"
  | "usagi_chan"
  | "panda_san";

export interface SpeakerConfig {
  name: string;
  avatar: AvatarID;
  bgColor: string;     // Pastel background color for avatar shape
  bubbleBg: string;    // Custom background for speech bubble
  textColor: string;   // Main text color inside speech bubble
}

export type ThemeID =
  | "lavender_field"
  | "sakura_breeze"
  | "matcha_green"
  | "sunset_warmth"
  | "cosmic_sparkle"
  | "minimal_chalk"
  | "charcoal_slate";

export interface ThemeConfig {
  id: ThemeID;
  name: string;
  bgGradient: string;  // CSS background gradient (e.g. from-violet-100 to-purple-200)
  fontSans: string;     // Font family name
  emojiOverlay: string; // Dynamic overlay floral icon/SVG identifier
  borderColor: string;  // Card outer borders color
  textColor: string;    // General labels/headers color
  accentColor: string;  // Accent highlight border/button
}

export interface CardDesignSettings {
  title: string;              // Top headline e.g., "Daily Conversation in Korean"
  subtitle: string;           // Bottom info label, e.g., "Basic introduction conversation in Korean"
  watermark: string;          // Handles/channel e.g. "@LetsLearnWithMe" or "@LetsLearnKorean"
  backgroundTheme: ThemeID;
  customWatermarkColor: string;
  showAvatars: boolean;
  bubbleSpacing: "snug" | "regular" | "cozy";
  bubbleRoundness: "sm" | "md" | "lg" | "full";
  shadowDepth: "none" | "sm" | "md" | "lg";
  targetLanguageName: string;
  baseLanguageName: string;
}

export interface LanguageOption {
  code: string;
  name: string;
  placeholderText: string;
  placeholderRom: string;
  placeholderTrans: string;
}

export interface PresetDialogue {
  id: string;
  title: string;
  targetLanguage: string;
  baseLanguage: string;
  bubbles: DialogueBubble[];
}
