import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import './TourGuide.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const TourGuidePage = ({ onClose }) => {
  const { language, isRTL } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMatterport, setActiveMatterport] = useState(null);
  const [locations, setLocations] = useState([]);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  const imageRefs = useRef([]);
  const textRefs = useRef([]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [locRes, heroRes] = await Promise.all([
          fetch(`${API_BASE}/api/tour-locations?active=true`),
          fetch(`${API_BASE}/api/tour-guide-hero`)
        ]);
        
        const locData = await locRes.json();
        const heroData = await heroRes.json();
        
        setLocations(Array.isArray(locData) ? locData : []);
        setSettings(heroData || {});
        setLoading(false);
      } catch (err) {
        console.error('Failed to load data:', err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Helper to pick the right language field
  const localize = (item, field) => {
    if (!item) return '';
    if (language === 'ar') return item[`${field}_ar`] || item[`${field}_en`] || '';
    return item[`${field}_en`] || item[`${field}_ar`] || '';
  };

  // Special helper for the hero settings object
  const getHeroField = (field) => {
    if (language === 'ar') return settings[`${field}_ar`] || settings[`${field}_en`] || '';
    return settings[`${field}_en`] || settings[`${field}_ar`] || '';
  };

  const getTagText = (tag) => {
    if (language === 'ar') return tag.tag_ar || tag.tag_en || '';
    return tag.tag_en || tag.tag_ar || '';
  };

  const getFullUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${API_BASE}${cleanPath}`;
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    if (loading || locations.length === 0) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Add visible class with a small delay for immediate viewport items
    const timer = setTimeout(() => {
      imageRefs.current.forEach(img => {
        if (img && img.getBoundingClientRect().top < window.innerHeight) {
          img.classList.add('visible');
        }
      });
      textRefs.current.forEach(txt => {
        if (txt && txt.getBoundingClientRect().top < window.innerHeight) {
          txt.classList.add('visible');
        }
      });
    }, 500);

    imageRefs.current.forEach(img => img && observer.observe(img));
    textRefs.current.forEach(txt => txt && observer.observe(txt));

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [loading, locations]);

  // Close modal on Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (isModalOpen) {
          setIsModalOpen(false);
          setActiveMatterport(null);
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

  const openTour = (matterportUrl) => {
    if (matterportUrl) {
      setActiveMatterport(matterportUrl);
      setIsModalOpen(true);
    }
  };

  // Fallback for hero content if settings aren't loaded yet
  const heroBg = settings.bg_image_url || 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&q=80&w=1600';
  const heroBadge = getHeroField('badge') || t('vtBadge');
  const heroTitle = getHeroField('title') || t('vtHeadline');
  const heroSubtitle = getHeroField('subtitle') || t('vtSubtitle');

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
          <div 
            className="tg-page-hero-bg" 
            style={{ backgroundImage: `url(${getFullUrl(heroBg)})` }}
          ></div>
          <div className="tg-page-hero-content">
            <span className="tg-badge">{heroBadge}</span>
            <h1 className="tg-page-title">{heroTitle}</h1>
            <p className="tg-page-subtitle">{heroSubtitle}</p>
          </div>
        </section>

        {/* Locations */}
        <div className="tg-locations-container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '10rem', color: 'rgba(255,255,255,0.5)' }}>
              <div className="tg-loading-spinner"></div>
              <p>Preparing your journey...</p>
            </div>
          ) : locations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem', color: 'rgba(255,255,255,0.3)' }}>
              <p>No tour locations discovered yet.</p>
            </div>
          ) : (
            locations.map((loc, index) => (
              <article key={loc.id} className="tg-location-article">
                <div
                  className="tg-loc-text fade-text"
                  ref={el => textRefs.current[index] = el}
                >
                  <span className="tg-loc-number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{localize(loc, 'title')}</h3>
                  <div className="tg-tags">
                    {(loc.tags || []).map((tag, i) => (
                      <span key={i} className="tg-tag">{getTagText(tag)}</span>
                    ))}
                  </div>
                  <p>{localize(loc, 'description')}</p>
                  {loc.matterport_url && (
                    <button className="tg-explore-link" onClick={() => openTour(loc.matterport_url)}>
                      {t('vtEnterTour')} {isRTL ? '←' : '→'}
                    </button>
                  )}
                </div>
                <div className="tg-loc-image-wrapper">
                  <img
                    src={getFullUrl(loc.image_url)}
                    alt={localize(loc, 'title')}
                    className="tg-loc-image scroll-reveal"
                    ref={el => imageRefs.current[index] = el}
                    loading="lazy"
                    onLoad={(e) => e.target.classList.add('loaded')}
                  />
                </div>
              </article>
            ))
          )}
        </div>

        {/* Matterport VR Modal */}
        {isModalOpen && activeMatterport && (
          <div className="tg-modal-overlay" onClick={() => { setIsModalOpen(false); setActiveMatterport(null); }}>
            <div className="tg-modal-content" onClick={e => e.stopPropagation()}>
              <button className="tg-modal-close" onClick={() => { setIsModalOpen(false); setActiveMatterport(null); }}>×</button>
              <iframe
                width="100%"
                height="100%"
                src={activeMatterport}
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
