/**
 * LevelManager.js
 * Gère la progression et la validation des niveaux
 * @author Chiva - Nuit de l'Info 2025
 */

import gameEngine from './GameEngine.js';

class LevelManager {
  constructor() {
    this.levels = [
      {
        id: 1,
        name: 'Découvrir le problème',
        description: 'Explorer le lycée et identifier les problèmes des Big Tech',
        requiredPoints: 100,
        unlocked: true
      },
      {
        id: 2,
        name: 'Préparer la solution',
        description: 'Assembler un ordinateur avec Linux et des logiciels libres',
        requiredPoints: 100,
        unlocked: false
      },
      {
        id: 3,
        name: 'Convaincre',
        description: 'Persuader les acteurs du lycée de rejoindre NIRD',
        requiredPoints: 100,
        unlocked: false
      },
      {
        id: 4,
        name: 'Libérer le lycée',
        description: 'Transformer le lycée en Village Numérique Résistant',
        requiredPoints: 100,
        unlocked: false
      }
    ];
  }

  /**
   * Obtient les informations d'un niveau
   */
  getLevel(levelId) {
    return this.levels.find(level => level.id === levelId);
  }

  /**
   * Obtient tous les niveaux
   */
  getAllLevels() {
    return this.levels;
  }

  /**
   * Vérifie si un niveau est débloqué
   */
  isLevelUnlocked(levelId) {
    const state = gameEngine.getState();
    
    if (levelId === 1) return true;
    
    // Un niveau est débloqué si le niveau précédent est complété
    const previousLevelKey = `level${levelId - 1}`;
    return state.levelsCompleted[previousLevelKey];
  }

  /**
   * Débloque le niveau suivant
   */
  unlockNextLevel(currentLevelId) {
    if (currentLevelId < 4) {
      const nextLevel = this.levels[currentLevelId];
      if (nextLevel) {
        nextLevel.unlocked = true;
      }
    }
  }

  /**
   * Obtient le niveau actuel du joueur
   */
  getCurrentLevel() {
    const state = gameEngine.getState();
    return state.currentLevel;
  }

  /**
   * Obtient le prochain niveau disponible
   */
  getNextLevel() {
    const state = gameEngine.getState();
    const { levelsCompleted } = state;
    
    for (let i = 1; i <= 4; i++) {
      if (!levelsCompleted[`level${i}`]) {
        return i;
      }
    }
    return null; // Tous les niveaux sont complétés
  }

  /**
   * Calcule la progression globale
   */
  getProgressPercentage() {
    const state = gameEngine.getState();
    const { resistancePoints, maxResistancePoints } = state;
    return Math.round((resistancePoints / maxResistancePoints) * 100);
  }

  /**
   * Obtient les statistiques par niveau
   */
  getLevelStats(levelId) {
    const state = gameEngine.getState();
    const levelKey = `level${levelId}`;
    const levelData = state[`${levelKey}Data`];
    const isCompleted = state.levelsCompleted[levelKey];

    const stats = {
      levelId,
      completed: isCompleted,
      unlocked: this.isLevelUnlocked(levelId)
    };

    // Stats spécifiques par niveau
    switch (levelId) {
      case 1:
        stats.problemsFound = levelData.problemsFound.length;
        stats.totalProblems = 4;
        stats.progress = Math.round((levelData.problemsFound.length / 4) * 100);
        break;
      
      case 2:
        stats.partsCollected = levelData.partsCollected.length;
        stats.totalParts = levelData.correctParts.length;
        stats.progress = Math.round((levelData.partsCollected.length / levelData.correctParts.length) * 100);
        break;
      
      case 3:
        const convinced = [
          levelData.professeurConvinced,
          levelData.eleveConvinced,
          levelData.intendantConvinced
        ].filter(Boolean).length;
        stats.charactersConvinced = convinced;
        stats.totalCharacters = 3;
        stats.progress = Math.round((convinced / 3) * 100);
        break;
      
      case 4:
        stats.pcReconditioned = levelData.pcReconditioned;
        stats.metrics = levelData.metrics;
        stats.progress = isCompleted ? 100 : 0;
        break;
    }

    return stats;
  }

