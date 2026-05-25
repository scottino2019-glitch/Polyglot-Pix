import { ThemeID } from "../types";

interface ThemeDecoOverlayProps {
  themeId: ThemeID;
}

export function ThemeDecoOverlay({ themeId }: ThemeDecoOverlayProps) {
  switch (themeId) {
    case "lavender_field":
      return (
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden opacity-30 sm:opacity-40">
          {/* Top Right Lavender Stem */}
          <svg className="absolute -top-10 -right-10 w-44 h-56 rotate-45 transform" viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 170 Q45 100 80 15" stroke="#7B1FA2" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M42 150 Q25 155 30 162" stroke="#7B1FA2" strokeWidth="2" strokeLinecap="round" />
            {/* Lilac blossoms */}
            <circle cx="80" cy="15" r="5" fill="#8E24AA" />
            <circle cx="75" cy="25" r="4.5" fill="#BA68C8" />
            <circle cx="84" cy="28" r="4.5" fill="#E1BEE7" />
            <circle cx="72" cy="38" r="5" fill="#8E24AA" />
            <circle cx="82" cy="42" r="5.5" fill="#BA68C8" />
            <circle cx="68" cy="55" r="5" fill="#9C27B0" />
            <circle cx="78" cy="58" r="6" fill="#CE93D8" />
            <circle cx="65" cy="72" r="5.5" fill="#8E24AA" />
            <circle cx="74" cy="75" r="6" fill="#BA68C8" />
            <circle cx="60" cy="92" r="5" fill="#7B1FA2" />
            <circle cx="69" cy="94" r="6" fill="#CE93D8" />
            {/* Lavender buds left side */}
            <path d="M50 110 C53 105, 45 98, 42 104" fill="#8E24AA" />
            <path d="M43 125 C47 121, 38 114, 34 120" fill="#7B1FA2" />
          </svg>

          {/* Bottom Left Lavender Stem */}
          <svg className="absolute -bottom-14 -left-12 w-48 h-64 rotate-12 transform" viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M80 170 Q60 90 20 20" stroke="#6A1B9A" strokeWidth="3" strokeLinecap="round" />
            {/* Lavender buds on stem */}
            <circle cx="20" cy="20" r="5.5" fill="#8E24AA" />
            <circle cx="26" cy="30" r="4.5" fill="#9C27B0" />
            <circle cx="15" cy="34" r="5" fill="#CE93D8" />
            <circle cx="32" cy="45" r="5" fill="#8E24AA" />
            <circle cx="22" cy="48" r="5.5" fill="#BA68C8" />
            <circle cx="38" cy="62" r="6" fill="#7B1FA2" />
            <circle cx="28" cy="65" r="6" fill="#D500F9" />
            <circle cx="44" cy="84" r="5.5" fill="#8E24AA" />
            <circle cx="34" cy="88" r="6.5" fill="#CE93D8" />
            <circle cx="49" cy="108" r="5" fill="#4A148C" />
            <circle cx="39" cy="112" r="6" fill="#BA68C8" />
            {/* Lavender leaves */}
            <path d="M72 135 C88 128, 92 144, 76 142" fill="#7B1FA2" />
            <path d="M65 150 C80 142, 85 158, 68 155" fill="#6A1B9A" />
          </svg>

          {/* Symmetrical Left/Right Border floral sparkles */}
          <div className="absolute top-1/4 bottom-1/4 left-1 w-[2px] border-l-2 border-dashed border-purple-300/60"></div>
          <div className="absolute top-1/4 bottom-1/4 right-1 w-[2px] border-r-2 border-dashed border-purple-300/60"></div>
        </div>
      );

    case "sakura_breeze":
      return (
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden opacity-30 sm:opacity-50">
          {/* Top Left Cherry Blossom Branch */}
          <svg className="absolute -top-6 -left-6 w-52 h-52 rotate-9 transform" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0 Q80 40 160 80 Q170 85 150 95" stroke="#4E342E" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M80 40 Q110 20 130 10" stroke="#4E342E" strokeWidth="2.5" strokeLinecap="round" />
            
            {/* Blooming Sakura flowers */}
            <circle cx="120" cy="20" r="11" fill="#FF80AB" />
            <circle cx="120" cy="20" r="8" fill="#FFF" opacity="0.9" />
            <circle cx="120" cy="20" r="3" fill="#FF4081" />
            
            <circle cx="150" cy="74" r="14" fill="#FF80AB" />
            <circle cx="150" cy="74" r="10" fill="#FFF" opacity="0.9" />
            <circle cx="150" cy="74" r="3" fill="#FF4081" />

            <circle cx="60" cy="30" r="9" fill="#FFB7C5" />
            <circle cx="60" cy="30" r="2" fill="#F50057" />

            <circle cx="106" cy="52" r="12" fill="#FF80AB" />
            <circle cx="106" cy="52" r="8" fill="#FFF" />
            <circle cx="106" cy="52" r="3" fill="#F50057" />

            {/* Buds */}
            <circle cx="132" cy="14" r="4" fill="#F50057" />
            <circle cx="166" cy="62" r="5" fill="#F50057" />
            <circle cx="92" cy="46" r="4" fill="#FF4081" />
          </svg>

          {/* Bottom Right Drifting Petals */}
          <svg className="absolute bottom-4 right-4 w-40 h-40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Petal 1 */}
            <path d="M20 30 C12 28, 8 36, 16 42 C24 48, 28 32, 20 30" fill="#FF80AB" transform="rotate(15 20 30)" />
            {/* Petal 2 */}
            <path d="M60 70 C54 65, 48 72, 54 80 C60 88, 66 75, 60 70" fill="#FFB7C5" transform="rotate(-30 60 70)" />
            {/* Petal 3 */}
            <path d="M80 35 C75 32, 70 38, 76 44 C82 50, 85 38, 80 35" fill="#FFF0F5" opacity="0.8" transform="rotate(45 80 35)" />
          </svg>
          
          <div className="absolute inset-x-8 top-12 h-[1px] bg-pink-100/50"></div>
          <div className="absolute inset-x-8 bottom-12 h-[1px] bg-pink-100/50"></div>
        </div>
      );

    case "matcha_green":
      return (
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden opacity-25 sm:opacity-40">
          {/* Blowing Sage Tea Leaves */}
          <svg className="absolute -top-12 -left-10 w-44 h-48 rotate-45 transform" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Leaf 1 */}
            <path d="M10 50 Q40 10 90 20 Q60 70 10 50 Z" fill="#A5D6A7" />
            <path d="M10 50 Q50 35 90 20" stroke="#388E3C" strokeWidth="1.5" />
            {/* Leaf 2 */}
            <path d="M30 60 Q60 30 80 80 Q40 85 30 60 Z" fill="#C8E6C9" />
            <path d="M30 60 Q55 57 80 80" stroke="#4CAF50" strokeWidth="1" />
          </svg>

          <svg className="absolute -bottom-10 -right-8 w-44 h-44 rotate-12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 80 Q30 30 90 10 Q70 60 10 80 Z" fill="#81C784" />
            <path d="M10 80 Q45 55 90 10" stroke="#2E7D32" strokeWidth="1.5" />
          </svg>
        </div>
      );

    case "sunset_warmth":
      return (
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden opacity-30">
          {/* Sunset radiating rays */}
          <svg className="absolute -bottom-16 -left-16 w-80 h-80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="0" cy="100" r="60" fill="#FFA726" opacity="0.15" />
            <circle cx="0" cy="100" r="45" fill="#FFB74D" opacity="0.15" />
            <circle cx="0" cy="100" r="30" fill="#FFE082" opacity="0.2" />
            {/* Rays */}
            <line x1="0" y1="100" x2="60" y2="40" stroke="#FFD54F" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="0" y1="100" x2="90" y2="60" stroke="#FFD54F" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="0" y1="100" x2="20" y2="20" stroke="#FFD54F" strokeWidth="1.5" strokeDasharray="3,3" />
          </svg>

          <svg className="absolute -top-10 -right-10 w-44 h-44" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {/* Stars sparkles */}
            <path d="M20 10 L23 18 L31 20 L23 22 L20 30 L17 22 L9 20 L17 18 Z" fill="#FFB74D" opacity="0.8" />
            <path d="M60 40 L61.5 45 L66.5 46 L61.5 47 L60 52 L58.5 47 L53.5 46 L58.5 45 Z" fill="#FFA726" opacity="0.8" />
          </svg>
        </div>
      );

    case "cosmic_sparkle":
      return (
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden opacity-40">
          {/* Cybernetic glowing orbits or sparkles */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Constellation grid / lines */}
            <line x1="10%" y1="15%" x2="35%" y2="8%" stroke="#3F51B5" strokeWidth="1" opacity="0.3" />
            <line x1="35%" y1="8%" x2="55%" y2="18%" stroke="#3F51B5" strokeWidth="1" opacity="0.3" />
            <line x1="85%" y1="65%" x2="65%" y2="85%" stroke="#3F51B5" strokeWidth="1" opacity="0.3" />

            {/* Glowing neon stars */}
            <circle cx="10%" cy="15%" r="3.5" fill="#E0F2F1" className="animate-pulse" />
            <circle cx="35%" cy="8%" r="2" fill="#80DEEA" />
            <circle cx="55%" cy="18%" r="4" fill="#00E5FF" className="animate-pulse" />
            <circle cx="85%" cy="65%" r="3" fill="#80DEEA" />
            <circle cx="65%" cy="85%" r="4" fill="#E0F2F1" />

            {/* Top Right Nebulae bubble */}
            <circle cx="95%" cy="5%" r="120" fill="#29B6F6" opacity="0.05" />
            {/* Bottom Left Nebulae bubble */}
            <circle cx="5%" cy="95%" r="160" fill="#AB47BC" opacity="0.06" />
          </svg>
        </div>
      );

    case "minimal_chalk":
      return (
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden opacity-50">
          {/* Stylish modern abstract aesthetic line designs */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect x="16" y="16" style={{ width: "calc(100% - 32px)", height: "calc(100% - 32px)" }} stroke="#E0E0E0" strokeWidth="1" rx="8" fill="none" />
            <circle cx="32" cy="32" r="30" stroke="#EEEEEE" strokeWidth="1" fill="none" />
            <circle cx="95%" cy="95%" r="40" stroke="#EEEEEE" strokeWidth="1.5" fill="none" />
            {/* Small abstract gray dots */}
            <circle cx="45%" cy="10%" r="2" fill="#BDBDBD" />
            <circle cx="80%" cy="40%" r="3.5" fill="#E0E0E0" />
            <circle cx="15%" cy="75%" r="2.5" fill="#E0E0E0" />
          </svg>
        </div>
      );

    case "charcoal_slate":
      return (
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden opacity-20">
          {/* Technical drafting guidelines */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="50" x2="100%" y2="50" stroke="#52525B" strokeWidth="0.5" />
            <line x1="50" y1="0" x2="50" y2="100%" stroke="#52525B" strokeWidth="0.5" />
            {/* Tech grid */}
            <circle cx="50%" cy="50%" r="180" stroke="#3F3F46" strokeWidth="1" fill="none" strokeDasharray="4,4" />
            <circle cx="50%" cy="50%" r="80" stroke="#3F3F46" strokeWidth="1" fill="none" strokeDasharray="2,2" />
          </svg>
        </div>
      );

    default:
      return null;
  }
}
