import { useContext } from "react";
import { MinigameContext } from "../../contexts/MinigameContext";
import styles from './GameDifficultySection.module.css';

export function GameDifficultySection() {
  const {
    gameState,
    gameDifficulty,
    changeDifficulty
  } = useContext(MinigameContext);

  const onGoingGame = gameState.gameStarted && !gameState.gameFinished;
  return (
    <section className={styles.gameDifficultySection}>
      <h3>Choose the difficulty</h3>
      <div className={styles.gameDifficultyButtons}>
        <button onClick={() => changeDifficulty('Easy')} disabled={onGoingGame}>
          Easy
        </button>
        <button onClick={() => changeDifficulty('Medium')} disabled={onGoingGame}>
          Medium
        </button>
        <button onClick={() => changeDifficulty('Hard')} disabled={onGoingGame}>
          Hard
        </button>
      </div>
      <span className={styles.currentDifficultyText}>
        Current difficulty: <b>{gameDifficulty}</b>
      </span>
    </section>
  )
}