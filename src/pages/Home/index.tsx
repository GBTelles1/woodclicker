import { useContext } from 'react';
import { MinigameBox } from '../../components/MinigameBox';
import { MinigameContext } from '../../contexts/MinigameContext';
import { AboutGame } from '../../components/AboutGame';
import { RankingSection } from '../../components/RankingSection';
import { SaveUsernameForm } from '../../components/SaveUsernameForm';
import { GameDifficultySection } from '../../components/GameDifficultySection';
import styles from './Home.module.css';
import woodclickerTitleImg from '../../assets/woodclickerTitle.png';

export function Home() {
  const { username } = useContext(MinigameContext);

  return (
    <main className={styles.gamePage}>
      <img src={woodclickerTitleImg} alt='Woodclicker title image' />
      <div>
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
