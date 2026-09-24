import { Link } from 'react-router-dom';
import { LogoMark } from './Navbar';
import { TABAR_URL } from '../config';
import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      <Link to="/" className={styles.brand}>
        <LogoMark />
        <div>
          <div className={styles.title}>Financiamiento Agro</div>
          <div className={styles.sub}>Instrumentos Financieros Digitales</div>
        </div>
      </Link>

      <div className={styles.right}>
        <span className={styles.author}>Lic. Julio Ibarra · AgroTabaco</span>
        <span>
          Estamos desarrollando{' '}
          <a href={TABAR_URL} target="_blank" rel="noopener noreferrer" className={styles.link}>
            TABAR
          </a>
        </span>
        <span>© {new Date().getFullYear()} Financiamiento Agro</span>
      </div>
    </div>
  </footer>
);

export default Footer;
