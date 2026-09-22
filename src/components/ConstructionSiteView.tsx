import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ConstructionPiece, PasscodeSlot } from '../types';
import { EngineerAvatar } from './EngineerAvatar';
import { soundManager } from '../utils/audio';
import {
  Sparkles,
  CheckCircle2,
  Footprints,
  RotateCcw,
  KeyRound,
  Check,
} from 'lucide-react';

interface ConstructionSiteViewProps {
  pieces: ConstructionPiece[];
  passcodes: PasscodeSlot[];
  correctCount: number;
  totalPieces: number;
  activePieceId: number | null;
  onEnterPiece: (piece: ConstructionPiece) => void;
  onRestart: () => void;
}

export const ConstructionSiteView: React.FC<ConstructionSiteViewProps> = ({
  pieces,
  passcodes,
  correctCount,
  totalPieces,
  activePieceId,
  onEnterPiece,
  onRestart,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  // Engineer state
  const activePiece = pieces.find((p) => p.id === activePieceId) || pieces[0];
  const [engineerPos, setEngineerPos] = useState<{ x: number; y: number }>({
    x: 10,
    y: 75,
  });
  const [facing, setFacing] = useState<'left' | 'right'>('right');
  const [isWalking, setIsWalking] = useState<boolean>(false);
  const [walkNotice, setWalkNotice] = useState<string | null>(null);

  const unlockedCount = passcodes.filter((p) => p.unlocked).length;

  // Free movement on click
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    const boundedX = Math.max(6, Math.min(94, clickX));
    const boundedY = Math.max(12, Math.min(88, clickY));

    setFacing(boundedX >= engineerPos.x ? 'right' : 'left');
    setIsWalking(true);
    setEngineerPos({ x: boundedX, y: boundedY });
    soundManager.playWhoosh();

    // Check if clicked near a puzzle piece
    const nearby = pieces.find((p) => {
      const dx = p.x - boundedX;
      const dy = p.y - boundedY;
      return Math.sqrt(dx * dx + dy * dy) < 8;
    });

    if (nearby) {
      setTimeout(() => {
        setIsWalking(false);
        onEnterPiece(nearby);
      }, 400);
    } else {
      setWalkNotice('Kỹ sư đang đi kiểm tra hiện trường công viên giải trí...');
      setTimeout(() => setIsWalking(false), 500);
      setTimeout(() => setWalkNotice(null), 2500);
    }
  };

  // Directly click a puzzle piece to walk engineer there and trigger the question
  const handlePieceClick = (piece: ConstructionPiece, e: React.MouseEvent) => {
    e.stopPropagation();
    setFacing(piece.x >= engineerPos.x ? 'right' : 'left');
    setIsWalking(true);
    setEngineerPos({ x: piece.x, y: piece.y });
    soundManager.playWhoosh();

    setTimeout(() => {
      setIsWalking(false);
      soundManager.playStationArrival();
      onEnterPiece(piece);
    }, 450);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      {/* Playful Amusement Park Construction Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-pink-50 rounded-3xl p-4 sm:p-5 border-2 border-amber-200/90 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-200 to-orange-200 text-amber-950 px-3 py-1 rounded-full text-xs font-black shadow-xs">
              <span>🎡</span>
              <span>CÔNG TRƯỜNG TÀU LƯỢN VUI NHỘN</span>
              <span className="text-orange-600">•</span>
              <span>MẬT MÃ 1: 4 | MẬT MÃ 2: 8 | MẬT MÃ 3: 3</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black font-display text-slate-800 tracking-tight">
              Kỹ Sư Khảo Sát Hiện Trường Thi Công
            </h2>
            <p className="text-xs text-slate-600 max-w-2xl">
              Nhấp vào các mảnh ghép (🧩) để giải câu hỏi Toán 12: Đúng <b>2 câu đầu</b> nhận <b>mật mã 1: 4</b> • Đúng <b>2 câu sau</b> (đạt 4 câu) nhận <b>mật mã 2: 8</b> • Đúng <b>2 câu cuối</b> (đạt 6 câu) nhận <b>mật mã 3: 3</b>!
            </p>
          </div>

          {/* Quick status pills: Correct count & Passcodes */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Total correct questions */}
            <div className="bg-white px-3.5 py-2 rounded-2xl border-2 border-amber-300 shadow-sm text-center">
              <div className="text-[10px] font-bold text-slate-500 uppercase">
                Số câu đúng
              </div>
              <div className="text-lg font-black font-display text-orange-600">
                {correctCount} <span className="text-xs font-normal text-slate-400">/ 6 câu</span>
              </div>
            </div>

            {/* Total unlocked passcodes */}
            <div className="bg-white px-3.5 py-2 rounded-2xl border-2 border-emerald-300 shadow-sm text-center">
              <div className="text-[10px] font-bold text-slate-500 uppercase flex items-center justify-center gap-0.5">
                <KeyRound className="w-3 h-3 text-emerald-600" />
                <span>Mật mã</span>
              </div>
              <div className="text-lg font-black font-display text-emerald-600">
                {unlockedCount} <span className="text-xs font-normal text-slate-400">/ 3 mã</span>
              </div>
            </div>

            <button
              onClick={onRestart}
              className="p-2.5 rounded-2xl bg-white border-2 border-slate-200 hover:border-amber-300 hover:bg-amber-50 text-slate-600 hover:text-amber-800 transition-all shadow-sm"
              title="Khảo sát lại từ đầu"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3-Step Passcode Progression Display (2 câu đầu, 2 câu sau, 2 câu cuối) */}
        <div className="mt-3 pt-3 border-t border-amber-200/60 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {passcodes.map((slot) => {
            const req = slot.index * 2; // 2, 4, 6
            const isUnlocked = slot.unlocked;
            const isNext = !isUnlocked && (slot.index === 1 || passcodes[slot.index - 2]?.unlocked);

            return (
              <div
                key={slot.index}
                className={`p-2.5 rounded-2xl border-2 transition-all flex items-center justify-between gap-2 ${
                  isUnlocked
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-300 shadow-md'
                    : isNext
                    ? 'bg-white border-amber-400 shadow-sm ring-2 ring-amber-200'
                    : 'bg-white/60 border-slate-200 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${
                      isUnlocked
                        ? 'bg-white/20 text-white'
                        : isNext
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isUnlocked ? <Check className="w-4 h-4 text-white" /> : slot.index}
                  </div>
                  <div>
                    <div className="text-[11px] font-black leading-tight">
                      {slot.label}: {isUnlocked ? slot.codeValue : '?'}
                    </div>
                    <div
                      className={`text-[10px] ${
                        isUnlocked
                          ? 'text-emerald-100 font-bold'
                          : isNext
                          ? 'text-amber-800 font-bold'
                          : 'text-slate-400'
                      }`}
                    >
                      {isUnlocked
                        ? `Đã mở [${slot.codeValue}]`
                        : `Cần ${req} câu đúng (${correctCount}/${req})`}
                    </div>
                  </div>
                </div>

                {isUnlocked && <Sparkles className="w-4 h-4 text-amber-200 animate-spin" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* AMUSEMENT PARK ROLLERCOASTER CONSTRUCTION CANVAS */}
      <div
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-gradient-to-b from-sky-300 via-sky-200/90 to-amber-100 rounded-3xl border-4 border-amber-300/90 shadow-2xl overflow-hidden cursor-crosshair select-none"
        title="Nhấp chuột vào bất cứ đâu để kỹ sư bước đi, hoặc nhấp vào Mảnh Ghép để giải câu hỏi!"
      >
        {/* Sunny Amusement Park Sky & Cheerful Hot Air Balloon */}
        <div className="absolute top-4 right-10 w-20 h-20 rounded-full bg-amber-300/80 blur-md pointer-events-none" />
        <div className="absolute top-5 right-12 w-14 h-14 rounded-full bg-amber-400 border-2 border-white shadow-lg pointer-events-none flex items-center justify-center text-xl animate-pulse">
          ☀️
        </div>

        {/* Hot air balloon floating cheerfully */}
        <div className="absolute top-8 left-16 pointer-events-none animate-bounce" style={{ animationDuration: '4s' }}>
          <svg width="44" height="60" viewBox="0 0 44 60">
            <ellipse cx="22" cy="22" rx="20" ry="22" fill="#f43f5e" />
            <path d="M 6 20 Q 22 4 38 20 Q 22 36 6 20 Z" fill="#fbbf24" />
            <polygon points="14,40 30,40 26,48 18,48" fill="#e11d48" />
            <line x1="16" y1="48" x2="16" y2="52" stroke="#475569" strokeWidth="1" />
            <line x1="28" y1="48" x2="28" y2="52" stroke="#475569" strokeWidth="1" />
            <rect x="15" y="52" width="14" height="8" fill="#b45309" rx="2" />
          </svg>
        </div>

        {/* Fluffy clouds */}
        <div className="absolute top-6 left-32 opacity-90 pointer-events-none text-white">
          <svg width="110" height="35" viewBox="0 0 110 35">
            <path d="M 10 25 Q 25 5 50 15 Q 75 5 95 18 Q 105 28 95 32 Z" fill="#ffffff" />
          </svg>
        </div>
        <div className="absolute top-12 right-40 opacity-80 pointer-events-none text-white">
          <svg width="80" height="28" viewBox="0 0 80 28">
            <path d="M 8 20 Q 22 4 45 12 Q 65 4 75 22 Z" fill="#ffffff" />
          </svg>
        </div>

        {/* Cheerful Bunting Flags across the park */}
        <div className="absolute top-0 left-0 right-0 h-8 pointer-events-none flex justify-around">
          {Array.from({ length: 16 }).map((_, i) => {
            const colors = ['#f43f5e', '#fbbf24', '#06b6d4', '#10b981', '#8b5cf6', '#f97316'];
            const color = colors[i % colors.length];
            return (
              <div
                key={i}
                className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[16px] drop-shadow-sm"
                style={{ borderTopColor: color }}
              />
            );
          })}
        </div>

        {/* Amusement Park & Rollercoaster Construction Background SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 380 Q 250 330 520 370 T 1000 360 L 1000 600 L 0 600 Z"
            fill="#86efac"
            opacity="0.8"
          />
          <path
            d="M 0 430 Q 300 390 600 420 T 1000 410 L 1000 600 L 0 600 Z"
            fill="#fef08a"
            opacity="0.9"
          />
          <ellipse cx="500" cy="510" rx="460" ry="75" fill="#fde68a" opacity="0.7" />

          {/* FERRIS WHEEL IN DISTANCE */}
          <g transform="translate(100, 180)">
            <circle cx="0" cy="0" r="65" fill="none" stroke="#f472b6" strokeWidth="3" opacity="0.7" />
            <circle cx="0" cy="0" r="45" fill="none" stroke="#f472b6" strokeWidth="2" opacity="0.6" />
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              const x2 = Math.cos(angle) * 65;
              const y2 = Math.sin(angle) * 65;
              return (
                <g key={i}>
                  <line x1="0" y1="0" x2={x2} y2={y2} stroke="#f472b6" strokeWidth="2" opacity="0.6" />
                  <circle cx={x2} cy={y2} r="5" fill="#ec4899" />
                </g>
              );
            })}
            <line x1="0" y1="0" x2="-35" y2="120" stroke="#db2777" strokeWidth="4" opacity="0.7" />
            <line x1="0" y1="0" x2="35" y2="120" stroke="#db2777" strokeWidth="4" opacity="0.7" />
          </g>

          {/* Crane in bright amusement park yellow */}
          <g transform="translate(500, 50)">
            <rect x="-10" y="40" width="20" height="340" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
            {Array.from({ length: 11 }).map((_, i) => (
              <g key={i}>
                <line x1="-10" y1={55 + i * 30} x2="10" y2={85 + i * 30} stroke="#d97706" strokeWidth="2" />
                <line x1="-10" y1={85 + i * 30} x2="10" y2={55 + i * 30} stroke="#d97706" strokeWidth="2" />
              </g>
            ))}
            <rect x="-16" y="20" width="32" height="25" fill="#1e293b" rx="4" />
            <rect x="-12" y="24" width="14" height="12" fill="#38bdf8" />
            <polygon points="-110,20 220,20 220,26 -110,26" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5" />
            <rect x="-100" y="15" width="25" height="20" fill="#64748b" rx="2" />
            <polygon points="-8,20 0,-15 8,20" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
            <line x1="0" y1="-15" x2="-100" y2="20" stroke="#475569" strokeWidth="1.5" />
            <line x1="0" y1="-15" x2="140" y2="20" stroke="#475569" strokeWidth="1.5" />
            <rect x="110" y="20" width="16" height="10" fill="#ea580c" rx="2" />
            <line x1="118" y1="30" x2="118" y2="95" stroke="#0f172a" strokeWidth="1.5" />
            <g transform="translate(118, 95)">
              <rect x="-22" y="0" width="44" height="16" fill="#ef4444" rx="4" stroke="#991b1b" strokeWidth="1.5" />
              <rect x="-16" y="4" width="12" height="8" fill="#fef08a" rx="2" />
              <rect x="4" y="4" width="12" height="8" fill="#fef08a" rx="2" />
              <circle cx="-12" cy="18" r="4" fill="#334155" />
              <circle cx="12" cy="18" r="4" fill="#334155" />
            </g>
          </g>

          {/* Left loop scaffolding */}
          <g transform="translate(230, 240)" stroke="#3b82f6" strokeWidth="2.5">
            <line x1="0" y1="0" x2="0" y2="210" />
            <line x1="80" y1="0" x2="80" y2="210" />
            <line x1="0" y1="50" x2="80" y2="50" stroke="#60a5fa" />
            <line x1="0" y1="110" x2="80" y2="110" stroke="#60a5fa" />
            <line x1="0" y1="170" x2="80" y2="170" stroke="#60a5fa" />
            <line x1="0" y1="0" x2="80" y2="50" strokeWidth="1.5" stroke="#93c5fd" />
            <line x1="80" y1="0" x2="0" y2="50" strokeWidth="1.5" stroke="#93c5fd" />
            <line x1="0" y1="50" x2="80" y2="110" strokeWidth="1.5" stroke="#93c5fd" />
            <line x1="80" y1="50" x2="0" y2="110" strokeWidth="1.5" stroke="#93c5fd" />
            <rect x="-6" y="45" width="92" height="8" fill="#fbbf24" rx="2" />
          </g>

          {/* Right scaffolding tower */}
          <g transform="translate(800, 230)" stroke="#8b5cf6" strokeWidth="2.5">
            <line x1="0" y1="0" x2="0" y2="230" />
            <line x1="80" y1="0" x2="80" y2="230" />
            <line x1="0" y1="60" x2="80" y2="60" stroke="#a78bfa" />
            <line x1="0" y1="120" x2="80" y2="120" stroke="#a78bfa" />
            <line x1="0" y1="180" x2="80" y2="180" stroke="#a78bfa" />
            <line x1="0" y1="0" x2="80" y2="60" strokeWidth="1.5" stroke="#c4b5fd" />
            <line x1="80" y1="0" x2="0" y2="60" strokeWidth="1.5" stroke="#c4b5fd" />
            <line x1="0" y1="60" x2="80" y2="120" strokeWidth="1.5" stroke="#c4b5fd" />
            <line x1="80" y1="60" x2="0" y2="120" strokeWidth="1.5" stroke="#c4b5fd" />
            <rect x="-6" y="55" width="92" height="8" fill="#38bdf8" rx="2" />
          </g>

          {/* Safety Cones */}
          {[
            { cx: 90, cy: 500 },
            { cx: 210, cy: 410 },
            { cx: 370, cy: 300 },
            { cx: 580, cy: 460 },
            { cx: 720, cy: 400 },
            { cx: 920, cy: 510 },
          ].map((cone, i) => (
            <g key={i} transform={`translate(${cone.cx}, ${cone.cy})`}>
              <ellipse cx="0" cy="12" rx="14" ry="5" fill="#1e293b" opacity="0.2" />
              <polygon points="0,-16 -10,12 10,12" fill="#f97316" />
              <polygon points="0,-16 -6,0 6,0" fill="#ffffff" />
              <polygon points="0,-8 -4,2 4,2" fill="#f97316" />
              <rect x="-12" y="10" width="24" height="4" fill="#ea580c" rx="1" />
            </g>
          ))}
        </svg>

        {/* 8 JIGSAW PUZZLE PIECES PLACED ON THE CONSTRUCTION FIELD */}
        {pieces.map((piece) => {
          const isUnlocked = piece.status === 'unlocked';
          const isFailed = piece.status === 'failed';
          const isActive = piece.id === activePieceId;

          return (
            <motion.div
              key={piece.id}
              onClick={(e) => handlePieceClick(piece, e)}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
              style={{
                left: `${piece.x}%`,
                top: `${piece.y}%`,
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              {!isUnlocked && !isFailed && (
                <div className="absolute -inset-2.5 rounded-full bg-amber-400/50 animate-ping pointer-events-none" />
              )}

              <div
                className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center p-1.5 transition-all shadow-xl border-3 ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-emerald-400 to-teal-600 text-white border-white shadow-emerald-400/50 scale-105'
                    : isFailed
                    ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white border-white shadow-orange-400/40'
                    : isActive
                    ? 'bg-gradient-to-br from-amber-400 via-orange-400 to-pink-500 text-white border-white shadow-orange-400/60 ring-4 ring-amber-300 animate-pulse'
                    : 'bg-white text-slate-800 border-amber-300 hover:border-amber-400 shadow-amber-900/10'
                }`}
              >
                <div className="flex items-center gap-0.5">
                  <span className="text-xs">🧩</span>
                  <span className="font-display font-black text-xs sm:text-sm">
                    M{piece.id}
                  </span>
                </div>

                <div className="mt-0.5">
                  {isUnlocked ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : isFailed ? (
                    <span className="text-[9px] font-extrabold px-1 py-0.2 rounded bg-white/30 text-white">
                      Thử lại
                    </span>
                  ) : (
                    <span className="text-[9px] font-extrabold uppercase px-1 py-0.2 rounded bg-amber-100 text-amber-900">
                      Khảo sát
                    </span>
                  )}
                </div>

                <div
                  className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold px-2 py-0.5 rounded-full shadow pointer-events-none border ${
                    isUnlocked
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : isFailed
                      ? 'bg-orange-100 text-orange-900 border-orange-300'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  {piece.name}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* ENGINEER CHARACTER WALKING FREELY ACROSS THE SITE */}
        <EngineerAvatar
          x={engineerPos.x}
          y={engineerPos.y}
          isWalking={isWalking}
          facing={facing}
          currentStationName={activePiece.name}
          onClick={() => {
            soundManager.playStationArrival();
            onEnterPiece(activePiece);
          }}
        />

        {/* Temporary walk toast notice */}
        <AnimatePresence>
          {walkNotice && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900/90 text-amber-200 border border-amber-300/50 px-4 py-1.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 pointer-events-none z-30"
            >
              <Footprints className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span>{walkNotice}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Instruction Bar */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur px-3.5 py-1.5 rounded-2xl border-2 border-amber-200 shadow-md text-slate-800 flex items-center gap-2 text-xs font-bold pointer-events-none">
          <span className="text-base">🎢</span>
          <span>Công trường công viên giải trí • 2 câu đầu: mã 1 (4) • 2 câu sau: mã 2 (8) • 2 câu cuối: mã 3 (3)</span>
        </div>
      </div>
    </div>
  );
};
