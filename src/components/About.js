import React from 'react';
import '../css/about.css';
import { FaHelicopter, FaShieldAlt, FaUsers, FaEnvelope, FaPhone } from 'react-icons/fa'; // Import icons

function About() {
  return (
    <div className="about-container">
      <h1>About DejAir</h1>
      <p className="about-description">
        Welcome to DejAir, your premium helicopter rental service. We offer state-of-the-art helicopters tailored to meet all your travel needs, whether for business, leisure, or special events.
      </p>

      <div className="about-grid">
        <div className="about-card">
          <div className="about-icon">
            <FaHelicopter />
          </div>
          <h2>Our Fleet</h2>
          <p>We operate a modern fleet of helicopters designed for luxury, comfort, and safety. Whether you need executive travel or scenic tours, we have the perfect aircraft for you.</p>
        </div>

        <div className="about-card">
          <div className="about-icon">
            <FaShieldAlt />
          </div>
          <h2>Safety First</h2>
          <p>Your safety is our top priority. Our helicopters undergo regular maintenance, and our pilots are highly trained and certified to ensure a worry-free journey.</p>
        </div>

        <div className="about-card">
          <div className="about-icon">
            <FaUsers />
          </div>
          <h2>Experienced Team</h2>
          <p>Our team of professionals is dedicated to providing exceptional service. From pilots to customer support, we are here to make your experience seamless and enjoyable.</p>
        </div>

        <div className="about-card">
          <div className="about-icon">
            <FaEnvelope />
          </div>
          <h2>Contact Us</h2>
          <p>
            <FaPhone /> <strong>0723202112, 0702373470</strong>
            <br />
            <FaEnvelope /> <strong>Info.dejavulimited@gmail.com</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;