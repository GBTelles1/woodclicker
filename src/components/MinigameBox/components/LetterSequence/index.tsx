import { useContext } from "react";
import styles from './LetterSequence.module.css';
import { MinigameContext } from "../../../../contexts/MinigameContext";

const backgroundColorsObj = {
  'Not Pressed': '',
  'Correctly': 'pressed',
  'Misspressed': 'misspressed'
} as const;

export function LetterSequence() {
  const { gameState } = useContext(MinigameContext);
  return (
    <div className={styles.sequence}>
      {gameState.letterSequence.map((letter, index) => {        
        const letterBackgroundColor = backgroundColorsObj[letter.howWasPressed];
        return (
          <div 
            key={index}
            className={
              `${styles.letter} ${styles[letterBackgroundColor]}`
            }
          >
            {letter.letter}
          </div>
        )
      })}
    </div>
  )
}
