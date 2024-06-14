import React from 'react';
import './footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>aube studio</h2>
          <p>
            We are a fictional company providing exceptional service and products to our customers. Our mission is to deliver quality and satisfaction.
          </p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><a >About Us</a></li>
            <li><a >Services</a></li>
            <li><a >Contact</a></li>
            <li><a >Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer-section social">
          <h2>Follow Us</h2>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        {/* &copy; {new Date().getFullYear()} Company Name. All rights reserved. */}
      </div>
    </footer>
  );
}

export default Footer;
