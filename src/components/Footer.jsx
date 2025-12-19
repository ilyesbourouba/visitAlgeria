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

      {/* Social Icons Section */}
      <div className="footer-social-section">
        <h4 className="social-title">Follow us</h4>
        <div className="social-icons">
          <a href="#" className="social-icon" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          <a href="#" className="social-icon" aria-label="TikTok">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </a>
          <a href="#" className="social-icon" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
          <a href="#" className="social-icon" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a href="#" className="social-icon" aria-label="Pinterest">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.38.04-3.4.22-.92 1.4-5.93 1.4-5.93a4.14 4.14 0 0 1-.34-1.68c0-1.58.92-2.76 2.06-2.76a1.43 1.43 0 0 1 1.44 1.6c0 .98-.62 2.44-.94 3.8a1.64 1.64 0 0 0 1.68 2.05c2.01 0 3.55-2.12 3.55-5.18 0-2.71-1.94-4.6-4.72-4.6a4.9 4.9 0 0 0-5.12 4.91c0 .97.37 2.01.84 2.58a.34.34 0 0 1 .08.32c-.09.35-.28 1.11-.32 1.27-.05.2-.17.25-.38.15-1.41-.66-2.3-2.72-2.3-4.38 0-3.57 2.59-6.85 7.47-6.85 3.92 0 6.97 2.8 6.97 6.53 0 3.9-2.46 7.04-5.87 7.04a3.03 3.03 0 0 1-2.64-1.32s-.58 2.2-.72 2.74a10.9 10.9 0 0 1-1.33 2.81A12 12 0 1 0 12 0z"/>
            </svg>
          </a>
          <a href="#" className="social-icon" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.56 9.38.56 9.38.56s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14c.34-1.93.5-3.87.5-5.8 0-1.93-.16-3.87-.5-5.8zM9.55 15.5V8.5l6.27 3.5-6.27 3.5z"/>
            </svg>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Visit Algeria. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
