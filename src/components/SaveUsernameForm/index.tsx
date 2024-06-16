import { useContext, useState } from "react";
import { MinigameContext } from "../../contexts/MinigameContext";
import styles from './SaveUsernameForm.module.css';

interface SaveProgressFormState {
  username: string;
}

export function SaveUsernameForm() {
  const [usernameFormData, setUsernameFormData] = useState<SaveProgressFormState>({
    username: ''
  });
  const { setUsername } = useContext(MinigameContext);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const usernameValue = event.target.value;
    setUsernameFormData({ username: usernameValue });
  }

  function handleSubmitName(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUsername(usernameFormData.username)
  };
  return (
    <form className={styles.saveUsernameForm} onSubmit={handleSubmitName}>
      <p>Fill in your name to save your progress locally</p>
      <div className={styles.usernameInputContainer}>
        <input
          type='text'
          id='username'
          name='username'
          value={usernameFormData.username}
          onChange={handleChange}
          maxLength={14}
          placeholder='Your username'
        />
        <button type='submit'>Save</button>
      </div>
    </form>
  )
}
