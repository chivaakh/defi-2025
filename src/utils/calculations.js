/**
 * calculations.js
 * Calculs pour le simulateur du niveau 4
 * @author Chiva - Nuit de l'Info 2025
 */

import simulatorData from '../data/simulatorData.json';

/**
 * Calcule les métriques en fonction des choix
 */
export const calculateMetrics = (choices) => {
  const { pcReconditioned, softwaresInstalled, trainingsLaunched } = choices;
  const { calculations } = simulatorData.simulator;
  
  let metrics = {
    budget: 0,
    co2: 0,
    security: 40, // Base de départ
    autonomy: 20  // Base de départ
  };

  // Calcul des PC reconditionnés
  if (pcReconditioned) {
    metrics.budget += pcReconditioned * calculations.perPC.budgetSaved;
    metrics.co2 += pcReconditioned * calculations.perPC.co2Avoided;
    metrics.security += pcReconditioned * calculations.perPC.securityBonus;
    metrics.autonomy += pcReconditioned * calculations.perPC.autonomyBonus;
  }

  // Calcul des logiciels installés
  if (softwaresInstalled && softwaresInstalled.length > 0) {
    softwaresInstalled.forEach(softwareId => {
      const software = calculations.perSoftware[softwareId];
      if (software) {
        metrics.budget += software.budgetSaved;
        metrics.security += software.securityBonus;
        metrics.autonomy += software.autonomyBonus;
      }
    });
  }

  // Calcul des formations
  if (trainingsLaunched && trainingsLaunched.length > 0) {
    trainingsLaunched.forEach(trainingId => {
      const training = calculations.perTraining[trainingId];
      if (training) {
        metrics.budget -= training.cost; // Les formations coûtent
        metrics.autonomy += training.autonomyBonus;
        metrics.security += training.securityBonus || 0;
        metrics.co2 += training.co2Bonus || 0;
      }
    });
  }

  // Limiter les pourcentages à 100
  metrics.security = Math.min(metrics.security, 100);
  metrics.autonomy = Math.min(metrics.autonomy, 100);

  return metrics;
};

/**
 * Évalue la qualité de la transformation
 */
export const evaluateTransformation = (metrics) => {
  const { thresholds } = simulatorData.simulator;
  
  let score = 0;
  let rating = '';
  
  // Calcul du score basé sur les seuils
  if (metrics.budget >= thresholds.excellent.budget) score += 25;
  else if (metrics.budget >= thresholds.good.budget) score += 15;
  else if (metrics.budget >= thresholds.average.budget) score += 10;
  
  if (metrics.co2 >= thresholds.excellent.co2) score += 25;
  else if (metrics.co2 >= thresholds.good.co2) score += 15;
  else if (metrics.co2 >= thresholds.average.co2) score += 10;
  
  if (metrics.security >= thresholds.excellent.security) score += 25;
  else if (metrics.security >= thresholds.good.security) score += 15;
  else if (metrics.security >= thresholds.average.security) score += 10;
  
  if (metrics.autonomy >= thresholds.excellent.autonomy) score += 25;
  else if (metrics.autonomy >= thresholds.good.autonomy) score += 15;
  else if (metrics.autonomy >= thresholds.average.autonomy) score += 10;
  
  // Détermination du rating
  if (score >= 90) {
    rating = 'excellent';
  } else if (score >= 60) {
    rating = 'good';
  } else if (score >= 30) {
    rating = 'average';
  } else {
    rating = 'poor';
  }
  
  return {
    score,
    rating,
    maxScore: 100
  };
};

/**
 * Obtient le message approprié selon l'évaluation
 */
export const getEvaluationMessage = (rating) => {
  const { messages } = simulatorData.simulator;
  
  const messageMap = {
    'excellent': messages.perfectImpact,
    'good': messages.highImpact,
    'average': messages.mediumImpact,
    'poor': messages.lowImpact
  };
  
  return messageMap[rating] || messages.mediumImpact;
};

/**
 * Calcule le progrès de la transformation visuelle
 */
export const calculateVisualProgress = (metrics) => {
  const { budget, co2, security, autonomy } = metrics;
  const { thresholds } = simulatorData.simulator;
  
  // Calcul du pourcentage moyen atteint
  const budgetPercent = Math.min((budget / thresholds.excellent.budget) * 100, 100);
  const co2Percent = Math.min((co2 / thresholds.excellent.co2) * 100, 100);
  const securityPercent = (security / thresholds.excellent.security) * 100;
  const autonomyPercent = (autonomy / thresholds.excellent.autonomy) * 100;
  
  const averageProgress = (budgetPercent + co2Percent + securityPercent + autonomyPercent) / 4;
  
  return Math.round(averageProgress);
};

/**
 * Obtient le stade de transformation visuelle
 */
export const getTransformationStage = (progress) => {
  const { visualTransformation } = simulatorData.simulator;
  
  for (let i = visualTransformation.stages.length - 1; i >= 0; i--) {
    if (progress >= visualTransformation.stages[i].progress) {
      return visualTransformation.stages[i];
    }
  }
  
  return visualTransformation.stages[0];
};

/**
 * Compare avec d'autres lycées
 */
