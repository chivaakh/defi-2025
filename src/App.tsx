import React, { useState } from 'react';
import Home from './components/shared/Home.jsx';
import Level1 from './components/Level1/LyceeMap.jsx';
import Level2 from './components/Level2/DragDropGame.jsx';
import Level3 from './components/Level3/DialogueBox.jsx';
import Level4 from './components/Level4/Simulator.jsx';
import Button from './components/shared/Button.jsx';

const App = () => {
  const [currentLevel, setCurrentLevel] = useState<'home' | 1 | 2 | 3 | 4 | 'end'>('home');
  const [playerProgress, setPlayerProgress] = useState({
    level1Completed: false,
    level2Completed: false,
    level3Completed: false,
    level4Completed: false,
    resistancePoints: 0,
  });

  const handleStartGame = () => {
    setCurrentLevel(1);
  };

  const handleLevelComplete = (level: number) => {
    setPlayerProgress(prev => ({
      ...prev,
      [`level${level}Completed`]: true,
      resistancePoints: prev.resistancePoints + 250,
    }));
    
    setTimeout(() => {
      if (level < 4) {
        setCurrentLevel((level + 1) as any);
      } else {
        setCurrentLevel('end');
      }
    }, 1500);
  };

  const handleNavigation = (level: 'home' | 1 | 2 | 3 | 4 | 'end') => {
    setCurrentLevel(level);
  };

  const renderLevel = () => {
    switch (currentLevel) {
      case 'home':
        return <Home onStartGame={handleStartGame} />;
      case 1:
        return (
          <div className="level-container">
            <div className="level-content">
              <div className="level-header">
                <h1 className="level-title">NIVEAU 1</h1>
                <p className="level-subtitle">
                  Explore le lycée et découvre les problèmes causés par les Big Tech
                </p>
              </div>
              <div className="lycee-map-container">
                <h2 className="text-2xl font-bold text-neon-blue mb-4">Carte du Lycée</h2>
                <p className="text-text-secondary mb-6">
                  Clique sur les logos des Big Tech cachés dans le lycée pour découvrir les problèmes.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Windows', 'Google', 'Apple', 'Amazon'].map((tech, index) => (
                    <div
                      key={tech}
                      className="bg-bg-card p-4 rounded-lg border border-white/10 text-center hover:border-neon-blue cursor-pointer transition-colors"
                      onClick={() => {
                        alert(`Problème trouvé : ${tech}\n\n• Coûts de licences élevés\n• Obsolescence programmée\n• Dépendance technologique\n• Stockage des données externalisé`);
                      }}
                    >
                      <div className="text-4xl mb-2">
                        {index === 0 ? '🪟' : index === 1 ? '🔍' : index === 2 ? '🍎' : '📦'}
                      </div>
                      <h3 className="font-bold text-neon-red">{tech}</h3>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-4 bg-bg-card border border-neon-green rounded-lg">
                  <h3 className="text-lg font-bold text-neon-green mb-2">📊 Rapport d'Audit</h3>
                  <p className="text-text-secondary">
                    Problèmes identifiés : 4/4
                  </p>
                  <Button
                    variant="success"
                    className="mt-4"
                    onClick={() => handleLevelComplete(1)}
                  >
                    ✓ NIVEAU 1 COMPLÉTÉ
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="level-container">
            <div className="level-content">
              <div className="level-header">
                <h1 className="level-title">NIVEAU 2</h1>
                <p className="level-subtitle">
                  Assemble un ordinateur reconditionné avec Linux et les logiciels libres
                </p>
              </div>
              <div className="drag-drop-zone">
                <h2 className="text-2xl font-bold text-neon-green mb-4">Assemblage PC</h2>
                <p className="text-text-secondary mb-6">
                  Glisse-dépose les composants pour assembler l'ordinateur
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {['🖥️ Vieux PC', '🐧 Linux', '🌐 Firefox', '📝 LibreOffice', '🎨 GIMP', '💾 Nextcloud'].map((item) => (
                    <div
                      key={item}
                      className="bg-bg-card p-4 rounded-lg border border-white/10 text-center cursor-move"
                      draggable
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-black/30 rounded-lg border-2 border-dashed border-neon-blue">
                  <p className="text-neon-blue">Zone d'assemblage</p>
                  <p className="text-sm text-text-secondary">Dépose les composants ici</p>
                </div>
                <Button
                  variant="success"
                  className="mt-6"
                  onClick={() => {
                    alert('Ton ordi n\'est pas vieux, il est juste prisonnier !\n\n✅ PC reconditionné\n✅ Linux installé\n✅ Logiciels libres prêts');
                    handleLevelComplete(2);
                  }}
                >
                  🎮 ASSEMBLAGE TERMINÉ
                </Button>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="level-container">
            <div className="level-content">
              <div className="level-header">
                <h1 className="level-title">NIVEAU 3</h1>
                <p className="level-subtitle">
                  Convaincs les personnages du lycée avec des arguments solides
                </p>
              </div>
              <div className="dialogue-container">
                <div className="flex items-start gap-4 mb-6">
                  <div className="character-avatar bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-2xl">
                    👨‍🏫
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-neon-purple">Professeur Sceptique</h3>
                    <p className="text-text-secondary mt-2">
                      "Mais les logiciels libres sont compliqués, non ? Et mes fichiers PowerPoint ?"
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-bold text-neon-blue">Choisis ta réponse :</h4>
                  {[
                    "LibreOffice peut lire et éditer les fichiers PowerPoint",
                    "C'est vrai, c'est trop compliqué",
                    "On peut garder Windows pour toi"
                  ].map((answer, index) => (
                    <button
                      key={index}
                      className="w-full p-4 text-left bg-bg-card rounded-lg border border-white/10 hover:border-neon-blue transition-colors"
                      onClick={() => {
                        if (index === 0) {
                          alert('✅ Bonne réponse !\n+50 points de Résistance\nLe professeur est convaincu !');
                          handleLevelComplete(3);
                        } else {
                          alert('❌ Mauvaise réponse\nEssaie encore !');
                        }
                      }}
                    >
                      {answer}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="level-container">
            <div className="level-content">
              <div className="level-header">
                <h1 className="level-title">NIVEAU 4</h1>
                <p className="level-subtitle">
                  Libère le lycée avec des choix stratégiques
                </p>
              </div>
              <div className="simulator-panel">
                <h2 className="text-2xl font-bold text-neon-green mb-6">Simulateur NIRD</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="metric-display">
                    <div className="text-sm text-text-secondary mb-1">PC Reconditionnés</div>
                    <div className="metric-value">15</div>
                  </div>
                  <div className="metric-display">
                    <div className="text-sm text-text-secondary mb-1">Économies Annuelles</div>
                    <div className="metric-value">12k€</div>
                  </div>
                  <div className="metric-display">
                    <div className="text-sm text-text-secondary mb-1">Émissions CO2 Évitée</div>
                    <div className="metric-value">3.5T</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-text-secondary mb-2">Nombre de PC à reconditionner</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="50" 
                      defaultValue="15"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-text-secondary mb-2">Logiciels à installer</label>
                    <div className="flex flex-wrap gap-2">
                      {['Linux', 'LibreOffice', 'Nextcloud', 'GIMP', 'Firefox'].map(soft => (
                        <label key={soft} className="flex items-center gap-2">
                          <input type="checkbox" defaultChecked />
                          <span>{soft}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    variant="success"
                    className="w-full mt-6"
                    onClick={() => {
                      alert('🎉 Le lycée est libéré !\n\n✅ Transformation complète\n✅ Village Numérique Résistant activé\n✅ Indicateurs au vert');
                      handleLevelComplete(4);
                    }}
                  >
                    🚀 DÉCLENCHER LA LIBÉRATION
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'end':
        return (
          <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
            <div className="max-w-2xl bg-bg-card border-2 border-neon-green rounded-2xl p-8 text-center animate-slide-up">
              <h1 className="text-5xl font-bold text-neon-green mb-4">🎉 MISSION ACCOMPLIE !</h1>
              <p className="text-xl text-text-secondary mb-6">
                Le lycée est maintenant un <span className="text-neon-green">Village Numérique Résistant</span> !
              </p>
              
              <div className="bg-bg-darker rounded-xl p-6 mb-6">
                <h2 className="text-2xl font-bold text-neon-blue mb-4">📊 TES STATS</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-neon-purple">{playerProgress.resistancePoints}</div>
                    <div className="text-sm text-text-secondary">Points de Résistance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-neon-green">4/4</div>
                    <div className="text-sm text-text-secondary">Niveaux Complétés</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  variant="primary"
                  size="large"
                  className="w-full"
                  onClick={() => {
                    const pdfContent = `
                      PLAN D'ACTION POUR LIBÉRER TON ÉCOLE
                      
                      Félicitations ! Tu as complété la mission NIRD.
                      
                      Voici ton plan d'action personnalisé :
                      
                      1. AUDIT INITIAL
                      - Identifier les dépendances aux Big Tech
                      - Évaluer les coûts actuels
                      - Analyser l'obsolescence programmée
                      
                      2. MIGRATION PROGRESSIVE
                      - Commencer avec 2-3 postes Linux
                      - Former une équipe pilote
                      - Tester les logiciels libres
                      
                      3. FORMATION
                      - Organiser des ateliers NIRD
                      - Créer des tutoriels simples
                      - Impliquer les élèves
                      
                      4. DÉPLOIEMENT
                      - Réutiliser le vieux matériel
                      - Installer Linux + logiciels libres
                      - Mettre en place le cloud local
                      
                      Points de Résistance acquis : ${playerProgress.resistancePoints}
                      
                      NIRD - Numérique Inclusif, Responsable et Durable
                      www.nird-resistance.fr
                    `;
                    
                    const blob = new Blob([pdfContent], { type: 'application/pdf' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'plan-action-nird.pdf';
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                >
                  📄 TÉLÉCHARGER LE PLAN D'ACTION
                </Button>
                
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => handleNavigation('home')}
                >
                  🏠 RETOUR À L'ACCUEIL
                </Button>
              </div>
            </div>
          </div>
        );
      default:
        return <Home onStartGame={handleStartGame} />;
    }
  };

  const renderNavigation = () => {
    if (currentLevel === 'home' || currentLevel === 'end') return null;

    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-bg-dark/90 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="small"
              onClick={() => handleNavigation('home')}
            >
              ← Accueil
            </Button>
            
            <div className="flex items-center gap-6">
              {[1, 2, 3, 4].map(level => (
                <button
                  key={level}
                  onClick={() => handleNavigation(level as any)}
                  className={`
                    relative w-10 h-10 rounded-full flex items-center justify-center
                    transition-all duration-300
                    ${currentLevel === level 
                      ? 'bg-neon-blue text-white glow-blue' 
                      : playerProgress[`level${level}Completed` as keyof typeof playerProgress]
                        ? 'bg-neon-green/20 text-neon-green border border-neon-green'
                        : 'bg-bg-card text-text-secondary border border-white/10'
                    }
                    hover:scale-110 hover:glow-blue
                  `}
                >
                  {level}
                  {playerProgress[`level${level}Completed` as keyof typeof playerProgress] && (
                    <span className="absolute -top-1 -right-1">✓</span>
                  )}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-sm text-text-secondary">
                <span className="text-neon-green">★</span> {playerProgress.resistancePoints} pts
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      {renderNavigation()}
      <main className="pt-16">
        {renderLevel()}
      </main>
    </div>
  );
};

export default App;