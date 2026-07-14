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
    </Router>
  );
}

export default App;
