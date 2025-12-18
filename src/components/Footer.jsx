import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-main">Visit</span>
            <span className="logo-sub">Algeria</span>
          </div>
          <p>Discover the beauty and richness of Algeria.</p>
        </div>
        <div className="footer-links">
          <h4>Destinations</h4>
          <ul>
            <li><a href="#">Algiers</a></li>
            <li><a href="#">Constantine</a></li>
            <li><a href="#">Oran</a></li>
            <li><a href="#">Tlemcen</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Experiences</h4>
          <ul>
            <li><a href="#">Sahara Tours</a></li>
            <li><a href="#">Culture</a></li>
            <li><a href="#">Food</a></li>
            <li><a href="#">Adventure</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>About</h4>
          <ul>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Media Kit</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
          </ul>
        </div>
        <div className="footer-newsletter">
          <h4>Stay Inspired</h4>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Visit Algeria. All rights reserved.</p>
        <div className="social-icons">
          <span>FB</span>
          <span>IG</span>
          <span>TW</span>
          <span>YT</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
