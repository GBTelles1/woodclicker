import { ReactNode, createContext, useEffect, useState } from "react";
import { GameDifficulties, GameState } from "../interfaces/GameState";
import { gameDifficulties } from "../constants/gameDifficulties";
import { LocalProgress } from "../interfaces/LocalProgress";
import { generateSequence } from "../utils/generateSequence";
import { alphabet } from "../constants/alphabet";

interface MinigameContextType {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  currentLetterIndex: number;
  gameState: GameState;
  startMinigame: () => void;
  restartMinigame: () => void;
  currentLocalProgress: LocalProgress[];
  changeDifficulty: (difficulty: GameDifficulties) => void;
  gameDifficulty: GameDifficulties;
};

export const MinigameContext = createContext({} as MinigameContextType)

interface MinigameContextProviderProps {
  children: ReactNode
}

export function MinigameContextProvider ({ children }: MinigameContextProviderProps) {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [gameDifficulty, setGameDifficulty] = useState<GameDifficulties>('Easy');
  const [gameState, setGameState] = useState<GameState>({
    ...gameDifficulties['Easy'],
    gameStarted: false,
    gameFinished: false,
    letterSequence: [],
    gameResultMessage: ''
  });
  const [username, setUsername] = useState<string>('Anonymous User');

  const [currentLocalProgress, setCurrentLocalProgress] = useState<LocalProgress[]>(() => {
    const initialLocalProgress = localStorage.getItem('@woodclicker:localProgress-state-0.0.0.0');

    if (initialLocalProgress) {
      return JSON.parse(initialLocalProgress);
    }
    return []
  });

  function generateGameResultMessage() {
    if (!gameState.gameStarted) return '';

    // Won the game if the last letter in the sequence was pressed correctly.
    const letterSequence = gameState.letterSequence;
    if (letterSequence[letterSequence.length - 1].howWasPressed === 'Correctly') {
      return 'Good Game!';
    };

    if (gameState.timeLeft === 0) return 'Time Out! Game Over!';

    return 'Oh, not this letter... Game Over!';
  };

  function startMinigame() {
    const letterSequence = generateSequence();
    setGameState((prevGameState) => {
      return {
        ...prevGameState,
        gameStarted: true,
        letterSequence,
        timeLeft: gameDifficulties[gameDifficulty].timeLeft
      }
    });
  };

  function finishMinigame() {
    // Progress saving logic
    // Every time the game finishes, it saves the progress on the localStorage
    const userHasLost = gameState.letterSequence[currentLetterIndex].howWasPressed === 'Misspressed';

    // The points are basically the remaining time when a game ends
    // If the game ends because of a misspressing (you've lost), the user receives 0 points
    // Another way to lose and receive 0 points is when the game times out (timeLeft = 0)
    const newProgress: LocalProgress = {
      username,
      points: userHasLost ? 0 : gameState.timeLeft * gameState.pointsMultiplier
    };

    const newLocalProgress: LocalProgress[] = [
      ...currentLocalProgress,
      newProgress
    ];
    
    setCurrentLocalProgress(() => newLocalProgress);
    
    const localProgressStateJSON = JSON.stringify(newLocalProgress);
    localStorage.setItem('@woodclicker:localProgress-state-0.0.0.0', localProgressStateJSON);

    const gameResultMessage = generateGameResultMessage();
    
    setGameState((prevGameState) => {
      return {
        ...prevGameState,
        gameFinished: true,
        gameResultMessage
      };
    });
  };

  function changeDifficulty(difficulty: GameDifficulties) {
    setGameDifficulty(difficulty);
    setGameState((prevGameState) => {
      return {
        ...prevGameState,
        timeLeft: gameDifficulties[difficulty].timeLeft,
        pointsMultiplier: gameDifficulties[difficulty].pointsMultiplier,
      }
    });
  };

  useEffect(() => {
    // Here's the timer logic
    // It begins when the game has started and it finishes the game when it goes to 0
    if (gameState.gameStarted && gameState.timeLeft > 0 && !gameState.gameFinished) {
      // Start the timer if a game is running
      const timer = setTimeout(() => {
        setGameState(prevGameState => {
          return {
            ...prevGameState,
            timeLeft: prevGameState.timeLeft - 1
          }
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [gameState]);
  
  useEffect(() => {
    // End game logic
    const letterSequence = gameState.letterSequence;
    // Ensure that when there's no letterSequence it doesn't do anything
    if (letterSequence.length === 0) return;
    
    // When the last letter in the sequence was pressed Correctly, it finishes the game: you've won!
    if (letterSequence[letterSequence.length - 1].howWasPressed === 'Correctly' && !gameState.gameFinished) {
      finishMinigame();
    };

    // When a letter in the sequence was Misspressed, it finishes the game: you've lost!
    if (letterSequence[currentLetterIndex].howWasPressed === 'Misspressed' && !gameState.gameFinished) {
      finishMinigame();
    };

    // Finish the game if the timer goes to zero: you've lost!
    if (gameState.timeLeft === 0 && !gameState.gameFinished) {
      finishMinigame();
    };
  }, [gameState]);

  useEffect(() => {
    // Keyboard monitoring logic
    // Ensure that it does nothing while a game is not running
    if (!gameState.gameStarted || gameState.gameFinished) return;

    // Monitore the keyboard when a game is running
    window.addEventListener('keydown', handlePressKey);
    return () => {
      window.removeEventListener('keydown', handlePressKey);
    };
    // We also need to look at letterSequence and currentLetterIndex because of handlePressKey function
  }, [gameState, currentLetterIndex]);

  function handlePressKey(event: KeyboardEvent) {
    const pressedKey = event.key.toUpperCase();
    
    // Ensure that it does nothing if press anything that's not a letter or if game has finished
    if (!alphabet.includes(pressedKey) || gameState.gameFinished) return;

    const currentLetter = gameState.letterSequence[currentLetterIndex].letter;

    if (pressedKey === currentLetter) {
      const letterToChangeIndex = gameState.letterSequence.findIndex(letter => {
        return letter.letter === pressedKey && letter.howWasPressed === 'Not Pressed';
      });
      setGameState((prevGameState) => {
        return {
          ...prevGameState,
          letterSequence: prevGameState.letterSequence.map((letter, index) => {
            return letterToChangeIndex === index ?
              {...letter, howWasPressed: 'Correctly'} :
              {...letter};
          })
        }
      });

      // This if statement prevents list out of index (our sequence has 5 elements)
      // So it stops adding +1 to currentLetterIndex, if currentLetterIndex > 4
      if (currentLetterIndex < gameState.letterSequence.length - 1) {
        setCurrentLetterIndex(currentLetterIndex + 1);
      }
    } else {
      setGameState((prevGameState) => {
        return {
          ...prevGameState,
          letterSequence: prevGameState.letterSequence.map((letter, index) => {
            return currentLetterIndex === index ?
              {...letter, howWasPressed: 'Misspressed'} :
              {...letter};
          })
        }
      });
    }
  };

  function restartMinigame() {
    const newLetterSequence = generateSequence();

    setGameState((prevGameState) => {
      return {
        ...prevGameState,
        timeLeft: gameDifficulties[gameDifficulty].timeLeft,
        gameResultMessage: '',
        letterSequence: newLetterSequence
      };
    });
    setCurrentLetterIndex(0);

    if (gameState.gameFinished) {
      setGameState((prevGameState) => {
        return {
          ...prevGameState,
          gameFinished: false
        }
      })
    }
  };

  return (
    <MinigameContext.Provider
      value={{
        gameState,
        startMinigame,
        restartMinigame,
        username,
        setUsername,
        currentLetterIndex,
        currentLocalProgress,
        changeDifficulty,
        gameDifficulty,
      }}
    >
      {children}
    </MinigameContext.Provider>
  )
}
