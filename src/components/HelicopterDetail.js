import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BACKEND_URL from './config'; 
import '../css/helicopter.css'

function HelicopterDetail() {
  const { id } = useParams();
  const [helicopter, setHelicopter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchHelicopterDetails();
  }, []);

  const fetchHelicopterDetails = async () => {
    setLoading(true);
    setMessage('Fetching helicopter details...');

    try {
      const response = await axios.get(`${BACKEND_URL}/helicopters/${id}`);
      setHelicopter(response.data);
      setMessage('');
    } catch (error) {
      setMessage('Failed to fetch helicopter details. Please check your backend URL.');
    } finally {
      setLoading(false);
    }
  };

  if (!helicopter) {
    return <div>{message || 'Loading...'}</div>;
  }

  return (
    <div className="helicopter-detail">
      <h2>{helicopter.name}</h2>
      <img src={helicopter.image} alt={helicopter.name} />
      <p>{helicopter.description}</p>
      <p><strong>Capacity:</strong> {helicopter.capacity} people</p>
      <p><strong>Price:</strong> {helicopter.price}</p>
      <button onClick={() => alert(`Booking ${helicopter.name}`)}>Book Now</button>
    </div>
  );
}

export default HelicopterDetail;