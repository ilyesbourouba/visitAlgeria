import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';
import heroVideo from '../assets/Algeria from Above 4K UHD - A Cinematic Drone Journey.mp4';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import { fetchAPI, localize, mediaUrl } from '../services/api';

// Fallback categories (used when API is unavailable)
const fallbackCategories = [
  { id: 0, key: "summerVacations", video: heroVideo },
  { id: 1, key: 'beaches', video: heroVideo },
  { id: 2, key: 'familyActivities', video: heroVideo },
  { id: 3, key: 'historicalSites', video: heroVideo },
  { id: 4, key: 'mountains', video: heroVideo },
  { id: 5, key: 'hiking', video: heroVideo },
  { id: 6, key: 'saharaDesert', video: heroVideo },
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [slides, setSlides] = useState(null); // API data
  const videoRefs = useRef([]);
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  // Fetch slides from API
  useEffect(() => {
    fetchAPI('/hero-slides').then(data => {
      if (data && data.length > 0) {
        setSlides(data.filter(s => s.is_active).sort((a, b) => a.sort_order - b.sort_order));
      }
    });
  }, []);

  // Determine data source: API slides or fallback
  const categories = slides
    ? slides.map((s, i) => ({
        id: s.id || i,
        key: null, // won't use translation key
        title: localize(s, 'title', language),
        video: s.video_url ? mediaUrl(s.video_url) : heroVideo,
      }))
    : fallbackCategories.map(c => ({ ...c, title: t(c.key) }));

  const getTitle = (cat) => cat.title || t(cat.key);

  // Handle video transitions
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [activeIndex]);

  const goToSlide = (index) => {
    if (index === activeIndex || isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex(index);
    setShowGrid(false);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToPrev = () => {
    const newIndex = activeIndex === 0 ? categories.length - 1 : activeIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = activeIndex === categories.length - 1 ? 0 : activeIndex + 1;
    goToSlide(newIndex);
  };

  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('discover-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Touch swipe handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') setShowGrid(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex]);

  return (
    <section 
      className="hero" 
      id="hero"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Video Carousel */}
      <div className="hero-videos">
        {categories.map((cat, index) => (
          <video
            key={cat.id}
            ref={(el) => (videoRefs.current[index] = el)}
            className={`hero-video ${index === activeIndex ? 'active' : ''}`}
            src={cat.video}
            autoPlay={index === activeIndex}
            muted
            loop
            playsInline
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="hero-overlay"></div>


      {/* Hero Content */}
      <div className="hero-content">
        <h1 className="hero-title" key={activeIndex}>
          {getTitle(categories[activeIndex])}
        </h1>
        <p className="hero-subtitle">{t('discoverBeauty')}</p>
      </div>

      {/* Bottom Carousel Controls */}
      <div className="hero-carousel-controls">
        {/* Grid Toggle */}
        <button className="carousel-grid-btn" onClick={toggleGrid} aria-label={t('viewAllSections')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </button>

        {/* Prev Arrow */}
        <button className="carousel-nav-btn" onClick={goToPrev} aria-label={t('previous')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Category Names */}
        <div className="carousel-categories">
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              className={`carousel-category ${index === activeIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            >
              {getTitle(cat)}
            </button>
          ))}
        </div>

        {/* Next Arrow */}
        <button className="carousel-nav-btn" onClick={goToNext} aria-label={t('next')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Progress Bar */}
      <div className="hero-progress-bar">
        <div 
          className="hero-progress-fill" 
          style={{ width: `${((activeIndex + 1) / categories.length) * 100}%` }}
        ></div>
      </div>

      {/* Scroll Down Button */}
      <button className="hero-scroll-down" onClick={scrollToNextSection} aria-label={t('explorer')}>
        <span className="scroll-text">{t('explorer')}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {/* Grid Modal */}
      <div className={`hero-grid-modal ${showGrid ? 'active' : ''}`}>
        <div className="grid-modal-backdrop" onClick={() => setShowGrid(false)}></div>
        <div className="grid-modal-content">
          <div className="grid-modal-header">
            <h2>{t('exploreAlgeria')}</h2>
            <button className="grid-close-btn" onClick={() => setShowGrid(false)} aria-label={t('close')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="grid-items">
            {categories.map((cat, index) => (
              <div
                key={cat.id}
                className={`grid-item ${index === activeIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              >
                <video
                  src={cat.video}
                  muted
                  loop
                  playsInline
                  style={{ pointerEvents: 'none' }}
                />
                <div className="grid-item-overlay">
                  <span className="grid-item-name">{getTitle(cat)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
