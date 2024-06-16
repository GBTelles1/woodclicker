import { useContext } from 'react';
import styles from './Ranking.module.css';
import { MinigameContext } from '../../contexts/MinigameContext';
import { RankingGrid } from './components/RankingGrid';

export function RankingSection() {
  const { currentLocalProgress } = useContext(MinigameContext);
  const hasLocalProgressData = currentLocalProgress.length > 0;
  return (
    <section className={styles.rankingSection}>
      <h2 id='Ranking'>Top 5 Players</h2>
      {hasLocalProgressData ? (
        <RankingGrid />
      ) : (
        <div>
          It seems that is your first time. Welcome!
        </div>
      )}
    </section>
  )
}