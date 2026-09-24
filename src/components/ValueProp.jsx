import React from 'react';
import { motion } from 'framer-motion';
import styles from './ValueProp.module.css';

const ValueProp = () => {
  return (
    <section className={`section-padding ${styles.section}`}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className={`glass-panel ${styles.card}`}
        >
          <p className={styles.text}>
            <span className="text-gradient">Sabemos que los tiempos de pago de las grandes industrias y las demoras en los fondos de fomento te quitan aire para trabajar.</span><br /><br />
            Por eso creamos un sistema donde tu stock acumulado (tus litros de leche, tus kilos de yerba mate o tus fardos de tabaco) pasa a ser tu mejor garantía para conseguir efectivo inmediato de inversores privados, de forma legal, segura y transparente.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProp;
