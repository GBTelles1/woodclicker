import { alphabet } from "../constants/alphabet";
import { Letter } from "../interfaces/Letter";

export function generateSequence(length: number = 5): Letter[] {
  const letterSequence: Letter[] = Array.from({ length }, () => {
    const letter = alphabet[Math.floor(Math.random() * alphabet.length)]

    return {letter, howWasPressed: 'Not Pressed'};
  });

  return letterSequence;
};