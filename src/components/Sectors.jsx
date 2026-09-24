import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaTractor, FaSeedling } from 'react-icons/fa';
import styles from './Sectors.module.css';

const Sectors = () => {
  const sectors = [
    {
      icon: <FaLeaf />,
      title: "Sector Yerba Mate",
      desc: "Dejás tus kilos de hoja verde en garantía antes de la zafra completa y recibís el adelanto para cubrir el costo de la cosecha y la logística."
    },
    {
      icon: <FaTractor />,
      title: "Sector Lácteo",
      desc: "Certificás tu entrega mensual proyectada a la usina y cobrás los fondos de forma anticipada, sin esperar los 30 o 60 días de la liquidación tradicional."
    },
    {
      icon: <FaSeedling />,
      title: "Tabaco",
      desc: "Usas el Warrant de tabaco e intermediamos para que aparezca el financiamiento por medio de un contrato entre ambos"
    }
  ];

  return (
    <section className={`section-padding ${styles.section}`}>
      <div className="container">
        <h2 className={`text-center ${styles.title}`}>Cómo funciona para cada sector</h2>
        
        <div className={styles.grid}>
          {sectors.map((sector, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className={`glass-panel ${styles.card}`}
            >
              <div className={styles.icon}>{sector.icon}</div>
              <h3>{sector.title}</h3>
              <p>{sector.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sectors;
