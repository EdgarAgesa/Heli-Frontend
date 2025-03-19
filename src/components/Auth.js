import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Auth.css';
import { getToken } from 'firebase/messaging';
import { messaging } from './Firebase';

const VAPID_KEY = "BBeQhL2fEaikjj0y_GqYnofcvQ7KjJGqgOcV_JAWBYaZdJ5zxLzCZbabQxZWKoo_-0wrmv6weS_2bXgxKM1FIt4";

const Auth = React.memo(({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [error, setError] = useState('');

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name': setName(value); break;
      case 'email': setEmail(value); break;
      case 'phone_number': setPhoneNumber(value); break;
      case 'password': setPassword(value); break;
      case 'confirmation_password': setConfirmationPassword(value); break;
      default: break;
    }
  }, []);

  const registerFCMToken = async (id) => {
    try {
      const fcmToken = await getToken(messaging, { vapidKey: VAPID_KEY });
      console.log("✅ FCM Token:", fcmToken);
      // Optional: Save fcmToken to Firestore linked to user/admin if needed
    } catch (err) {
      console.error("❌ Error getting FCM token", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Handle Login (User or Admin)
      try {
        const userResponse = await axios.post('https://heli-91dn.onrender.com/auth/login', { email, password });
        const userId = userResponse.data.client_id;
        localStorage.setItem('access_token', userResponse.data.access_token);
        localStorage.setItem('refresh_token', userResponse.data.refresh_token);
        localStorage.setItem('is_admin', 'false');
        localStorage.setItem('user_id', userId); // Save user_id
        await registerFCMToken(userId);
        setIsLoggedIn(true);
        navigate('/');
      } catch (userError) {
        try {
          const adminResponse = await axios.post('https://heli-91dn.onrender.com/admin/login', { email, password });
          const adminId = adminResponse.data.admin_id;
          localStorage.setItem('access_token', adminResponse.data.access_token);
          localStorage.setItem('refresh_token', adminResponse.data.refresh_token);
          localStorage.setItem('is_admin', 'true');
          localStorage.setItem('admin_id', adminId); // Save admin_id
          await registerFCMToken(adminId);
          setIsLoggedIn(true);
          navigate('/dashboard');
        } catch (adminError) {
          setError('Invalid email or password. Please try again.');
        }
      }
    } else {
      // Handle Sign Up
      const url = 'https://heli-91dn.onrender.com/auth/signup';
      const data = { name, email, phone_number: phoneNumber, password, confirmation_password: confirmationPassword };
      try {
        await axios.post(url, data);
        setIsLogin(true);
        setError('Signup successful! Please login.');
        setName(''); setEmail(''); setPhoneNumber(''); setPassword(''); setConfirmationPassword('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to sign up. Please try again.');
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form">
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <input type="text" name="name" placeholder="Name" value={name} onChange={handleChange} required />
                <input type="text" name="phone_number" placeholder="Phone Number" value={phoneNumber} onChange={handleChange} required />
              </>
            )}
            <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} required />
            {!isLogin && (
              <input type="password" name="confirmation_password" placeholder="Confirm Password" value={confirmationPassword} onChange={handleChange} required />
            )}
            <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
          </form>
          <p onClick={() => setIsLogin(!isLogin)} className="toggle-link">
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
          </p>
        </div>
      </div>
    </div>
  );
});

export default Auth;
