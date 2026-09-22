import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ConstructionPiece, MathQuestion, PasscodeSlot } from '../types';
import { MathSvgGraph } from './MathSvgGraph';
import { soundManager } from '../utils/audio';
import {
  X,
  CheckCircle,
  XCircle,
  Search,
  RotateCcw,
  Sparkles,
  ArrowRight,
  KeyRound,
} from 'lucide-react';

interface PieceQuestionModalProps {
  piece: ConstructionPiece;
  question: MathQuestion;
  correctCount: number;
  passcodes: PasscodeSlot[];
  onAnswerResult: (pieceId: number, isCorrect: boolean) => {
    newCorrectCount: number;
    unlockedCodeSlot: PasscodeSlot | null;
  };
  onClose: () => void;
}

export const PieceQuestionModal: React.FC<PieceQuestionModalProps> = ({
  piece,
  question,
  correctCount,
  passcodes,
  onAnswerResult,
  onClose,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [newlyUnlockedPasscode, setNewlyUnlockedPasscode] = useState<PasscodeSlot | null>(null);
  const [postSubmitCount, setPostSubmitCount] = useState<number>(correctCount);

  const handleSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null || isSubmitted) return;

    const correct = selectedOption === question.correct;
    setIsSubmitted(true);
    setIsCorrect(correct);

    const result = onAnswerResult(piece.id, correct);
    setPostSubmitCount(result.newCorrectCount);

    if (correct) {
      if (result.unlockedCodeSlot) {
        setNewlyUnlockedPasscode(result.unlockedCodeSlot);
        soundManager.playPasscodeDigit();
      } else {
        soundManager.playCorrect();
      }
    } else {
      soundManager.playWrong();
    }
  };

  const handleRetry = () => {
    setIsSubmitted(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setNewlyUnlockedPasscode(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden my-auto"
      >
        {/* Playful Header */}
        <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 p-4 sm:p-5 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-xl sm:text-2xl shadow-inner">
              🧩
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-black/20 px-2 py-0.5 rounded-full">
                  Mảnh Khảo Sát #{piece.id}
                </span>
                <span className="text-[10px] font-bold text-amber-100">
                  {piece.landmark}
                </span>
              </div>
              <h3 className="font-display font-black text-lg sm:text-xl text-white">
                {piece.name}: {piece.subtitle}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-black/15 hover:bg-black/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Engineer Clue & Progress Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-5 py-2.5 flex items-start justify-between gap-3 text-xs text-amber-950">
          <div className="flex items-start gap-2">
            <Search className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-900">Ghi chú hiện trường: </span>
              <span className="text-slate-700">{piece.clueHint}</span>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-1 bg-white px-2.5 py-1 rounded-xl border border-amber-300 font-extrabold text-orange-600 shadow-2xs">
            <KeyRound className="w-3.5 h-3.5 text-amber-600" />
            <span>Tiến độ: {!isSubmitted ? correctCount : postSubmitCount}/6 câu đúng</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[72vh] overflow-y-auto">
          {/* Question Text */}
          <div className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
            {question.question}
          </div>

          {/* Graph Visualization from PDF */}
          {question.graphType && (
            <div className="my-2">
              <MathSvgGraph graphType={question.graphType} />
            </div>
          )}

          {/* Options */}
          <div className="space-y-2.5 pt-1">
            {question.options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx);
              const isSelected = selectedOption === idx;
              const isOptionCorrect = idx === question.correct;

              let btnStyle = 'border-slate-200 bg-white hover:border-amber-400 hover:bg-amber-50/50 text-slate-800';

              if (isSelected && !isSubmitted) {
                btnStyle = 'border-amber-500 bg-amber-100 text-amber-950 font-bold ring-2 ring-amber-300';
              } else if (isSubmitted) {
                if (isOptionCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-300';
                } else if (isSelected && !isOptionCorrect) {
                  btnStyle = 'border-rose-400 bg-rose-50 text-rose-950 line-through opacity-85';
                } else {
                  btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isSubmitted}
                  className={`w-full text-left p-3 sm:p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between text-xs sm:text-sm ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-black font-display text-xs sm:text-sm shrink-0 shadow-2xs ${
                        isSelected
                          ? isSubmitted
                            ? isOptionCorrect
                              ? 'bg-emerald-600 text-white'
                              : 'bg-rose-500 text-white'
                            : 'bg-amber-500 text-white'
                          : isSubmitted && isOptionCorrect
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="font-semibold">{opt}</span>
                  </div>

                  {isSubmitted && isOptionCorrect && (
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isSubmitted && isSelected && !isOptionCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* New Passcode Milestone Celebration Alert! */}
          <AnimatePresence>
            {newlyUnlockedPasscode && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white p-4 rounded-2xl border-2 border-white shadow-xl flex items-center gap-3.5"
              >
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-3xl font-black font-display text-emerald-700 shadow-md">
                  {newlyUnlockedPasscode.codeValue}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-100">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Mở Khóa Thành Công: {newlyUnlockedPasscode.label}!</span>
                  </div>
                  <p className="text-xs font-bold text-white mt-0.5">
                    Chúc mừng! Bạn nhận được: <b>mật mã {newlyUnlockedPasscode.index}: {newlyUnlockedPasscode.codeValue}</b>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Explanation when submitted */}
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2xl border ${
                isCorrect
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50/80 border-amber-200 text-amber-950'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5 font-bold text-xs sm:text-sm">
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>
                      Chính xác! Tổng số câu đúng hiện tại: <b>{postSubmitCount}/6 câu</b>
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-500" />
                    <span>
                      Chưa chính xác! Bạn có thể bấm "Làm lại câu này" hoặc tiếp tục khảo sát mảnh ghép khác.
                    </span>
                  </>
                )}
              </div>

              {question.explanation && (
                <p className="text-xs leading-relaxed text-slate-700 mt-2 bg-white/70 p-2.5 rounded-xl border border-amber-200">
                  <span className="font-bold text-slate-900">Giải thích chi tiết: </span>
                  {question.explanation}
                </p>
              )}
            </motion.div>
          )}

          {/* Modal Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm shadow-md hover:shadow-orange-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Xác Nhận Phương Án</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="w-full flex flex-col sm:flex-row gap-2.5">
                {!isCorrect && (
                  <button
                    onClick={handleRetry}
                    className="flex-1 py-3 px-4 rounded-2xl border-2 border-orange-300 bg-orange-50 hover:bg-orange-100 text-orange-950 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Làm Lại Câu Này</span>
                  </button>
                )}

                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Hoàn Tất Khảo Sát Mảnh Này</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
