import React from "react";
import "../css/footer.css";
import { FaTwitter, FaFacebookF, FaYoutube, FaInstagram, FaTripadvisor } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Copyright */}
        <div className="footer-section">
          <img src="https://res.cloudinary.com/djflnbgur/image/upload/v1741460861/Dej_ljtzxj.png" alt="DejAir Logo" className="footer-logo" />
          <p>&copy;2025 DejAir Kenya</p>
          <p>All Rights Reserved</p>
        </div>

        {/* Navigation Links */}
        <div className="footer-section">
          <a href="/about">ABOUT</a>
          <a href="gallery">GALLERY</a>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h3>SERVICES</h3>
          <a href="#">PRIVATE FLIGHTS</a>
          <a href="#">HELI SAFARIS</a>
          <a href="#">FILM & PHOTO</a>
          <a href="#">UTILITY SUPPORT</a>
          <a href="#">WILDLIFE CONSERVATION</a>
          <a href="#">SEARCH & RESCUE</a>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <p>📞 0723202112, 0702373470</p>
          <p>📧 Info.dejavulimited@gmail.com</p>
          <div className="social-icons">
            <a href="https://www.instagram.com/thedejair?igsh=MTdmMnNwM21uMHQ1bQ==" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;