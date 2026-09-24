import React from 'react';
import { motion } from 'framer-motion';
import { FaRegCheckCircle, FaHandshake, FaFileSignature, FaSearchDollar, FaShieldAlt } from 'react-icons/fa';
import styles from './Rules.module.css';

const Rules = () => {
  const userSteps = [
    {
      icon: <FaRegCheckCircle />,
      title: "1. Registrás tu producción",
      desc: "Declarás en la plataforma cuántos kilos, litros o unidades tenés disponibles o proyectadas para entregar."
    },
    {
      icon: <FaFileSignature />,
      title: "2. Creás tu garantía digital (Warrant)",
      desc: "Comprometées esa producción como respaldo del adelanto que estás solicitando."
    },
    {
      icon: <FaHandshake />,
      title: "3. Recibís los fondos",
      desc: "Aceptás la propuesta de financiamiento y firmás el acuerdo digital con plena validez legal."
    }
  ];

  const platformSteps = [
    {
      icon: <FaShieldAlt />,
      title: "1. Validamos tu stock",
      desc: "Verificamos los datos junto a los registros de cooperativas o entes reguladores para darle total seguridad al inversor."
    },
    {
      icon: <FaSearchDollar />,
      title: "2. Buscamos el dinero",
      desc: "Presentamos tu garantía ante nuestra red de inversores y mesas de cambio para conseguirte la mejor tasa de adelanto."
    },
    {
      icon: <FaFileSignature />,
      title: "3. Emitimos los contratos",
      desc: "Generamos los comprobantes contractuales en PDF y gestionamos los pagos de forma directa y transparente."
    }
  ];

  return (
    <section className={`section-padding ${styles.section}`}>
      <div className="container">
        <h2 className={`text-center ${styles.title}`}>Reglas Claras</h2>
        
        <div className={styles.grid}>
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.column}
          >
            <h3 className={styles.columnTitle}>Lo que hacés <span className="text-gradient">VOS</span> <br/><small>(El Productor)</small></h3>
            <div className={styles.steps}>
              {userSteps.map((step, idx) => (
                <div key={idx} className={`glass-panel ${styles.stepCard}`}>
                  <div className={styles.icon}>{step.icon}</div>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.column}
          >
            <h3 className={styles.columnTitle}>Lo que hacemos <span className="text-gradient-green">NOSOTROS</span> <br/><small>(La Plataforma)</small></h3>
            <div className={styles.steps}>
              {platformSteps.map((step, idx) => (
                <div key={idx} className={`glass-panel ${styles.stepCard}`}>
                  <div className={styles.iconPlatform}>{step.icon}</div>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Rules;
