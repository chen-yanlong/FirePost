"use client";
import styles from '../styles/Home.module.css';

export const Footer = () => {

  return (
    <footer className={styles.footer}>
        <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
         <p>{<strong className='italic text-red-500'> 🔥 FIRE </strong>}</p>
        </a>
    </footer>
  );
};
