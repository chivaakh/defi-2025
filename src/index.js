/**
 * index.js
 * Point d'entrée centralisé pour tous les services backend NIRD
 * @author Chiva - Nuit de l'Info 2025
 */

// Services
export { default as gameEngine } from './services/GameEngine.js';
export { default as levelManager } from './services/LevelManager.js';
export { default as scoreManager } from './services/ScoreManager.js';
export { default as pdfGenerator, generateGamePDF } from './services/PDFGenerator.js';

// Utilities
export { default as localStorage } from './utils/localStorage.js';
export { default as calculations } from './utils/calculations.js';

// Data
import gameData from './data/gameData.json';
import levelsConfig from './data/levelsConfig.json';
import simulatorData from './data/simulatorData.json';

export { gameData, levelsConfig, simulatorData };

// Hooks React (à créer plus tard ou par Khadija)
// export { useGameState } from './hooks/useGameState';
// export { useSimulator } from './hooks/useSimulator';
// export { useLevel } from './hooks/useLevel';

/**
 * API simplifiée pour usage rapide
 */
export const NirdGame = {
  // État
  getState: () => gameEngine.getState(),
  resetGame: () => gameEngine.resetGame(),
  
  // Niveaux
  changeLevel: (level) => gameEngine.changeLevel(level),
  getCurrentLevel: () => levelManager.getCurrentLevel(),
  getLevelStats: (levelId) => levelManager.getLevelStats(levelId),
  
  // Points
  addPoints: (points) => gameEngine.addResistancePoints(points),
  getScore: () => gameEngine.getState().resistancePoints,
  getRanking: () => scoreManager.getPlayerRanking(),
  
  // Niveau 1
  findProblem: (problemId) => gameEngine.addProblemFound(problemId),
  completeAudit: () => gameEngine.completeAudit(),
  
  // Niveau 2
  collectPart: (partId) => gameEngine.addPartCollected(partId),
  validatePC: () => gameEngine.validatePCAssembly(),
  
  // Niveau 3
  addConversation: (character, questionId, choiceId, isCorrect) => 
    gameEngine.addConversation(character, questionId, choiceId, isCorrect),
  convinceCharacter: (character) => gameEngine.markCharacterConvinced(character),
  
  // Niveau 4
  updateSimulator: (choices) => {
    gameEngine.updateLevel4Choices(choices);
    const metrics = calculations.calculateMetrics(choices);
    gameEngine.updateMetrics(metrics);
    return metrics;
  },
  finalizeLycee: () => gameEngine.finalizeTransformation(),
  
  // PDF
  generatePDF: async (playerName) => {
    const state = gameEngine.getState();
    const choices = {
      pcReconditioned: state.level4Data.pcReconditioned,
      softwaresInstalled: state.level4Data.softwaresInstalled,
      trainingsLaunched: state.level4Data.trainingsLaunched
    };
    const metrics = calculations.calculateMetrics(choices);
    return await generateGamePDF(state, metrics, playerName);
  }
};

export default NirdGame;