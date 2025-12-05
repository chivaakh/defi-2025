import React, { useState } from 'react';
import { AUDIT_ITEMS } from '../constants';
import { AuditItem } from '../types';
import { Search, CheckCircle, AlertTriangle } from 'lucide-react';

interface Props {
  onComplete: () => void;
  addScore: (amount: number) => void;
}

const Level1Audit: React.FC<Props> = ({ onComplete, addScore }) => {
  const [items, setItems] = useState<AuditItem[]>(AUDIT_ITEMS);
  const [selectedItem, setSelectedItem] = useState<AuditItem | null>(null);

  const handleScan = (id: number) => {
    const updated = items.map(item => {
      if (item.id === id && !item.found) {
        addScore(100);
        setSelectedItem(item);
        return { ...item, found: true };
      }
      return item;
    });
    setItems(updated);

    // If item was already found, just show info again
    if (!selectedItem || selectedItem.id !== id) {
       setSelectedItem(items.find(i => i.id === id) || null);
    }
  };

  const allFound = items.every(i => i.found);

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="bg-nird-panel/80 p-6 border-l-4 border-nird-neonBlue">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Search /> MISSION: AUDIT
        </h2>
        <p className="text-cyan-200">
          Ce lycée semble normal, mais il cache des pièges numériques. 
          <br/>Trouvez les <span className="text-nird-neonBlue font-bold">4 anomalies</span> cachées dans l'image.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1">
        {/* The Scene */}
        <div className="relative flex-1 bg-black rounded-lg border border-cyan-800 overflow-hidden shadow-2xl min-h-[400px]">
           {/* Background Image Placeholder */}
           <img 
            src="https://picsum.photos/seed/techschool/800/600" 
            alt="Lycée sombre" 
            className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-1000"
           />
           
           <div className="absolute inset-0 bg-gradient-to-t from-nird-dark via-transparent to-transparent"></div>

           {/* Targets */}
           {items.map((item) => (
             <button
              key={item.id}
              onClick={() => handleScan(item.id)}
              style={{ top: `${item.y}%`, left: `${item.x}%` }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-300 group
                ${item.found ? 'bg-nird-neonGreen/20 ring-2 ring-nird-neonGreen' : 'bg-red-500/10 hover:bg-red-500/30 animate-pulse'}
              `}
             >
                <div className={`w-4 h-4 rounded-full ${item.found ? 'bg-nird-neonGreen' : 'bg-red-500'}`}></div>
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-black px-2 py-1 rounded text-white opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                  {item.found ? 'ANALYSÉ' : 'SIGNAL DÉTECTÉ'}
                </span>
             </button>
           ))}
        </div>

        {/* Info Panel */}
        <div className="w-full md:w-80 bg-nird-panel border border-cyan-900 p-4 flex flex-col gap-4">
          <h3 className="text-nird-neonBlue font-mono border-b border-cyan-900 pb-2">SCANNER LOG</h3>
          
          <div className="flex-1">
            {selectedItem ? (
              <div className="animate-fade-in">
                <div className="text-4xl mb-4">{selectedItem.icon}</div>
                <h4 className="text-xl font-bold text-white mb-2">{selectedItem.label}</h4>
                <p className="text-sm text-gray-300 leading-relaxed">{selectedItem.description}</p>
              </div>
            ) : (
              <div className="text-center text-gray-600 mt-10">
                <AlertTriangle className="mx-auto mb-2 opacity-50" />
                <p>En attente de données...</p>
                <p className="text-xs">Cliquez sur les points rouges.</p>
              </div>
            )}
          </div>

          <div className="mt-auto">
            <div className="flex justify-between text-xs mb-1">
              <span>PROGRESSION</span>
              <span>{items.filter(i => i.found).length} / 4</span>
            </div>
            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-nird-neonGreen h-full transition-all duration-500" 
                style={{ width: `${(items.filter(i => i.found).length / 4) * 100}%` }}
              ></div>
            </div>
            
            {allFound && (
              <button 
                onClick={onComplete}
                className="mt-4 w-full bg-nird-neonBlue hover:bg-cyan-400 text-black font-bold py-3 rounded shadow-[0_0_15px_rgba(0,201,255,0.5)] transition-all"
              >
                GÉNÉRER RAPPORT D'AUDIT
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Level1Audit;