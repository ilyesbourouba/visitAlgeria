import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import { fetchAPI, localize, mediaUrl } from '../services/api';
import './UnescoHeritage.css';

const fallbackSites = [
  { nameKey: 'unSiteTipasa', yearKey: 'unYearTipasa', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&fit=crop' },
  { nameKey: 'unSiteDjemila', yearKey: 'unYearDjemila', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&fit=crop' },
  { nameKey: 'unSiteTimgad', yearKey: 'unYearTimgad', image: 'https://images.unsplash.com/photo-1549145177-238518f1ec1a?w=800&fit=crop' },
  { nameKey: 'unSiteMzab', yearKey: 'unYearMzab', image: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&fit=crop' },
  { nameKey: 'unSiteTassili', yearKey: 'unYearTassili', image: 'https://images.unsplash.com/photo-1575664274476-e02d99195164?w=800&fit=crop' },
  { nameKey: 'unSiteCasbah', yearKey: 'unYearCasbah', image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&fit=crop' },
  { nameKey: 'unSiteBeniHammad', yearKey: 'unYearBeniHammad', image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&fit=crop' },
];

const UnescoHeritage = () => {
  const { language, isRTL } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [apiData, setApiData] = useState(null);

  // Drag/Swipe state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragCurrentX, setDragCurrentX] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    fetchAPI('/unesco-sites').then(data => {
      if (data && data.length > 0) {
        setApiData(data.filter(s => s.is_active).sort((a, b) => a.sort_order - b.sort_order));
      }
    });
  }, []);

  const sites = apiData
    ? apiData.map(s => ({
        name: localize(s, 'name', language),
        year: language === 'ar' ? (s.year_inscribed_ar || s.year_inscribed) : s.year_inscribed,
        image: s.image_url ? mediaUrl(s.image_url) : '',
      }))
    : fallbackSites.map(s => ({
        name: t(s.nameKey),
        year: t(s.yearKey),
        image: s.image,
      }));

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? sites.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === sites.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 800);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isTransitioning]);

  // Drag/Swipe handlers
  const handleDragStart = (e) => {
    if (isTransitioning) return;
    setIsDragging(true);
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
    setDragCurrentX(clientX);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    setDragCurrentX(clientX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const dragDistance = dragCurrentX - dragStartX;
    const threshold = 50;

    if (Math.abs(dragDistance) > threshold) {
      const shouldGoNext = isRTL ? dragDistance > 0 : dragDistance < 0;
      if (shouldGoNext) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    setDragStartX(0);
    setDragCurrentX(0);
  };

  // Carousel positioning logic
  const getCardStyle = (index) => {
    const total = sites.length;
    let dist = (index - currentIndex) % total;
    if (dist < 0) dist += total;
    if (dist > total / 2) dist -= total;

    const isActive = dist === 0;
    const isVisible = dist >= -1 && dist <= 2;

    const xOffset = 240;
    const scaleStep = 0.85;

    let x = 0;
    let scale = 1;
    let zIndex = 0;
    let opacity = 0;

    if (isVisible) {
      opacity = 1;
      if (isActive) {
        x = 0;
        scale = 1;
        zIndex = 10;
      } else if (dist > 0) {
        x = dist * xOffset;
        scale = Math.pow(scaleStep, dist);
        zIndex = 10 - dist;
        if (dist > 2) opacity = 0;
      } else {
        x = dist * xOffset;
        scale = Math.pow(scaleStep, Math.abs(dist));
        zIndex = 9;
        opacity = 0;
      }
    }

    if (isRTL) x = -x;

    return {
      transform: `translateX(${x}px) scale(${scale})`,
      zIndex,
      opacity,
      transition: isTransitioning ? 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
      cursor: isActive ? 'default' : 'pointer',
      visibility: isVisible ? 'visible' : 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 'auto'
    };
  };

  const handleCardClick = (idx) => {
    if (isTransitioning) return;
    let dist = (idx - currentIndex) % sites.length;
    if (dist < 0) dist += sites.length;
    if (dist > sites.length / 2) dist -= sites.length;
    if (dist !== 0) {
      setIsTransitioning(true);
      setCurrentIndex(idx);
    }
  };

  const currentSite = sites[currentIndex];
  const dragOffset = isDragging ? dragCurrentX - dragStartX : 0;

  return (
    <section
      className="unesco-section"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${currentSite.image}')`
      }}
    >
      <div className="unesco-container">
        <div className="unesco-text-box">
          <span className="unesco-badge">{t('unBadge')}</span>
          <h2 className="unesco-headline">{t('unHeadline')}</h2>
          <p>{t('unDescription')}</p>

          <div className="unesco-button-group">
            <a href="#" className="unesco-btn unesco-btn-fill">{t('unCtaExplore')}</a>
          </div>
        </div>

        <div className="unesco-carousel">
          <div
            ref={carouselRef}
            className={`unesco-cards-track ${isDragging ? 'is-dragging' : ''}`}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            style={{ transform: isDragging ? `translateX(${dragOffset * 0.3}px)` : 'none' }}
          >
            {sites.map((site, idx) => (
              <div
                key={idx}
                className={`unesco-card ${idx === currentIndex ? 'unesco-card-main' : ''}`}
                style={{
                  backgroundImage: `url('${site.image}')`,
                  ...getCardStyle(idx)
                }}
                onClick={() => !isDragging && handleCardClick(idx)}
              >
                <div className="unesco-card-info">
                  <h3>{site.name}</h3>
                  <p className="unesco-card-year">{site.year}</p>
                  <div className="unesco-stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="unesco-slider-nav">
            <button className="unesco-arrow" onClick={isRTL ? handleNext : handlePrev} aria-label="Previous site">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span className="unesco-counter">
              {String(currentIndex + 1).padStart(2, '0')} / {String(sites.length).padStart(2, '0')}
            </span>
            <button className="unesco-arrow" onClick={isRTL ? handlePrev : handleNext} aria-label="Next site">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnescoHeritage;
