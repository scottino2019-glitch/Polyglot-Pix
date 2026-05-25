import { AvatarID } from "../types";

interface ChibiAvatarProps {
  avatarId: AvatarID;
  className?: string;
  size?: number;
}

export function ChibiAvatar({ avatarId, className = "", size = 64 }: ChibiAvatarProps) {
  // Common container with size
  const renderSVGContent = () => {
    switch (avatarId) {
      case "chibi_hiro":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full" fill="none">
            {/* Background circle badge */}
            <circle cx="50" cy="50" r="48" fill="#E6F4EA" />
            
            {/* Body - Green hoodie */}
            <path d="M25 85 C25 70, 75 70, 75 85 L70 95 L30 95 Z" fill="#34A853" />
            <path d="M42 72 L50 82 L58 72" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            
            {/* Head / Face */}
            <circle cx="50" cy="46" r="24" fill="#FFE0B2" />
            
            {/* Blush cheeks */}
            <circle cx="34" cy="52" r="4" fill="#FF8A80" opacity="0.6" />
            <circle cx="66" cy="52" r="4" fill="#FF8A80" opacity="0.6" />
            
            {/* Eyes */}
            <ellipse cx="38" cy="45" r="3" rx="2" ry="3" fill="#3E2723" />
            <ellipse cx="62" cy="45" r="3" rx="2" ry="3" fill="#3E2723" />
            {/* White highlights in eyes */}
            <circle cx="37" cy="43" r="1" fill="#FFFFFF" />
            <circle cx="61" cy="43" r="1" fill="#FFFFFF" />
            
            {/* Mouth */}
            <path d="M46 54 Q50 58 54 54" stroke="#3E2723" strokeWidth="2" strokeLinecap="round" fill="none" />
            
            {/* Hair - Brown mess */}
            <path d="M24 40 C28 20, 72 20, 76 40 C78 35, 78 28, 72 24 C66 20, 58 18, 50 20 C42 18, 34 20, 28 24 C22 28, 22 35, 24 40 Z" fill="#5D4037" />
            {/* Hair bangs */}
            <path d="M27 38 L35 34 L38 42 L45 32 L50 38 L55 32 L62 42 L65 34 L73 38" stroke="#5D4037" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="#5D4037" />
            
            {/* Hoodie hood contours */}
            <path d="M26 65 C22 55, 30 46, 30 46" stroke="#1B5E20" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M74 65 C78 55, 70 46, 70 46" stroke="#1B5E20" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      case "chibi_yuna":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full" fill="none">
            {/* Background circle badge */}
            <circle cx="50" cy="50" r="48" fill="#FCE4EC" />
            
            {/* Hair back ponytails */}
            <circle cx="18" cy="35" r="11" fill="#8D6E63" />
            <circle cx="82" cy="35" r="11" fill="#8D6E63" />
            <path d="M12 36 Q6 48 14 54 Q18 45 18 35" fill="#8D6E63" />
            <path d="M88 36 Q94 48 86 54 Q82 45 82 35" fill="#8D6E63" />
            {/* Ponytail ribbons */}
            <circle cx="22" cy="27" r="3" fill="#E91E63" />
            <circle cx="78" cy="27" r="3" fill="#E91E63" />
            
            {/* Body - Blue straps dress */}
            <path d="M26 85 C26 71, 74 71, 74 85 L68 95 L32 95 Z" fill="#1565C0" />
            <path d="M35 72 L35 85" stroke="#FFFFFF" strokeWidth="3" />
            <path d="M65 72 L65 85" stroke="#FFFFFF" strokeWidth="3" />
            {/* Pink shirt underneath */}
            <path d="M38 72 C42 66, 58 66, 62 72 Z" fill="#FF80AB" />
            
            {/* Head / Face */}
            <circle cx="50" cy="46" r="23" fill="#FFF3E0" />
            
            {/* Blush cheeks */}
            <ellipse cx="33" cy="53" rx="4" ry="2" fill="#E91E63" opacity="0.4" />
            <ellipse cx="67" cy="53" rx="4" ry="2" fill="#E91E63" opacity="0.4" />
            
            {/* Eyes */}
            <ellipse cx="38" cy="46" r="3.5" rx="2" ry="3.5" fill="#4E342E" />
            <ellipse cx="62" cy="46" r="3.5" rx="2" ry="3.5" fill="#4E342E" />
            {/* White highlights in eyes */}
            <circle cx="36.5" cy="44" r="1" fill="#FFFFFF" />
            <circle cx="60.5" cy="44" r="1" fill="#FFFFFF" />
            
            {/* Mouth */}
            <path d="M45 52 Q50 58 55 52" stroke="#E91E63" strokeWidth="2" strokeLinecap="round" fill="none" />
            
            {/* Hair - Soft Brown bangs */}
            <path d="M27 41 C27 23, 73 23, 73 41" stroke="#8D6E63" strokeWidth="5" strokeLinecap="round" />
            <path d="M27 38 L37 36 C42 32, 45 42, 45 42 L52 35 C58 35, 59 42, 59 42 L66 35 L73 38" fill="#8D6E63" />
          </svg>
        );

      case "chibi_haru":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full" fill="none">
            {/* Background circle badge */}
            <circle cx="50" cy="50" r="48" fill="#E8F0FE" />
            
            {/* Body - Soft teal sweater */}
            <path d="M25 85 C25 70, 75 70, 75 85 L70 95 L30 95 Z" fill="#00838F" />
            
            {/* Head / Face */}
            <circle cx="50" cy="46" r="24" fill="#FFE0B2" />
            
            {/* Eyes */}
            <circle cx="36" cy="46" r="3.5" fill="#263238" />
            <circle cx="64" cy="46" r="3.5" fill="#263238" />
            <circle cx="35" cy="44" r="1" fill="#FFFFFF" />
            <circle cx="63" cy="44" r="1" fill="#FFFFFF" />
            
            {/* Round Glasses */}
            <circle cx="36" cy="46" r="9" stroke="#E65100" strokeWidth="2.5" fill="none" />
            <circle cx="64" cy="46" r="9" stroke="#E65100" strokeWidth="2.5" fill="none" />
            <line x1="45" y1="46" x2="55" y2="46" stroke="#E65100" strokeWidth="2.5" />
            
            {/* Cheeks blush */}
            <ellipse cx="28" cy="52" rx="3" ry="1.5" fill="#FF8A80" opacity="0.6" />
            <ellipse cx="72" cy="52" rx="3" ry="1.5" fill="#FF8A80" opacity="0.6" />
            
            {/* Mouth */}
            <path d="M47 55 Q50 53 53 55" stroke="#263238" strokeWidth="2" strokeLinecap="round" />
            
            {/* Hair - Neat dark blue/black bangs */}
            <path d="M24 42 C24 20, 76 20, 76 42" stroke="#212121" strokeWidth="5" strokeLinecap="round" />
            <path d="M24 40 C30 25, 45 25, 48 37 C52 25, 70 25, 76 40 L70 25 L30 25 Z" fill="#212121" />
          </svg>
        );

      case "chibi_sakura":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full" fill="none">
            {/* Background circle badge */}
            <circle cx="50" cy="50" r="48" fill="#FFF3E0" />
            
            {/* Body - Yellow/Orange cute top */}
            <path d="M25 85 C25 70, 75 70, 75 85 L70 95 L30 95 Z" fill="#F9A825" />
            
            {/* Head / Face */}
            <circle cx="50" cy="46" r="23" fill="#FFF3E0" />
            
            {/* Eyes - Happy curved arcs */}
            <path d="M32 46 Q37 40 42 46" stroke="#D81B60" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M58 46 Q63 40 68 46" stroke="#D81B60" strokeWidth="3" strokeLinecap="round" fill="none" />
            
            {/* Cheeks blush - very vibrant */}
            <ellipse cx="32" cy="52" rx="5" ry="3" fill="#FF2A6D" opacity="0.5" />
            <ellipse cx="68" cy="52" rx="5" ry="3" fill="#FF2A6D" opacity="0.5" />
            
            {/* Mouth - smiling open */}
            <path d="M45 53 Q50 60 55 53 Z" fill="#D81B60" />
            
            {/* Hair - Bright Peach Pink short bob style with flower clip */}
            <path d="M23 44 C20 20, 80 20, 77 44" stroke="#EC407A" strokeWidth="6" strokeLinecap="round" />
            <path d="M23 42 C26 26, 74 26, 77 42 C82 48, 76 22, 65 18 C55 16, 45 16, 35 18 C24 22, 18 48, 23 42 Z" fill="#EC407A" />
            <path d="M26 40 L35 34 L38 41 L47 34 L52 40 L58 32 L65 42 L68 34 L74 40" fill="#EC407A" />
            
            {/* Cute Red Flower Hair Clip */}
            <path d="M72 30 Q75 25 78 30 Q83 30 78 33 Q78 38 75 33 Q70 33 72 30 Z" fill="#E91E63" />
            <circle cx="75" cy="31" r="1.5" fill="#FFF" />
          </svg>
        );

      case "chibi_kenji":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full" fill="none">
            {/* Background circle badge */}
            <circle cx="50" cy="50" r="48" fill="#EDE7F6" />
            
            {/* Body - Lavender/Purple polo shirt */}
            <path d="M25 85 C25 70, 75 70, 75 85 L70 95 L30 95 Z" fill="#5E35B1" />
            <path d="M43 72 L50 80 L57 72" stroke="#EDE7F6" strokeWidth="2.5" />
            
            {/* Head / Face */}
            <circle cx="50" cy="46" r="24" fill="#FFE0B2" />
            
            {/* Eyes / Glasses */}
            <ellipse cx="37" cy="45" rx="2" ry="2" fill="#311B92" />
            <ellipse cx="63" cy="45" rx="2" ry="2" fill="#311B92" />
            
            {/* Smart Square wire glasses */}
            <rect x="26" y="38" width="16" height="13" rx="2" stroke="#1A237E" strokeWidth="2" fill="none" />
            <rect x="58" y="38" width="16" height="13" rx="2" stroke="#1A237E" strokeWidth="2" fill="none" />
            <line x1="42" y1="44" x2="58" y2="44" stroke="#1A237E" strokeWidth="2" />
            
            {/* Mouth */}
            <path d="M46 54 Q50 57 54 54" stroke="#311B92" strokeWidth="2" strokeLinecap="round" />
            
            {/* Hair - Neat combed hair */}
            <path d="M24 40 C24 16, 76 16, 76 40" stroke="#3E2723" strokeWidth="4" />
            <path d="M24 38 Q32 23 48 23 L48 27 Q33 27 26 38 Z" fill="#3E2723" />
            <path d="M76 38 Q68 21 48 21 L48 25 Q65 25 74 38 Z" fill="#3E2723" />
          </svg>
        );

      case "neko_sensei":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full" fill="none">
            {/* Background circle badge */}
            <circle cx="50" cy="50" r="48" fill="#ECEFF1" />
            
            {/* Cat Ears */}
            <path d="M22 36 L12 12 L36 24 Z" fill="#78909C" />
            <path d="M78 36 L88 12 L64 24 Z" fill="#78909C" />
            <path d="M24 33 L18 18 L32 25 Z" fill="#FFCDD2" />
            <path d="M76 33 L82 18 L68 25 Z" fill="#FFCDD2" />
            
            {/* Body */}
            <path d="M23 85 C23 60, 77 60, 77 85 Z" fill="#90A4AE" />
            <circle cx="50" cy="78" r="14" fill="#FFFFFF" />
            
            {/* Little Red collar with golden bell */}
            <path d="M32 62 C40 68, 60 68, 68 62" stroke="#D32F2F" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="50" cy="65" r="5" fill="#FBC02D" />
            <circle cx="50" cy="65" r="1" fill="#3E2723" />
            
            {/* Main Head */}
            <circle cx="50" cy="42" r="26" fill="#90A4AE" />
            <circle cx="50" cy="42" r="24" fill="#CFD8DC" />
            
            {/* Cute eyes (sleeping curved lines or happy curves) */}
            <path d="M32 40 Q38 34 38 42" stroke="#263238" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M68 40 Q62 34 62 42" stroke="#263238" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            
            {/* Nose & Mouth */}
            <path d="M48 46 L52 46 L50 48 Z" fill="#263238" />
            <path d="M45 50 Q50 53 50 50 Q50 53 55 50" stroke="#263238" strokeWidth="2" strokeLinecap="round" fill="none" />
            
            {/* Whiskers */}
            <line x1="20" y1="44" x2="8" y2="42" stroke="#37474F" strokeWidth="1.5" />
            <line x1="20" y1="48" x2="7" y2="48" stroke="#37474F" strokeWidth="1.5" />
            <line x1="80" y1="44" x2="92" y2="42" stroke="#37474F" strokeWidth="1.5" />
            <line x1="80" y1="48" x2="93" y2="48" stroke="#37474F" strokeWidth="1.5" />
            
            {/* Blush cheeks */}
            <circle cx="28" cy="47" r="3" fill="#FF8A80" opacity="0.6" />
            <circle cx="72" cy="47" r="3" fill="#FF8A80" opacity="0.6" />
            
            {/* Tiny Scholar Hat */}
            <path d="M40 18 L50 14 L60 18 L50 22 Z" fill="#212121" />
            <rect x="46" y="19" width="8" height="4" fill="#212121" />
          </svg>
        );

      case "shiba_kun":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full" fill="none">
            {/* Background circle badge */}
            <circle cx="50" cy="50" r="48" fill="#FBE9E7" />
            
            {/* Shiba Ears */}
            <path d="M22 35 L14 10 L38 23 Z" fill="#E65100" />
            <path d="M78 35 L86 10 L62 23 Z" fill="#E65100" />
            <path d="M24 32 L19 20 L31 24 Z" fill="#FFCCBC" />
            <path d="M76 32 L81 20 L69 24 Z" fill="#FFCCBC" />
            
            {/* Body */}
            <path d="M23 85 C23 60, 77 60, 77 85 Z" fill="#EF6C00" />
            <circle cx="50" cy="78" r="14" fill="#FFFFFF" />
            
            {/* Green neck band */}
            <path d="M28 65 Q50 78 72 65" stroke="#2E7D32" strokeWidth="4" strokeLinecap="round" fill="none" />
            <circle cx="50" cy="72" r="3" fill="#81C784" />
            
            {/* Main Head */}
            <circle cx="50" cy="44" r="25" fill="#EF6C00" />
            {/* White cheeks/chest mask */}
            <ellipse cx="34" cy="51" rx="11" ry="8" fill="#FFFFFF" />
            <ellipse cx="66" cy="51" rx="11" ry="8" fill="#FFFFFF" />
            <circle cx="50" cy="52" r="11" fill="#FFFFFF" />
            
            {/* Happy Eyes */}
            <circle cx="36" cy="42" r="3.5" fill="#212121" />
            <circle cx="64" cy="42" r="3.5" fill="#212121" />
            {/* White eyebrow dots */}
            <circle cx="36" cy="33" r="2.5" fill="#FFFFFF" />
            <circle cx="64" cy="33" r="2.5" fill="#FFFFFF" />
            
            {/* Nose and smiling mouth */}
            <ellipse cx="50" cy="47" rx="2.5" ry="1.5" fill="#212121" />
            <path d="M46 51 Q50 53 50 51 Q50 53 54 51" stroke="#212121" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Tongue */}
            <path d="M47 52 Q50 57 53 52 Z" fill="#FF5252" />
            
            {/* Blush cheeks */}
            <ellipse cx="26" cy="49" rx="3" ry="1.5" fill="#FF1744" opacity="0.4" />
            <ellipse cx="74" cy="49" rx="3" ry="1.5" fill="#FF1744" opacity="0.4" />
          </svg>
        );

      case "usagi_chan":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full" fill="none">
            {/* Background circle badge */}
            <circle cx="50" cy="50" r="48" fill="#FFF0F5" />
            
            {/* Long Rabbit Ears */}
            <path d="M34 26 C30 2, 42 2, 38 26 Z" fill="#FFFFFF" stroke="#FF80AB" strokeWidth="1" />
            <path d="M66 26 C70 2, 58 2, 62 26 Z" fill="#FFFFFF" stroke="#FF80AB" strokeWidth="1" />
            <path d="M34 22 C32 6, 38 6, 36 22 Z" fill="#FFD1DC" />
            <path d="M66 22 C68 6, 62 6, 64 22 Z" fill="#FFD1DC" />
            
            {/* Body - pink collar sweater */}
            <path d="M25 85 C25 65, 75 65, 75 85 Z" fill="#FFF" stroke="#FFD1DC" strokeWidth="1.5" />
            <path d="M26 85 C26 68, 74 68, 74 85 Z" fill="#FFD1DC" />
            
            {/* Main Head */}
            <circle cx="50" cy="48" r="24" fill="#FFFFFF" />
            
            {/* Big Shiny Anime Eyes */}
            <ellipse cx="37" cy="46" rx="3" ry="4" fill="#D81B60" />
            <ellipse cx="63" cy="46" rx="3" ry="4" fill="#D81B60" />
            <circle cx="36" cy="44" r="1" fill="#FFFFFF" />
            <circle cx="62" cy="44" r="1" fill="#FFFFFF" />
            
            {/* Nose & Mouth */}
            <path d="M49 51 L51 51 L50 52 Z" fill="#C2185B" />
            <path d="M47 54 Q50 56 50 54 Q50 56 53 54" stroke="#C2185B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            
            {/* Super pink blushes */}
            <ellipse cx="28" cy="52" rx="4" ry="2" fill="#FF2A6D" opacity="0.5" />
            <ellipse cx="72" cy="52" rx="4" ry="2" fill="#FF2A6D" opacity="0.5" />
            
            {/* Little head flower ornament */}
            <circle cx="28" cy="34" r="3.5" fill="#FFE082" />
            <circle cx="31" cy="31" r="3.5" fill="#FFF" />
            <circle cx="25" cy="31" r="3.5" fill="#FFF" />
          </svg>
        );

      case "panda_san":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full" fill="none">
            {/* Background circle badge */}
            <circle cx="50" cy="50" r="48" fill="#E0F2F1" />
            
            {/* Panda Ears */}
            <circle cx="28" cy="28" r="10" fill="#212121" />
            <circle cx="72" cy="28" r="10" fill="#212121" />
            
            {/* Body */}
            <path d="M23 85 C23 60, 77 60, 77 85 Z" fill="#212121" />
            <circle cx="50" cy="78" r="14" fill="#FFFFFF" />
            
            {/* Main Head */}
            <circle cx="50" cy="48" r="24" fill="#FFFFFF" />
            
            {/* Big Black Eye Patches */}
            <ellipse cx="36" cy="47" rx="6" ry="7" transform="rotate(-15 36 47)" fill="#212121" />
            <ellipse cx="64" cy="47" rx="6" ry="7" transform="rotate(15 64 47)" fill="#212121" />
            
            {/* Shiny White Eyes */}
            <circle cx="36.5" cy="46" r="2" fill="#FFFFFF" />
            <circle cx="63.5" cy="46" r="2" fill="#FFFFFF" />
            
            {/* Nose & Mouth */}
            <ellipse cx="50" cy="51" rx="2.5" ry="1.5" fill="#212121" />
            <path d="M46 54 Q50 56 50 54 Q50 56 54 54" stroke="#212121" strokeWidth="2" strokeLinecap="round" fill="none" />
            
            {/* Cheek blush */}
            <ellipse cx="28" cy="53" rx="3.5" ry="1.5" fill="#FF8A80" opacity="0.6" />
            <ellipse cx="72" cy="53" rx="3.5" ry="1.5" fill="#FF8A80" opacity="0.6" />
            
            {/* Bamboo in mouth */}
            <line x1="53" y1="55" x2="63" y2="58" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M59 55 Q62 50 64 54" fill="#4CAF50" />
          </svg>
        );

      default:
        return (
          <div className="w-full h-full rounded-full bg-indigo-200 border-2 border-indigo-400 flex items-center justify-center font-bold text-indigo-700">
            ?
          </div>
        );
    }
  };

  return (
    <div
      className={`relative inline-block select-none overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      {renderSVGContent()}
    </div>
  );
}
