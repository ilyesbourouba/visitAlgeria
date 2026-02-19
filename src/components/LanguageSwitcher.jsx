import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './LanguageSwitcher.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// Built-in languages that use manual translations
const BUILTIN_LANGUAGES = [
  { code: 'en', name_en: 'English', name_native: 'English' },
  { code: 'ar', name_en: 'Arabic', name_native: 'العربية' },
];

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [extraLanguages, setExtraLanguages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTranslation, setActiveTranslation] = useState(null);
  const dropdownRef = useRef(null);

  // Fetch admin-configured languages
  useEffect(() => {
    fetch(`${API_BASE}/api/languages?active=true`)
      .then(res => res.json())
      .then(data => {
        // Filter out en/ar since those are built-in
        const extra = (Array.isArray(data) ? data : []).filter(
          l => l.code !== 'en' && l.code !== 'ar' && l.is_active
        );
        setExtraLanguages(extra);
      })
      .catch(() => setExtraLanguages([]));
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Initialize Google Translate
  useEffect(() => {
    // Add Google Translate script if not already present
    if (!document.getElementById('google-translate-script')) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            autoDisplay: false,
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element'
        );
      };

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const triggerGoogleTranslate = (langCode) => {
    if (!langCode) return;
    const code = langCode.toLowerCase();
    
    // Most reliable: set the googtrans cookie and reload
    document.cookie = `googtrans=/en/${code}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/en/${code}; path=/`;
    
    // Try to use the translate element's API
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event('change'));
    } else {
      // If combo not ready yet, set cookie and reload
      window.location.reload();
    }
  };

  const removeGoogleTranslate = () => {
    // Remove googtrans cookies
    document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = `googtrans=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    
    // Try to restore original
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = '';
      select.dispatchEvent(new Event('change'));
    }
    
    // Remove the translate bar if present
    const bar = document.querySelector('.skiptranslate');
    if (bar) bar.style.display = 'none';
    document.body.style.top = '0px';
  };

  const handleSelectLanguage = (lang) => {
    setIsOpen(false);

    if (lang.code === 'en' || lang.code === 'ar') {
      // Built-in language — use manual translations
      removeGoogleTranslate();
      setActiveTranslation(null);
      setLanguage(lang.code);
    } else {
      // Extra language — ensure base is English first, then translate
      if (language !== 'en') {
        setLanguage('en');
      }
      setActiveTranslation(lang.code);
      // Small delay to let the page render in English before translating
      setTimeout(() => triggerGoogleTranslate(lang.code), 300);
    }
  };

  const currentLabel = activeTranslation
    ? (extraLanguages.find(l => l.code === activeTranslation)?.name_native || activeTranslation.toUpperCase())
    : (language === 'ar' ? 'العربية' : 'EN');

  const allLanguages = [...BUILTIN_LANGUAGES, ...extraLanguages];

  return (
    <div className="language-switcher-wrapper" ref={dropdownRef}>
      <button
        className="language-switcher"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
        <span className="lang-code">{currentLabel}</span>
        <svg className={`lang-chevron ${isOpen ? 'open' : ''}`} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {allLanguages.map(lang => {
            const isActive = activeTranslation
              ? lang.code === activeTranslation
              : (lang.code === language && !activeTranslation);
            return (
              <button
                key={lang.code}
                className={`language-option ${isActive ? 'active' : ''}`}
                onClick={() => handleSelectLanguage(lang)}
              >
                <span className="lang-option-native">{lang.name_native}</span>
                <span className="lang-option-en">{lang.name_en}</span>
                {isActive && <span className="lang-check">✓</span>}
              </button>
            );
          })}
        </div>
      )}

      {/* Hidden Google Translate element */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>
    </div>
  );
};

export default LanguageSwitcher;
