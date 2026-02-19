import React, { useState } from 'react';
import './InfoPage.css';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';

const InfoPage = ({ onClose }) => {
  const { language, isRTL } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    { q: 'faqQ1', a: 'faqA1' },
    { q: 'faqQ2', a: 'faqA2' },
    { q: 'faqQ3', a: 'faqA3' },
    { q: 'faqQuestion4', a: 'faqAnswer4' },
  ];


  return (
    <div className={`info-page-overlay ${isRTL ? 'rtl' : ''}`}>
      <div className="info-page-content">
        <button className="info-close-btn" onClick={onClose} aria-label={t('close')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <header className="info-header">
          <h1>{t('aboutVisitAlgeria')}</h1>
        </header>

        <section className="info-section presentation">
          <div className="info-card">
            <h2>{t('presentationTitle')}</h2>
            <p>{t('presentationText')}</p>
          </div>
          <div className="info-card">
            <h2>{t('purposeTitle')}</h2>
            <p>{t('purposeText')}</p>
          </div>
        </section>

        <section className="info-section faq">
          <h2>{t('faqTitle')}</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question">
                  <span>{t(faq.q)}</span>
                  <svg className="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
                <div className="faq-answer">
                  <p>{t(faq.a)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="info-section contact">
          <h2>{t('contactTitle')}</h2>
          <div className="contact-container">
            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert(t('contactSuccess')); }}>
              <div className="form-group">
                <label htmlFor="name">{t('contactFullName')}</label>
                <input type="text" id="name" required placeholder={t('contactFullName')} />
              </div>
              <div className="form-group">
                <label htmlFor="email">{t('contactEmail')}</label>
                <input type="email" id="email" required placeholder={t('contactEmail')} />
              </div>
              <div className="form-group">
                <label htmlFor="subject">{t('contactSubject')}</label>
                <input type="text" id="subject" required placeholder={t('contactSubject')} />
              </div>
              <div className="form-group">
                <label htmlFor="message">{t('contactMessage')}</label>
                <textarea id="message" required rows="5" placeholder={t('contactMessage')}></textarea>
              </div>
              <button type="submit" className="submit-btn">{t('contactSend')}</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InfoPage;
