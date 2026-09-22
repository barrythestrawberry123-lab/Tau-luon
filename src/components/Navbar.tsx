import React from 'react';
import { soundManager } from '../utils/audio';
import { exportAppAsHtml } from '../utils/htmlExporter';
import { Volume2, VolumeX, RotateCcw, Sparkles, KeyRound, Download } from 'lucide-react';
import { PasscodeSlot } from '../types';

interface NavbarProps {
  passcodes: PasscodeSlot[];
  correctCount: number;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  passcodes,
  correctCount,
  onReset,
}) => {
  const [soundOn, setSoundOn] = React.useState<boolean>(true);

  const toggleSound = () => {
    const newState = !soundOn;
    setSoundOn(newState);
    soundManager.enabled = newState;
    if (newState) {
      soundManager.playStationArrival();
    }
  };

  const handleExportHtml = () => {
    soundManager.playPasscodeDigit();
    exportAppAsHtml();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b-2 border-amber-200/90 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-pink-500 flex items-center justify-center text-xl shadow-md shadow-orange-300 text-white animate-bounce-subtle">
            🎢
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black font-display text-slate-800 tracking-tight flex items-center gap-1.5">
                <span>Công Trường Tàu Lượn Vui Nhộn</span>
                <span className="text-amber-500 text-sm">✨</span>
              </h1>
              <span className="hidden md:inline-block bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-amber-300 shadow-sm">
                Toán 12 • Thu Thập 3 Mật Mã
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              <b>2 câu đầu</b>: mật mã 1 (4) • <b>2 câu sau</b>: mật mã 2 (8) • <b>2 câu cuối</b>: mật mã 3 (3)
            </p>
          </div>
        </div>

        {/* 3 Passcodes Display */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 px-3.5 py-1.5 rounded-2xl border-2 border-amber-300/80 shadow-sm">
          {/* Correct Count Badge */}
          <div className="text-left pr-2 border-r border-amber-200">
            <div className="text-[10px] font-bold text-slate-500 uppercase">
              Tiến độ
            </div>
            <div className="text-xs sm:text-sm font-black text-amber-950 font-display">
              {correctCount} / 6 câu
            </div>
          </div>

          {/* 3 Passcode Slots */}
          <div className="flex items-center gap-1.5">
            {passcodes.map((slot) => (
              <div
                key={slot.index}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-black border transition-all ${
                  slot.unlocked
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-white shadow-sm ring-2 ring-emerald-300'
                    : 'bg-white/80 text-slate-400 border-slate-200'
                }`}
                title={slot.unlocked ? `Đã mở: mật mã ${slot.index}: ${slot.codeValue}` : `Cần ${slot.index * 2} câu đúng`}
              >
                <KeyRound className={`w-3 h-3 ${slot.unlocked ? 'text-amber-200' : 'text-slate-300'}`} />
                <span className="font-display">
                  {slot.unlocked ? `Mã ${slot.index}: ${slot.codeValue}` : `Mã ${slot.index}`}
                </span>
                {slot.unlocked && <Sparkles className="w-3 h-3 text-amber-200 animate-spin" />}
              </div>
            ))}
          </div>
        </div>

        {/* Controls & Sound */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl border-2 text-xs transition-all ${
              soundOn
                ? 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100 hover:scale-105'
                : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
            }`}
            title={soundOn ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Export HTML File */}
          <button
            onClick={handleExportHtml}
            className="px-3 py-1.5 rounded-xl border-2 border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-black transition-all flex items-center gap-1.5 shadow-sm hover:scale-105"
            title="Tải về file HTML để chạy offline hoặc lưu trữ"
          >
            <Download className="w-3.5 h-3.5 text-orange-600" />
            <span className="hidden sm:inline">Xuất HTML</span>
          </button>

          {/* Reset Game */}
          <button
            onClick={onReset}
            className="px-3 py-1.5 rounded-xl border-2 border-slate-200 text-slate-600 hover:text-amber-700 hover:border-amber-300 hover:bg-amber-50 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            title="Khảo sát lại từ đầu"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Chơi Lại</span>
          </button>
        </div>
      </div>
    </header>
  );
};
