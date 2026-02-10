import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import './TourGuide.css';

const TourGuidePage = ({ onClose }) => {
  const { language, isRTL } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const imageRefs = useRef([]);
  const textRefs = useRef([]);

  const locations = [
    {
      id: '01',
      titleKey: 'vtLocGhardaia',
      tags: ['vtTagUnesco', 'vtTagArchitecture', 'vtTag360'],
      descKey: 'vtDescGhardaia',
      ctaKey: 'vtEnterTour',
      image: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '02',
      titleKey: 'vtLocTimgad',
      tags: ['vtTagHistory', 'vtTagRuins', 'vtTagInteractive'],
      descKey: 'vtDescTimgad',
      ctaKey: 'vtEnterTour',
      image: 'https://images.unsplash.com/photo-1549145177-238518f1ec1a?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '03',
      titleKey: 'vtLocCasbah',
      tags: ['vtTagCulture', 'vtTagLabyrinth', 'vtTagAudio'],
      descKey: 'vtDescCasbah',
      ctaKey: 'vtEnterTour',
      image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?auto=format&fit=crop&q=80&w=800'
    }
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    imageRefs.current.forEach(img => img && observer.observe(img));
    textRefs.current.forEach(txt => txt && observer.observe(txt));

    return () => observer.disconnect();
  }, []);

  // Close modal on Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (isModalOpen) {
          setIsModalOpen(false);
        } else {
          onClose();
        }
      }
    };
    document.addEventListener('keydown', handleEscape);
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isModalOpen, onClose]);

  return (
    <div className={`tour-guide-overlay ${isRTL ? 'rtl' : ''}`}>
      <div className="tour-guide-page-content">
        {/* Close Button */}
        <button className="tg-close-btn" onClick={onClose} aria-label={t('close')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Hero Section */}
        <section className="tg-page-hero">
          <div className="tg-page-hero-bg"></div>
          <div className="tg-page-hero-content">
            <span className="tg-badge">{t('vtBadge')}</span>
            <h1 className="tg-page-title">{t('vtHeadline')}</h1>
            <p className="tg-page-subtitle">{t('vtSubtitle')}</p>
          </div>
        </section>

        {/* Locations */}
        <div className="tg-locations-container">
          {locations.map((loc, index) => (
            <article key={loc.id} className="tg-location-article">
              <div
                className="tg-loc-text fade-text"
                ref={el => textRefs.current[index] = el}
              >
                <span className="tg-loc-number">{loc.id}</span>
                <h3>{t(loc.titleKey)}</h3>
                <div className="tg-tags">
                  {loc.tags.map((tag, i) => (
                    <span key={i} className="tg-tag">{t(tag)}</span>
                  ))}
                </div>
                <p>{t(loc.descKey)}</p>
                <button className="tg-explore-link" onClick={() => setIsModalOpen(true)}>
                  {t(loc.ctaKey)} {isRTL ? '←' : '→'}
                </button>
              </div>
              <div className="tg-loc-image-wrapper">
                <img
                  src={loc.image}
                  alt={t(loc.titleKey)}
                  className="tg-loc-image scroll-reveal"
                  ref={el => imageRefs.current[index] = el}
                  loading="lazy"
                />
              </div>
            </article>
          ))}
        </div>

        {/* Matterport VR Modal */}
        {isModalOpen && (
          <div className="tg-modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="tg-modal-content" onClick={e => e.stopPropagation()}>
              <button className="tg-modal-close" onClick={() => setIsModalOpen(false)}>×</button>
              <iframe
                width="100%"
                height="100%"
                src="https://my.matterport.com/show/?m=M6gCqdgrcmQ"
                frameBorder="0"
                allowFullScreen
                allow="xr-spatial-tracking"
                title="Virtual Tour"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourGuidePage;
