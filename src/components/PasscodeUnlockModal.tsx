import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KeyRound, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/audio';

export interface PasscodePopupInfo {
  codeNumber: number; // 1, 2, 3
  codeValue: string; // '4', '8', '3'
  title: string; // 'mật mã 1: 4', 'mật mã 2: 8', 'mật mã 3: 3'
  description: string;
}

interface PasscodeUnlockModalProps {
  info: PasscodePopupInfo | null;
  onClose: () => void;
}

export const PasscodeUnlockModal: React.FC<PasscodeUnlockModalProps> = ({
  info,
  onClose,
}) => {
  if (!info) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.75, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.75, y: 25 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden text-center"
      >
        {/* Colorful Amusement Header */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/15 hover:bg-black/30 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <motion.div
            initial={{ rotate: -20, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur mx-auto flex items-center justify-center text-3xl mb-2 shadow-inner"
          >
            🔑
          </motion.div>

          <div className="flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-100">
            <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-spin" />
            <span>Mở Khóa Thành Công!</span>
          </div>
          <h2 className="text-xl font-black font-display text-white tracking-tight mt-0.5">
            {info.title}
          </h2>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4">
          <div className="bg-gradient-to-b from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-5 shadow-inner">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
              CHỮ SỐ MẬT MÃ MỚI
            </div>

            {/* Giant Passcode Number */}
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: [0.9, 1.1, 1] }}
              transition={{ duration: 0.5 }}
              className="my-2 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500 text-white text-5xl font-black font-display shadow-lg border-2 border-white ring-4 ring-amber-300"
            >
              {info.codeValue}
            </motion.div>

            <div className="text-sm font-black text-amber-950 font-display">
              {info.title}
            </div>

            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {info.description}
            </p>
          </div>

          <button
            onClick={() => {
              soundManager.playWhoosh();
              onClose();
            }}
            className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Tuyệt Vời! Tiếp Tục Khảo Sát</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