export const compareWithOthers = (metrics) => {
  const { comparisons } = simulatorData.simulator;
  
  return {
    vsLyceeCarnot: {
      name: comparisons.lyceeCarnot.name,
      budgetDiff: metrics.budget - comparisons.lyceeCarnot.budget,
      co2Diff: metrics.co2 - comparisons.lyceeCarnot.co2,
      securityDiff: metrics.security - comparisons.lyceeCarnot.security,
      autonomyDiff: metrics.autonomy - comparisons.lyceeCarnot.autonomy
    },
    vsAverage: {
      name: comparisons.averageLycee.name,
      budgetDiff: metrics.budget - comparisons.averageLycee.budget,
      co2Diff: metrics.co2 - comparisons.averageLycee.co2,
      securityDiff: metrics.security - comparisons.averageLycee.security,
      autonomyDiff: metrics.autonomy - comparisons.averageLycee.autonomy
    }
  };
};

/**
 * Calcule l'impact environnemental total
 */
export const calculateEnvironmentalImpact = (pcReconditioned) => {
  const co2PerPC = simulatorData.simulator.calculations.perPC.co2Avoided;
  
  const totalCO2 = pcReconditioned * co2PerPC;
  
  // Équivalences
  const treesEquivalent = Math.round(totalCO2 / 20); // 1 arbre absorbe ~20kg CO2/an
  const kmCarEquivalent = Math.round(totalCO2 / 0.12); // ~0.12kg CO2/km en voiture
  
  return {
    totalCO2,
    equivalents: {
      trees: treesEquivalent,
      kmCar: kmCarEquivalent,
      flights: Math.round(totalCO2 / 250) // ~250kg CO2 par vol Paris-NY
    }
  };
};

/**
 * Calcule les économies détaillées
 */
export const calculateDetailedSavings = (choices) => {
  const { pcReconditioned, softwaresInstalled, trainingsLaunched } = choices;
  const { calculations } = simulatorData.simulator;
  
  const savings = {
    hardware: {
      amount: pcReconditioned * calculations.perPC.budgetSaved,
      items: [
        {
          name: 'PC reconditionnés',
          quantity: pcReconditioned,
          unitSaving: calculations.perPC.budgetSaved,
          total: pcReconditioned * calculations.perPC.budgetSaved
        }
      ]
    },
    
    software: {
      amount: 0,
      items: []
    },
    
    training: {
      cost: 0,
      items: []
    }
  };
  
  // Calcul des économies logiciels
  if (softwaresInstalled) {
    softwaresInstalled.forEach(softwareId => {
      const software = calculations.perSoftware[softwareId];
      if (software) {
        savings.software.amount += software.budgetSaved;
        savings.software.items.push({
          name: softwareId,
          saving: software.budgetSaved
        });
      }
    });
  }
  
  // Calcul des coûts formations
  if (trainingsLaunched) {
    trainingsLaunched.forEach(trainingId => {
      const training = calculations.perTraining[trainingId];
      if (training) {
        savings.training.cost += training.cost;
        savings.training.items.push({
          name: trainingId,
          cost: training.cost
        });
      }
    });
  }
  
  savings.total = savings.hardware.amount + savings.software.amount - savings.training.cost;
  
  return savings;
};

/**
 * Génère des recommandations
 */
export const generateRecommendations = (metrics, choices) => {
  const recommendations = [];
  const { thresholds } = simulatorData.simulator;
  
  // Recommandations budget
  if (metrics.budget < thresholds.good.budget) {
    recommendations.push({
      category: 'budget',
      priority: 'high',
      message: 'Reconditionne plus de PC pour maximiser les économies',
      action: 'increase_pc'
    });
  }
  
  // Recommandations CO2
  if (metrics.co2 < thresholds.good.co2) {
    recommendations.push({
      category: 'co2',
      priority: 'high',
      message: 'Augmente le nombre de PC reconditionnés pour réduire l\'empreinte carbone',
      action: 'increase_pc'
    });
  }
  
  // Recommandations sécurité
  if (metrics.security < thresholds.good.security) {
    recommendations.push({
      category: 'security',
      priority: 'medium',
      message: 'Lance une formation en cybersécurité pour améliorer la sécurité',
      action: 'add_training_cybersecurity'
    });
  }
  
  // Recommandations autonomie
  if (metrics.autonomy < thresholds.good.autonomy) {
    recommendations.push({
      category: 'autonomy',
      priority: 'medium',
      message: 'Installe plus de logiciels libres et forme l\'équipe',
      action: 'add_software_and_training'
    });
  }
  
  // Recommandations formations
  if (!choices.trainingsLaunched || choices.trainingsLaunched.length === 0) {
    recommendations.push({
      category: 'training',
      priority: 'high',
      message: 'Les formations sont essentielles pour une transition réussie',
      action: 'add_training'
    });
  }
  
  return recommendations;
};

/**
 * Formate les nombres pour l'affichage
 */
export const formatNumber = (num, decimals = 0) => {
  return num.toLocaleString('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};

/**
 * Formate les montants en euros
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export default {
  calculateMetrics,
  evaluateTransformation,
  getEvaluationMessage,
  calculateVisualProgress,
  getTransformationStage,
  compareWithOthers,
  calculateEnvironmentalImpact,
  calculateDetailedSavings,
  generateRecommendations,
  formatNumber,
  formatCurrency
};