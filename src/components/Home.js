import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BACKEND_URL from './config';
import '../css/home.css';

function Home() {
  const navigate = useNavigate();

  const handleKnowMoreClick = () => {
    navigate('/gallery');
  };

  return (
    <div className="home">
      <div className="welcome-message">
        <h2>Welcome to DejAir</h2>
        <p>Explore our fleet of state-of-the-art helicopters designed for all your needs.</p>
      </div>
      <div className="button-container">
        <button className="know-more-btn" onClick={handleKnowMoreClick}>Know More About DejAir</button>
      </div>
    </div>
  );
}

export default Home;
