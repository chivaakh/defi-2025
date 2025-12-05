import React from 'react';
import { STORY_INTRO } from '../constants';

interface IntroProps {
  onStart: () => void;
}

export const IntroScreen: React.FC<IntroProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto">
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
        className="px-8 py-4 bg-nird-neonBlue text-nird-dark font-bold text-xl rounded hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,201,255,0.6)] animate-pulse"
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