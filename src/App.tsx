import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { ConstructionPiece, PasscodeSlot } from './types';
import { INITIAL_CONSTRUCTION_PIECES } from './data/constructionPieces';
import { MATH_QUESTIONS } from './data/questions';
import { Navbar } from './components/Navbar';
import { ConstructionSiteView } from './components/ConstructionSiteView';
import { PieceQuestionModal } from './components/PieceQuestionModal';
import { PasscodeUnlockModal, PasscodePopupInfo } from './components/PasscodeUnlockModal';
import { VictoryModal } from './components/VictoryModal';
import { soundManager } from './utils/audio';
import { ArrowRight, Sparkles, KeyRound } from 'lucide-react';

const STORAGE_KEY = 'rollercoaster_park_2dau_2sau_2cuoi_v4';

const INITIAL_PASSCODES: PasscodeSlot[] = [
  {
    index: 1,
    label: 'Mật Mã 1',
    codeValue: '4', // Mật mã 1: 4
    unlocked: false,
  },
  {
    index: 2,
    label: 'Mật Mã 2',
    codeValue: '8', // Mật mã 2: 8
    unlocked: false,
  },
  {
    index: 3,
    label: 'Mật Mã 3',
    codeValue: '3', // Mật mã 3: 3
    unlocked: false,
  },
];

