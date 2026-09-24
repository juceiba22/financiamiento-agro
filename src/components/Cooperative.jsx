import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers } from 'react-icons/fa';
import styles from './Cooperative.module.css';

const Cooperative = () => {
  return (
    <section className={`section-padding ${styles.section}`}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={styles.content}
        >
          <div className={styles.iconWrapper}>
            <FaUsers className={styles.icon} />
          </div>
          <h2 className={styles.title}>¿Sos un productor chico? <br/><span className="text-gradient">Sumá volumen con otros productores.</span></h2>
          <p className={styles.text}>
            Si vendés en forma individual, la industria te impone el precio y el plazo. En nuestra plataforma podés agruparte digitalmente con otros productores de tu zona para consolidar un lote grande de entrega. Juntos consiguen mejores precios de venta y acceden a financiamientos más grandes con menores costos.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Cooperative;
