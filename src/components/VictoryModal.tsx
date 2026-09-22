import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ConstructionPiece, PasscodeSlot } from '../types';
import { soundManager } from '../utils/audio';
import { exportAppAsHtml } from '../utils/htmlExporter';
import { RotateCcw, X, Sparkles, KeyRound, Check, Download } from 'lucide-react';

interface VictoryModalProps {
  pieces: ConstructionPiece[];
  passcodes: PasscodeSlot[];
  onClose: () => void;
  onResetGame: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  passcodes,
  onClose,
  onResetGame,
}) => {
  useEffect(() => {
    soundManager.playVictoryFanfare();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 30 }}
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden my-auto text-center"
      >
        {/* Festive Amusement Park Theme Header */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 p-6 text-white relative overflow-hidden">
          <div className="absolute top-2 left-6 text-2xl animate-bounce">🎢</div>
          <div className="absolute top-3 right-8 text-2xl animate-bounce" style={{ animationDelay: '0.3s' }}>🎡</div>
          <div className="absolute bottom-2 left-10 text-xl animate-pulse">✨</div>
          <div className="absolute bottom-2 right-12 text-xl animate-pulse" style={{ animationDelay: '0.6s' }}>🎈</div>

          <div className="inline-flex p-3 rounded-2xl bg-white/20 backdrop-blur mb-2 shadow-inner">
            <span className="text-4xl">👷‍♂️🔑🏆</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white drop-shadow">
            THU THẬP ĐỦ CẢ 3 MẬT MÃ!
          </h2>
          <p className="text-xs sm:text-sm text-amber-50 max-w-md mx-auto mt-1 font-medium">
            Kỹ sư xuất sắc! Bạn đã vượt qua 2 câu đầu, 2 câu sau và 2 câu cuối để thu thập trọn vẹn toàn bộ 3 mã an toàn của tàu lượn!
          </p>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 PASSCODES DISPLAY */}
        <div className="p-6 space-y-6">
          <div className="bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100/60 border-2 border-amber-300 rounded-3xl p-5 shadow-inner">
            <div className="flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-900 mb-4">
              <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
              <span>BỘ 3 MẬT MÃ KHỞI ĐỘNG HỆ THỐNG</span>
            </div>

            {/* 3 Passcode Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {passcodes.map((slot) => (
                <motion.div
                  key={slot.index}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: slot.index * 0.15 }}
                  className="bg-white rounded-2xl p-4 border-2 border-emerald-300 shadow-md flex flex-col items-center justify-center text-center ring-2 ring-emerald-100"
                >
                  <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 mb-1">
                    <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{slot.label}</span>
                  </div>
                  <div className="text-3xl font-black font-display text-emerald-700 tracking-wider my-1">
                    {slot.codeValue}
                  </div>
                  <div className="mt-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>{slot.index === 1 ? '2 câu đầu' : slot.index === 2 ? '2 câu sau' : '2 câu cuối'}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-xs font-semibold text-amber-950 mt-4 leading-relaxed">
              Bạn đã mở khóa thành công: <b>mật mã 1: 4</b> • <b>mật mã 2: 8</b> • <b>mật mã 3: 3</b>!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                soundManager.playPasscodeDigit();
                exportAppAsHtml();
              }}
              className="py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Xuất File HTML</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-extrabold text-sm shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Xem Lại Công Trường
            </button>
            <button
              onClick={() => {
                onClose();
                onResetGame();
              }}
              className="py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-sm transition-all flex items-center justify-center gap-2 border border-slate-300"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Chơi Lại Từ Đầu</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
