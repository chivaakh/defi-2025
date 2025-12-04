import React, { useState } from 'react';
import Button from '../shared/Button.jsx';
import ProblemCard from './ProblemCard.jsx';
import '../../styles/levels.css';

const LyceeMap = ({ onComplete, onNavigate, progress }) => {
  const [problemsFound, setProblemsFound] = useState([]);
  const [auditComplete, setAuditComplete] = useState(false);

  const bigTechProblems = [
    {
      id: 1,
      name: "Windows",
      icon: "🪟",
      location: "Salle informatique",
      problems: [
        "Coûts de licences élevés (15 000€/an)",
        "Obsolescence programmée",
        "Mises à jour forcées",
        "Compatibilité limitée"
      ],
      color: "blue"
    },
    {
      id: 2,
      name: "Google",
      icon: "🔍",
      location: "Cloud éducatif",
      problems: [
        "Données personnelles collectées",
        "Publicité ciblée",
        "Dépendance au service",
        "Stockage externalisé"
      ],
      color: "red"
    },
    {
      id: 3,
      name: "Apple",
      icon: "🍎",
      location: "Salle des profs",
      problems: [
        "Écosystème fermé",
        "Matériel surévalué",
        "Réparabilité limitée",
        "Compatibilité exclusive"
      ],
      color: "purple"
    },
    {
      id: 4,
      name: "Amazon",
      icon: "📦",
      location: "Serveurs web",
      problems: [
        "Coûts cloud exponentiels",
        "Verrouillage fournisseur",
        "Impact écologique",
        "Monopole croissant"
      ],
      color: "orange"
    }
  ];

  const handleProblemClick = (problem) => {
    if (!problemsFound.find(p => p.id === problem.id)) {
      setProblemsFound([...problemsFound, problem]);
      
      if (problemsFound.length + 1 === bigTechProblems.length) {
        setTimeout(() => {
          setAuditComplete(true);
        }, 500);
      }
    }
  };

  const handleCompleteLevel = () => {
    onComplete();
  };

  return (
    <div className="level-container">
      <div className="level-content">
        <div className="level-header">
          <h1 className="level-title">NIVEAU 1 : L'AUDIT</h1>
          <p className="level-subtitle">
            Explore le lycée et découvre les 4 problèmes majeurs causés par les Big Tech
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Carte interactive du lycée */}
          <div className="lycee-map-container">
            <h2 className="text-2xl font-bold text-neon-blue mb-6">🏫 CARTE DU LYCÉE</h2>
            
            <div className="relative h-96 bg-gradient-to-b from-gray-900 to-black rounded-xl p-4 border-2 border-gray-700">
              {/* Points cliquables sur la carte */}
              {bigTechProblems.map((tech, index) => {
                const positions = [
                  { top: '20%', left: '30%' },  // Salle info
                  { top: '40%', left: '70%' },  // Cloud
                  { top: '70%', left: '20%' },  // Salle profs
                  { top: '60%', left: '60%' },  // Serveurs
                ];
                
                const isFound = problemsFound.find(p => p.id === tech.id);
                
                return (
                  <button
                    key={tech.id}
                    onClick={() => handleProblemClick(tech)}
                    className={`absolute w-16 h-16 rounded-full flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300
                      ${isFound 
                        ? 'bg-green-900/50 border-2 border-green-500 glow-green' 
                        : 'bg-red-900/50 border-2 border-red-500 animate-pulse hover:scale-110'
                      }`}
                    style={{
                      top: positions[index].top,
                      left: positions[index].left,
                    }}
                  >
                    <span className="text-2xl">{tech.icon}</span>
                    <span className="text-xs mt-1">{tech.name}</span>
                  </button>
                );
              })}
              
              {/* Légendes */}
              <div className="absolute bottom-4 left-4 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-text-secondary">Problème à découvrir</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-text-secondary">Problème résolu</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-text-secondary">
                Problèmes découverts : {problemsFound.length} / {bigTechProblems.length}
              </p>
              <div className="w-full bg-gray-800 h-2 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-500"
                  style={{ width: `${(problemsFound.length / bigTechProblems.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Rapport d'audit */}
          <div className="bg-bg-card rounded-xl p-6 border-2 border-neon-green">
            <h2 className="text-2xl font-bold text-neon-green mb-6">📊 RAPPORT D'AUDIT</h2>
            
            {problemsFound.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-text-secondary mb-4">
                  Clique sur les logos dans le lycée pour découvrir les problèmes
                </p>
                <div className="text-4xl">🔍</div>
              </div>
            ) : (
              <div className="space-y-4">
                {problemsFound.map(problem => (
                  <ProblemCard key={problem.id} problem={problem} />
                ))}
              </div>
            )}
            
            {auditComplete && (
              <div className="mt-8 p-4 bg-green-900/20 border-2 border-green-500 rounded-lg animate-fade-in">
                <h3 className="text-lg font-bold text-neon-green mb-2">✅ AUDIT COMPLET !</h3>
                <p className="text-text-secondary mb-4">
                  Tous les problèmes ont été identifiés. Le lycée est prêt pour la transformation.
                </p>
                <Button
                  variant="success"
                  className="w-full"
                  onClick={handleCompleteLevel}
                >
                  PASSER AU NIVEAU 2
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="level-navigation mt-8">
          <Button
            variant="ghost"
            onClick={() => onNavigate('home')}
          >
            ← Retour à l'accueil
          </Button>
          
          <div className="flex items-center gap-4">
            <span className="text-text-secondary">
              Points de résistance : {progress.resistancePoints}
            </span>
            <Button
              variant="secondary"
              onClick={() => onNavigate(2)}
              disabled={!auditComplete}
            >
              Suivant →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LyceeMap;