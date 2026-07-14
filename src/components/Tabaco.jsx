import React from 'react';
import { motion } from 'framer-motion';
import styles from './Tabaco.module.css';

const Tabaco = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={`container ${styles.headerContent}`}>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.title}
          >
            Tecnología y nuevos tipos <br />
            <span className="text-gradient-green">de financiamiento</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.subtitle}
          >
            El sistema financiero admite nuevas formas de garantía digitalizadas para la obtención de liquidez en el sector tabacalero.
          </motion.p>
        </div>
      </header>

      <main className="container section-padding">
        <div className={styles.grid}>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`glass-panel ${styles.card}`}
          >
            <h3 className={styles.cardTitle}>Resumen</h3>
            <p>Con las nuevas regulaciones, productores y cooperativas del sector tabacalero pueden obtener financiamiento bursátil competitivo a través del Mercado Argentino de Valores (MAV) utilizando warrants sobre fardos de tabaco certificados, registrados y custodiados en plataformas ya existentes.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`glass-panel ${styles.card}`}
          >
            <h3 className={styles.cardTitle}>Garantía Digital</h3>
            <p>En la primera instancia es necesaria la gestión de una Warrantera debidamente regulada y habilitada por la Secretaría de Agricultura, Ganadería y Pesca que cumpla la función de auditoría y certificación física.</p>
            <p className={styles.highlight}>Empresas como Control Unión, AG Warrants o Almacenadora Sudamericana pueden funcionar como certificadoras independientes.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`glass-panel ${styles.card}`}
          >
            <h3 className={styles.cardTitle}>Escribano Digital</h3>
            <p>En segunda instancia se requiere un "Escribano Digital", un registro oficial en internet. Se certifica de manera confiable a todo el mundo financiero (bancos, inversores y dealers) que los fardos de tabaco son reales y están inmovilizados.</p>
            <p>La escribanía otorga validez legal permitiendo emitir un "pagaré bursátil".</p>
            <div className={styles.brands}>
              <span className={styles.brand}>Interbanking</span>
              <span className={styles.brand}>A3 Mercados</span>
              <span className={styles.brand}>AGW</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`glass-panel ${styles.card}`}
          >
            <h3 className={styles.cardTitle}>Mercado Argentino de Valores</h3>
            <p>Con una warrantera y una escribanía digital confirmadas, el tabaco puesto en garantía ya puede circular y cotizar en el MAV. Los parámetros como tasas se configuran en función de plazos y riesgos del inversor.</p>
          </motion.div>

        </div>

        <div className={styles.twoCol}>
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`glass-panel ${styles.largeCard}`}
          >
            <h3 className={styles.cardTitle}>¿Y los POAs, y el FET?</h3>
            <p>Tanto los Planes Operativos Anuales como las transferencias vinculadas al precio FET representan ingresos por cobrar. Si bien legalmente no pueden ser utilizadas como garantía, al estar el propio Estado Nacional como pagador, se puede innovar en la creación de algún instrumento afín a un documento de pago.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`glass-panel ${styles.largeCard} ${styles.accentCard}`}
          >
            <h3 className={styles.cardTitle}>Caso de éxito</h3>
            <p>La Bolsa de Chaco logró por primera vez en Argentina que una empresa agropecuaria consiga financiamiento en la bolsa usando su producción como garantía real sin tener que venderla.</p>
            <p>El circuito unificó a 3 actores en un trámite digital:</p>
            <ol className={styles.list}>
              <li>Control Union revisó y pesó los granos.</li>
              <li>A3 Mercados anotó ese certificado en internet.</li>
              <li>El MAV remató los pagarés de deuda entre inversores para girar el efectivo inmediato.</li>
            </ol>
          </motion.div>
        </div>

      </main>
    </div>
  );
};

export default Tabaco;
