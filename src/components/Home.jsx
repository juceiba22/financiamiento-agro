<<<<<<< HEAD
import { Link } from 'react-router-dom';
import {
  HiArrowRight,
  HiArrowUpRight,
  HiOutlineShieldCheck,
  HiOutlineDocumentCheck,
  HiOutlineBuildingLibrary,
  HiOutlineBanknotes,
  HiOutlineTrophy,
} from 'react-icons/hi2';
import { TABAR_URL } from '../config';
import styles from './Home.module.css';

// Contenido: "AgroTabaco — Instrumentos Financieros Digitales" (Lic. Julio Ibarra)

const STEPS = [
  { n: 1, title: 'Garantía Digital', desc: 'Warrantera: auditoría y certificación física de los fardos.', href: '#garantia', Icon: HiOutlineShieldCheck },
  { n: 2, title: 'Escribano Digital', desc: 'Registro oficial en internet que inmoviliza la garantía.', href: '#escribano', Icon: HiOutlineDocumentCheck },
  { n: 3, title: 'Mercado Argentino de Valores', desc: 'El pagaré bursátil circula y cotiza en el MAV.', href: '#mercado', Icon: HiOutlineBuildingLibrary },
  { n: 4, title: 'Liquidez', desc: 'Financiamiento sin vender la producción.', href: '#liquidez', Icon: HiOutlineBanknotes },
];

const CERTIFICADORAS = [
  { name: 'Control Union', url: 'https://argentina.controlunion.com/' },
  { name: 'AG Warrants', url: 'https://agwarrants.com.ar/' },
  { name: 'Almacenadora Sudamericana', url: 'https://www.warrantsnet.com/' },
];

const CtaButton =({ className = '' }) => (
  <Link to="/financiamiento" className={`btn btn-primary ${className}`}>
    Quiero acceder al financiamiento
    <HiArrowRight aria-hidden="true" />
  </Link>
);

