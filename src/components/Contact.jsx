import React from 'react';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <section className={`section-padding ${styles.section}`}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={styles.container}
        >
          <div className={styles.header}>
            <h2 className={styles.title}>No dejes que la inflación licúe el valor de tu esfuerzo.</h2>
            <p className={styles.subtitle}>Completá el formulario y un asesor te contactará para evaluar tu caso sin compromiso.</p>
          </div>

          <form className={`glass-panel ${styles.form}`} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nombre y Apellido / Razón Social</label>
              <input type="text" id="name" placeholder="Ej: Juan Pérez" className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="location">Provincia y Localidad</label>
              <input type="text" id="location" placeholder="Ej: Misiones, Oberá" className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="product">¿Qué producís?</label>
              <select id="product" className={styles.select}>
                <option value="">Seleccionar opción...</option>
                <option value="yerba">Yerba Mate</option>
                <option value="leche">Leche</option>
                <option value="tabaco">Tabaco</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="volume">Volumen estimado que necesitás financiar</label>
              <input type="text" id="volume" placeholder="Ej: 50.000 kilos, 10.000 litros..." className={styles.input} />
            </div>

            <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
              Solicitar Evaluación Sin Cargo
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
