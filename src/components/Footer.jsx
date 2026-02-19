import React, { useState, useEffect } from 'react';
import './Footer.css';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import axios from 'axios';

const API_BASE = 'http://localhost:5001';

const Footer = () => {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [socials, setSocials] = useState({});

  useEffect(() => {
    axios.get(`${API_BASE}/api/settings`)
      .then(res => setSocials(res.data || {}))
      .catch(() => {});
  }, []);

  const socialLinks = [
    { key: 'social_facebook', label: t('socialFacebook'), icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
    { key: 'social_tiktok', label: t('socialTiktok'), icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg> },
    { key: 'social_instagram', label: t('socialInstagram'), icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
    { key: 'social_linkedin', label: t('socialLinkedin'), icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
    { key: 'social_pinterest', label: t('socialPinterest'), icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.38.04-3.4.22-.92 1.4-5.93 1.4-5.93a4.14 4.14 0 0 1-.34-1.68c0-1.58.92-2.76 2.06-2.76a1.43 1.43 0 0 1 1.44 1.6c0 .98-.62 2.44-.94 3.8a1.64 1.64 0 0 0 1.68 2.05c2.01 0 3.55-2.12 3.55-5.18 0-2.71-1.94-4.6-4.72-4.6a4.9 4.9 0 0 0-5.12 4.91c0 .97.37 2.01.84 2.58a.34.34 0 0 1 .08.32c-.09.35-.28 1.11-.32 1.27-.05.2-.17.25-.38.15-1.41-.66-2.3-2.72-2.3-4.38 0-3.57 2.59-6.85 7.47-6.85 3.92 0 6.97 2.8 6.97 6.53 0 3.9-2.46 7.04-5.87 7.04a3.03 3.03 0 0 1-2.64-1.32s-.58 2.2-.72 2.74a10.9 10.9 0 0 1-1.33 2.81A12 12 0 1 0 12 0z"/></svg> },
    { key: 'social_youtube', label: t('socialYoutube'), icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.56 9.38.56 9.38.56s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14c.34-1.93.5-3.87.5-5.8 0-1.93-.16-3.87-.5-5.8zM9.55 15.5V8.5l6.27 3.5-6.27 3.5z"/></svg> },
  ];

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-main">Visit</span>
            <span className="logo-sub">Algeria</span>
          </div>
          <p>{t('discoverRichness')}</p>
        </div>
        <div className="footer-links">
          <h4>{t('destinations')}</h4>
          <ul>
            <li><a href="#">{language === 'ar' ? 'الجزائر العاصمة' : 'Algiers'}</a></li>
            <li><a href="#">{language === 'ar' ? 'قسنطينة' : 'Constantine'}</a></li>
            <li><a href="#">{language === 'ar' ? 'وهران' : 'Oran'}</a></li>
            <li><a href="#">{language === 'ar' ? 'تلمسان' : 'Tlemcen'}</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>{t('experiences')}</h4>
          <ul>
            <li><a href="#">{language === 'ar' ? 'جولات الصحراء' : 'Sahara Tours'}</a></li>
            <li><a href="#">{language === 'ar' ? 'ثقافة' : 'Culture'}</a></li>
            <li><a href="#">{language === 'ar' ? 'سحر الطبخ' : 'Food'}</a></li>
            <li><a href="#">{language === 'ar' ? 'مغامرة' : 'Adventure'}</a></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>{t('about')}</h4>
          <ul>
            <li><a href="#">{t('contact')}</a></li>
            <li><a href="#">{language === 'ar' ? 'مساحة الصحافة' : 'Media Kit'}</a></li>
            <li><a href="#">{t('privacyPolicy')}</a></li>
            <li><a href="#">{t('termsOfService')}</a></li>
          </ul>
        </div>
        <div className="footer-newsletter">
          <h4>{t('stayInspired')}</h4>
          <div className="newsletter-form">
            <input type="email" placeholder={t('emailPlaceholder')} />
            <button>{t('subscribe')}</button>
          </div>
        </div>
      </div>

      {/* Social Icons Section — Dynamic from API */}
      <div className="footer-social-section">
        <h4 className="social-title">{t('followUs')}</h4>
        <div className="social-icons">
          {socialLinks.filter(s => socials[s.key]).map(s => (
            <a key={s.key} href={socials[s.key]} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label={s.label}>
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Visit Algeria. {t('allRightsReserved')}.</p>
      </div>
    </footer>
  );
};

export default Footer;