const Hero = () => (
  <section className={styles.hero}>
    <div className={styles.heroGrid}>
      <div>
        <span className={styles.eyebrow}>
          <HiOutlineShieldCheck aria-hidden="true" />
          INSTRUMENTOS FINANCIEROS DIGITALES · SECTOR AGROPECUARIO
        </span>
        <h1 className={styles.heroTitle}>Financiá tu próxima campaña con el respaldo de tu propia producción</h1>
        <p className={styles.heroDesc}>
          El sistema financiero admite nuevas formas de garantía digitalizadas para la obtención de
          liquidez en el sector agropecuario.
        </p>
        <div className={styles.heroActions}>
          <CtaButton />
          <a href="#circuito" className="btn btn-secondary">Cómo funciona</a>
        </div>
      </div>

      <div className={styles.circuitCard} id="circuito">
        <div className={styles.circuitHeader}>
          <span className={styles.pulseTag}>
            <span className={styles.pulseGold} />
            CIRCUITO DE FINANCIAMIENTO
          </span>
        </div>
        <ol className={styles.circuitList}>
          {STEPS.map(({ n, title, desc, href, Icon }) => (
            <li key={n}>
              <a href={href} className={styles.circuitStep}>
                <span className={styles.stepNum}>{n}</span>
                <div className={styles.stepBody}>
                  <span className={styles.stepTitle}>{title}</span>
                  <span className={styles.stepDesc}>{desc}</span>
                </div>
                <Icon className={styles.stepIcon} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>
        <div className={styles.circuitFooter}>
          <span>Tabaco, Yerba, Leche, Vino, entre otros</span>
          <span className={styles.darkChip}>MAV</span>
        </div>
      </div>
    </div>
  </section>
);

const Resumen = () => (
  <section className="section" id="resumen">
    <div className={`container ${styles.split}`}>
      <div>
        <span className="eyebrow-sec">Resumen</span>
        <h2 className="section-title">Financiamiento bursátil competitivo con warrants sobre tu producción</h2>
      </div>
      <p className={styles.lead}>
        Con las nuevas regulaciones, productores y cooperativas del sector agropecuario pueden obtener
        financiamiento bursátil competitivo a través del <strong>Mercado Argentino de Valores (MAV)</strong>{' '}
        utilizando <strong>warrants sobre tu producción</strong> certificada, registrada y custodiada en
        plataformas ya existentes.
      </p>
    </div>
  </section>
);

const Garantia = () => (
  <section className="section section-alt" id="garantia">
    <div className="container">
      <div className="section-header">
        <span className="eyebrow-sec">Paso 1 · Garantía Digital</span>
        <h2 className="section-title">Una warrantera certifica físicamente los fardos</h2>
        <p className="section-subtitle">
          En primera instancia es necesaria la gestión de una Warrantera debidamente regulada y habilitada
          por la Secretaría de Agricultura, Ganadería y Pesca que cumpla la función de auditoría y
          certificación física.
        </p>
      </div>

      <div className={styles.twoCol}>
        <div className="card">
          <h3 className={styles.cardTitle}>Certificadoras independientes</h3>
          <p className={styles.cardText}>
            Empresas como Control Union, AG Warrants o Almacenadora Sudamericana pueden funcionar como
            certificadoras independientes.
          </p>
          <div className={styles.chips}>
            {CERTIFICADORAS.map((c) => (
              <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="chip">
                {c.name}
                <HiArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div className="card">
          <h3 className={styles.cardTitle}>Qué verifican en los acopios</h3>
          <p className={styles.cardText}>
            Son responsables de verificar físicamente en los acopios:
          </p>
          <ul className={styles.checkList}>
            <li>La existencia de los fardos de tabaco.</li>
            <li>El peso.</li>
            <li>Los estándares específicos de calidad (Virginia, Burley, entre otros).</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const Escribano = () => (
  <section className="section" id="escribano">
    <div className="container">
      <div className="section-header">
        <span className="eyebrow-sec">Paso 2 · Escribano Digital</span>
        <h2 className="section-title">Calificación de tu entidad y certificación ante el mundo financiero</h2>
        <p className="section-subtitle">
          En segunda instancia se requiere un "Escribano Digital", es decir, un registro oficial en internet.
          Con tu calificación ya estás listo para emitir un documento oficial en el mercado de valores.
        </p>
      </div>

      <div className={styles.twoCol}>
        <div className="card">
          <h3 className={styles.cardTitle}>Tu garantía, verificada y resguardada</h3>
          <p className={styles.cardText}>
            Mediante esta operatoria se certifica de manera confiable a todo el mundo financiero (bancos,
            inversores y dealers) que los fardos de tabaco declarados:
          </p>
          <ul className={styles.checkList}>
            <li>Son reales.</li>
            <li>Están inmovilizados.</li>
            <li>Nadie más los puede vender ni usar para otra cosa.</li>
          </ul>
        </div>
        <div className={`card ${styles.darkCard}`}>
          <h3 className={styles.cardTitle}>Del fardo al pagaré bursátil</h3>
          <p className={styles.cardText}>
            La escribanía le otorga al activo en cuestión validez legal plena bajo la{' '}
            <strong>Ley de Warrants</strong>, permitiendo emitir un <strong>"pagaré bursátil"</strong> o
            documento similar susceptible de ser comercializado en el Mercado Argentino de Valores.
          </p>
          <div className={styles.chips}>
            <span className="chip">Interbanking</span>
            <span className="chip">A3 Mercados</span>
            <span className="chip">AGW</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Mercado = () => (
  <section className="section section-alt" id="mercado">
    <div className="container">
      <div className="section-header">
        <span className="eyebrow-sec">Paso 3 · Mercado Argentino de Valores</span>
        <h2 className="section-title">Tu producción en garantía circula y cotiza en el mercado</h2>
        <p className="section-subtitle">
          Con una warrantera y una escribanía digital confirmadas, la producción puesta en garantía
          (tabaco, yerba, leche, vino, entre otros) ya puede circular y cotizar en el Mercado Argentino
          de Valores.
        </p>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.metricLbl}>Parámetro</span>
          <span className={styles.metricNum}>Tasa de descuento</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLbl}>Parámetro</span>
          <span className={styles.metricNum}>Tasa de interés</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLbl}>En función de</span>
          <span className={styles.metricNum}>Plazos</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLbl}>En función de</span>
          <span className={styles.metricNum}>Riesgos</span>
        </div>
      </div>
      <p className={styles.note}>
        Los parámetros de cotización como tasas de descuento e interés, al igual que con todo activo
        financiero, se configuran en función de los plazos y riesgos conllevados por el inversor asociados
        al documento emitido.
      </p>
    </div>
  </section>
);

const Liquidez = () => (
  <section className={styles.liquidez} id="liquidez">
    <div className={`container ${styles.liquidezInner}`}>
      <div>
        <span className={styles.liquidezEyebrow}>Paso 4 · Liquidez</span>
        <h2 className={styles.liquidezTitle}>Financiamiento en la bolsa usando tu producción como garantía, sin tener que venderla.</h2>
      </div>
      <Link to="/financiamiento" className="btn btn-gold">
        Quiero acceder al financiamiento
        <HiArrowRight aria-hidden="true" />
      </Link>
    </div>
  </section>
);

const CasoExito = () => (
  <section className="section section-alt" id="caso-exito">
    <div className="container">
      <div className="section-header">
        <span className="eyebrow-sec">Caso de éxito</span>
        <h2 className="section-title">
          <HiOutlineTrophy className={styles.titleIcon} aria-hidden="true" />
          La Bolsa de Chaco, por primera vez en Argentina
        </h2>
        <p className="section-subtitle">
          La Bolsa de Chaco logró, por primera vez en Argentina, que una empresa agropecuaria consiga
          financiamiento en la bolsa (MAV) usando su producción como garantía real sin tener que venderla.
          El circuito unificó a tres actores clave en un solo trámite digital:
        </p>
      </div>

      <div className={styles.actors}>
        <div className="card">
          <span className={styles.actorNum}>01</span>
          <h3 className={styles.cardTitle}>Control Union</h3>
          <p className={styles.cardText}>Revisó y pesó los granos en el galpón.</p>
        </div>
        <div className="card">
          <span className={styles.actorNum}>02</span>
          <h3 className={styles.cardTitle}>A3 Mercados</h3>
          <p className={styles.cardText}>Anotó ese certificado en internet para "congelar" la garantía de forma segura.</p>
        </div>
        <div className="card">
          <span className={styles.actorNum}>03</span>
          <h3 className={styles.cardTitle}>MAV</h3>
          <p className={styles.cardText}>Remató los pagarés de deuda entre inversores para girarle el efectivo inmediato a la empresa.</p>
        </div>
      </div>
    </div>
  </section>
);

const Tabar = () => (
  <section className="section" id="tabar">
    <div className={`container ${styles.tabar}`}>
      <div>
        <span className="eyebrow-sec">Próximamente</span>
        <h2 className="section-title">Estamos desarrollando TABAR</h2>
        <p className="section-subtitle">
          La plataforma digital para el tabaco argentino.
        </p>
      </div>
      <div className={styles.tabarActions}>
        <a href={TABAR_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
          Conocer TABAR
          <HiArrowRight aria-hidden="true" />
        </a>
        <CtaButton />
      </div>
    </div>
  </section>
);

const Home = () => (
  <>
    <Hero />
    <Resumen />
    <Garantia />
    <Escribano />
    <Mercado />
    <Liquidez />
    <CasoExito />
    <Tabar />
  </>
);
=======
import React from 'react';
import Header from './Header';
import ValueProp from './ValueProp';
import Rules from './Rules';
import Cooperative from './Cooperative';
import Sectors from './Sectors';
import Security from './Security';
import Contact from './Contact';

const Home = () => {
  return (
    <>
      <Header />
      <ValueProp />
      <Rules />
      <Cooperative />
      <Sectors />
      <Security />
      <Contact />
    </>
  );
};
>>>>>>> 918a8b4cb729dc29fcb882af5a2ed04ff1ab91e9

export default Home;
