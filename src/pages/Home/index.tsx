import { useContext } from 'react';
import { MinigameBox } from '../../components/MinigameBox';
import { MinigameContext } from '../../contexts/MinigameContext';
import { AboutGame } from '../../components/AboutGame';
import { RankingSection } from '../../components/RankingSection';
import { SaveUsernameForm } from '../../components/SaveUsernameForm';
import styles from './Home.module.css';
import { GameDifficultySection } from '../../components/GameDifficultySection';

export function Home() {
  const { username } = useContext(MinigameContext);

  return (
    <main className={styles.gamePage}>
      <div>
        <h1 className={styles.pageTitle}>
          Welcome to the WoodClicker
        </h1>

        <AboutGame />

        <SaveUsernameForm />

        {username !== 'Anonymous User' && (
          <p className={styles.username}>Hi, <b>{username}</b>!</p>
        )}
      </div>
      
      <GameDifficultySection />

      <MinigameBox />

      <RankingSection />
    </main>
  )
}
