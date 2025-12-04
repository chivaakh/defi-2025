declare module './services/GameEngine' {
  interface GameState {
    currentLevel: number;
    playerName: string;
    resistancePoints: number;
    maxResistancePoints: number;
    levelsCompleted: {
      level1: boolean;
      level2: boolean;
      level3: boolean;
      level4: boolean;
    };
    level1Data: {
      problemsFound: string[];
      auditComplete: boolean;
    };
    level2Data: {
      pcAssembled: boolean;
      partsCollected: string[];
      correctParts: string[];
    };
    level3Data: {
      professeurConvinced: boolean;
      eleveConvinced: boolean;
      intendantConvinced: boolean;
      conversationHistory: any[];
    };
    level4Data: {
      pcReconditioned: number;
      softwaresInstalled: string[];
      trainingsLaunched: string[];
      metrics: {
        budget: number;
        co2: number;
        security: number;
        autonomy: number;
      };
    };
    startTime: number;
    lastSaveTime: number | null;
  }

  const gameEngine: {
    getState: () => GameState;
    setState: (updates: Partial<GameState>) => void;
    addResistancePoints: (points: number) => number;
    changeLevel: (levelNumber: number) => void;
    completeLevel: (levelNumber: number) => void;
    isGameCompleted: () => boolean;
    calculateFinalScore: () => any;
    saveToLocalStorage: () => void;
    loadFromLocalStorage: () => boolean;
    resetGame: () => void;
    subscribe: (listener: (state: GameState) => void) => () => void;
    addProblemFound: (problemId: string) => void;
    completeAudit: () => void;
    addPartCollected: (partId: string) => void;
    validatePCAssembly: () => boolean;
    addConversation: (character: string, questionId: number, choiceId: string, isCorrect: boolean) => void;
    markCharacterConvinced: (character: string) => void;
    updateLevel4Choices: (data: any) => void;
    updateMetrics: (metrics: any) => void;
    finalizeTransformation: () => void;
  };

  export default gameEngine;
}

declare module './services/LevelManager' {
  const levelManager: {
    getLevel: (levelId: number) => any;
    getAllLevels: () => any[];
    isLevelUnlocked: (levelId: number) => boolean;
    unlockNextLevel: (currentLevelId: number) => void;
    getCurrentLevel: () => number;
    getNextLevel: () => number | null;
    getProgressPercentage: () => number;
    getLevelStats: (levelId: number) => any;
    validateLevelCompletion: (levelId: number) => boolean;
    getLevelHint: (levelId: number) => string;
    getLevelSummary: (levelId: number) => any;
    resetLevel: (levelId: number) => void;
  };

  export default levelManager;
}

declare module './services/ScoreManager' {
  const scoreManager: {
    calculatePoints: (action: string, data?: any) => number;
    addPoints: (action: string, data?: any) => number;
    checkAchievements: () => void;
    unlockAchievement: (achievementId: string) => any;
    getAllAchievements: () => any[];
    getUnlockedAchievements: () => any[];
    getAchievementPercentage: () => number;
    loadAchievements: () => void;
    getPlayerRanking: () => {
      rank: string;
      badge: string;
      color: string;
      percentage: number;
    };
    getDetailedStats: () => any;
    formatTime: (seconds: number) => string;
    getLeaderboard: () => any[];
    saveToLeaderboard: (playerName: string) => any[];
    resetAchievements: () => void;
  };

  export default scoreManager;
}

declare module './services/PDFGenerator' {
  const pdfGenerator: {
    generatePDF: (gameState: any, metrics: any, playerName?: string) => Promise<any>;
    download: (filename?: string) => boolean;
    getBlob: () => Blob | null;
    generateHTMLFallback: (gameState: any, metrics: any, playerName: string) => any;
  };

  export default pdfGenerator;
  export const generateGamePDF: (gameState: any, metrics: any, playerName: string) => Promise<any>;
}

declare module './utils/calculations' {
  const calculations: {
    calculateMetrics: (choices: {
      pcReconditioned: number;
      softwaresInstalled: string[];
      trainingsLaunched: string[];
    }) => {
      budget: number;
      co2: number;
      security: number;
      autonomy: number;
    };
    evaluateTransformation: (metrics: any) => any;
    getEvaluationMessage: (rating: string) => string;
    calculateVisualProgress: (metrics: any) => number;
    getTransformationStage: (progress: number) => any;
    compareWithOthers: (metrics: any) => any;
    calculateEnvironmentalImpact: (pcReconditioned: number) => any;
    calculateDetailedSavings: (choices: any) => any;
    generateRecommendations: (metrics: any, choices: any) => any[];
    formatNumber: (num: number, decimals?: number) => string;
    formatCurrency: (amount: number) => string;
  };

  export default calculations;
}

declare module './utils/localStorage' {
  const localStorage: any;
  export default localStorage;
}

declare module './data/gameData.json' {
  const data: any;
  export default data;
}

declare module './data/levelsConfig.json' {
  const data: any;
  export default data;
}

declare module './data/simulatorData.json' {
  const data: any;
  export default data;
}