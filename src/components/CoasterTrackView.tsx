import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CoasterStation, MapPiece } from '../types';
import { soundManager } from '../utils/audio';
import { EngineerAvatar } from './EngineerAvatar';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  CheckCircle,
  Lock,
  ArrowRight,
  Compass,
  Gauge,
  Mountain,
  Search,
  Footprints,
  Sliders,
  HelpCircle,
} from 'lucide-react';

interface CoasterTrackViewProps {
  stations: CoasterStation[];
  pieces: MapPiece[];
  currentStationId: number;
  onSelectStation: (id: number) => void;
  onEnterChallenge: (station: CoasterStation) => void;
}

export const CoasterTrackView: React.FC<CoasterTrackViewProps> = ({
  stations,
  pieces,
  currentStationId,
  onSelectStation,
  onEnterChallenge,
}) => {
  const currentStation = stations.find((s) => s.id === currentStationId) || stations[0];
  const currentPiece = pieces.find((p) => p.stationId === currentStation.id);

  // Engineer state: position follows active station, but user can freely walk by clicking anywhere on the track or canvas!
  const [engineerPos, setEngineerPos] = useState<{ x: number; y: number }>({
    x: currentStation.x,
    y: currentStation.y,
  });
  const [facing, setFacing] = useState<'left' | 'right'>('right');
  const [isWalking, setIsWalking] = useState<boolean>(false);
  const [showClueDialog, setShowClueDialog] = useState<boolean>(false);
  const [inspectMessage, setInspectMessage] = useState<string | null>(null);

  // Canvas container reference for click-to-move
  const canvasRef = useRef<HTMLDivElement>(null);

  // When active station changes, walk engineer there smoothly
  useEffect(() => {
    setIsWalking(true);
    setFacing(currentStation.x >= engineerPos.x ? 'right' : 'left');
    setEngineerPos({ x: currentStation.x, y: currentStation.y });

    const timeout = setTimeout(() => {
      setIsWalking(false);
    }, 700);

    return () => clearTimeout(timeout);
  }, [currentStationId]);

  // Free movement: click anywhere on the theme park canvas to walk there!
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    // Constrain within 5% - 95%
    const boundedX = Math.max(5, Math.min(95, clickX));
    const boundedY = Math.max(10, Math.min(92, clickY));

    setFacing(boundedX >= engineerPos.x ? 'right' : 'left');
    setIsWalking(true);
    setEngineerPos({ x: boundedX, y: boundedY });
    soundManager.playWhoosh();

    // Check if clicked near any station
    const nearbyStation = stations.find((st) => {
      const dx = st.x - boundedX;
      const dy = st.y - boundedY;
      return Math.sqrt(dx * dx + dy * dy) < 10;
    });

    if (nearbyStation && nearbyStation.id !== currentStationId) {
      onSelectStation(nearbyStation.id);
      setInspectMessage(`Đã tới ${nearbyStation.name}! Kỹ sư phát hiện manh mối khảo sát.`);
    } else {
      setInspectMessage('Kỹ sư đang đi kiểm tra hiện trường đường ray...');
    }

    setTimeout(() => {
      setIsWalking(false);
    }, 600);

    setTimeout(() => {
      setInspectMessage(null);
    }, 3500);
  };

  // Rollercoaster SVG track coordinates
  // A looping circuit passing through all 8 stations in a cheerful layout
  const trackPath = `
    M 100,520
    C 180,480 200,280 240,240
    C 280,180 360,110 420,120
    C 500,130 580,210 620,200
    C 680,180 780,290 820,340
    C 860,400 760,560 700,580
    C 620,600 520,490 440,490
    C 360,490 280,610 240,610
    C 180,610 50,560 100,520
    Z
  `;

  // Previous and Next station navigation
  const handlePrev = () => {
    soundManager.playWhoosh();
    const nextId = currentStationId === 1 ? 8 : currentStationId - 1;
    onSelectStation(nextId);
  };

  const handleNext = () => {
    soundManager.playWhoosh();
    const nextId = currentStationId === 8 ? 1 : currentStationId + 1;
    onSelectStation(nextId);
  };

  // Keyboard navigation: Arrows, A/D, or Space to inspect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        handlePrev();
      } else if (e.key === ' ' || e.key === 'Enter') {
        // Toggle clue inspector
        setShowClueDialog((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStationId]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Station Navigation Ribbon */}
      <div className="bg-white/95 backdrop-blur rounded-2xl p-4 border border-sky-100 shadow-md shadow-sky-100/50 flex flex-wrap items-center justify-between gap-4">
        {/* Current Station Badge */}
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-white"
            style={{ backgroundColor: `${currentStation.themeColor}25` }}
          >
            {currentStation.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Trạm Khảo Sát {currentStation.id} / 8
              </span>
              {currentPiece?.unlocked ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <CheckCircle className="w-3 h-3" /> Đã thu thập manh mối
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                  <Lock className="w-3 h-3" /> Cần kỹ sư giải mã
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold font-display text-slate-800">
              {currentStation.name}
            </h2>
          </div>
        </div>

        {/* Engineer Movement Controller & Quick Station Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-800 transition-colors flex items-center gap-1 text-xs font-bold"
            title="Đi tới trạm trước (Phím ← hoặc A)"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Trạm trước</span>
          </button>

          {/* Quick Station Pills */}
          <div className="flex items-center gap-1 bg-sky-50/80 p-1 rounded-xl border border-sky-200/60 overflow-x-auto max-w-[280px] sm:max-w-none">
            {stations.map((s) => {
              const p = pieces.find((item) => item.stationId === s.id);
              const isActive = s.id === currentStationId;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    soundManager.playWhoosh();
                    onSelectStation(s.id);
                  }}
                  className={`w-7 h-7 rounded-lg text-xs font-bold font-display flex items-center justify-center transition-all ${
                    isActive
                      ? 'bg-amber-400 text-amber-950 shadow-md scale-110 ring-2 ring-white'
                      : p?.unlocked
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-white text-slate-600 hover:bg-sky-100'
                  }`}
                  title={`${s.name} (Trạm ${s.id})`}
                >
                  {s.id}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleNext}
            className="p-2.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-800 transition-colors flex items-center gap-1 text-xs font-bold"
            title="Đi tới trạm sau (Phím → hoặc D)"
          >
            <span className="hidden sm:inline">Trạm sau</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Theme Park Interactive Canvas */}
      <div
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-gradient-to-b from-sky-300 via-sky-100 to-amber-50/80 rounded-3xl border-4 border-white shadow-2xl overflow-hidden cursor-crosshair select-none"
        title="Nhấp chuột vào bất cứ đâu để điều khiển kỹ sư đi khảo sát đường ray!"
      >
        {/* Sun & Warm Rays */}
        <div className="absolute top-4 right-10 w-24 h-24 rounded-full bg-amber-300/80 blur-lg pointer-events-none" />
        <div className="absolute top-8 right-14 w-16 h-16 rounded-full bg-amber-400 border-4 border-amber-200 shadow-lg pointer-events-none flex items-center justify-center text-2xl">
          ☀️
        </div>

        {/* Floating Clouds */}
        <div className="absolute top-6 left-12 animate-coaster-float opacity-80 pointer-events-none">
          <svg width="120" height="50" viewBox="0 0 120 50">
            <path d="M 20 40 Q 10 40 10 30 Q 10 20 25 20 Q 30 5 50 10 Q 70 0 85 15 Q 105 10 105 30 Q 115 35 110 40 Z" fill="#ffffff" />
          </svg>
        </div>
        <div className="absolute top-20 right-48 animate-coaster-float opacity-70 pointer-events-none" style={{ animationDelay: '1.5s' }}>
          <svg width="90" height="40" viewBox="0 0 90 40">
            <path d="M 15 30 Q 5 30 5 20 Q 10 10 30 12 Q 45 2 60 10 Q 75 8 80 20 Q 90 25 80 30 Z" fill="#ffffff" />
          </svg>
        </div>

        {/* Scenic Background Silhouettes (Ferris Wheel, Mountain Peaks, Lakes) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 650" preserveAspectRatio="none">
          {/* Distant Hills */}
          <path d="M 0 500 Q 200 420 400 480 Q 600 430 800 500 Q 950 460 1000 510 L 1000 650 L 0 650 Z" fill="#bbf7d0" opacity="0.4" />
          <path d="M 0 550 Q 250 490 500 540 Q 750 490 1000 560 L 1000 650 L 0 650 Z" fill="#86efac" opacity="0.5" />

          {/* Distant Ferris Wheel on top left */}
          <g transform="translate(130, 200)" opacity="0.45">
            <circle cx="50" cy="50" r="45" stroke="#3b82f6" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="28" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
            <line x1="50" y1="5" x2="50" y2="95" stroke="#3b82f6" strokeWidth="1.5" />
            <line x1="5" y1="50" x2="95" y2="50" stroke="#3b82f6" strokeWidth="1.5" />
            <line x1="18" y1="18" x2="82" y2="82" stroke="#3b82f6" strokeWidth="1.5" />
            <line x1="18" y1="82" x2="82" y2="18" stroke="#3b82f6" strokeWidth="1.5" />
            <line x1="50" y1="50" x2="25" y2="120" stroke="#1d4ed8" strokeWidth="3" />
            <line x1="50" y1="50" x2="75" y2="120" stroke="#1d4ed8" strokeWidth="3" />
          </g>

          {/* Splash Lake Water Body near bottom right */}
          <ellipse cx="800" cy="420" rx="140" ry="50" fill="#38bdf8" opacity="0.35" />
          <ellipse cx="800" cy="420" rx="110" ry="35" fill="#0284c7" opacity="0.25" />

          {/* Rollercoaster Track Wooden / Steel Supports */}
          <g stroke="#94a3b8" strokeWidth="2.5" opacity="0.5">
            <line x1="100" y1="520" x2="100" y2="650" />
            <line x1="240" y1="240" x2="240" y2="650" />
            <line x1="330" y1="160" x2="330" y2="650" />
            <line x1="420" y1="120" x2="420" y2="650" stroke="#64748b" strokeWidth="3.5" />
            <line x1="520" y1="160" x2="520" y2="650" />
            <line x1="620" y1="200" x2="620" y2="650" />
            <line x1="720" y1="260" x2="720" y2="650" />
            <line x1="820" y1="340" x2="820" y2="650" />
            <line x1="700" y1="580" x2="700" y2="650" />
            <line x1="440" y1="490" x2="440" y2="650" />
            <line x1="240" y1="610" x2="240" y2="650" />
          </g>

          {/* Primary Rollercoaster Rails */}
          <path d={trackPath} stroke="#0f172a" strokeWidth="16" fill="none" opacity="0.1" />
          <path d={trackPath} stroke="#ea580c" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d={trackPath} stroke="#fef08a" strokeWidth="8" strokeDasharray="4 8" fill="none" />
          <path d={trackPath} stroke="#dc2626" strokeWidth="5" fill="none" />
          <path d={trackPath} stroke="#ffffff" strokeWidth="1.5" strokeDasharray="8 12" fill="none" opacity="0.8" className="animate-track-shimmer" />
        </svg>

        {/* 8 STATION MARKER NODES ON TRACK */}
        {stations.map((st) => {
          const isCurrent = st.id === currentStationId;
          const piece = pieces.find((p) => p.stationId === st.id);
          const isUnlocked = piece?.unlocked;

          return (
            <motion.div
              key={st.id}
              onClick={(e) => {
                e.stopPropagation();
                soundManager.playWhoosh();
                onSelectStation(st.id);
              }}
              style={{
                left: `${st.x}%`,
                top: `${st.y}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Pulsing ring if active station */}
              {isCurrent && (
                <div
                  className="absolute -inset-3 rounded-full animate-ping opacity-60 pointer-events-none"
                  style={{ backgroundColor: st.themeColor }}
                />
              )}

              {/* Station Pin */}
              <div
                className={`relative w-11 h-11 rounded-2xl flex items-center justify-center font-display font-bold shadow-xl border-2 transition-all ${
                  isCurrent
                    ? 'border-white ring-4 ring-amber-400 scale-110 z-30 shadow-amber-300'
                    : isUnlocked
                    ? 'border-white bg-emerald-500 text-white'
                    : 'border-white/80 bg-white text-slate-700 hover:border-amber-400'
                }`}
                style={{
                  backgroundColor: isCurrent ? st.themeColor : isUnlocked ? '#10b981' : '#ffffff',
                  color: isCurrent || isUnlocked ? '#ffffff' : '#334155',
                }}
              >
                <span className="text-base select-none">{st.icon}</span>

                {/* Status indicator pip */}
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white shadow">
                  {isUnlocked ? (
                    <div className="w-full h-full rounded-full bg-emerald-600 flex items-center justify-center">
                      ✓
                    </div>
                  ) : (
                    <div className="w-full h-full rounded-full bg-slate-400 flex items-center justify-center">
                      {st.id}
                    </div>
                  )}
                </div>
              </div>

              {/* Hover Station Name Tag */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold whitespace-nowrap shadow-md pointer-events-none transition-all ${
                  isCurrent
                    ? 'bg-slate-900 text-white scale-105'
                    : 'bg-white/95 text-slate-800 opacity-90 group-hover:opacity-100 group-hover:scale-110'
                }`}
              >
                {st.name}
              </div>
            </motion.div>
          );
        })}

        {/* ENGINEER CHARACTER (YOU!) - FREELY MOVING AROUND THE PARK */}
        <EngineerAvatar
          x={engineerPos.x}
          y={engineerPos.y}
          isWalking={isWalking}
          facing={facing}
          currentStationName={currentStation.name}
          onClick={() => {
            soundManager.playStationArrival();
            setShowClueDialog(true);
          }}
        />

        {/* Temporary walk toast notification */}
        <AnimatePresence>
          {inspectMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900/90 text-amber-200 border border-amber-300/50 px-4 py-1.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 pointer-events-none z-30"
            >
              <Footprints className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span>{inspectMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Track HUD at Bottom Left */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur px-3.5 py-2 rounded-2xl border border-sky-200 shadow-md text-slate-700 flex items-center gap-4 text-xs font-semibold pointer-events-none">
          <div className="flex items-center gap-1.5 text-sky-700">
            <Mountain className="w-3.5 h-3.5" />
            <span>Độ cao: <b className="text-slate-900">{currentStation.altitude}m</b></span>
          </div>
          <div className="flex items-center gap-1.5 text-rose-600">
            <Gauge className="w-3.5 h-3.5" />
            <span>Tốc độ thiết kế: <b className="text-slate-900">{currentStation.speed} km/h</b></span>
          </div>
        </div>

        {/* Movement Hint at Bottom Right */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-slate-900/80 backdrop-blur text-white text-[11px] px-3.5 py-1.5 rounded-full pointer-events-none">
          <Footprints className="w-3.5 h-3.5 text-amber-300" />
          <span><b>Nhấp chuột</b> vào bản đồ để kỹ sư tự bước đi • Phím <b>A / D</b> hoặc <b>← / →</b></span>
        </div>
      </div>

      {/* ACTIVE STATION DETAIL & ENGINEER CLUE INSPECTOR */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStation.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-3xl p-5 md:p-6 border-2 border-sky-100 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Station description & Engineer Clue */}
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: currentStation.themeColor }}
              />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Trạm Dừng Chân #{currentStation.id} • {currentStation.landmark}
              </span>
            </div>

            <h3 className="text-2xl font-bold font-display text-slate-800">
              {currentStation.name}
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed">
              {currentStation.tagline}. {currentStation.pieceDescription}
            </p>

            {/* Engineer Clue Box */}
            <div className="bg-amber-50/90 border border-amber-200/80 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-amber-950">
              <div className="p-1.5 rounded-xl bg-amber-200/60 text-amber-900 shrink-0">
                <Search className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="font-extrabold uppercase tracking-wide text-amber-800 text-[10px] block">
                  Sổ Tay Khảo Sát Của Kỹ Sư
                </span>
                <p className="font-medium text-slate-700 leading-snug">
                  {currentStation.clueHint}
                </p>
              </div>
            </div>

            {/* Target Puzzle Piece details */}
            <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 text-sky-900 px-3 py-1.5 rounded-xl text-xs font-bold">
              <Sparkles className="w-4 h-4 text-sky-500" />
              <span>Mảnh ghép cần thu thập: <b>{currentStation.pieceName}</b></span>
              {currentPiece?.unlocked ? (
                <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md text-[10px]">
                  Đã giải mã
                </span>
              ) : (
                <span className="text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded-md text-[10px]">
                  Chờ kỹ sư khảo sát
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onEnterChallenge(currentStation)}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-display font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-orange-300 flex items-center justify-center gap-2.5 text-base"
            >
              <span>{currentPiece?.unlocked ? 'Khảo Sát Lại Trạm Này' : 'Bắt Đầu Giải Mã Trắc Địa'}</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

