import { useState } from 'react';
import gameEngine from './services/GameEngine.js';
import levelManager from './services/LevelManager.js';
import scoreManager from './services/ScoreManager.js';
import calculations from './utils/calculations.js';
import pdfGenerator from './services/PDFGenerator.js';

function TestBackend() {
  const [state, setState] = useState(gameEngine.getState());

  const handleAddPoints = () => {
    gameEngine.addResistancePoints(25);
    setState(gameEngine.getState());
  };

  const handleTestLevel1 = () => {
    gameEngine.changeLevel(1);
    gameEngine.addProblemFound('licenses');
    gameEngine.addProblemFound('obsolescence');
    setState(gameEngine.getState());
  };

  const handleTestLevel2 = () => {
    gameEngine.changeLevel(2);
    const parts = ['pc-case', 'motherboard', 'cpu', 'ram', 'disk', 'linux-os', 'libreoffice', 'firefox'];
    parts.forEach(part => gameEngine.addPartCollected(part));
    gameEngine.validatePCAssembly();
    setState(gameEngine.getState());
  };

  const handleGeneratePDF = async () => {
    const metrics = calculations.calculateMetrics({
      pcReconditioned: 25,
      softwaresInstalled: ['libreoffice', 'firefox'],
      trainingsLaunched: ['linux-basics']
    });
    
    await pdfGenerator.generatePDF(state, metrics, 'Chiva');
    pdfGenerator.download('Test_PDF_NIRD.pdf');
  };

  const ranking = scoreManager.getPlayerRanking();
  const progress = levelManager.getProgressPercentage();

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#0066CC' }}>🧪 Test Backend NIRD</h1>
      
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        padding: '30px', 
        borderRadius: '15px', 
        marginBottom: '30px',
        color: 'white'
      }}>
        <h2 style={{ marginTop: 0 }}>État Actuel du Jeu</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          <div>
            <p><strong>🎮 Niveau:</strong> {state.currentLevel}</p>
            <p><strong>⭐ Points:</strong> {state.resistancePoints} / {state.maxResistancePoints}</p>
          </div>
          <div>
            <p><strong>📊 Progression:</strong> {progress}%</p>
            <p><strong>🏆 Rang:</strong> {ranking.rank} {ranking.badge}</p>
          </div>
        </div>
      </div>

      <h3 style={{ color: '#333' }}>🎛️ Panneau de Contrôle</h3>
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '30px' }}>
        <button 
          onClick={handleAddPoints}
          style={{
            padding: '15px 25px',
            background: '#0066CC',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          ➕ Ajouter 25 points
        </button>

        <button 
          onClick={handleTestLevel1}
          style={{
            padding: '15px 25px',
            background: '#FF6B6B',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          🔍 Tester Niveau 1
        </button>

        <button 
          onClick={handleTestLevel2}
          style={{
            padding: '15px 25px',
            background: '#4ECDC4',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          🔧 Tester Niveau 2
        </button>

        <button 
          onClick={handleGeneratePDF}
          style={{
            padding: '15px 25px',
            background: '#00AA66',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          📄 Générer PDF
        </button>

        <button 
          onClick={() => {
            gameEngine.resetGame();
            setState(gameEngine.getState());
          }}
          style={{
            padding: '15px 25px',
            background: '#999',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          🔄 Reset
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '30px' }}>
        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px', borderLeft: '5px solid #FF6B6B' }}>
          <h4 style={{ marginTop: 0 }}>📍 Niveau 1 - Découvrir</h4>
          <p>Problèmes trouvés: {state.level1Data.problemsFound.length} / 4</p>
          <ul style={{ fontSize: '14px' }}>
            {state.level1Data.problemsFound.map((p: string) => (
              <li key={p}>✅ {p}</li>
            ))}
          </ul>
        </div>

        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px', borderLeft: '5px solid #4ECDC4' }}>
          <h4 style={{ marginTop: 0 }}>🔧 Niveau 2 - Préparer</h4>
          <p>Pièces collectées: {state.level2Data.partsCollected.length} / 8</p>
          <p>PC assemblé: {state.level2Data.pcAssembled ? '✅' : '❌'}</p>
        </div>

        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px', borderLeft: '5px solid #FFE66D' }}>
          <h4 style={{ marginTop: 0 }}>💬 Niveau 3 - Convaincre</h4>
          <p>Prof: {state.level3Data.professeurConvinced ? '✅' : '❌'}</p>
          <p>Élève: {state.level3Data.eleveConvinced ? '✅' : '❌'}</p>
          <p>Intendant: {state.level3Data.intendantConvinced ? '✅' : '❌'}</p>
        </div>

        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px', borderLeft: '5px solid #00AA66' }}>
          <h4 style={{ marginTop: 0 }}>🏆 Niveau 4 - Libérer</h4>
          <p>PC reconditionnés: {state.level4Data.pcReconditioned}</p>
          <p>Logiciels: {state.level4Data.softwaresInstalled.length}</p>
          <p>Formations: {state.level4Data.trainingsLaunched.length}</p>
        </div>
      </div>

      <details style={{ marginTop: '30px', background: '#fff3cd', padding: '15px', borderRadius: '8px' }}>
        <summary style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '18px' }}>
          🔍 Debug Info
        </summary>
        <pre style={{ 
          fontSize: '12px', 
          overflow: 'auto', 
          background: 'white', 
          padding: '15px', 
          borderRadius: '5px',
          marginTop: '10px'
        }}>
          {JSON.stringify(state, null, 2)}
        </pre>
      </details>
    </div>
  );
}

export default TestBackend;