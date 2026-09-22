import React from 'react';
import { motion } from 'motion/react';

interface EngineerAvatarProps {
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  isWalking?: boolean;
  facing?: 'left' | 'right';
  currentStationName?: string;
  onClick?: () => void;
}

export const EngineerAvatar: React.FC<EngineerAvatarProps> = ({
  x,
  y,
  isWalking = false,
  facing = 'right',
  currentStationName,
  onClick,
}) => {
  return (
    <motion.div
      animate={{
        left: `${x}%`,
        top: `${y}%`,
      }}
      transition={{
        type: 'spring',
        stiffness: 85,
        damping: 18,
        mass: 0.7,
      }}
      onClick={onClick}
      className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer select-none group"
      style={{
        transform: `translate(-50%, -50%) scaleX(${facing === 'left' ? -1 : 1})`,
      }}
    >
      {/* Speech / Action Bubble (always right-side up) */}
      <div
        className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none transition-transform"
        style={{
          transform: `translateX(-50%) scaleX(${facing === 'left' ? -1 : 1})`,
        }}
      >
        <div className="bg-slate-900/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-lg border border-amber-300 flex items-center gap-1.5 whitespace-nowrap">
          <span>👷‍♂️</span>
          <span className="text-amber-300">Kỹ Sư Khảo Sát</span>
          {isWalking && <span className="animate-pulse text-[10px] text-amber-200">Đang đi...</span>}
        </div>
        {/* Little triangle arrow */}
        <div className="w-2 h-2 bg-slate-900 rotate-45 mx-auto -mt-1" />
      </div>

      {/* Engineer Character Vector SVG */}
      <div className="relative filter drop-shadow-xl">
        <svg
          width="48"
          height="62"
          viewBox="0 0 48 62"
          className={isWalking ? 'animate-bounce' : 'animate-engineer-bob'}
        >
          {/* Yellow Safety Hardhat */}
          <ellipse cx="24" cy="14" rx="14" ry="7" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
          <path d="M 12 14 Q 24 4 36 14 Z" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5" />
          {/* Hardhat light / badge */}
          <circle cx="24" cy="9" r="2.5" fill="#fef08a" stroke="#d97706" strokeWidth="1" />
          {/* Hardhat brim */}
          <path d="M 10 15 Q 24 18 38 15" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Head & Face */}
          <circle cx="24" cy="20" r="8" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
          {/* Eyes & Smile */}
          <circle cx="21" cy="19" r="1.2" fill="#1e293b" />
          <circle cx="27" cy="19" r="1.2" fill="#1e293b" />
          <path d="M 21 23 Q 24 25 27 23" stroke="#9a3412" strokeWidth="1" fill="none" strokeLinecap="round" />

          {/* Safety Vest (Bright High-Vis Orange + Lime stripes) */}
          <path d="M 16 28 L 32 28 L 34 44 L 14 44 Z" fill="#ea580c" stroke="#9a3412" strokeWidth="1.5" />
          {/* Reflective Stripes */}
          <rect x="18" y="30" width="3" height="14" fill="#a3e635" />
          <rect x="27" y="30" width="3" height="14" fill="#a3e635" />
          <line x1="15" y1="36" x2="33" y2="36" stroke="#fef08a" strokeWidth="2" />

          {/* Blueprint tube / Clipboard in hand */}
          <g transform="translate(30, 31) rotate(20)">
            <rect x="0" y="0" width="8" height="13" fill="#38bdf8" rx="1.5" stroke="#0369a1" strokeWidth="1" />
            <line x1="2" y1="3" x2="6" y2="3" stroke="#ffffff" strokeWidth="1" />
            <line x1="2" y1="6" x2="6" y2="6" stroke="#ffffff" strokeWidth="1" />
            <line x1="2" y1="9" x2="5" y2="9" stroke="#ffffff" strokeWidth="1" />
          </g>

          {/* Hands */}
          <circle cx="15" cy="35" r="2.5" fill="#fed7aa" />
          <circle cx="33" cy="35" r="2.5" fill="#fed7aa" />

          {/* Legs & Work Boots */}
          <line x1="19" y1="44" x2="18" y2="54" stroke="#1e3a8a" strokeWidth="4" strokeLinecap="round" />
          <line x1="29" y1="44" x2="30" y2="54" stroke="#1e3a8a" strokeWidth="4" strokeLinecap="round" />
          {/* Heavy Boots */}
          <rect x="13" y="52" width="7" height="5" fill="#78350f" rx="1.5" />
          <rect x="28" y="52" width="7" height="5" fill="#78350f" rx="1.5" />
        </svg>

        {/* Pulsing indicator under feet */}
        <div className="w-8 h-2.5 rounded-full bg-slate-900/30 blur-[2px] mx-auto -mt-1" />
      </div>
    </motion.div>
  );
};
