import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access_token');
      const adminStatus = localStorage.getItem('is_admin') === 'true'; 

      setIsAdmin(adminStatus);

      if (!token) {
        setError('You must be logged in to view this page.');
        setLoading(false);
        return;
      }

      try {
        const bookingsResponse = await axios.get('https://heli-91dn.onrender.com/booking', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(bookingsResponse.data);

        const paymentsResponse = await axios.get('https://heli-91dn.onrender.com/payments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Payments Response:', paymentsResponse.data);

        if (Array.isArray(paymentsResponse.data)) {
          setPayments(paymentsResponse.data);
        } else {
          console.error('Payments data is not an array:', paymentsResponse.data);
          setError('Invalid payments data received from the server.');
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li>
            <Link to="/dashboard">Overview</Link>
          </li>
          <li>
            <Link to="/booking">Bookings</Link>
          </li>
          <li>
            <Link to="/chat">Chat</Link>
          </li>
          {isAdmin && (
            <>
              <li>
                <Link to="/addheli">Add Helicopters</Link>
              </li>
              <li>
                <Link to="/addadmin">Add Admin</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="main-content">
        <h1>User Dashboard</h1>

        <div className="summary-cards">
          <div className="card">
            <h3>Total Bookings</h3>
            <p>{bookings.length}</p>
          </div>
          <div className="card">
            <h3>Total Payments</h3>
            <p>{payments.length}</p>
          </div>
        </div>

        <div className="recent-bookings">
          <h2>Recent Bookings</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>Purpose</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.slice(0, 5).map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>{booking.purpose}</td>
                  <td>{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="recent-payments">
          <h2>Recent Payments</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Phone Number</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.slice(0, 5).map((payment) => (
                <tr key={payment.booking_id}>
                  <td>{payment.booking_id}</td>
                  <td>Ksh {payment.amount_paid}</td>
                  <td>{payment.client_phone_number}</td>
                  <td>{payment.payment_status}</td>
                  <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;