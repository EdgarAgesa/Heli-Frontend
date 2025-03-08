import React from "react";
import "../css/footer.css";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Copyright */}
        <div className="footer-section">
          <img
            src="https://res.cloudinary.com/djflnbgur/image/upload/v1741460861/Dej_ljtzxj.png"
            alt="DejAir Logo"
            className="footer-logo"
          />
          <p>&copy; 2025 DejAir Kenya</p>
          <p>All Rights Reserved</p>
        </div>

        {/* Navigation Links */}
        <div className="footer-section">
          <a href="/about">ABOUT</a>
          <a href="/gallery">GALLERY</a>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h3>SERVICES</h3>
          <a href="javascript:void(0);">PRIVATE FLIGHTS</a>
          <a href="javascript:void(0);">HELI SAFARIS</a>
          <a href="javascript:void(0);">FILM & PHOTO</a>
          <a href="javascript:void(0);">UTILITY SUPPORT</a>
          <a href="javascript:void(0);">WILDLIFE CONSERVATION</a>
          <a href="javascript:void(0);">SEARCH & RESCUE</a>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <p>📞 0723202112, 0702373470</p>
          <p>📧 Info.dejavulimited@gmail.com</p>
          <div className="social-icons">
            <a
              href="https://www.instagram.com/thedejair?igsh=MTdmMnNwM21uMHQ1bQ=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Instagram page"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
