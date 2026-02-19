import React, { useState, useRef, useEffect } from 'react';
import './TopDestinations.css';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import { fetchAPI, localize, mediaUrl } from '../services/api';

const fallbackDestinations = [
  { id: 1, nameKey: 'cityAlger', image: 'https://images.unsplash.com/photo-1599423300746-b62533397364?w=600&h=400&fit=crop' },
  { id: 2, nameKey: 'cityConstantine', image: 'https://images.unsplash.com/photo-1569288063643-5d29ad64df09?w=600&h=400&fit=crop' },
  { id: 3, nameKey: 'cityOran', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop' },
  { id: 4, nameKey: 'cityTlemcen', image: 'https://images.unsplash.com/photo-1590076083220-8e12f9f8d6b7?w=600&h=400&fit=crop' },
  { id: 5, nameKey: 'cityBejaia', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop' },
  { id: 6, nameKey: 'cityGhardaia', image: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=600&h=400&fit=crop' },
  { id: 7, nameKey: 'cityAnnaba', image: 'https://images.unsplash.com/photo-1533929736562-6f2cded85c6c?w=600&h=400&fit=crop' },
  { id: 8, nameKey: 'cityTamanrasset', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&h=400&fit=crop' },
];

const TopDestinations = ({ onOpenDestinations, onSelectDestination }) => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [apiData, setApiData] = useState(null);
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  useEffect(() => {
    fetchAPI('/destinations').then(data => {
      if (data && data.length > 0) {
        setApiData(data.filter(d => d.is_active).sort((a, b) => a.sort_order - b.sort_order));
      }
    });
  }, []);

  const destinations = apiData
    ? apiData.map(d => ({
        id: d.id,
        name: localize(d, 'name', language),
        image: d.background_image ? mediaUrl(d.background_image) : '',
        rawData: d
      }))
    : fallbackDestinations.map(d => ({ ...d, name: t(d.nameKey) }));

  const getName = (dest) => dest.name || t(dest.nameKey);

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

  const handleCardClick = (dest) => {
    if (isDragging) return; // Don't navigate if user was dragging
    if (onSelectDestination && dest.rawData) {
      onSelectDestination(dest.rawData);
    } else if (onOpenDestinations) {
      onOpenDestinations();
    }
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
          <div
            key={dest.id}
            className="destination-card"
            onClick={() => handleCardClick(dest)}
            style={{ cursor: 'pointer' }}
          >
            <div 
              className="destination-image" 
              style={{ backgroundImage: `url(${dest.image})` }}
            >
              <div className="destination-overlay"></div>
            </div>
            <h3 className="destination-name">{getName(dest)}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopDestinations;
