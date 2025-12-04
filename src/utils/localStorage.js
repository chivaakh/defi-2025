/**
 * localStorage.js
 * Utilitaires pour gérer la sauvegarde locale du jeu
 * @author Chiva - Nuit de l'Info 2025
 */

const STORAGE_KEYS = {
  GAME_SAVE: 'nird_game_save',
  ACHIEVEMENTS: 'nird_achievements',
  LEADERBOARD: 'nird_leaderboard',
  SETTINGS: 'nird_settings',
  PLAYER_NAME: 'nird_player_name'
};

/**
 * Vérifie si localStorage est disponible
 */
export const isLocalStorageAvailable = () => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Sauvegarde des données dans localStorage
 */
export const saveToLocalStorage = (key, data) => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage non disponible');
    return false;
  }

  try {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
    return false;
  }
};

/**
 * Charge des données depuis localStorage
 */
export const loadFromLocalStorage = (key, defaultValue = null) => {
  if (!isLocalStorageAvailable()) {
    return defaultValue;
  }

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Erreur lors du chargement:', error);
    return defaultValue;
  }
};

/**
 * Supprime une entrée de localStorage
 */
export const removeFromLocalStorage = (key) => {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    return false;
  }
};

/**
 * Efface toutes les données du jeu
 */
export const clearAllGameData = () => {
  if (!isLocalStorageAvailable()) {
    return false;
  }

  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'effacement:', error);
    return false;
  }
};

/**
 * Obtient la taille utilisée par le jeu
 */
export const getStorageSize = () => {
  if (!isLocalStorageAvailable()) {
    return 0;
  }

  let total = 0;
  Object.values(STORAGE_KEYS).forEach(key => {
    const item = localStorage.getItem(key);
    if (item) {
      total += item.length;
    }
  });

  return total;
};

/**
 * Formate la taille en format lisible
 */
export const formatStorageSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};

/**
 * Vérifie si une sauvegarde existe
 */
export const hasSavedGame = () => {
  return localStorage.getItem(STORAGE_KEYS.GAME_SAVE) !== null;
};

/**
 * Obtient la date de dernière sauvegarde
 */
export const getLastSaveDate = () => {
  const saveData = loadFromLocalStorage(STORAGE_KEYS.GAME_SAVE);
  if (saveData && saveData.lastSaveTime) {
    return new Date(saveData.lastSaveTime);
  }
  return null;
};

/**
 * Exporte toutes les données du jeu
 */
export const exportGameData = () => {
  const data = {};
  
  Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
    const item = loadFromLocalStorage(key);
    if (item) {
      data[name] = item;
    }
  });

  return {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    data
  };
};

/**
 * Importe des données exportées
 */
export const importGameData = (exportedData) => {
  try {
    if (!exportedData || !exportedData.data) {
      throw new Error('Format de données invalide');
    }

    Object.entries(exportedData.data).forEach(([name, value]) => {
      const key = STORAGE_KEYS[name];
      if (key) {
        saveToLocalStorage(key, value);
      }
    });

    return true;
  } catch (error) {
    console.error('Erreur lors de l\'importation:', error);
    return false;
  }
};

/**
 * Télécharge les données de sauvegarde
 */
export const downloadSaveFile = () => {
  const data = exportGameData();
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json'
  });
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `nird_save_${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Sauvegarde le nom du joueur
 */
export const savePlayerName = (name) => {
  return saveToLocalStorage(STORAGE_KEYS.PLAYER_NAME, name);
};

/**
 * Charge le nom du joueur
 */
export const loadPlayerName = () => {
  return loadFromLocalStorage(STORAGE_KEYS.PLAYER_NAME, 'Agent NIRD');
};

/**
 * Sauvegarde les paramètres
 */
export const saveSettings = (settings) => {
  return saveToLocalStorage(STORAGE_KEYS.SETTINGS, settings);
};

/**
 * Charge les paramètres
 */
export const loadSettings = () => {
  return loadFromLocalStorage(STORAGE_KEYS.SETTINGS, {
    sound: true,
    music: true,
    notifications: true,
    theme: 'dark'
  });
};

/**
 * Crée une sauvegarde automatique
 */
export const createAutoSave = (gameState) => {
  const saveData = {
    ...gameState,
    lastSaveTime: Date.now(),
    autoSave: true
  };
  
  return saveToLocalStorage(STORAGE_KEYS.GAME_SAVE, saveData);
};

/**
 * Restaure depuis une sauvegarde automatique
 */
export const restoreAutoSave = () => {
  const saveData = loadFromLocalStorage(STORAGE_KEYS.GAME_SAVE);
  
  if (saveData && saveData.autoSave) {
    return saveData;
  }
  
  return null;
};

export default {
  STORAGE_KEYS,
  isLocalStorageAvailable,
  saveToLocalStorage,
  loadFromLocalStorage,
  removeFromLocalStorage,
  clearAllGameData,
  getStorageSize,
  formatStorageSize,
  hasSavedGame,
  getLastSaveDate,
  exportGameData,
  importGameData,
  downloadSaveFile,
  savePlayerName,
  loadPlayerName,
  saveSettings,
  loadSettings,
  createAutoSave,
  restoreAutoSave
};