import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../assets/Visit-Alg-contour.png';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';

const Header = ({ onInfoClick, onEventsClick, onDiscoverClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroBottom = heroSection.offsetHeight;
        setIsScrolled(window.scrollY > heroBottom - 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNavClick = (action) => {
    setMobileMenuOpen(false);
    if (action) action();
  };

  return (
    <header 
      className={`header ${isHovered || isScrolled ? 'header-solid' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="header-container">
        <div className="header-left">
          <a href="/" className="header-logo">
            <img src={logo} alt="Visit Algeria" />
          </a>
          <nav className="header-nav">
            <a href="#destinations" className="nav-link">{t('destinations')}</a>
            <button className="nav-link" onClick={onDiscoverClick} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              {t('discover')}
            </button>

            <button className="nav-link" onClick={onEventsClick} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              {t('navEvents')}
            </button>
          </nav>
        </div>

        <div className="header-right">
          <ThemeToggle />
          <LanguageSwitcher />
          <button 
            className="header-icon" 
            aria-label={t('information')}
            onClick={onInfoClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="#destinations" className="mobile-nav-link" onClick={() => handleMobileNavClick()}>{t('destinations')}</a>
        <button className="mobile-nav-link" onClick={() => handleMobileNavClick(onDiscoverClick)}>
          {t('discover')}
        </button>

        <button className="mobile-nav-link" onClick={() => handleMobileNavClick(onEventsClick)}>
          {t('navEvents')}
        </button>
      </nav>
    </header>
  );
};


export default Header;
