export enum GameStage {
  INTRO = 'INTRO',
  LEVEL_1_AUDIT = 'LEVEL_1_AUDIT',
  LEVEL_2_RECONDITION = 'LEVEL_2_RECONDITION',
  LEVEL_3_CONVINCE = 'LEVEL_3_CONVINCE',
  LEVEL_4_LIBERATE = 'LEVEL_4_LIBERATE',
  VICTORY = 'VICTORY'
}

export interface GameState {
  stage: GameStage;
  score: number;
  inventory: string[];
  levelProgress: number; // 0-100
}

export interface AuditItem {
  id: number;
  x: number;
  y: number; // Percentage
  label: string;
  description: string;
  found: boolean;
  icon: string;
}

export interface DialogueOption {
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface Character {
  id: string;
  name: string;
  role: string;
  avatar: string; // Emoji or simple representation
  intro: string;
  options: DialogueOption[];
  convinced: boolean;
}

export interface SimulationStats {
  budget: number;
  security: number;
  ecology: number;
  autonomy: number;
}