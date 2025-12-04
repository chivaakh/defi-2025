/**
 * GameEngine.js
 * Système de gestion d'état principal du jeu NIRD
 * @author Chiva - Nuit de l'Info 2025
 */

class GameEngine {
  constructor() {
    this.state = this.initializeState();
    this.listeners = [];
  }

  /**
   * Initialise l'état du jeu
   */
  initializeState() {
    return {
      currentLevel: 0, // 0 = Home, 1-4 = Niveaux
      playerName: '',
      resistancePoints: 0,
      maxResistancePoints: 400, // 100 points par niveau
      levelsCompleted: {
        level1: false,
        level2: false,
        level3: false,
        level4: false
      },
      level1Data: {
        problemsFound: [],
        auditComplete: false
      },
      level2Data: {
        pcAssembled: false,
        partsCollected: [],
        correctParts: ['pc-case', 'motherboard', 'cpu', 'ram', 'disk', 'linux-os', 'libreoffice', 'firefox']
      },
      level3Data: {
        professeurConvinced: false,
        eleveConvinced: false,
        intendantConvinced: false,
        conversationHistory: []
      },
      level4Data: {
        pcReconditioned: 0,
        softwaresInstalled: [],
        trainingsLaunched: [],
        metrics: {
          budget: 0,
          co2: 0,
          security: 0,
          autonomy: 0
        }
      },
      startTime: Date.now(),
      lastSaveTime: null
    };
  }

  /**
   * Obtient l'état actuel du jeu
   */
  getState() {
    return { ...this.state };
  }

  /**
   * Met à jour l'état du jeu
   */
  setState(updates) {
    this.state = { ...this.state, ...updates };
    this.notifyListeners();
    this.saveToLocalStorage();
  }

  /**
   * Ajoute des points de résistance
   */
  addResistancePoints(points) {
    const newPoints = Math.min(
      this.state.resistancePoints + points,
      this.state.maxResistancePoints
    );
    this.setState({ resistancePoints: newPoints });
    return newPoints;
  }

  /**
   * Change de niveau
   */
  changeLevel(levelNumber) {
    if (levelNumber >= 0 && levelNumber <= 4) {
      this.setState({ currentLevel: levelNumber });
    }
  }

  /**
   * Marque un niveau comme complété
   */
  completeLevel(levelNumber) {
    const levelKey = `level${levelNumber}`;
    this.setState({
      levelsCompleted: {
        ...this.state.levelsCompleted,
        [levelKey]: true
      }
    });
  }

  /**
   * Vérifie si tous les niveaux sont complétés
   */
  isGameCompleted() {
    const { levelsCompleted } = this.state;
    return Object.values(levelsCompleted).every(completed => completed);
  }

  /**
   * Calcule le score final
   */
  calculateFinalScore() {
    const { resistancePoints, startTime } = this.state;
    const timeSpent = Math.floor((Date.now() - startTime) / 1000 / 60); // en minutes
    
    return {
      resistancePoints,
      timeSpent,
      completionRate: (resistancePoints / this.state.maxResistancePoints) * 100,
      rank: this.getRank(resistancePoints)
    };
  }

  /**
   * Détermine le rang du joueur
   */
  getRank(points) {
    if (points >= 350) return 'Agent NIRD Légendaire';
    if (points >= 300) return 'Agent NIRD Expert';
    if (points >= 200) return 'Agent NIRD Confirmé';
    if (points >= 100) return 'Agent NIRD Junior';
    return 'Résistant Numérique';
  }

  /**
   * Sauvegarde dans localStorage
   */
  saveToLocalStorage() {
    try {
      const saveData = {
        ...this.state,
        lastSaveTime: Date.now()
      };
      localStorage.setItem('nird_game_save', JSON.stringify(saveData));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  }

  /**
   * Charge depuis localStorage
   */
  loadFromLocalStorage() {
    try {
      const savedData = localStorage.getItem('nird_game_save');
      if (savedData) {
        this.state = JSON.parse(savedData);
        this.notifyListeners();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      return false;
    }
  }

  /**
   * Réinitialise le jeu
   */
  resetGame() {
    this.state = this.initializeState();
    localStorage.removeItem('nird_game_save');
    this.notifyListeners();
  }

  /**
   * Système d'abonnement pour les composants React
   */
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }

  /**
   * Méthodes spécifiques pour chaque niveau
   */

  // NIVEAU 1
  addProblemFound(problemId) {
    const problems = [...this.state.level1Data.problemsFound];
    if (!problems.includes(problemId)) {
      problems.push(problemId);
      this.setState({
        level1Data: {
          ...this.state.level1Data,
          problemsFound: problems
        }
      });
      this.addResistancePoints(25); // 25 points par problème trouvé
    }
  }

  completeAudit() {
    this.setState({
      level1Data: {
        ...this.state.level1Data,
        auditComplete: true
      }
    });
    this.completeLevel(1);
  }

  // NIVEAU 2
  addPartCollected(partId) {
    const parts = [...this.state.level2Data.partsCollected];
    if (!parts.includes(partId)) {
      parts.push(partId);
      this.setState({
        level2Data: {
          ...this.state.level2Data,
          partsCollected: parts
        }
      });
    }
  }

  validatePCAssembly() {
    const { partsCollected, correctParts } = this.state.level2Data;
    const isValid = correctParts.every(part => partsCollected.includes(part));
    
    if (isValid) {
      this.setState({
        level2Data: {
          ...this.state.level2Data,
          pcAssembled: true
        }
      });
      this.addResistancePoints(100);
      this.completeLevel(2);
    }
    
    return isValid;
  }

  // NIVEAU 3
  addConversation(character, questionId, choiceId, isCorrect) {
    const conversation = {
      character,
      questionId,
      choiceId,
      isCorrect,
      timestamp: Date.now()
    };

    this.setState({
      level3Data: {
        ...this.state.level3Data,
        conversationHistory: [...this.state.level3Data.conversationHistory, conversation]
      }
    });

    if (isCorrect) {
      this.addResistancePoints(10);
    }
  }

  markCharacterConvinced(character) {
    const key = `${character}Convinced`;
    this.setState({
      level3Data: {
        ...this.state.level3Data,
        [key]: true
      }
    });
    this.addResistancePoints(30);

    // Vérifier si tous les personnages sont convaincus
    const { professeurConvinced, eleveConvinced, intendantConvinced } = this.state.level3Data;
    if (professeurConvinced && eleveConvinced && intendantConvinced) {
      this.completeLevel(3);
    }
  }

  // NIVEAU 4
  updateLevel4Choices(data) {
    this.setState({
      level4Data: {
        ...this.state.level4Data,
        ...data
      }
    });
  }

  updateMetrics(metrics) {
    this.setState({
      level4Data: {
        ...this.state.level4Data,
        metrics: { ...this.state.level4Data.metrics, ...metrics }
      }
    });
  }

  finalizeTransformation() {
    this.completeLevel(4);
    this.addResistancePoints(75);
  }
}

// Instance singleton
const gameEngine = new GameEngine();

export default gameEngine;