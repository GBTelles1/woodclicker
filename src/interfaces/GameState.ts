import { Letter } from "./Letter";

export type GameDifficulties = 'Easy' | 'Medium' | 'Hard';

export interface GameState {
  gameStarted: boolean;
  gameFinished: boolean;
  pointsMultiplier: number;
  timeLeft: number;
  letterSequence: Letter[];
  gameResultMessage: '' | 
    'Good Game!' | 
    'Time Out! Game Over!' | 
    'Oh, not this letter... Game Over!';
};