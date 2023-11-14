import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './header.module.scss';

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <NavLink to='/'>
        <h1 className={styles.title}>Flashcards</h1>
      </NavLink>
    </header>
  );
};

export default Header;
