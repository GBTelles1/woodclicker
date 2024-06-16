import styles from './AboutGame.module.css';

export function AboutGame() {
  return (
    <div className={styles.aboutGame}>
      <p>
        This is a minigame developed by {' '}
        <a href="https://github.com/GBTelles1">@GBTelles1</a>
      </p>
      <div className={styles.gameInstructions}>
        <p>
          All you need to do is follow the letter sequence on your keyboard to
          help the woodpecker find some delicious insects for lunch!
        </p>
        <h3>Saving your progress:</h3>
        <p>
          The top 5 players will appear on the <a href='#Ranking'>Ranking</a>
        </p>
      </div>
    </div>
  )
}
