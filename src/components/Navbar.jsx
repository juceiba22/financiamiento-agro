import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link to="/" className={styles.logo}>
          Financiamiento<span className="text-gradient-green">Agro</span>
        </Link>
        <div className={styles.links}>
          <Link to="/" className={styles.link}>Inicio</Link>
          <Link to="/Tabaco" className={styles.link}>Sector Tabaco</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
