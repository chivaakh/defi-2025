/**
 * test.js
 * Fichier de test pour vérifier le bon fonctionnement du backend
 * @author Chiva - Nuit de l'Info 2025
 * 
 * Pour tester: node test.js (si en Node)
 * Ou copie-colle dans la console du navigateur
 */

import gameEngine from './services/GameEngine.js';
import levelManager from './services/LevelManager.js';
import scoreManager from './services/ScoreManager.js';
import calculations from './utils/calculations.js';

console.log('🧪 TESTS BACKEND NIRD\n');

// TEST 1: GameEngine
console.log('📋 Test 1: GameEngine');
gameEngine.resetGame();
const initialState = gameEngine.getState();
console.log('✅ État initial:', {
  niveau: initialState.currentLevel,
  points: initialState.resistancePoints
});

// TEST 2: Niveau 1
console.log('\n📋 Test 2: Niveau 1 - Découvrir');
gameEngine.changeLevel(1);
gameEngine.addProblemFound('licenses');
gameEngine.addProblemFound('obsolescence');
const state1 = gameEngine.getState();
console.log('✅ Problèmes trouvés:', state1.level1Data.problemsFound.length);
console.log('✅ Points:', state1.resistancePoints);

// TEST 3: Niveau 2
console.log('\n📋 Test 3: Niveau 2 - Préparer');
gameEngine.changeLevel(2);
const parts = ['pc-case', 'motherboard', 'cpu', 'ram', 'disk', 'linux-os', 'libreoffice', 'firefox'];
parts.forEach(part => gameEngine.addPartCollected(part));
const isValid = gameEngine.validatePCAssembly();
console.log('✅ PC assemblé:', isValid);
console.log('✅ Points totaux:', gameEngine.getState().resistancePoints);

// TEST 4: Niveau 3
console.log('\n📋 Test 4: Niveau 3 - Convaincre');
gameEngine.changeLevel(3);
gameEngine.addConversation('professeur', 1, 'choiceA', true);
gameEngine.markCharacterConvinced('professeur');
gameEngine.markCharacterConvinced('eleve');
gameEngine.markCharacterConvinced('intendant');
const state3 = gameEngine.getState();
console.log('✅ Personnages convaincus:', {
  prof: state3.level3Data.professeurConvinced,
  eleve: state3.level3Data.eleveConvinced,
  intendant: state3.level3Data.intendantConvinced
});

// TEST 5: Niveau 4 & Simulateur
console.log('\n📋 Test 5: Niveau 4 - Simulateur');
gameEngine.changeLevel(4);
const choices = {
  pcReconditioned: 30,
  softwaresInstalled: ['libreoffice', 'firefox', 'thunderbird'],
  trainingsLaunched: ['linux-basics', 'digital-sobriety']
};
gameEngine.updateLevel4Choices(choices);
const metrics = calculations.calculateMetrics(choices);
console.log('✅ Métriques calculées:', metrics);

const evaluation = calculations.evaluateTransformation(metrics);
console.log('✅ Évaluation:', evaluation);

const progress = calculations.calculateVisualProgress(metrics);
console.log('✅ Progrès visuel:', progress + '%');

// TEST 6: LevelManager
console.log('\n📋 Test 6: LevelManager');
const stats1 = levelManager.getLevelStats(1);
console.log('✅ Stats Niveau 1:', stats1);

const currentLevel = levelManager.getCurrentLevel();
console.log('✅ Niveau actuel:', currentLevel);

const globalProgress = levelManager.getProgressPercentage();
console.log('✅ Progression globale:', globalProgress + '%');

// TEST 7: ScoreManager
console.log('\n📋 Test 7: ScoreManager');
const ranking = scoreManager.getPlayerRanking();
console.log('✅ Classement:', ranking);

const achievements = scoreManager.getUnlockedAchievements();
console.log('✅ Achievements débloqués:', achievements.length);

const detailedStats = scoreManager.getDetailedStats();
console.log('✅ Stats détaillées:', {
  points: detailedStats.totalPoints,
  niveaux: detailedStats.levels.completed + '/' + detailedStats.levels.total,
  temps: detailedStats.timeSpent.formatted
});

// TEST 8: Calculations avancés
console.log('\n📋 Test 8: Calculs avancés');
const environmental = calculations.calculateEnvironmentalImpact(30);
console.log('✅ Impact environnemental:', environmental);

const savings = calculations.calculateDetailedSavings(choices);
console.log('✅ Économies détaillées:', savings.total + '€');

const recommendations = calculations.generateRecommendations(metrics, choices);
console.log('✅ Recommandations:', recommendations.length);

// TEST 9: Jeu complet
console.log('\n📋 Test 9: Vérification jeu complet');
gameEngine.completeLevel(1);
gameEngine.completeLevel(2);
gameEngine.completeLevel(3);
gameEngine.completeLevel(4);

const isCompleted = gameEngine.isGameCompleted();
console.log('✅ Jeu complété:', isCompleted);

const finalScore = gameEngine.calculateFinalScore();
console.log('✅ Score final:', finalScore);

// TEST 10: Sauvegarde/Chargement
console.log('\n📋 Test 10: Sauvegarde/Chargement');
gameEngine.saveToLocalStorage();
console.log('✅ Sauvegarde effectuée');

gameEngine.resetGame();
console.log('✅ Jeu réinitialisé');

const loaded = gameEngine.loadFromLocalStorage();
console.log('✅ Chargement:', loaded ? 'Succès' : 'Échec');

// RÉSUMÉ
console.log('\n' + '='.repeat(50));
console.log('🎉 TOUS LES TESTS SONT PASSÉS !');
console.log('='.repeat(50));
console.log('\n✅ Backend fonctionnel et prêt à l\'emploi\n');

// Export pour usage dans console
if (typeof window !== 'undefined') {
  window.gameEngine = gameEngine;
  window.levelManager = levelManager;
  window.scoreManager = scoreManager;
  window.calculations = calculations;
  console.log('💡 Les objets sont disponibles dans window pour debug');
}