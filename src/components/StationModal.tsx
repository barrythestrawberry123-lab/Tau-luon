import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CoasterStation, MathQuestion, MapPiece } from '../types';
import { MathSvgGraph } from './MathSvgGraph';
import { soundManager } from '../utils/audio';
import { X, CheckCircle2, AlertCircle, ArrowRight, Sparkles, Map, RefreshCw } from 'lucide-react';

interface StationModalProps {
  station: CoasterStation;
  piece: MapPiece;
  questions: MathQuestion[];
  onClose: () => void;
  onPieceUnlocked: (pieceId: number) => void;
  onGoToMapBoard: () => void;
  onNextStation: () => void;
}

export const StationModal: React.FC<StationModalProps> = ({
  station,
  piece,
  questions,
  onClose,
  onPieceUnlocked,
  onGoToMapBoard,
  onNextStation,
}) => {
  // Select a question for this station
  const [questionIndex, setQuestionIndex] = useState<number>(() => {
    // Map station id to question offset or random
    const idx = (station.id - 1) % questions.length;
    return idx;
  });

  const [streak, setStreak] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [justUnlocked, setJustUnlocked] = useState<boolean>(false);

  const currentQ = questions[questionIndex] || questions[0];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correct;

    if (isCorrect) {
      soundManager.playCorrect();
      const newStreak = streak + 1;
      setStreak(newStreak);

      if (newStreak >= 2 || piece.unlocked) {
        // Unlock piece!
        if (!piece.unlocked) {
          soundManager.playUnlockPiece();
          setJustUnlocked(true);
          onPieceUnlocked(piece.id);
        }
      }
    } else {
      soundManager.playWrong();
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
    setSelectedOption(null);
    setQuestionIndex((prev) => (prev + 1) % questions.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-sky-100 overflow-hidden my-auto"
      >
        {/* Top Header with theme color */}
        <div
          className="p-4 sm:p-5 text-white flex items-center justify-between"
          style={{
            background: `linear-gradient(135deg, ${station.themeColor}, #0f172a)`,
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 rounded-2xl bg-white/20 backdrop-blur">
              {station.icon}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                  Thử Thách Trạm {station.id}
                </span>
                <span className="text-white/60">•</span>
                <span className="text-xs text-white/80">{currentQ.topic}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-display">
                {station.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress & Target Fragment Banner */}
        <div className="bg-sky-50 px-5 py-3 border-b border-sky-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Mảnh khảo sát:</span>
            <span className="bg-white px-2.5 py-1 rounded-lg border border-sky-200 text-sky-800 font-extrabold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {station.pieceName}
            </span>
          </div>

          {/* 2-Streak requirement dots */}
          <div className="flex items-center gap-2">
            <span className="text-slate-600 font-medium">Chuỗi thẩm định:</span>
            <div className="flex items-center gap-1.5">
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                  streak >= 1 || piece.unlocked
                    ? 'bg-emerald-500 border-emerald-500 text-white text-[9px] font-bold'
                    : 'bg-white border-slate-300'
                }`}
              >
                {streak >= 1 || piece.unlocked ? '✓' : ''}
              </div>
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                  streak >= 2 || piece.unlocked
                    ? 'bg-emerald-500 border-emerald-500 text-white text-[9px] font-bold'
                    : 'bg-white border-slate-300'
                }`}
              >
                {streak >= 2 || piece.unlocked ? '✓' : ''}
              </div>
            </div>
            <span className="text-[11px] text-slate-500">
              {piece.unlocked ? '(Đã có mảnh ghép)' : '(Cần 2 câu liên tiếp)'}
            </span>
          </div>
        </div>

        {/* Engineer Station Clue Callout */}
        {station.clueHint && (
          <div className="bg-amber-50/70 border-b border-amber-200/60 px-5 py-2.5 flex items-center gap-2 text-xs text-amber-900">
            <span className="text-base">👷‍♂️</span>
            <span className="font-bold text-amber-950">Ghi chú hiện trường:</span>
            <span className="text-slate-700 italic">{station.clueHint}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Question Text */}
          <p className="text-base sm:text-lg font-semibold text-slate-800 leading-relaxed">
            {currentQ.question}
          </p>

          {/* SVG Graph if applicable */}
          {currentQ.graphType && (
            <div className="my-3">
              <MathSvgGraph graphType={currentQ.graphType} />
            </div>
          )}

          {/* Answer Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
            {currentQ.options.map((opt, idx) => {
              const letter = ['A', 'B', 'C', 'D'][idx];
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correct;

              let style = 'bg-white border-slate-200 text-slate-800 hover:border-sky-300 hover:bg-sky-50/50';
              if (isAnswered) {
                if (isCorrect) {
                  style = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-200';
                } else if (isSelected && !isCorrect) {
                  style = 'bg-rose-50 border-rose-400 text-rose-900 line-through';
                } else {
                  style = 'bg-slate-50/80 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-start gap-3 text-sm ${style}`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-display font-bold text-xs flex-shrink-0 ${
                      isAnswered && isCorrect
                        ? 'bg-emerald-500 text-white'
                        : isAnswered && isSelected && !isCorrect
                        ? 'bg-rose-500 text-white'
                        : 'bg-sky-100 text-sky-800'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="flex-1 font-medium">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation */}
          <AnimatePresence>
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`p-4 rounded-2xl border text-sm space-y-2 ${
                  selectedOption === currentQ.correct
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50/80 border-rose-200 text-rose-900'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-base">
                  {selectedOption === currentQ.correct ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Chính xác tuyệt vời!</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-rose-600" />
                      <span>Chưa chính xác! Chuỗi đúng đã được đặt lại.</span>
                    </>
                  )}
                </div>

                {currentQ.explanation && (
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white/70 p-3 rounded-xl border border-slate-200/50">
                    <span className="font-bold text-slate-900">Giải thích: </span>
                    {currentQ.explanation}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Celebration when piece unlocked */}
          <AnimatePresence>
            {(justUnlocked || (piece.unlocked && streak >= 2)) && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-white p-4 rounded-2xl shadow-lg shadow-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🎉</span>
                  <div>
                    <div className="font-display font-bold text-base">
                      ĐÃ MỞ KHÓA MẢNH GHÉP SỐ {piece.id}!
                    </div>
                    <div className="text-xs text-amber-100">
                      Mảnh ghép đã được gắn vào Bản Đồ Tuyến Tàu Lượn Siêu Tốc.
                    </div>
                  </div>
                </div>

                <button
                  onClick={onGoToMapBoard}
                  className="bg-white text-slate-900 hover:bg-amber-50 font-display font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow"
                >
                  <Map className="w-4 h-4 text-amber-600" />
                  Xem Bản Đồ 8 Mảnh
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-white text-xs font-bold transition-colors"
          >
            Đóng cửa sổ
          </button>

          <div className="flex items-center gap-2">
            {isAnswered && (
              <button
                onClick={handleNextQuestion}
                className="px-4 py-2.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Câu hỏi khác
              </button>
            )}

            <button
              onClick={() => {
                onNextStation();
                onClose();
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white text-xs font-bold font-display flex items-center gap-1.5 shadow-md shadow-sky-200 transition-all"
            >
              <span>Đi tiếp ga sau</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
