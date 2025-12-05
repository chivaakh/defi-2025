import React, { useState } from 'react';
import { CHARACTERS } from '../constants';
import { Character } from '../types';
import { MessageCircle, Users } from 'lucide-react';

interface Props {
  onComplete: () => void;
  addScore: (amount: number) => void;
}

const Level3Convince: React.FC<Props> = ({ onComplete, addScore }) => {
  const [activeCharIndex, setActiveCharIndex] = useState(0);
  const [characters, setCharacters] = useState<Character[]>(CHARACTERS);
  const [feedback, setFeedback] = useState<string | null>(null);
  
  const currentChar = characters[activeCharIndex];

  const handleOption = (isCorrect: boolean, feedbackText: string) => {
    setFeedback(feedbackText);
    
    if (isCorrect) {
        addScore(150);
        const updatedChars = [...characters];
        updatedChars[activeCharIndex].convinced = true;
        setCharacters(updatedChars);
    }
  };

  const nextCharacter = () => {
    setFeedback(null);
    if (activeCharIndex < characters.length - 1) {
        setActiveCharIndex(prev => prev + 1);
    } else {
        onComplete();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto gap-6">
       <div className="bg-nird-panel/80 p-6 border-l-4 border-purple-500">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Users /> SOCIAL ENGINEERING
        </h2>
        <p className="text-cyan-200">
          La technologie ne suffit pas. Il faut convaincre les humains. <br/>
          Choisissez les bons arguments pour rallier le lycée à la cause NIRD.
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        
        {/* Character Card */}
        <div className="w-full bg-slate-800 border border-cyan-700 rounded-xl overflow-hidden shadow-2xl relative">
            <div className={`h-2 w-full absolute top-0 left-0 transition-all duration-500 ${currentChar.convinced ? 'bg-nird-neonGreen' : 'bg-gray-600'}`}></div>
            
            <div className="p-8 text-center border-b border-gray-700 bg-slate-900/50">
                <div className="text-6xl mb-4 transform hover:scale-110 transition-transform cursor-default">{currentChar.avatar}</div>
                <h3 className="text-2xl font-bold text-white">{currentChar.name}</h3>
                <span className="text-xs uppercase tracking-widest text-cyan-500">{currentChar.role}</span>
                
                <div className="mt-6 bg-cyan-900/20 p-4 rounded-lg border border-cyan-900/50">
                    <p className="italic text-cyan-100">"{currentChar.intro}"</p>
                </div>
            </div>

            <div className="p-6 bg-slate-800">
                {!feedback ? (
                    <div className="flex flex-col gap-3">
                        {currentChar.options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleOption(opt.isCorrect, opt.feedback)}
                                className="text-left p-4 rounded bg-slate-700 hover:bg-cyan-900/30 border border-slate-600 hover:border-cyan-500 transition-all group"
                            >
                                <span className="text-gray-400 group-hover:text-nird-neonBlue mr-3 font-mono">{idx + 1}.</span>
                                {opt.text}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-4">
                        <p className={`text-lg mb-6 ${currentChar.convinced ? 'text-nird-neonGreen' : 'text-red-400'}`}>
                            {feedback}
                        </p>
                        
                        {currentChar.convinced ? (
                            <button 
                                onClick={nextCharacter}
                                className="bg-nird-neonBlue hover:bg-cyan-400 text-black px-6 py-2 rounded font-bold"
                            >
                                {activeCharIndex === characters.length - 1 ? "TERMINER LA MISSION" : "PERSONNAGE SUIVANT"}
                            </button>
                        ) : (
                            <button 
                                onClick={() => setFeedback(null)}
                                className="text-gray-400 underline hover:text-white"
                            >
                                Réessayer une autre approche
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>

        <div className="mt-4 flex gap-2">
            {characters.map((c, i) => (
                <div key={i} className={`w-3 h-3 rounded-full ${i === activeCharIndex ? 'bg-white' : (c.convinced ? 'bg-nird-neonGreen' : 'bg-gray-700')}`}></div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default Level3Convince;