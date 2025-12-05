import React from 'react';
import { GameStage } from '../types';
import { Shield, Terminal, Zap } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  stage: GameStage;
  score: number;
  resistanceLevel: number; // 0-100
}

const Layout: React.FC<LayoutProps> = ({ children, stage, score, resistanceLevel }) => {
  return (
    <div className="min-h-screen bg-nird-dark text-cyan-50 font-mono relative overflow-hidden flex flex-col">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#00C9FF 1px, transparent 1px), linear-gradient(90deg, #00C9FF 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      
      {/* Scanline Effect */}
      <div className="scan-line"></div>

      {/* HUD Header */}
      <header className="relative z-20 bg-nird-panel/90 border-b border-nird-neonBlue/30 p-4 flex justify-between items-center shadow-[0_0_20px_rgba(0,201,255,0.2)]">
        <div className="flex items-center gap-3">
          <div className="bg-nird-neonBlue/10 p-2 rounded border border-nird-neonBlue">
            <Terminal size={24} className="text-nird-neonBlue" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider glow-text text-nird-neonBlue">N.I.R.D. OS</h1>
            <p className="text-xs text-cyan-400/70">INTERFACE AGENT V.4.2</p>
          </div>
        </div>

        <div className="flex gap-6 text-sm">
          <div className="flex flex-col items-end">
             <span className="text-xs text-gray-400">PHASE</span>
             <span className="font-bold text-nird-neonGreen">{stage.replace(/_/g, ' ')}</span>
          </div>
          <div className="flex flex-col items-end">
             <span className="text-xs text-gray-400">RÉSISTANCE</span>
             <div className="flex items-center gap-2">
                <Zap size={16} className={resistanceLevel > 50 ? "text-yellow-400" : "text-gray-600"} />
                <span className="font-bold text-white">{score} XP</span>
             </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 overflow-y-auto p-4 md:p-8 max-w-5xl mx-auto w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-20 text-center py-4 text-xs text-cyan-900/50 pointer-events-none">
        NIRD SYSTEM // ENCRYPTION ACTIVE // BIG TECH WATCHING YOU
      </footer>
    </div>
  );
};

export default Layout;