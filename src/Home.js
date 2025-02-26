import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BACKEND_URL from './config'; 
import './App.css';

function Home() {
  const [helicopters, setHelicopters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchHelicopters();
  }, []);

  const fetchHelicopters = async () => {
    setLoading(true);
    setMessage('Fetching helicopters...');

    try {
      const response = await axios.get(`${BACKEND_URL}/helicopters`);
      setHelicopters(response.data);
      setMessage('');
    } catch (error) {
      setMessage('Failed to fetch helicopters. Please check your backend URL.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <div className="welcome-message">
        <h2>Welcome to Helicopter Rental!</h2>
        <p>
          Explore our fleet of state-of-the-art helicopters designed for all your needs.
        </p>
      </div>

      {message && <p>{message}</p>}

      <h2>Available Helicopters</h2>
      <div className="helicopter-list">
        {helicopters.map((helicopter) => (
          <div
            key={helicopter.id}
            className="helicopter-card"
            onClick={() => navigate(`/helicopter/${helicopter.id}`)}
          >
            <img src={helicopter.image} alt={helicopter.name} />
            <h3>{helicopter.name}</h3>
            <p>{helicopter.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;