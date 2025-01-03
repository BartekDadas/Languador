import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { PlayerCharacter } from './3d/PlayerCharacter';
import { AICharacter } from './3d/AICharacter';
import { BattleEnvironment } from './3d/BattleEnvironment';
import { ChallengeArea } from './ChallengeArea';
import { GameControls } from './GameControls';
import { GameHeader } from './GameHeader';
import { VictoryModal } from '../ui/VictoryModal';
import { useGameState } from '../../../hooks/useGameState';
import './BattleArena.css';

export function BattleArena() {
  const { gameState, handleAnswer, resetGame, isPaused, setIsPaused, showVictory } = useGameState();

  return (
    <div className="battle-arena">
      <div className="battle-canvas">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 5, 10]} />
          <OrbitControls
            enableZoom={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
          
          <BattleEnvironment />
          
          <PlayerCharacter
            position={[-2, 0, 0]}
            health={gameState.playerHealth}
            combo={gameState.playerCombo}
            isAttacking={gameState.playerIsAttacking}
          />
          
          <AICharacter
            position={[2, 0, 0]}
            health={gameState.aiHealth}
            level={gameState.aiLevel}
            mood={gameState.aiMood}
            isAttacking={gameState.aiIsAttacking}
          />
        </Canvas>
      </div>

      <div className="battle-ui">
        <GameHeader 
          level={gameState.level}
          topic={gameState.topic.name}
          score={gameState.score}
          isPaused={isPaused}
          onPause={() => setIsPaused(!isPaused)}
        />
        
        <ChallengeArea 
          question={gameState.currentQuestion}
          timeLeft={gameState.timeLeft}
          onAnswer={handleAnswer}
          disabled={isPaused}
        />

        <GameControls 
          onReset={resetGame}
          onPause={() => setIsPaused(!isPaused)}
          onFinishGame={() => {}}
          isPaused={isPaused}
        />

        {showVictory && (
          <VictoryModal
            score={gameState.score}
            onClose={resetGame}
          />
        )}
      </div>
    </div>
  );
}