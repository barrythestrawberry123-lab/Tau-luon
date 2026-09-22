export interface MathQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
  graphType?:
    | 'cubic_1'
    | 'fractional_1'
    | 'table_1'
    | 'cubic_forms'
    | 'table_2'
    | 'cubic_2'
    | 'fractional_2'
    | 'extrema_1'
    | 'intervals_1'
    | 'inflection_1'
    | 'quartic_1'
    | 'maxmin_1'
    | 'slope_tangent';
  topic: string;
}

export interface EngineerCharacter {
  x: number;
  y: number;
  facing: 'left' | 'right';
  isWalking: boolean;
}

export type PieceStatus = 'locked' | 'unlocked' | 'failed';

export interface ConstructionPiece {
  id: number;
  name: string;
  subtitle: string;
  x: number;
  y: number;
  themeColor: string;
  landmark: string;
  clueHint: string;
  questionId: number;
  status: PieceStatus;
}

export interface PasscodeSlot {
  index: number;
  label: string;
  codeValue: string;
  unlocked: boolean;
  unlockedAtTimestamp?: number;
}

// Backward compatibility types for legacy modules
export interface CoasterStation {
  id: number;
  name: string;
  tagline: string;
  themeColor: string;
  icon: string;
  x: number;
  y: number;
  question?: MathQuestion;
  unlocked?: boolean;
  completed?: boolean;
  speedBonus?: number;
  altitude?: number;
  speed?: number;
  landmark?: string;
  pieceDescription?: string;
  clueHint?: string;
  pieceName?: string;
}

export interface MapPiece {
  id: number;
  stationId?: number;
  name?: string;
  title?: string;
  description?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  isUnlocked?: boolean;
  unlocked?: boolean;
  icon?: string;
  color?: string;
  gridRow?: number;
  gridCol?: number;
  svgArt?: string;
  landmark?: string;
  [key: string]: unknown;
}

export interface PasscodeDigit {
  index: number;
  digit: string;
  requiredCorrect: number;
  isUnlocked: boolean;
}
