import React from 'react';
import { motion } from 'motion/react';
import { RotateCcw, AlertTriangle, XCircle, HardHat } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface GameOverModalProps {
  correctCount: number;
  totalPieces: number;
  onRestart: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  correctCount,
  totalPieces,
  onRestart,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-4 border-rose-300 overflow-hidden text-center"
      >
        {/* Warning Banner */}
        <div className="bg-gradient-to-r from-rose-500 via-red-500 to-amber-600 p-6 text-white relative">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur mx-auto flex items-center justify-center text-3xl mb-3 shadow-inner">
            ⚠️
          </div>
          <h2 className="text-2xl font-black font-display tracking-tight">
            KHẢO SÁT CHƯA ĐẠT!
          </h2>
          <p className="text-xs text-rose-100 mt-1 max-w-xs mx-auto">
            Không đủ điều kiện tiêu chuẩn an toàn kỹ thuật của công trường
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs text-rose-950 text-left space-y-2">
            <div className="font-extrabold flex items-center gap-1.5 text-rose-800 text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Yêu cầu hoàn thành công trình:</span>
            </div>
            <p className="leading-relaxed">
              Kỹ sư cần giải mã đúng <b>ít nhất 6 mảnh ghép</b> để thu thập đủ 3 chữ số mật mã <b>4 - 8 - 3</b>.
            </p>
            <div className="pt-1 flex items-center justify-between font-bold border-t border-rose-200">
              <span>Số mảnh giải đúng hiện tại:</span>
              <span className="text-rose-600 text-base">{correctCount} / 6 mảnh</span>
            </div>
          </div>

          <p className="text-xs text-slate-600">
            Đừng nản lòng! Hãy khảo sát lại hiện trường từ đầu để quan sát kỹ đồ thị hàm số và đo đạc chính xác hơn.
          </p>

          <button
            onClick={() => {
              soundManager.playWhoosh();
              onRestart();
            }}
            className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white font-display font-extrabold py-3.5 px-6 rounded-2xl shadow-lg shadow-orange-300 flex items-center justify-center gap-2 text-sm transition-transform hover:scale-102"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Khảo Sát Lại Từ Đầu (Chơi Lại)</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