export default function App() {
  const [pieces, setPieces] = useState<ConstructionPiece[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_pieces`);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_CONSTRUCTION_PIECES;
  });

  const [passcodes, setPasscodes] = useState<PasscodeSlot[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_passcodes`);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_PASSCODES;
  });

  const [activePieceId, setActivePieceId] = useState<number>(1);
  const [modalPiece, setModalPiece] = useState<ConstructionPiece | null>(null);
  const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false);
  const [unlockedPopupInfo, setUnlockedPopupInfo] = useState<PasscodePopupInfo | null>(null);

  // Số câu đúng hiện tại = số mảnh có status 'unlocked'
  const correctCount = pieces.filter((p) => p.status === 'unlocked').length;

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_pieces`, JSON.stringify(pieces));
      localStorage.setItem(`${STORAGE_KEY}_passcodes`, JSON.stringify(passcodes));
    } catch {
      // Ignore
    }
  }, [pieces, passcodes]);

  // Check victory condition: Cả 3 mã đều đã mở khóa!
  useEffect(() => {
    const allUnlocked = passcodes.every((p) => p.unlocked);
    if (allUnlocked) {
      const timer = setTimeout(() => {
        setShowVictoryModal(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [passcodes]);

  // Handle entering a puzzle piece -> Question pops up
  const handleEnterPiece = (piece: ConstructionPiece) => {
    setActivePieceId(piece.id);
    setModalPiece(piece);
  };

  /**
   * Quy tắc mấu chốt:
   * - 2 câu đầu (khi đạt 2 câu đúng): mở khóa "mật mã 1: 4" và hiện popup "mật mã 1: 4"
   * - 2 câu sau (khi đạt 4 câu đúng): mở khóa "mật mã 2: 8" và hiện popup "mật mã 2: 8"
   * - 2 câu cuối (khi đạt 6 câu đúng): mở khóa "mật mã 3: 3" và hiện popup "mật mã 3: 3"
   * Không cần liên tiếp!
   */
  const handleAnswerResult = (
    pieceId: number,
    isCorrect: boolean
  ): { newCorrectCount: number; unlockedCodeSlot: PasscodeSlot | null } => {
    let unlockedCodeSlot: PasscodeSlot | null = null;
    let newPieces = [...pieces];

    const currentPiece = pieces.find((p) => p.id === pieceId);
    const wasAlreadyUnlocked = currentPiece?.status === 'unlocked';

    // Cập nhật trạng thái mảnh ghép
    newPieces = pieces.map((p) =>
      p.id === pieceId ? { ...p, status: isCorrect ? 'unlocked' : 'failed' } : p
    );
    setPieces(newPieces);

    const newCorrectCount = newPieces.filter((p) => p.status === 'unlocked').length;

    if (isCorrect && !wasAlreadyUnlocked) {
      // Kiểm tra xem đã đạt các mốc 2 câu đầu, 2 câu sau, 2 câu cuối hay chưa
      const updatedPasscodes = [...passcodes];
      let newlyUnlockedCode: PasscodeSlot | null = null;

      // Mốc 1: 2 câu đầu (2 câu đúng)
      if (newCorrectCount >= 2 && !updatedPasscodes[0].unlocked) {
        updatedPasscodes[0] = {
          ...updatedPasscodes[0],
          unlocked: true,
          unlockedAtTimestamp: Date.now(),
        };
        newlyUnlockedCode = updatedPasscodes[0];
      }
      // Mốc 2: 2 câu sau (4 câu đúng)
      else if (newCorrectCount >= 4 && !updatedPasscodes[1].unlocked) {
        updatedPasscodes[1] = {
          ...updatedPasscodes[1],
          unlocked: true,
          unlockedAtTimestamp: Date.now(),
        };
        newlyUnlockedCode = updatedPasscodes[1];
      }
      // Mốc 3: 2 câu cuối (6 câu đúng)
      else if (newCorrectCount >= 6 && !updatedPasscodes[2].unlocked) {
        updatedPasscodes[2] = {
          ...updatedPasscodes[2],
          unlocked: true,
          unlockedAtTimestamp: Date.now(),
        };
        newlyUnlockedCode = updatedPasscodes[2];
      }

      if (newlyUnlockedCode) {
        setPasscodes(updatedPasscodes);
        unlockedCodeSlot = newlyUnlockedCode;

        // Kích hoạt popup thông báo mật mã (Ví dụ: "mật mã 1: 4")
        setUnlockedPopupInfo({
          codeNumber: newlyUnlockedCode.index,
          codeValue: newlyUnlockedCode.codeValue,
          title: `mật mã ${newlyUnlockedCode.index}: ${newlyUnlockedCode.codeValue}`,
          description:
            newlyUnlockedCode.index === 1
              ? 'Hoàn thành 2 câu đầu tiên! Bạn đã nhận được chữ số mật mã đầu tiên.'
              : newlyUnlockedCode.index === 2
              ? 'Hoàn thành 2 câu tiếp theo! Bạn đã nhận được chữ số mật mã thứ hai.'
              : 'Hoàn thành 2 câu cuối cùng! Cả 3 chữ số mật mã đã được thu thập trọn vẹn!',
        });
      }
    }

    return { newCorrectCount, unlockedCodeSlot };
  };

  // Reset toàn bộ trò chơi
  const handleResetGame = () => {
    setPieces(INITIAL_CONSTRUCTION_PIECES);
    setPasscodes(INITIAL_PASSCODES);
    setActivePieceId(1);
    setModalPiece(null);
    setShowVictoryModal(false);
    setUnlockedPopupInfo(null);
    localStorage.removeItem(`${STORAGE_KEY}_pieces`);
    localStorage.removeItem(`${STORAGE_KEY}_passcodes`);
    soundManager.playStationArrival();
  };

  const currentQuestion = modalPiece
    ? MATH_QUESTIONS.find((q) => q.id === modalPiece.questionId) || MATH_QUESTIONS[0]
    : MATH_QUESTIONS[0];

  const unlockedPasscodeCount = passcodes.filter((p) => p.unlocked).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-amber-50 to-orange-50/40 text-slate-800 flex flex-col antialiased">
      {/* Top Navbar */}
      <Navbar
        passcodes={passcodes}
        correctCount={correctCount}
        onReset={handleResetGame}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-4 md:py-6 flex flex-col gap-4 sm:gap-5">
        {/* Intro Guide */}
        {unlockedPasscodeCount === 0 && correctCount === 0 && (
          <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 text-white p-4 sm:p-5 rounded-3xl shadow-lg border-2 border-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <span className="text-3xl p-2.5 rounded-2xl bg-white/30 backdrop-blur shadow-sm">
                🎢
              </span>
              <div>
                <h3 className="font-display font-black text-base sm:text-lg">
                  Chào Mừng Đến Thử Thách Mở Mã Tàu Lượn Vui Nhộn!
                </h3>
                <p className="text-xs sm:text-sm text-amber-50 font-medium mt-0.5">
                  Quy tắc: <b>2 câu đầu</b> ➔ hiện popup <b>"mật mã 1: 4"</b> • <b>2 câu sau</b> ➔ hiện popup <b>"mật mã 2: 8"</b> • <b>2 câu cuối</b> ➔ hiện popup <b>"mật mã 3: 3"</b> (không cần liên tiếp)!
                </p>
              </div>
            </div>

            <button
              onClick={() => handleEnterPiece(pieces[0])}
              className="bg-slate-900 hover:bg-slate-800 text-amber-300 font-display font-black px-5 py-2.5 rounded-2xl text-xs sm:text-sm shadow-md whitespace-nowrap flex items-center gap-2 transition-transform hover:scale-105 shrink-0"
            >
              <span>Bắt Đầu Khảo Sát</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        )}

        {/* Construction Site View Canvas */}
        <ConstructionSiteView
          pieces={pieces}
          passcodes={passcodes}
          correctCount={correctCount}
          totalPieces={pieces.length}
          activePieceId={activePieceId}
          onEnterPiece={handleEnterPiece}
          onRestart={handleResetGame}
        />
      </main>

      {/* Footer */}
      <footer className="w-full bg-white/80 backdrop-blur border-t border-amber-200 py-3.5 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-medium text-slate-600">
            <span>🎡</span>
            <span>Công Trường Tàu Lượn Vui Nhộn — 2 câu đầu, 2 câu sau, 2 câu cuối</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <span className="flex items-center gap-1 text-orange-600">
              Đúng: {correctCount}/6 câu
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-700">
              <KeyRound className="w-3.5 h-3.5" /> Đã mở {unlockedPasscodeCount}/3 mã
            </span>
          </div>
        </div>
      </footer>

      {/* Question Modal */}
      <AnimatePresence>
        {modalPiece && (
          <PieceQuestionModal
            piece={modalPiece}
            question={currentQuestion}
            correctCount={correctCount}
            passcodes={passcodes}
            onAnswerResult={handleAnswerResult}
            onClose={() => setModalPiece(null)}
          />
        )}
      </AnimatePresence>

      {/* Passcode Unlock Popup (Hiện popup "mật mã 1: 4" khi nhận mã) */}
      <AnimatePresence>
        {unlockedPopupInfo && (
          <PasscodeUnlockModal
            info={unlockedPopupInfo}
            onClose={() => setUnlockedPopupInfo(null)}
          />
        )}
      </AnimatePresence>

      {/* Victory Modal when all 3 passcodes are unlocked */}
      <AnimatePresence>
        {showVictoryModal && (
          <VictoryModal
            pieces={pieces}
            passcodes={passcodes}
            onClose={() => setShowVictoryModal(false)}
            onResetGame={handleResetGame}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
