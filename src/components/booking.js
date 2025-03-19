import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/booking.css';

const Booking = () => {
  const [helicopters, setHelicopters] = useState([]);
  const [selectedHelicopter, setSelectedHelicopter] = useState(null);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [purpose, setPurpose] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [negotiatePrice, setNegotiatePrice] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem('is_admin') === 'true';
    setIsAdmin(adminStatus);
    fetchHelicopters();
  }, []);

  const fetchHelicopters = async () => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await axios.get('https://heli-91dn.onrender.com/helicopter', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHelicopters(response.data);
    } catch (err) {
      setError('Failed to fetch helicopters. Please try again.');
    }
  };

  const handleBookNowClick = (helicopter) => {
    setSelectedHelicopter(helicopter);
    setShowPopup(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError('');
    setSuccess('');

    if (!selectedHelicopter || !time || !date || !purpose || !phoneNumber || (!negotiatePrice && !amount)) {
      setError('Please fill in all required fields.');
      setIsProcessing(false);
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      const clientId = parseInt(localStorage.getItem('client_id'));

      const bookingData = {
        time: `${time}:00`,
        date,
        purpose,
        status: negotiatePrice ? 'negotiating' : 'pending',
        helicopter_id: selectedHelicopter.id,
        client_id: clientId,
        phone_number: phoneNumber,
        amount: amount,
        negotiate_price: negotiatePrice,
      };

      const response = await axios.post('https://heli-91dn.onrender.com/booking', bookingData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201) {
        setSuccess(
          negotiatePrice
            ? 'Price negotiation started! An admin will contact you.'
            : 'Booking created successfully! Payment confirmed.'
        );
        setShowPopup(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h2>Book a Helicopter</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <div className="helicopter-list">
          {helicopters.map((helicopter) => (
            <div key={helicopter.id} className="helicopter-card">
              <img src={helicopter.image_url} alt={helicopter.model} className="helicopter-image" />
              <h3>{helicopter.model}</h3>
              <p>Capacity: {helicopter.capacity}</p>
              {!isAdmin && (
                <button className="book-now-button" onClick={() => handleBookNowClick(helicopter)}>
                  Book Now
                </button>
              )}
            </div>
          ))}
        </div>
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h3>Book {selectedHelicopter.model}</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Time</label>
                  <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Purpose</label>
                  <input type="text" value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Enter purpose of booking" required />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter phone number for payment" required />
                </div>
                {!negotiatePrice && (
                  <div className="form-group">
                    <label>Amount</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" required />
                  </div>
                )}
                <div className="form-group">
                  <label>
                    <input type="checkbox" checked={negotiatePrice} onChange={(e) => setNegotiatePrice(e.target.checked)} />
                    Negotiate Price
                  </label>
                </div>
                <button type="submit" className="submit-button" disabled={isProcessing}>
                  {isProcessing ? 'Processing...' : negotiatePrice ? 'Request Price Negotiation' : 'Confirm Booking'}
                </button>
                <button type="button" className="cancel-button" onClick={() => setShowPopup(false)}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
