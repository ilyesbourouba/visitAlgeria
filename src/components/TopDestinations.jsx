import React, { useState, useRef, useEffect } from 'react';
import './TopDestinations.css';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';

const destinations = [
  { id: 1, nameKey: 'cityAlger', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&h=400&fit=crop' },
  { id: 2, nameKey: 'cityConstantine', image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=600&h=400&fit=crop' },
  { id: 3, nameKey: 'cityOran', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop' },
  { id: 4, nameKey: 'cityTlemcen', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&h=400&fit=crop' },
  { id: 5, nameKey: 'cityBejaia', image: 'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?w=600&h=400&fit=crop' },
  { id: 6, nameKey: 'cityGhardaia', image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=600&h=400&fit=crop' },
  { id: 7, nameKey: 'cityAnnaba', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&h=400&fit=crop' },
  { id: 8, nameKey: 'cityTamanrasset', image: 'https://images.unsplash.com/photo-1509660933844-6910e12765a0?w=600&h=400&fit=crop' },
];

const TopDestinations = ({ onOpenDestinations }) => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollButtons);
      return () => carousel.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollByAmount = (direction) => {
    const scrollAmount = 400;
    carouselRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="top-destinations" id="top-destinations">
      <div className="destinations-header">
        <div className="destinations-title-area">
          <h2 className="section-title">{t('topDestinations')}</h2>
          <button onClick={onOpenDestinations} className="destinations-link">
            {t('learnMore')}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
        <div className="destinations-nav">
          <button 
            className={`nav-arrow ${!canScrollLeft ? 'disabled' : ''}`}
            onClick={() => scrollByAmount(-1)}
            disabled={!canScrollLeft}
            aria-label={t('previous')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button 
            className={`nav-arrow ${!canScrollRight ? 'disabled' : ''}`}
            onClick={() => scrollByAmount(1)}
            disabled={!canScrollRight}
            aria-label={t('next')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <div 
        className={`destinations-carousel ${isDragging ? 'dragging' : ''}`}
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {destinations.map((dest) => (
          <div key={dest.id} className="destination-card">
            <div 
              className="destination-image" 
              style={{ backgroundImage: `url(${dest.image})` }}
            >
              <div className="destination-overlay"></div>
            </div>
            <h3 className="destination-name">{t(dest.nameKey)}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopDestinations;

