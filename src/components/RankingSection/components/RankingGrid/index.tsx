import { useContext } from "react";
import { MinigameContext } from "../../../../contexts/MinigameContext";
import styles from './RankingGrid.module.css';

export function RankingGrid() {
  const { currentLocalProgress } = useContext(MinigameContext);
  const hasLocalProgressData = currentLocalProgress.length > 0;

  // It sorts the progress in descending order and get the top 5
  const progressOrdered = currentLocalProgress.sort((a, b) => {
    return b.points - a.points
  }).slice(0, 5);

  return (
    <div className={styles.rankingGrid}>
      <header>
        <div>User</div>
        <div>Points</div>
      </header>
      
      <div className={styles.scoresContainer}>
        {hasLocalProgressData && (
          progressOrdered.map((userScore, index) => {
            return (
              <div key={index} className={styles.userScore}>
                <span>{userScore.username}</span>
                <span>{userScore.points}</span>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}