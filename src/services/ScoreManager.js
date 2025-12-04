/**
 * ScoreManager.js
 * Gère les points de résistance, achievements et classements
 * @author Chiva - Nuit de l'Info 2025
 */

import gameEngine from './GameEngine.js';

class ScoreManager {
  constructor() {
    this.achievements = [
      {
        id: 'first_problem',
        name: 'Premier pas',
        description: 'Découvre ton premier problème Big Tech',
        icon: '🔍',
        points: 10,
        unlocked: false
      },
      {
        id: 'all_problems',
        name: 'Enquêteur expert',
        description: 'Identifie les 4 problèmes des Big Tech',
        icon: '🕵️',
        points: 50,
        unlocked: false
      },
      {
        id: 'pc_assembled',
        name: 'Bricoleur du libre',
        description: 'Assemble ton premier PC avec Linux',
        icon: '🔧',
        points: 50,
        unlocked: false
      },
      {
        id: 'first_convinced',
        name: 'Ambassadeur débutant',
        description: 'Convaincs ton premier personnage',
        icon: '💬',
        points: 20,
        unlocked: false
      },
      {
        id: 'all_convinced',
        name: 'Ambassadeur NIRD',
        description: 'Convaincs les 3 personnages',
        icon: '🎯',
        points: 75,
        unlocked: false
      },
      {
        id: 'lycee_libre',
        name: 'Libérateur numérique',
        description: 'Transforme le lycée en Village NIRD',
        icon: '🏆',
        points: 100,
        unlocked: false
      },
      {
        id: 'speed_run',
        name: 'Agent NIRD Éclair',
        description: 'Termine le jeu en moins de 30 minutes',
        icon: '⚡',
        points: 50,
        unlocked: false
      },
      {
        id: 'perfect_score',
        name: 'Agent NIRD Parfait',
        description: 'Obtiens 400 points de résistance',
        icon: '🌟',
        points: 100,
        unlocked: false
      },
      {
        id: 'eco_warrior',
        name: 'Guerrier écolo',
        description: 'Reconditionne 20+ ordinateurs',
        icon: '🌱',
        points: 30,
        unlocked: false
      }
    ];
  }

  /**
   * Calcule les points pour une action
   */
  calculatePoints(action, data = {}) {
    const pointsMap = {
      // Niveau 1
      'problem_found': 25,
      'audit_complete': 0,
      
      // Niveau 2
      'part_collected': 5,
      'pc_assembled': 100,
      
      // Niveau 3
      'correct_answer': 10,
      'wrong_answer': -5,
      'character_convinced': 30,
      
      // Niveau 4
      'pc_reconditioned': 5,
      'software_installed': 3,
      'training_launched': 2,
      'transformation_complete': 75
    };

    return pointsMap[action] || 0;
  }

  /**
   * Ajoute des points et vérifie les achievements
   */
  addPoints(action, data = {}) {
    const points = this.calculatePoints(action, data);
    gameEngine.addResistancePoints(points);
    this.checkAchievements();
    
    return points;
  }

  /**
   * Vérifie et débloque les achievements
   */
  checkAchievements() {
    const state = gameEngine.getState();
    
    // Premier problème
    if (state.level1Data.problemsFound.length >= 1) {
      this.unlockAchievement('first_problem');
    }
    
    // Tous les problèmes
    if (state.level1Data.problemsFound.length === 4) {
      this.unlockAchievement('all_problems');
    }
    
    // PC assemblé
    if (state.level2Data.pcAssembled) {
      this.unlockAchievement('pc_assembled');
    }
    
    // Premier personnage convaincu
    const convinced = [
      state.level3Data.professeurConvinced,
      state.level3Data.eleveConvinced,
      state.level3Data.intendantConvinced
    ].filter(Boolean).length;
    
    if (convinced >= 1) {
      this.unlockAchievement('first_convinced');
    }
    
    // Tous les personnages convaincus
    if (convinced === 3) {
      this.unlockAchievement('all_convinced');
    }
    
    // Lycée libéré
    if (state.levelsCompleted.level4) {
      this.unlockAchievement('lycee_libre');
    }
    
    // Speed run
    const timeSpent = (Date.now() - state.startTime) / 1000 / 60; // minutes
    if (gameEngine.isGameCompleted() && timeSpent < 30) {
      this.unlockAchievement('speed_run');
    }
    
    // Score parfait
    if (state.resistancePoints === state.maxResistancePoints) {
      this.unlockAchievement('perfect_score');
    }
    
    // Eco warrior
    if (state.level4Data.pcReconditioned >= 20) {
      this.unlockAchievement('eco_warrior');
    }
  }

  /**
   * Débloque un achievement
   */
  unlockAchievement(achievementId) {
    const achievement = this.achievements.find(a => a.id === achievementId);
    
    if (achievement && !achievement.unlocked) {
      achievement.unlocked = true;
      
      // Sauvegarde dans localStorage
      const unlockedAchievements = this.getUnlockedAchievements().map(a => a.id);
      localStorage.setItem('nird_achievements', JSON.stringify(unlockedAchievements));
      
      return {
        unlocked: true,
        achievement
      };
    }
    
    return { unlocked: false };
  }

