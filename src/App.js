import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import HelicopterDetail from './HelicopterDetail';
import SignUp from './SignUp';
import Login from './Login';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-left">
            <Link to="/" className="navbar-title">Helicopter Rental</Link>
          </div>
          <div className="navbar-right">
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/signup" className="navbar-link">Sign Up</Link>
            <Link to="/login" className="navbar-link">Login</Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/helicopter/:id" element={<HelicopterDetail />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2025 Helicopter Rental. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;