import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    product: '',
    otherProduct: '',
    volume: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar datos mínimos
    if (!formData.name || !formData.location || !formData.product || !formData.volume) {
      alert('Por favor, completá todos los campos antes de continuar.');
      return;
    }

    if (formData.product === 'otro' && !formData.otherProduct) {
      alert('Por favor, especificá qué producís.');
      return;
    }

    const productoFinal = formData.product === 'otro' ? formData.otherProduct : formData.product;
    
    // Armar el mensaje para WhatsApp
    const mensaje = `¡Hola! Me contacto desde la landing page para solicitar una evaluación.\n\n*Nombre / Razón Social:* ${formData.name}\n*Ubicación:* ${formData.location}\n*Producto:* ${productoFinal}\n*Volumen a financiar:* ${formData.volume}`;

    const numeroWhatsApp = '5491178270751';
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    
    window.open(urlWhatsApp, '_blank');
  };

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

          <form className={`glass-panel ${styles.form}`} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nombre y Apellido / Razón Social</label>
              <input 
                type="text" 
                id="name" 
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Juan Pérez" 
                className={styles.input} 
                required 
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="location">Provincia y Localidad</label>
              <input 
                type="text" 
                id="location" 
                value={formData.location}
                onChange={handleChange}
                placeholder="Ej: Misiones, Oberá" 
                className={styles.input} 
                required 
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="product">¿Qué producís?</label>
              <select 
                id="product" 
                value={formData.product}
                onChange={handleChange}
                className={styles.select} 
                required
              >
                <option value="">Seleccionar opción...</option>
                <option value="Yerba Mate">Yerba Mate</option>
                <option value="Leche">Leche</option>
                <option value="Tabaco">Tabaco</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            {formData.product === 'otro' && (
              <div className={styles.formGroup}>
                <label htmlFor="otherProduct">Especificar otro producto</label>
                <input 
                  type="text" 
                  id="otherProduct" 
                  value={formData.otherProduct}
                  onChange={handleChange}
                  placeholder="Ej: Soja, Maíz, etc." 
                  className={styles.input} 
                  required 
                />
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="volume">Volumen estimado que necesitás financiar</label>
              <input 
                type="text" 
                id="volume" 
                value={formData.volume}
                onChange={handleChange}
                placeholder="Ej: 50.000 kilos, 10.000 litros..." 
                className={styles.input} 
                required 
              />
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
