<<<<<<< HEAD
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Financiamiento from './components/Financiamiento';
import './index.css';

// Lleva a la sección del hash (/#garantia) o al inicio de la página al navegar
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollManager />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/financiamiento" element={<Financiamiento />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Tabaco from './components/Tabaco';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div style={{ paddingTop: '70px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tabaco" element={<Tabaco />} />
          </Routes>
        </div>
      </div>
>>>>>>> 918a8b4cb729dc29fcb882af5a2ed04ff1ab91e9
    </Router>
  );
}

export default App;
