import { MinigameBox } from '../../components/MinigameBox';
import { AboutGame } from '../../components/AboutGame';
import { RankingSection } from '../../components/RankingSection';
import { SaveUsernameForm } from '../../components/SaveUsernameForm';
import { GameDifficultySection } from '../../components/GameDifficultySection';
import styles from './Home.module.css';
import woodclickerTitleImg from '../../assets/woodclickerTitle.png';

export function Home() {

  return (
    <main className={styles.gamePage}>
      <img src={woodclickerTitleImg} alt='Woodclicker title image' />
      <div>
        <AboutGame />

        <SaveUsernameForm />
      </div>
      
      <GameDifficultySection />

      <MinigameBox />

      <RankingSection />
    </main>
  )
}
