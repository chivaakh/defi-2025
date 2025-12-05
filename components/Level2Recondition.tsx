import React, { useState } from 'react';
import { Cpu, Save, Trash2, ArrowRight, RefreshCw, Box } from 'lucide-react';

interface Props {
  onComplete: () => void;
  addScore: (amount: number) => void;
}

const Level2Recondition: React.FC<Props> = ({ onComplete, addScore }) => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [computerState, setComputerState] = useState<'dirty' | 'hardware_ok' | 'software_ok'>('dirty');
  const [feedback, setFeedback] = useState("Diagnostique en cours... L'ordinateur est lent et encombré.");

  const handleToolClick = (tool: string) => {
    if (computerState === 'dirty') {
        if (tool === 'windows') {
            setFeedback("Erreur: Windows est trop lourd pour ce vieux PC !");
        } else if (tool === 'ssd') {
            setComputerState('hardware_ok');
            setFeedback("Succès ! Le disque dur mécanique est remplacé par un SSD rapide.");
            addScore(50);
        } else {
            setFeedback("Ce n'est pas la priorité.");
        }
    } else if (computerState === 'hardware_ok') {
        if (tool === 'linux') {
            setComputerState('software_ok');
            setFeedback("Succès ! Linux Mint installé. Système léger, sécurisé et rapide.");
            addScore(100);
        } else if (tool === 'windows') {
            setFeedback("Attention ! Licence payante détectée + ralentissements. Essayez autre chose.");
        } else {
            setFeedback("Matériel déjà optimisé. Il faut un OS maintenant.");
        }
    }
  };

  return (
    <div className="flex flex-col h-full gap-6">
       <div className="bg-nird-panel/80 p-6 border-l-4 border-nird-neonGreen">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <RefreshCw /> ATELIER DE RECONDITIONNEMENT
        </h2>
        <p className="text-cyan-200">
          Ne jetez rien ! Cet ordinateur est considéré "obsolète". <br/>
          Réparez-le avec les bons outils pour prouver qu'il peut encore servir.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-center flex-1">
        
        {/* Tools Palette */}
        <div className="flex flex-col gap-4">
            <h3 className="text-center text-cyan-500 font-mono">BOÎTE À OUTILS</h3>
            <div className="grid grid-cols-2 gap-4">
                <button 
                    onClick={() => handleToolClick('windows')}
                    className="p-4 bg-blue-900/40 border border-blue-600 rounded hover:bg-blue-800/60 transition text-center"
                >
                    <div className="text-2xl mb-2">🪟</div>
                    <div className="text-xs">OS Propriétaire</div>
                    <div className="text-[10px] text-red-400">Lourd & Cher</div>
                </button>
                <button 
                    onClick={() => handleToolClick('linux')}
                    className="p-4 bg-orange-900/40 border border-orange-500 rounded hover:bg-orange-800/60 transition text-center"
                >
                    <div className="text-2xl mb-2">🐧</div>
                    <div className="text-xs">Linux Léger</div>
                    <div className="text-[10px] text-green-400">Gratuit & Rapide</div>
                </button>
                 <button 
                    onClick={() => handleToolClick('ssd')}
                    className="p-4 bg-gray-800 border border-gray-500 rounded hover:bg-gray-700 transition text-center"
                >
                    <div className="text-2xl mb-2">💾</div>
                    <div className="text-xs">Disque SSD</div>
                    <div className="text-[10px] text-green-400">Boost Vitesse</div>
                </button>
                 <button 
                    onClick={() => handleToolClick('trash')}
                    className="p-4 bg-red-900/20 border border-red-800 rounded hover:bg-red-900/40 transition text-center opacity-50 cursor-not-allowed"
                >
                    <div className="text-2xl mb-2">🗑️</div>
                    <div className="text-xs">Jeter PC</div>
                </button>
            </div>
        </div>

        <ArrowRight className="hidden md:block text-gray-600" size={40} />

        {/* Workbench */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 bg-gray-900 rounded-xl border-2 border-dashed border-gray-600 flex items-center justify-center flex-col p-6 shadow-inner">
            {computerState === 'dirty' && (
                 <>
                    <div className="text-6xl mb-4 animate-pulse grayscale opacity-50">🖥️</div>
                    <div className="text-red-500 font-mono text-center">ÉTAT: LENT / SALE</div>
                 </>
            )}
            {computerState === 'hardware_ok' && (
                 <>
                    <div className="text-6xl mb-4 text-yellow-500">🖥️</div>
                    <div className="text-yellow-400 font-mono text-center">ÉTAT: BOOSTÉ (NO OS)</div>
                 </>
            )}
            {computerState === 'software_ok' && (
                 <>
                    <div className="text-6xl mb-4 text-nird-neonGreen drop-shadow-[0_0_15px_rgba(0,255,159,0.8)]">🖥️</div>
                    <div className="text-nird-neonGreen font-mono text-center font-bold">ÉTAT: NIRD READY</div>
                 </>
            )}
        </div>

      </div>

      <div className="bg-black/50 p-4 border-t border-cyan-900 text-center">
        <p className={`text-lg font-mono mb-4 ${computerState === 'software_ok' ? 'text-nird-neonGreen' : 'text-cyan-300'}`}>
            {">"} {feedback}
        </p>
        
        {computerState === 'software_ok' && (
            <button 
                onClick={onComplete}
                className="bg-nird-neonGreen hover:bg-emerald-400 text-black font-bold py-2 px-8 rounded shadow-[0_0_20px_rgba(0,255,159,0.4)] transition-all animate-bounce"
            >
                VALIDER LE PROTOTYPE
            </button>
        )}
      </div>
    </div>
  );
};

export default Level2Recondition;