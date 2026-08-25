import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Client from './pages/Client';
import Prestataire from './pages/Prestataire';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import './index.css';
import './utilities.css';
import './components/Components.css';
import logoImage from './assets/logo.png';

function App() {
  return (
    <Router>
      <div className="app-wrapper bg-main">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/client" element={<Client />} />
          <Route path="/prestataire" element={<Prestataire />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        
        {/* Footer */}
        <footer className="main-footer">
          <div className="container">
            <div className="footer-grid">
              <div className="footer-brand">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                  <img src={logoImage} alt="EldriCare Logo" style={{ width: '130px', height: 'auto', borderRadius: '8px', mixBlendMode: 'multiply' }} />
                  <span className="footer-logo" style={{ marginBottom: 0 }}>EldriCare</span>
                </div>
                <p>La référence de l'assistance à domicile au Cameroun. Accompagnement, écoute et dignité.</p>
                <div className="footer-contact-info">
                  <p>📧 Eldricare1@gmail.com</p>
                  <p>💬 WhatsApp: 672420112</p>
                </div>
              </div>
              <div className="footer-nav">
                <h4>Navigation</h4>
                <Link to="/">Accueil</Link>
                <Link to="/client">Espace Client</Link>
                <Link to="/prestataire">Devenir Prestataire</Link>
              </div>
              <div className="footer-legal">
                <h4>Légal</h4>
                <a href="#">Confidentialité</a>
                <a href="#">Conditions d'utilisation</a>
                <a href="#">Aide & FAQ</a>
              </div>
            </div>
            <div className="footer-bottom">
              <span>© 2026 EldriCare 🇨🇲. Tout pour votre santé.</span>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