  /**
   * Obtient tous les achievements
   */
  getAllAchievements() {
    return this.achievements;
  }

  /**
   * Obtient les achievements débloqués
   */
  getUnlockedAchievements() {
    return this.achievements.filter(a => a.unlocked);
  }

  /**
   * Calcule le pourcentage d'achievements
   */
  getAchievementPercentage() {
    const total = this.achievements.length;
    const unlocked = this.getUnlockedAchievements().length;
    return Math.round((unlocked / total) * 100);
  }

  /**
   * Charge les achievements depuis localStorage
   */
  loadAchievements() {
    try {
      const saved = localStorage.getItem('nird_achievements');
      if (saved) {
        const unlockedIds = JSON.parse(saved);
        unlockedIds.forEach(id => {
          const achievement = this.achievements.find(a => a.id === id);
          if (achievement) {
            achievement.unlocked = true;
          }
        });
      }
    } catch (error) {
      console.error('Erreur chargement achievements:', error);
    }
  }

  /**
   * Obtient le classement du joueur
   */
  getPlayerRanking() {
    const state = gameEngine.getState();
    const { resistancePoints, maxResistancePoints } = state;
    const percentage = (resistancePoints / maxResistancePoints) * 100;
    
    let rank = '';
    let badge = '';
    let color = '';
    
    if (percentage >= 95) {
      rank = 'Agent NIRD Légendaire';
      badge = '🏆';
      color = '#FFD700';
    } else if (percentage >= 80) {
      rank = 'Agent NIRD Expert';
      badge = '⭐';
      color = '#C0C0C0';
    } else if (percentage >= 60) {
      rank = 'Agent NIRD Confirmé';
      badge = '🥉';
      color = '#CD7F32';
    } else if (percentage >= 40) {
      rank = 'Agent NIRD Junior';
      badge = '🎖️';
      color = '#4A90E2';
    } else {
      rank = 'Résistant Numérique';
      badge = '🔰';
      color = '#7ED321';
    }
    
    return { rank, badge, color, percentage };
  }

  /**
   * Obtient les statistiques détaillées
   */
  getDetailedStats() {
    const state = gameEngine.getState();
    const timeSpent = Math.floor((Date.now() - state.startTime) / 1000);
    
    return {
      totalPoints: state.resistancePoints,
      maxPoints: state.maxResistancePoints,
      completionRate: (state.resistancePoints / state.maxResistancePoints) * 100,
      
      timeSpent: {
        seconds: timeSpent,
        formatted: this.formatTime(timeSpent)
      },
      
      levels: {
        completed: Object.values(state.levelsCompleted).filter(Boolean).length,
        total: 4
      },
      
      achievements: {
        unlocked: this.getUnlockedAchievements().length,
        total: this.achievements.length
      },
      
      level1: {
        problemsFound: state.level1Data.problemsFound.length,
        totalProblems: 4
      },
      
      level2: {
        partsCollected: state.level2Data.partsCollected.length,
        pcAssembled: state.level2Data.pcAssembled
      },
      
      level3: {
        conversationsCount: state.level3Data.conversationHistory.length,
        charactersConvinced: [
          state.level3Data.professeurConvinced,
          state.level3Data.eleveConvinced,
          state.level3Data.intendantConvinced
        ].filter(Boolean).length
      },
      
      level4: {
        pcReconditioned: state.level4Data.pcReconditioned,
        softwaresInstalled: state.level4Data.softwaresInstalled.length,
        metrics: state.level4Data.metrics
      }
    };
  }

  /**
   * Formate le temps en format lisible
   */
  formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  }

  /**
   * Obtient le leaderboard local (si implémenté plus tard)
   */
  getLeaderboard() {
    try {
      const leaderboard = localStorage.getItem('nird_leaderboard');
      return leaderboard ? JSON.parse(leaderboard) : [];
    } catch (error) {
      return [];
    }
  }

  /**
   * Sauvegarde le score dans le leaderboard
   */
  saveToLeaderboard(playerName) {
    const stats = this.getDetailedStats();
    const ranking = this.getPlayerRanking();
    
    const entry = {
      playerName: playerName || 'Agent NIRD',
      score: stats.totalPoints,
      rank: ranking.rank,
      timeSpent: stats.timeSpent.seconds,
      date: new Date().toISOString(),
      achievementsCount: stats.achievements.unlocked
    };
    
    try {
      const leaderboard = this.getLeaderboard();
      leaderboard.push(entry);
      
      // Trie par score décroissant
      leaderboard.sort((a, b) => b.score - a.score);
      
      // Garde seulement le top 10
      const top10 = leaderboard.slice(0, 10);
      
      localStorage.setItem('nird_leaderboard', JSON.stringify(top10));
      
      return top10;
    } catch (error) {
      console.error('Erreur sauvegarde leaderboard:', error);
      return [];
    }
  }

  /**
   * Réinitialise les achievements (pour debug)
   */
  resetAchievements() {
    this.achievements.forEach(achievement => {
      achievement.unlocked = false;
    });
    localStorage.removeItem('nird_achievements');
  }
}

// Instance singleton
const scoreManager = new ScoreManager();

// Charge les achievements au démarrage
scoreManager.loadAchievements();

export default scoreManager;