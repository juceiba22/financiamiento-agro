import React from 'react';
import { motion } from 'framer-motion';
import { FaLock } from 'react-icons/fa';
import styles from './Security.module.css';

const Security = () => {
  return (
    <section className={`section-padding ${styles.section}`}>
      <div className="container">
        <div className={styles.wrapper}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`glass-panel ${styles.content}`}
          >
            <div className={styles.header}>
              <FaLock className={styles.icon} />
              <h2>Seguridad y Respaldo Legal</h2>
            </div>
            <div className={styles.questionBox}>
              <p className={styles.question}>¿Es seguro? ¿Qué pasa si hay un problema?</p>
              <p className={styles.answer}>
                "Todo el proceso se respalda mediante Contratos Digitales de Mutuo Comercial con plena validez legal en la República Argentina. Los inversores no compran promesas en el aire; financian producción real verificada por la plataforma y respaldada por los fondos sectoriales de cada actividad."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Security;