  /**
   * Valide la complétion d'un niveau
   */
  validateLevelCompletion(levelId) {
    const state = gameEngine.getState();
    const levelKey = `level${levelId}`;
    const levelData = state[`${levelKey}Data`];

    switch (levelId) {
      case 1:
        // Niveau 1 : 4 problèmes trouvés
        return levelData.problemsFound.length === 4 && levelData.auditComplete;
      
      case 2:
        // Niveau 2 : PC assemblé correctement
        return levelData.pcAssembled;
      
      case 3:
        // Niveau 3 : Les 3 personnages convaincus
        return levelData.professeurConvinced && 
               levelData.eleveConvinced && 
               levelData.intendantConvinced;
      
      case 4:
        // Niveau 4 : Transformation complète
        return levelData.pcReconditioned > 0 && 
               levelData.softwaresInstalled.length > 0;
      
      default:
        return false;
    }
  }

  /**
   * Obtient les conseils pour un niveau
   */
  getLevelHint(levelId) {
    const hints = {
      1: "Explore le lycée en cliquant sur les différentes zones. Les logos des Big Tech sont cachés partout !",
      2: "Glisse les bonnes pièces dans l'ordre : boîtier, carte mère, processeur, RAM, disque, puis les logiciels.",
      3: "Chaque personnage a ses préoccupations. Adapte tes arguments : économies pour l'intendant, facilité pour le prof, performance pour l'élève.",
      4: "Plus tu reconditionnes d'ordinateurs, plus tu économises ! N'oublie pas les formations pour assurer la transition."
    };
    
    return hints[levelId] || "Continue ton exploration !";
  }

  /**
   * Obtient le récap d'un niveau complété
   */
  getLevelSummary(levelId) {
    const stats = this.getLevelStats(levelId);
    const state = gameEngine.getState();
    const levelData = state[`level${levelId}Data`];

    const summaries = {
      1: {
        title: "Audit terminé !",
        message: `Tu as identifié ${stats.problemsFound}/4 problèmes des Big Tech. Le lycée est conscient de sa dépendance numérique.`,
        points: 100
      },
      2: {
        title: "PC ressuscité !",
        message: "Ton ordinateur fonctionne parfaitement avec Linux. Tu viens de prouver qu'on peut lutter contre l'obsolescence programmée.",
        points: 100
      },
      3: {
        title: "Équipe convaincue !",
        message: `${stats.charactersConvinced}/3 personnes ont rejoint la résistance NIRD. Le changement est en marche !`,
        points: 100
      },
      4: {
        title: "Lycée libéré !",
        message: `${levelData.pcReconditioned} PC reconditionnés, ${levelData.softwaresInstalled.length} logiciels libres installés. Le lycée est maintenant un Village Numérique Résistant !`,
        points: 100
      }
    };

    return summaries[levelId];
  }

  /**
   * Réinitialise un niveau spécifique (pour debug)
   */
  resetLevel(levelId) {
    const state = gameEngine.getState();
    const levelKey = `level${levelId}`;
    
    // Réinitialise les données du niveau
    const resetData = {
      level1Data: { problemsFound: [], auditComplete: false },
      level2Data: { pcAssembled: false, partsCollected: [], correctParts: state.level2Data.correctParts },
      level3Data: { professeurConvinced: false, eleveConvinced: false, intendantConvinced: false, conversationHistory: [] },
      level4Data: { pcReconditioned: 0, softwaresInstalled: [], trainingsLaunched: [], metrics: { budget: 0, co2: 0, security: 0, autonomy: 0 } }
    };

    gameEngine.setState({
      [`${levelKey}Data`]: resetData[`${levelKey}Data`],
      levelsCompleted: {
        ...state.levelsCompleted,
        [levelKey]: false
      }
    });
  }
}

// Instance singleton
const levelManager = new LevelManager();

export default levelManager;