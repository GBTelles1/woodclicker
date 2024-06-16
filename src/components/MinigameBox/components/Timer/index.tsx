import { useContext } from 'react';
import { MinigameContext } from '../../../../contexts/MinigameContext';
import clockIcon from '../../../../assets/clock.svg';
import styles from './Timer.module.css';

export function TimerComponent() {
  const { gameState } = useContext(MinigameContext);
  
  return (
    <div className={styles.timerContainer}>
      <img src={clockIcon} alt='Clock Icon' />
      <span>Time left: {gameState.timeLeft}</span>
    </div>
  )
}