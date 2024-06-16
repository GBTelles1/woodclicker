import { ReactNode } from "react";
import styles from './DefaultLayout.module.css';
import woodpeckerImage from '../../assets/woodpecker.png';

interface DefaultLayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className={styles.layout}>
      <img src={woodpeckerImage} alt="Woodpecker" />
      {children}
    </div>
  )
}
