
import React from 'react';

interface ManualProps {
  onClose: () => void;
}

export const ManualScreen: React.FC<ManualProps> = ({ onClose }) => {
  // Fonction de téléchargement supprimée car le bouton a été retiré.

  return (
    <div className="fixed inset-0 z-[100000] bg-[#020b14] overflow-y-auto overflow-x-hidden flex flex-col items-center">
      
      {/* 1. Flèche de retour (Déplacée à top-24 pour éviter la navbar) */}
      <button 
        onClick={onClose}
        className="fixed top-24 left-6 z-[100002] text-[#00f0ff] hover:text-white font-mono font-bold text-lg flex items-center gap-3 transition-all group border border-transparent hover:border-[#00f0ff]/30 px-4 py-2 rounded bg-black/40 backdrop-blur-sm"
      >
        <span className="group-hover:-translate-x-1 transition-transform text-2xl">‹</span> 
        RETOUR MISSION
      </button>

      {/* Styles encapsulés pour le manuel */}
      <style>{`
        :root {
            --neon-cyan: #00f0ff;
            --dim-cyan: #005f66;
            --dark-bg: #020b14;
            --grid-line: #0a2e38;
            --text-white: #e0faff;
            --alert-red: #ff3333;
            --neon-green: #00ff99;
        }
        .manual-font { font-family: 'Share Tech Mono', monospace; }
        .manual-content * { box-sizing: border-box; }
        
        #printable {
            width: 794px;
            min-height: 1123px;
            background-color: var(--dark-bg);
            /* Marge ajustée car la barre du bas a été retirée */
            margin: 100px auto 50px auto;
            padding: 40px 50px;
            position: relative;
            overflow: hidden;
            color: var(--text-white);
            box-shadow: 0 0 50px rgba(0, 240, 255, 0.1);
        }

        #printable::before {
            content: "";
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background-image: 
                linear-gradient(var(--grid-line) 1px, transparent 1px),
                linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
            background-size: 40px 40px;
            opacity: 0.4;
            pointer-events: none;
            z-index: 0;
        }

        .content-layer {
            position: relative;
            z-index: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            text-align: left;
        }

        .main-title {
            text-align: center;
            color: var(--neon-cyan);
            font-size: 3.5rem;
            margin-top: 0;
            margin-bottom: 5px;
            text-shadow: 0 0 20px var(--dim-cyan);
            letter-spacing: 5px;
            text-transform: uppercase;
        }
        .sub-title {
            text-align: center;
            color: var(--dim-cyan);
            letter-spacing: 2px;
            margin-bottom: 30px;
            font-size: 1rem;
            text-transform: uppercase;
        }

        .section-header {
            display: flex;
            align-items: center;
            border-bottom: 1px dashed var(--dim-cyan);
            padding-bottom: 8px;
            margin-top: 25px;
            margin-bottom: 15px;
        }
        
        .dot {
            width: 15px; height: 15px;
            border-radius: 50%;
            margin-right: 15px;
            box-shadow: 0 0 10px currentColor;
        }
        .dot.red { background-color: var(--alert-red); color: var(--alert-red); }
        .dot.green { background-color: var(--neon-green); color: var(--neon-green); }
        .dot.blue { background-color: var(--neon-cyan); color: var(--neon-cyan); }

        .manual-h2 {
            margin: 0;
            font-size: 1.6rem;
            color: var(--text-white);
            text-transform: uppercase;
        }
        
        .manual-p, .manual-li {
            font-family: 'Courier Prime', monospace;
            line-height: 1.4;
            font-size: 1.05rem;
            color: #ccf6ff;
            margin-bottom: 12px;
        }
        
        .highlight { color: var(--neon-cyan); font-weight: bold; }
        .bg-alert { background: var(--alert-red); color: black; padding: 2px 6px; font-weight: bold; }
        .bg-mission { background: var(--neon-green); color: black; padding: 2px 6px; font-weight: bold; }

        .manual-ul { padding-left: 10px; list-style: none; margin-top: 5px; }
        .manual-li { margin-bottom: 8px; }
        .manual-li::before {
            content: ">";
            color: var(--neon-cyan);
            margin-right: 10px;
            font-weight: bold;
        }

        .tech-grid {
            display: flex;
            justify-content: space-between;
            gap: 10px;
            margin-top: 10px;
        }
        .tech-box {
            border: 1px solid var(--dim-cyan);
            padding: 10px;
            flex: 1;
            text-align: center;
            font-size: 0.85rem;
            color: var(--neon-cyan);
            background: rgba(0,0,0,0.3);
        }

        .footer {
            text-align: center;
            font-size: 0.8rem;
            color: var(--dim-cyan);
            border-top: 1px solid #1a1a1a;
            padding-top: 15px;
            margin-top: 50px; 
        }
      `}</style>

      <div id="printable" className="manual-font manual-content">
        <div className="content-layer">
            
            <div>
                {/* TITLE */}
                <h1 className="main-title">RESISTECH</h1>
                <div className="sub-title">OFFICIAL RESISTANCE MANUAL V1.0</div>

                {/* LEVEL 1 */}
                <div className="section-header">
                    <div className="dot red"></div>
                    <h2 className="manual-h2">LEVEL 1: THE GLITCH</h2>
                </div>
                
                <p className="manual-p">
                    <span className="bg-alert">STATUS: CRITICAL</span> 
                    <span style={{color: 'var(--alert-red)', marginLeft: '8px'}}>Enemy: Planned Obsolescence.</span>
                </p>
                <p className="manual-p">
                    We face a massive bug in the system. <span className="highlight">Windows 10 support is ending</span>, and schools are about to throw away perfectly good hardware. That is expensive, wasteful, and not very "NIRD".
                </p>

                {/* LEVEL 2 */}
                <div className="section-header">
                    <div className="dot green"></div>
                    <h2 className="manual-h2">LEVEL 2: THE PATCH</h2>
                </div>

                <p className="manual-p">
                    <span className="bg-mission">MISSION</span> Turn schools into digital fortresses.
                </p>
                <p className="manual-p">
                    <span className="highlight">Resistech</span> is an interactive web experience that trains students to fight back against digital waste. We don't just complain; we upgrade:
                </p>

                <ul className="manual-ul">
                    <li className="manual-li"><strong>Diagnose:</strong> Is your PC dead or just acting dramatic?</li>
                    <li className="manual-li"><strong>Revive:</strong> Install Linux (The Excalibur of OS).</li>
                    <li className="manual-li"><strong>Sustain:</strong> Build a lasting digital ecosystem.</li>
                </ul>

                {/* SPECS */}
                <div className="section-header">
                    <div className="dot blue"></div>
                    <h2 className="manual-h2">SYSTEM SPECS</h2>
                </div>
                <p className="manual-p">Built with love, caffeine, and open standards.</p>
                
                <div className="tech-grid">
                    <div className="tech-box">HTML/CSS/JS</div>
                    <div className="tech-box">Pixel Art Assets</div>
                    <div className="tech-box">Netlify Hosting</div>
                    <div className="tech-box">Open Source</div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="footer">
                CREDITS: Team Let's Code <br />
                EVENT: Nuit de l'Info 2025 <br />
                "Made by caffeine and anxiety"
            </div>

        </div>
      </div>

    </div>
  );
};