import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPiece, CoasterStation } from '../types';
import { Sparkles, MapPin, CheckCircle2, Lock, ArrowRight, Play } from 'lucide-react';

interface MapPuzzleViewProps {
  pieces: MapPiece[];
  stations: CoasterStation[];
  onSelectStation: (stationId: number) => void;
  onOpenTestRide: () => void;
}

export const MapPuzzleView: React.FC<MapPuzzleViewProps> = ({
  pieces,
  stations,
  onSelectStation,
  onOpenTestRide,
}) => {
  const unlockedCount = pieces.filter(p => p.unlocked).length;
  const isAllComplete = unlockedCount === 8;

  // Render SVG artwork for each unlocked piece of the map
  const renderPieceArt = (pieceId: number) => {
    switch (pieceId) {
      case 1: // Launch pad
        return (
          <svg viewBox="0 0 200 150" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="100%" stopColor="#fde68a" />
              </linearGradient>
            </defs>
            <rect width="200" height="150" fill="url(#g1)" />
            {/* Terminal building */}
            <path d="M 20 130 L 20 80 L 90 60 L 160 80 L 160 130 Z" fill="#f59e0b" opacity="0.8" />
            <rect x="50" y="85" width="25" height="45" fill="#78350f" rx="3" />
            <rect x="95" y="85" width="25" height="45" fill="#78350f" rx="3" />
            {/* Launch Rails */}
            <path d="M 0 110 Q 90 105 200 70" stroke="#ef4444" strokeWidth="6" fill="none" />
            <path d="M 0 110 Q 90 105 200 70" stroke="#fef08a" strokeWidth="2" strokeDasharray="6 4" fill="none" />
            {/* Magnetic Launch coils */}
            <rect x="40" y="98" width="12" height="18" fill="#0284c7" rx="2" />
            <rect x="80" y="92" width="12" height="18" fill="#0284c7" rx="2" />
            <rect x="120" y="84" width="12" height="18" fill="#0284c7" rx="2" />
            <rect x="160" y="74" width="12" height="18" fill="#0284c7" rx="2" />
            <text x="30" y="45" fill="#b45309" fontWeight="bold" fontSize="13">TRẠM XUẤT PHÁT</text>
            <text x="30" y="58" fill="#78350f" fontSize="9">Động cơ phóng từ tính LSM</text>
          </svg>
        );

      case 2: // Mega Loop
        return (
          <svg viewBox="0 0 200 150" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fee2e2" />
                <stop offset="100%" stopColor="#fecaca" />
              </linearGradient>
            </defs>
            <rect width="200" height="150" fill="url(#g2)" />
            {/* Mega Inversion Loop */}
            <ellipse cx="100" cy="75" rx="55" ry="60" stroke="#991b1b" strokeWidth="12" fill="none" opacity="0.2" />
            <ellipse cx="100" cy="75" rx="55" ry="60" stroke="#dc2626" strokeWidth="7" fill="none" />
            <ellipse cx="100" cy="75" rx="55" ry="60" stroke="#fde047" strokeWidth="2" strokeDasharray="8 4" fill="none" />
            {/* Steel lattice girders */}
            <line x1="60" y1="140" x2="100" y2="75" stroke="#7f1d1d" strokeWidth="2.5" />
            <line x1="140" y1="140" x2="100" y2="75" stroke="#7f1d1d" strokeWidth="2.5" />
            <line x1="100" y1="145" x2="100" y2="75" stroke="#7f1d1d" strokeWidth="3" />
            <text x="25" y="32" fill="#991b1b" fontWeight="bold" fontSize="13">ĐẠI VÒNG XOAY 360°</text>
            <text x="25" y="45" fill="#b91c1c" fontSize="9">Gia tốc trọng trường 4.2G</text>
          </svg>
        );

      case 3: // Sky-Drop Summit
        return (
          <svg viewBox="0 0 200 150" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="g3" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f3e8ff" />
                <stop offset="100%" stopColor="#e9d5ff" />
              </linearGradient>
            </defs>
            <rect width="200" height="150" fill="url(#g3)" />
            {/* Tower apex */}
            <polygon points="100,10 60,150 140,150" fill="#7e22ce" opacity="0.3" />
            <line x1="60" y1="150" x2="100" y2="10" stroke="#6b21a8" strokeWidth="3" />
            <line x1="140" y1="150" x2="100" y2="10" stroke="#6b21a8" strokeWidth="3" />
            <line x1="75" y1="100" x2="125" y2="100" stroke="#6b21a8" strokeWidth="2" />
            <line x1="88" y1="55" x2="112" y2="55" stroke="#6b21a8" strokeWidth="2" />
            {/* The Drop Track */}
            <path d="M 0 100 Q 80 15 100 15 Q 115 15 130 90 T 200 135" stroke="#9333ea" strokeWidth="6" fill="none" />
            <path d="M 0 100 Q 80 15 100 15 Q 115 15 130 90 T 200 135" stroke="#facc15" strokeWidth="2" strokeDasharray="5 4" fill="none" />
            {/* Clouds */}
            <circle cx="45" cy="40" r="16" fill="#ffffff" opacity="0.8" />
            <circle cx="65" cy="35" r="20" fill="#ffffff" opacity="0.9" />
            <circle cx="85" cy="42" r="14" fill="#ffffff" opacity="0.8" />
            <text x="20" y="24" fill="#581c87" fontWeight="bold" fontSize="13">ĐỈNH TRỜI MÂY 65M</text>
            <text x="20" y="37" fill="#7e22ce" fontSize="9">Độ dốc rơi tự do 88°</text>
          </svg>
        );

      case 4: // Mountain Corkscrew Tunnel
        return (
          <svg viewBox="0 0 200 150" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="g4" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#cffafe" />
                <stop offset="100%" stopColor="#a5f3fc" />
              </linearGradient>
            </defs>
            <rect width="200" height="150" fill="url(#g4)" />
            {/* Mountain mass */}
            <path d="M 10 150 Q 80 30 140 70 Q 180 100 200 150 Z" fill="#0891b2" opacity="0.75" />
            {/* Tunnel mouth */}
            <ellipse cx="105" cy="110" rx="35" ry="30" fill="#164e63" />
            {/* Glowing crystals */}
            <polygon points="50,110 55,95 60,110" fill="#67e8f9" />
            <polygon points="62,118 68,102 74,118" fill="#a5f3fc" />
            <polygon points="148,125 154,105 160,125" fill="#67e8f9" />
            {/* Corkscrew Spiral Track */}
            <path d="M 0 60 Q 40 80 85 105 T 160 110 T 200 70" stroke="#06b6d4" strokeWidth="6" fill="none" />
            <path d="M 0 60 Q 40 80 85 105 T 160 110 T 200 70" stroke="#fef08a" strokeWidth="2" strokeDasharray="6 4" fill="none" />
            <text x="20" y="28" fill="#155e75" fontWeight="bold" fontSize="13">ĐƯỜNG HẦM NÚI ĐÁ</text>
            <text x="20" y="41" fill="#0e7490" fontSize="9">Xoắn ốc kép thạch anh phát quang</text>
          </svg>
        );

      case 5: // Splashdown Valley
        return (
          <svg viewBox="0 0 200 150" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="g5" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e0f2fe" />
                <stop offset="100%" stopColor="#bae6fd" />
              </linearGradient>
            </defs>
            <rect width="200" height="150" fill="url(#g5)" />
            {/* Lake water */}
            <rect y="80" width="200" height="70" fill="#0284c7" opacity="0.65" />
            <ellipse cx="100" cy="100" rx="90" ry="25" fill="#38bdf8" opacity="0.5" />
            {/* Water jets & splash */}
            <path d="M 60 100 Q 75 40 100 85 Q 125 40 140 100" fill="none" stroke="#ffffff" strokeWidth="4" />
            <circle cx="70" cy="48" r="4" fill="#ffffff" />
            <circle cx="130" cy="48" r="4" fill="#ffffff" />
            {/* Rail skimming the water */}
            <path d="M 0 40 Q 60 95 100 95 Q 140 95 200 40" stroke="#0284c7" strokeWidth="6" fill="none" />
            <path d="M 0 40 Q 60 95 100 95 Q 140 95 200 40" stroke="#facc15" strokeWidth="2" strokeDasharray="6 4" fill="none" />
            <text x="20" y="28" fill="#0369a1" fontWeight="bold" fontSize="13">VỊNH NƯỚC CẦU VỒNG</text>
            <text x="20" y="41" fill="#0284c7" fontSize="9">Hiệu ứng lướt xé nước Splashdown</text>
          </svg>
        );

      case 6: // Spiral Trestle
        return (
          <svg viewBox="0 0 200 150" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="g6" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#d1fae5" />
                <stop offset="100%" stopColor="#a7f3d0" />
              </linearGradient>
            </defs>
            <rect width="200" height="150" fill="url(#g6)" />
            {/* Pine forest backdrop */}
            <polygon points="30,120 40,85 50,120" fill="#059669" />
            <polygon points="55,130 65,95 75,130" fill="#047857" />
            <polygon points="150,125 160,90 170,125" fill="#059669" />
            {/* Wood/steel trestle lattice */}
            <line x1="40" y1="140" x2="80" y2="60" stroke="#065f46" strokeWidth="3" />
            <line x1="80" y1="140" x2="40" y2="60" stroke="#065f46" strokeWidth="3" />
            <line x1="120" y1="140" x2="160" y2="60" stroke="#065f46" strokeWidth="3" />
            <line x1="160" y1="140" x2="120" y2="60" stroke="#065f46" strokeWidth="3" />
            {/* Curved rails */}
            <path d="M 0 110 C 60 30 140 130 200 50" stroke="#10b981" strokeWidth="6" fill="none" />
            <path d="M 0 110 C 60 30 140 130 200 50" stroke="#facc15" strokeWidth="2" strokeDasharray="6 4" fill="none" />
            <text x="20" y="28" fill="#065f46" fontWeight="bold" fontSize="13">DÀN THÉP KỲ QUAN</text>
            <text x="20" y="41" fill="#047857" fontSize="9">Cầu lốc xoáy xuyên rừng thông</text>
          </svg>
        );

      case 7: // Zero-G Roll
        return (
          <svg viewBox="0 0 200 150" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="g7" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fce7f3" />
                <stop offset="100%" stopColor="#fbcfe8" />
              </linearGradient>
            </defs>
            <rect width="200" height="150" fill="url(#g7)" />
            {/* Spiral 3D twist representation */}
            <path d="M 10 90 Q 60 10 100 80 T 190 60" stroke="#db2777" strokeWidth="8" fill="none" />
            <path d="M 10 90 Q 60 10 100 80 T 190 60" stroke="#fde047" strokeWidth="2.5" strokeDasharray="7 5" fill="none" />
            {/* Sparkles / Zero-G Stars */}
            <circle cx="50" cy="40" r="3" fill="#f43f5e" />
            <circle cx="150" cy="30" r="4" fill="#f43f5e" />
            <circle cx="95" cy="35" r="2.5" fill="#f43f5e" />
            <text x="20" y="28" fill="#831843" fontWeight="bold" fontSize="13">HẺM VÔ TRỌNG LỰC</text>
            <text x="20" y="41" fill="#9d174d" fontSize="9">Lộn nhào Zero-G không gian 3D</text>
          </svg>
        );

      case 8: // Victory Terminal
        return (
          <svg viewBox="0 0 200 150" className="w-full h-full object-cover">
            <defs>
              <linearGradient id="g8" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffedd5" />
                <stop offset="100%" stopColor="#fed7aa" />
              </linearGradient>
            </defs>
            <rect width="200" height="150" fill="url(#g8)" />
            {/* Festive grandstand */}
            <rect x="30" y="80" width="140" height="50" fill="#ea580c" opacity="0.8" rx="4" />
            {/* Pennant flags */}
            <polygon points="40,55 50,45 60,55" fill="#ef4444" />
            <polygon points="65,55 75,45 85,55" fill="#f59e0b" />
            <polygon points="90,55 100,45 110,55" fill="#10b981" />
            <polygon points="115,55 125,45 135,55" fill="#0284c7" />
            <polygon points="140,55 150,45 160,55" fill="#8b5cf6" />
            <line x1="35" y1="55" x2="165" y2="55" stroke="#78350f" strokeWidth="1.5" />
            {/* Fireworks bursts */}
            <circle cx="50" cy="25" r="3" fill="#ea580c" />
            <circle cx="150" cy="25" r="3" fill="#f59e0b" />
            {/* Finish Line Checkered track */}
            <path d="M 0 115 L 200 115" stroke="#18181b" strokeWidth="8" />
            <path d="M 0 115 L 200 115" stroke="#ffffff" strokeWidth="4" strokeDasharray="8 8" />
            <text x="25" y="24" fill="#9a3412" fontWeight="bold" fontSize="13">QUẢNG TRƯỜNG VỀ ĐÍCH</text>
            <text x="25" y="37" fill="#c2410c" fontSize="9">Khải hoàn toàn bộ 8 trạm dừng chân</text>
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white/90 backdrop-blur rounded-2xl p-5 border border-sky-100 shadow-md shadow-sky-100/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🗺️</span>
            <h2 className="text-xl md:text-2xl font-bold font-display text-slate-800">
              Bản Đồ Tuyến Tàu Lượn Siêu Tốc
            </h2>
            <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-amber-300">
              8 Mảnh Ghép
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Ghép đủ 8 mảnh bản đồ bằng cách vượt qua các câu hỏi toán học tại từng trạm dừng chân để mở khóa đường đua hoàn chỉnh.
          </p>
        </div>

        {/* Progress & Actions */}
        <div className="flex items-center gap-3">
          <div className="bg-sky-50 border border-sky-200 px-4 py-2 rounded-xl text-center">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Tiến độ thu thập</div>
            <div className="text-lg font-bold font-display text-sky-700">
              {unlockedCount} / 8 <span className="text-xs font-normal text-slate-500">mảnh</span>
            </div>
          </div>

          {isAllComplete && (
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenTestRide}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-display font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-orange-300 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              Chạy Thử Toàn Tuyến
            </motion.button>
          )}
        </div>
      </div>

      {/* 8-Piece Jigsaw Map Board */}
      <div className="relative bg-gradient-to-b from-sky-100/80 via-white to-amber-50/60 p-4 md:p-6 rounded-3xl border-4 border-sky-200 shadow-xl overflow-hidden">
        {/* Background blueprint grid watermark */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#0284c7 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        {/* Header Ribbon */}
        <div className="relative z-10 flex items-center justify-between mb-4 pb-3 border-b border-sky-200/60">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span className="font-display font-bold text-slate-700 text-sm md:text-base">
              KHU VỰC GHÉP BẢN ĐỒ — {unlockedCount === 8 ? 'ĐÃ HOÀN TẤT TRỌN VẸN!' : `CÒN THIẾU ${8 - unlockedCount} MẢNH`}
            </span>
          </div>
          <div className="text-xs font-medium text-slate-500">
            Kích thước: 4 cột × 2 hàng (8 trạm danh lam)
          </div>
        </div>

        {/* The 4x2 Grid of Map Pieces */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {pieces.map((piece) => {
            const station = stations.find((s) => s.id === piece.stationId);
            return (
              <motion.div
                key={piece.id}
                layout
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`group relative rounded-2xl overflow-hidden border-2 transition-all shadow-md aspect-[4/3] flex flex-col justify-between ${
                  piece.unlocked
                    ? 'border-amber-400 bg-white shadow-amber-100 ring-2 ring-amber-300/40'
                    : 'border-dashed border-slate-300 bg-slate-50/90'
                }`}
              >
                {/* Jigsaw connector visual notch */}
                <div className="absolute top-1/2 -left-1.5 w-3 h-3 rounded-full bg-sky-100 border border-slate-300 -translate-y-1/2 z-20" />
                <div className="absolute top-1/2 -right-1.5 w-3 h-3 rounded-full bg-sky-100 border border-slate-300 -translate-y-1/2 z-20" />

                {piece.unlocked ? (
                  // Unlocked Piece View
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full h-full relative flex flex-col"
                    >
                      {/* Illustrated vector map segment */}
                      <div className="w-full h-full">
                        {renderPieceArt(piece.id)}
                      </div>

                      {/* Info overlay badge */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent p-2 text-white flex items-center justify-between">
                        <div>
                          <div className="text-[11px] font-bold font-display leading-tight truncate">
                            {piece.name}
                          </div>
                          <div className="text-[9px] text-amber-200 truncate">
                            {station?.name}
                          </div>
                        </div>
                        <span className="flex-shrink-0 bg-emerald-500 text-white rounded-full p-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  // Locked Mystery Piece
                  <div className="w-full h-full p-3 flex flex-col items-center justify-center text-center relative">
                    <div className="w-10 h-10 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center text-slate-400 mb-2 group-hover:scale-110 transition-transform">
                      <Lock className="w-4 h-4 text-sky-600" />
                    </div>
                    <div className="font-display font-bold text-xs text-slate-700 mb-0.5">
                      Mảnh số {piece.id}
                    </div>
                    <div className="text-[10px] text-slate-500 line-clamp-1 mb-2">
                      {station?.name}
                    </div>

                    <button
                      onClick={() => piece.stationId && onSelectStation(piece.stationId)}
                      className="text-[10px] font-bold text-sky-700 bg-sky-100/90 hover:bg-sky-200 px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors"
                    >
                      <MapPin className="w-2.5 h-2.5" />
                      Đến trạm mở
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="relative z-10 mt-5 pt-3 border-t border-sky-200/50 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-2">
          <div className="flex items-center gap-2">
            <span className="text-base">💡</span>
            <span>Mẹo: Bạn có thể nhấn vào bất kỳ mảnh nào chưa mở để tàu di chuyển đến trạm đó giải đố!</span>
          </div>
          <div className="font-semibold text-sky-700">
            {unlockedCount === 8 ? '🎉 Toàn bộ bản đồ đã mở khóa!' : `Cần thêm ${8 - unlockedCount} trạm nữa`}
          </div>
        </div>
      </div>
    </div>
  );
};
