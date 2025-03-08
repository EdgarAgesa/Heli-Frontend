import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import HelicopterDetail from './HelicopterDetail';
import About from './About';
import Auth from './Auth';
import Gallery from './Gallery';
import Footer from './footer';
import '../css/Navbar.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-left">
            <Link to="/" className="navbar-logo">
              <img 
                src="https://res.cloudinary.com/djflnbgur/image/upload/v1741460861/Dej_ljtzxj.png" 
                alt="DejAir Logo" 
                className="logo" 
              />
            </Link>
          </div>

          {/* Toggle Button */}
          <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>

          <div className={`navbar-right ${menuOpen ? 'active' : ''}`}>
            <Link to="/" className="navbar-link" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/auth" className="navbar-link" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/about" className="navbar-link" onClick={() => setMenuOpen(false)}>About</Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/helicopter/:id" element={<HelicopterDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>

        <div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;