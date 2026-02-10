import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from '../assets/Visit-Alg-contour.png';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';

const Header = ({ onInfoClick, onEventsClick, onDiscoverClick, onDestinationsClick, onTourGuideClick }) => {
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
            <button className="nav-link" onClick={onDestinationsClick} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>{t('destinations')}</button>
            <button className="nav-link" onClick={onDiscoverClick} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              {t('discover')}
            </button>

            <button className="nav-link" onClick={onEventsClick} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              {t('navEvents')}
            </button>
            <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); onTourGuideClick(); }} style={{ textDecoration: 'none' }}>
              {t('tourGuide')}
            </a>
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
        <button className="mobile-nav-link" onClick={() => handleMobileNavClick(onDestinationsClick)}>{t('destinations')}</button>
        <button className="mobile-nav-link" onClick={() => handleMobileNavClick(onDiscoverClick)}>
          {t('discover')}
        </button>

        <button className="mobile-nav-link" onClick={() => handleMobileNavClick(onEventsClick)}>
          {t('navEvents')}
        </button>
        <a className="mobile-nav-link" href="#" onClick={(e) => { e.preventDefault(); onTourGuideClick(); setMobileMenuOpen(false); }} style={{ textDecoration: 'none' }}>
          {t('tourGuide')}
        </a>
      </nav>
    </header>
  );
};


export default Header;
