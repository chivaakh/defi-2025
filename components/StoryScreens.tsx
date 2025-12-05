
import React, { useState } from 'react';
import { STORY_INTRO } from '../constants';
// Importation de l'image locale. 
// Assurez-vous que le fichier 'p.png' se trouve bien dans le dossier 'assets'.
import patrickProfile from '../assets/p.png';
import { ManualScreen } from './Manual';

interface IntroProps {
  onStart: () => void;
}

export const IntroScreen: React.FC<IntroProps> = ({ onStart }) => {
  const [showManual, setShowManual] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto relative">
      
      {showManual && <ManualScreen onClose={() => setShowManual(false)} />}

      {/* SECTION CHATBOT - Positionnée en haut à gauche (HUD) */}
      <div className="fixed top-24 left-8 z-50 animate-fade-in">
        <p className="text-[10px] text-cyan-600/80 uppercase tracking-widest mb-2 pl-2 text-left">Support Tactique</p>
        <a 
          href="https://patrick-lmoubeydel.netlify.app/" 
          className="group flex items-center gap-3 bg-slate-900/90 hover:bg-slate-800 border border-cyan-900/50 hover:border-nird-neonGreen p-1.5 pr-5 rounded-full transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(0,255,159,0.2)] cursor-pointer backdrop-blur-md"
        >
          <div className="relative">
            {/* Image de Patrick Star (Locale) */}
            <img 
              src={patrickProfile} 
              alt="Patrick Lmoubeydel" 
              className="w-12 h-12 rounded-full border border-cyan-500/30 group-hover:border-nird-neonGreen bg-slate-800 object-cover p-0.5 transition-colors"
            />
            <div className="absolute bottom-0.5 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-slate-900 rounded-full animate-pulse"></div>
          </div>
          
          <div className="text-left">
            <h3 className="text-cyan-50 font-bold text-sm group-hover:text-nird-neonGreen transition-colors">Patrick Lmoubeydel</h3>
            <div className="flex items-center gap-1.5 text-[10px] text-gray-400 group-hover:text-gray-300">
               <span className="w-1 h-1 bg-green-500 rounded-full inline-block"></span>
               IA d'assistance
            </div>
          </div>
        </a>
      </div>

      {/* BOUTON INFO / MANUEL - Positionné en haut à droite (HUD) */}
      <div className="fixed top-24 right-8 z-50 animate-fade-in">
        <p className="text-[10px] text-cyan-600/80 uppercase tracking-widest mb-2 pr-2 text-right">Base de Données</p>
        <button 
          onClick={() => setShowManual(true)}
          className="group flex items-center flex-row-reverse gap-3 bg-slate-900/90 hover:bg-slate-800 border border-cyan-900/50 hover:border-nird-neonBlue p-1.5 pl-5 rounded-full transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(0,201,255,0.2)] cursor-pointer backdrop-blur-md"
        >
          <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-cyan-500/30 group-hover:border-nird-neonBlue bg-slate-800 transition-colors">
            <span className="text-2xl">ℹ️</span>
          </div>
          
          <div className="text-right">
            <h3 className="text-cyan-50 font-bold text-sm group-hover:text-nird-neonBlue transition-colors">INFO</h3>
            <div className="flex items-center justify-end gap-1.5 text-[10px] text-gray-400 group-hover:text-gray-300">
               Document Classifié
               <span className="w-1 h-1 bg-cyan-500 rounded-full inline-block"></span>
            </div>
          </div>
        </button>
      </div>

      <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-nird-neonBlue to-nird-neonGreen mb-8 filter drop-shadow-[0_0_10px_rgba(0,201,255,0.5)]">
        N.I.R.D.
      </h1>
      <div className="bg-black/50 p-8 border border-nird-neonBlue/30 rounded-lg backdrop-blur-sm mb-8">
        <p className="font-mono text-lg leading-relaxed text-cyan-50 whitespace-pre-line">
          {STORY_INTRO}
        </p>
      </div>
      <button 
        onClick={onStart}
        className="px-8 py-4 bg-nird-neonBlue text-nird-dark font-bold text-xl rounded hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,201,255,0.6)] animate-pulse mb-12"
      >
        LANCER LA MISSION
      </button>
    </div>
  );
};

interface OutroProps {
  score: number;
  onReset: () => void;
}

export const OutroScreen: React.FC<OutroProps> = ({ score, onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto animate-fade-in">
      <div className="text-8xl mb-4">🏆</div>
      <h2 className="text-4xl font-bold text-nird-neonGreen mb-4">MISSION ACCOMPLIE</h2>
      
      <div className="bg-slate-900 p-8 rounded-xl border border-nird-neonGreen shadow-[0_0_30px_rgba(0,255,159,0.2)] mb-8 w-full">
        <div className="text-2xl mb-2 text-gray-400">SCORE FINAL DE RÉSISTANCE</div>
        <div className="text-6xl font-bold text-white mb-6">{score} XP</div>
        
        <div className="grid grid-cols-2 gap-4 text-left text-sm border-t border-gray-700 pt-6">
            <div>
                <span className="block text-gray-500">ÉTAT DU LYCÉE</span>
                <span className="text-nird-neonGreen font-bold">LIBÉRÉ</span>
            </div>
            <div>
                <span className="block text-gray-500">STATUS AGENT</span>
                <span className="text-nird-neonBlue font-bold">LÉGENDE NUMÉRIQUE</span>
            </div>
        </div>
      </div>

      <p className="text-cyan-200 mb-8 max-w-md">
        Vous avez prouvé qu'un numérique durable, libre et souverain est possible.
        Le village résiste encore et toujours à l'envahisseur.
      </p>

      <button 
        onClick={onReset}
        className="px-6 py-3 border border-nird-neonGreen text-nird-neonGreen rounded hover:bg-nird-neonGreen hover:text-black transition-all"
      >
        REJOUER LA SIMULATION
      </button>
    </div>
  );
};