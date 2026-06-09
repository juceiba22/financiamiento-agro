import React from 'react';
import Header from './components/Header';
import ValueProp from './components/ValueProp';
import Rules from './components/Rules';
import Cooperative from './components/Cooperative';
import Sectors from './components/Sectors';
import Security from './components/Security';
import Contact from './components/Contact';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <ValueProp />
      <Rules />
      <Cooperative />
      <Sectors />
      <Security />
      <Contact />
    </div>
  );
}

export default App;
