import React from 'react';
import { motion } from 'framer-motion';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.overlay}></div>
      <div className={`container ${styles.content}`}>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.title}
        >
          Financiá tu próxima campaña con el <span className="text-gradient-green">respaldo de tu propia producción.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.subtitle}
        >
          Sin vueltas bancarias. Ponés tu producción como garantía (Warrant) y nosotros te conseguimos el adelanto de dinero que necesitás para seguir creciendo.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className={`btn btn-primary ${styles.cta}`}>
            Consultar por mi financiamiento
          </button>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
