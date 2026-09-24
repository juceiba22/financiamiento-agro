import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiBars3, HiXMark } from 'react-icons/hi2';
import { AGROTABACO_URL, TABAR_URL } from '../config';
import styles from './Navbar.module.css';

const LINKS = [
  { to: '/#circuito', label: 'Cómo funciona' },
  { to: '/#garantia', label: 'Garantía Digital' },
  { to: '/#escribano', label: 'Escribano Digital' },
  { to: '/#mercado', label: 'Mercado de Valores' },
  { to: '/#caso-exito', label: 'Caso de éxito' },
];

export const LogoMark = () => (
  <div className={styles.logoMark} aria-hidden="true">
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 1L16 5.5V12.5L9 17L2 12.5V5.5L9 1Z" fill="#ffffff" />
    </svg>
  </div>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <div className={styles.topBar}>
        <div className={styles.topInner}>
          <div className={styles.topLeft}>
            <span className={styles.topBadge}>
              <span className="pulse-dot" />
              INSTRUMENTOS FINANCIEROS DIGITALES
            </span>
            <span className={styles.topText}>Gestionamos tu producción para llevarla al Mercado Argentino de Valores y conseguir financiamiento</span>
          </div>
          <a href={TABAR_URL} target="_blank" rel="noopener noreferrer" className={styles.topRight}>
            <span className={styles.gold}>ESTAMOS DESARROLLANDO TABAR</span>
            <HiArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>

      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <a href={AGROTABACO_URL} target="_blank" rel="noopener noreferrer" className={styles.logo} onClick={close}>
            <LogoMark />
            <div>
              <div className={styles.logoTitle}>AgroTabaco</div>
              <div className={styles.logoSub}>Instrumentos Financieros Digitales</div>
            </div>
          </a>

          <div className={`${styles.links} ${open ? styles.linksOpen : ''}`}>
            {LINKS.map((l) => (
              <Link key={l.to} to={l.to} className={styles.link} onClick={close}>
                {l.label}
              </Link>
            ))}
            <Link to="/financiamiento" className={`btn btn-primary ${styles.mobileCta}`} onClick={close}>
              Quiero mi financiamiento
            </Link>
          </div>

          <div className={styles.actions}>
            <Link to="/financiamiento" className={`btn btn-primary ${styles.cta}`}>
              Quiero mi financiamiento
            </Link>
            <button
              type="button"
              className={styles.menuBtn}
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={open}
            >
              {open ? <HiXMark size={22} /> : <HiBars3 size={22} />}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
