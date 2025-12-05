import React, { useState, useEffect } from 'react';
import { SimulationStats } from '../types';
import { Activity, ShieldCheck, Leaf, Coins } from 'lucide-react';

interface Props {
  onComplete: () => void;
  addScore: (amount: number) => void;
}

const Level4Liberate: React.FC<Props> = ({ onComplete, addScore }) => {
  const [stats, setStats] = useState<SimulationStats>({
    budget: 50,
    security: 30,
    ecology: 20,
    autonomy: 10
  });

  const [message, setMessage] = useState("En attente des ordres...");

  // Win condition check
  useEffect(() => {
    if (stats.security > 80 && stats.ecology > 80 && stats.autonomy > 80 && stats.budget > 0) {
        setMessage("OBJECTIFS ATTEINTS ! LIBÉRATION IMMINENTE...");
        setTimeout(() => {
            onComplete();
        }, 2000);
    }
  }, [stats, onComplete]);

  const applyAction = (action: string) => {
    setStats(prev => {
        const newStats = { ...prev };
        let msg = "";

        switch(action) {
            case 'buy_new':
                newStats.budget -= 40;
                newStats.security += 10;
                newStats.ecology -= 20;
                msg = "Achat de matériel neuf : Le budget explose, l'impact carbone aussi.";
                break;
            case 'install_linux':
                newStats.budget += 0;
                newStats.security += 30;
                newStats.autonomy += 30;
                msg = "Migration Linux : Sécurité maximale, coût zéro !";
                break;
            case 'training':
                newStats.budget -= 10;
                newStats.autonomy += 20;
                newStats.security += 10;
                msg = "Formation Libre : Les élèves deviennent autonomes.";
                break;
            case 'recycle':
                newStats.budget += 10; // Save money vs buying
                newStats.ecology += 30;
                newStats.autonomy += 10;
                msg = "Recyclage : La planète vous remercie.";
                break;
        }
        setMessage(msg);
        return newStats;
    });
    addScore(50);
  };

  const StatBar = ({ label, value, icon, color }: any) => (
    <div className="mb-4">
        <div className="flex justify-between text-xs mb-1 uppercase tracking-wider text-gray-400">
            <span className="flex items-center gap-1">{icon} {label}</span>
            <span>{value}%</span>
        </div>
        <div className="h-4 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
            <div 
                className={`h-full transition-all duration-500 ${value > 80 ? 'animate-pulse' : ''}`}
                style={{ width: `${Math.max(0, Math.min(100, value))}%`, backgroundColor: color }}
            ></div>
        </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full gap-6">
       <div className="bg-nird-panel/80 p-6 border-l-4 border-nird-alert">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Activity /> SALLE DE CONTRÔLE
        </h2>
        <p className="text-cyan-200">
          Dernière étape. Prenez les commandes du lycée. <br/>
          Faites passer tous les indicateurs au vert sans ruiner le budget.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        
        {/* Dashboard */}
        <div className="bg-slate-900/80 p-6 rounded-xl border border-cyan-900 shadow-lg">
            <h3 className="text-nird-neonBlue font-mono mb-6 border-b border-cyan-900 pb-2">INDICATEURS CLÉS</h3>
            
            <StatBar label="Budget Restant" value={stats.budget} icon={<Coins size={14}/>} color={stats.budget < 20 ? '#FF0055' : '#EAB308'} />
            <StatBar label="Sécurité" value={stats.security} icon={<ShieldCheck size={14}/>} color="#00C9FF" />
            <StatBar label="Écologie" value={stats.ecology} icon={<Leaf size={14}/>} color="#22C55E" />
            <StatBar label="Autonomie" value={stats.autonomy} icon={<Activity size={14}/>} color="#A855F7" />

            <div className="mt-8 p-4 bg-black/40 border border-gray-700 rounded min-h-[80px] flex items-center justify-center text-center">
                <p className="font-mono text-sm text-cyan-300 type-writer">{message}</p>
            </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 gap-4">
             <button 
                onClick={() => applyAction('install_linux')}
                disabled={stats.autonomy >= 100}
                className="group p-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-nird-neonGreen rounded-lg text-left transition-all flex items-center gap-4"
             >
                <div className="p-3 bg-slate-900 rounded group-hover:bg-nird-neonGreen group-hover:text-black transition-colors">🐧</div>
                <div>
                    <div className="font-bold text-white">Installer Linux Mint</div>
                    <div className="text-xs text-gray-400">Coût: 0€ | +Sécurité | +Autonomie</div>
                </div>
             </button>

             <button 
                onClick={() => applyAction('recycle')}
                disabled={stats.ecology >= 100}
                className="group p-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-green-500 rounded-lg text-left transition-all flex items-center gap-4"
             >
                <div className="p-3 bg-slate-900 rounded group-hover:bg-green-500 group-hover:text-black transition-colors">♻️</div>
                <div>
                    <div className="font-bold text-white">Réparer & Reconditionner</div>
                    <div className="text-xs text-gray-400">Coût: Faible | +Écologie</div>
                </div>
             </button>

             <button 
                onClick={() => applyAction('training')}
                disabled={stats.budget <= 10}
                className="group p-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-purple-500 rounded-lg text-left transition-all flex items-center gap-4"
             >
                <div className="p-3 bg-slate-900 rounded group-hover:bg-purple-500 group-hover:text-black transition-colors">🎓</div>
                <div>
                    <div className="font-bold text-white">Formation Logiciels Libres</div>
                    <div className="text-xs text-gray-400">Coût: Moyen | +Autonomie | +Sécurité</div>
                </div>
             </button>

             <button 
                onClick={() => applyAction('buy_new')}
                className="group p-4 bg-slate-800 hover:bg-red-900/20 border border-slate-600 hover:border-red-500 rounded-lg text-left transition-all flex items-center gap-4 opacity-70"
             >
                <div className="p-3 bg-slate-900 rounded group-hover:bg-red-500 group-hover:text-white transition-colors">🍎</div>
                <div>
                    <div className="font-bold text-white">Acheter Parc Apple Neuf</div>
                    <div className="text-xs text-gray-400">Coût: ÉNORME | -Écologie</div>
                </div>
             </button>
        </div>

      </div>
    </div>
  );
};

export default Level4Liberate;