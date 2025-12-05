import React, { useState } from 'react';
import Layout from './components/Layout';
import { GameStage, GameState } from './types';
import { IntroScreen, OutroScreen } from './components/StoryScreens';
import Level1Audit from './components/Level1Audit';
import Level2Recondition from './components/Level2Recondition';
import Level3Convince from './components/Level3Convince';
import Level4Liberate from './components/Level4Liberate';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    stage: GameStage.INTRO,
    score: 0,
    inventory: [],
    levelProgress: 0,
  });

  const addScore = (amount: number) => {
    setGameState(prev => ({ ...prev, score: prev.score + amount }));
  };

  const advanceStage = () => {
    setGameState(prev => {
      let nextStage = prev.stage;
      switch (prev.stage) {
        case GameStage.INTRO: nextStage = GameStage.LEVEL_1_AUDIT; break;
        case GameStage.LEVEL_1_AUDIT: nextStage = GameStage.LEVEL_2_RECONDITION; break;
        case GameStage.LEVEL_2_RECONDITION: nextStage = GameStage.LEVEL_3_CONVINCE; break;
        case GameStage.LEVEL_3_CONVINCE: nextStage = GameStage.LEVEL_4_LIBERATE; break;
        case GameStage.LEVEL_4_LIBERATE: nextStage = GameStage.VICTORY; break;
        case GameStage.VICTORY: nextStage = GameStage.INTRO; break;
      }
      return { ...prev, stage: nextStage };
    });
  };
  
  const resetGame = () => {
      setGameState({
        stage: GameStage.INTRO,
        score: 0,
        inventory: [],
        levelProgress: 0
      });
  };

  const renderStage = () => {
    switch (gameState.stage) {
      case GameStage.INTRO:
        return <IntroScreen onStart={advanceStage} />;
      case GameStage.LEVEL_1_AUDIT:
        return <Level1Audit onComplete={advanceStage} addScore={addScore} />;
      case GameStage.LEVEL_2_RECONDITION:
        return <Level2Recondition onComplete={advanceStage} addScore={addScore} />;
      case GameStage.LEVEL_3_CONVINCE:
        return <Level3Convince onComplete={advanceStage} addScore={addScore} />;
      case GameStage.LEVEL_4_LIBERATE:
        return <Level4Liberate onComplete={advanceStage} addScore={addScore} />;
      case GameStage.VICTORY:
        return <OutroScreen score={gameState.score} onReset={resetGame} />;
      default:
        return <div>Erreur système</div>;
    }
  };

  // Calculate generic progress based on stage index
  const getProgress = () => {
      const stages = Object.values(GameStage);
      const currentIndex = stages.indexOf(gameState.stage);
      return Math.round((currentIndex / (stages.length - 1)) * 100);
  };

  return (
    <Layout stage={gameState.stage} score={gameState.score} resistanceLevel={getProgress()}>
      {renderStage()}
    </Layout>
  );
};

export default App;