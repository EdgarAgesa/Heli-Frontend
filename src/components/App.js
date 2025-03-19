import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Auth from './Auth';
import Gallery from './Gallery';
import Footer from './footer';
import Booking from './booking';
import AddHelicopter from './AddHelicopter';
import Dashboard from './Dashboard';
import AddAdmin from './AddAdmin';
import ProtectedRoute from './ProtectedRoute';
import '../css/Navbar.css';
import { onMessage } from 'firebase/messaging';
import { messaging } from './Firebase';
import Chat from './Chat';


function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isAdmin = localStorage.getItem('is_admin') === 'true';

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      setIsLoggedIn(true);
    }

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Foreground notification:', payload);
      alert(`🔔 ${payload.notification.title}\n${payload.notification.body}`);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('is_admin');
    setIsLoggedIn(false);
    setMenuOpen(false);
  };

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

          <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</button>

          <div className={`navbar-right ${menuOpen ? 'active' : ''}`}>
            <Link to="/" className="navbar-link" onClick={() => setMenuOpen(false)}>Home</Link>
            {isLoggedIn ? (
              <button className="navbar-link logout-button" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link to="/auth" className="navbar-link" onClick={() => setMenuOpen(false)}>Login</Link>
            )}
            <Link to="/about" className="navbar-link" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/booking" className="navbar-link" onClick={() => setMenuOpen(false)}>Book Now</Link>
            <Link to="/dashboard" className="navbar-link" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/auth" element={<Auth setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chat" element={<Chat />} />
            <Route
              path="/addheli"
              element={
                <ProtectedRoute isAdmin={isAdmin} redirectPath="/">
                  <AddHelicopter />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addadmin"
              element={
                <ProtectedRoute isAdmin={isAdmin} redirectPath="/">
                  <AddAdmin />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
