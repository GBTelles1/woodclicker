import { useContext } from "react";
import { MinigameContext } from "../../contexts/MinigameContext";
import { LetterSequence } from "./components/LetterSequence";
import { TimerComponent } from "./components/Timer";
import gameWonGif from '../../assets/picapau_gamewon.gif';
import gameLostGif from '../../assets/picapau_gamelost.gif';
import timeOutGif from '../../assets/timeout.gif';
import styles from './MinigameBox.module.css'

const gifMessageUrl = {
  'Good Game!': gameWonGif,
  'Time Out! Game Over!': timeOutGif,
  'Oh, not this letter... Game Over!': gameLostGif,
};

export function MinigameBox() {
  const {
    gameState,
    startMinigame,
    restartMinigame,
  } = useContext(MinigameContext);

  return (
    <div className={styles.minigameBox}>
      <h2>
        Hey! Follow the sequence on your keyboard
      </h2>

      {gameState.gameStarted && (
        <>
          <LetterSequence />
          <TimerComponent />
        </>
      )}
      
      {/* Displays a message only if the game has finished */}
      {gameState.gameResultMessage !== '' && (
        <div className={styles.gameMessageContainer}>
          <span>{gameState.gameResultMessage}</span>
          <img
            src={gifMessageUrl[gameState.gameResultMessage]}
            alt={`${gameState.gameResultMessage} Gif`}
          />
        </div>
      )}

      {gameState.gameStarted ? (
        <button onClick={() => restartMinigame()}>Restart</button>
      ) : (
        <button onClick={() => startMinigame()}>Start</button>
      )}
    </div>
  )
}
