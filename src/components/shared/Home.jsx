import React, { useState } from 'react';
import Button from './Button';
import ProgressBar from './ProgressBar';
import '../../styles/animations.css';

const Home = ({ onStartGame }) => {
  const [showIntro, setShowIntro] = useState(true);

  const handleStartGame = () => {
    setShowIntro(false);
    setTimeout(() => {
      onStartGame();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              '--x-end': Math.random() * 2 - 1,
              animation: `particleFloat ${Math.random() * 3 + 2}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
              backgroundColor: i % 3 === 0 ? 'var(--neon-blue)' : 
                              i % 3 === 1 ? 'var(--neon-green)' : 'var(--neon-purple)',
            }}
          />
        ))}
      </div>

      {/* Screen transition */}
      <div className={`screen-transition ${showIntro ? '' : 'active'}`} />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        {showIntro ? (
          <div className="max-w-4xl mx-auto text-center animate-slide-up">
            {/* Logo/Title */}
            <div className="mb-12">
              <h1 className="text-6xl md:text-8xl font-black mb-4">
                <span className="text-neon-blue">NIRD</span>
                <span className="text-neon-green">.RESISTANCE</span>
              </h1>
              <p className="text-xl text-text-secondary">
                Numérique Inclusif, Responsable et Durable
              </p>
            </div>

            {/* Mission Briefing */}
            <div className="bg-bg-card/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8 glow-blue">
              <h2 className="text-3xl font-bold text-neon-green mb-4">
                🕵️‍♂️ MISSION BRIEFING
              </h2>
              
              <div className="space-y-4 text-lg text-text-secondary mb-6">
                <p>
                  <span className="text-neon-blue">Agent</span>, le lycée est sous contrôle des <span className="text-neon-red">Big Tech</span>.
                </p>
                <p>
                  Windows, Google, Apple imposent leurs règles. <span className="text-neon-red">Dépendance</span>, <span className="text-neon-red">coûts</span>, <span className="text-neon-red">obsolescence</span>...
                </p>
                <p>
                  Ta mission : les libérer et créer un <span className="text-neon-green">Village Numérique Résistant</span>.
                </p>
                <p className="text-neon-purple font-bold">
                  Suis la démarche NIRD. Deviens un agent du changement.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 border border-neon-blue/30 rounded-lg">
                  <div className="text-3xl font-bold text-neon-blue mb-2">4</div>
                  <div className="text-sm text-text-secondary">NIVEAUX</div>
                </div>
                <div className="text-center p-4 border border-neon-green/30 rounded-lg">
                  <div className="text-3xl font-bold text-neon-green mb-2">100%</div>
                  <div className="text-sm text-text-secondary">NUMÉRIQUE LIBRE</div>
                </div>
                <div className="text-center p-4 border border-neon-purple/30 rounded-lg">
                  <div className="text-3xl font-bold text-neon-purple mb-2">1</div>
                  <div className="text-sm text-text-secondary">LYCÉE À SAUVER</div>
                </div>
              </div>

              {/* Start Button */}
              <div className="flex flex-col items-center gap-6">
                <Button
                  onClick={handleStartGame}
                  variant="primary"
                  size="large"
                  className="text-xl px-12 py-6 animate-glow"
                >
                  🚀 DEVENIR AGENT NIRD
                </Button>
                
                <div className="text-sm text-text-muted flex items-center gap-2">
                  <span className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                  Mission prête au décollage
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="bg-bg-card/30 p-6 rounded-xl border border-white/5">
                <h3 className="text-neon-blue font-bold mb-3">🎮 EXPÉRIENCE LUDIQUE</h3>
                <p className="text-text-secondary text-sm">
                  Jeu interactif avec 4 niveaux progressifs, mini-jeux et défis
                </p>
              </div>
              <div className="bg-bg-card/30 p-6 rounded-xl border border-white/5">
                <h3 className="text-neon-green font-bold mb-3">📚 PÉDAGOGIQUE</h3>
                <p className="text-text-secondary text-sm">
                  Apprends les enjeux du numérique libre de manière simple et concrète
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Loading screen
          <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
            <div className="nird-loader mb-8" />
            <h2 className="text-3xl font-bold text-neon-blue mb-4">
              INITIALISATION DE LA MISSION...
            </h2>
            <ProgressBar progress={75} className="max-w-md" />
            <p className="text-text-secondary mt-4">
              Chargement des modules NIRD • Préparation du lycée • Activation des agents...
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-text-muted text-sm border-t border-white/5">
        <p>NIRD Resistance • Libérons le numérique, un établissement à la fois</p>
      </div>
    </div>
  );
};

export default Home;