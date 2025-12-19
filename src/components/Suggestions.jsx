import React, { useState } from 'react';
import './Suggestions.css';
import heroImage from '../assets/suggestions-hero.png';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';

// Each slide can have its own image - for now using same image, will be updated later
const slidesData = [
  {
    id: 1,
    tag: 'tagTopAttractions',
    title: 'titleAures',
    description: "descAures",
    image: heroImage
  },
  {
    id: 2,
    tag: 'tagWorldHeritage',
    title: 'titleTimgad',
    description: "descTimgad",
    image: heroImage // Will be replaced with unique image
  },
  {
    id: 3,
    tag: 'tagNature',
    title: 'titleDjurdjura',
    description: "descDjurdjura",
    image: heroImage // Will be replaced with unique image
  }
];

const Suggestions = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => (prev === 0 ? slidesData.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => (prev === slidesData.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

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

  const current = slidesData[currentSlide];

  return (
    <section className="suggestions" id="suggestions">
      <div className="suggestions-container">
        {/* Section Title */}
        <div className="suggestions-header">
          <h2 className="section-title">{t('ourSuggestions')}</h2>
        </div>

        {/* Hero Card */}
        <div 
          className="suggestions-hero"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Background Images - all slides for smooth transition */}
          {slidesData.map((slide, index) => (
            <div 
              key={slide.id}
              className={`hero-background ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>
          ))}

          {/* Floating Info Box */}
          <div className={`info-box ${isTransitioning ? 'transitioning' : ''}`}>
            <span className="info-tag">{t(current.tag)}</span>
            <h2 className="info-title">{t(current.title)}</h2>
            <p className="info-description">{t(current.description)}</p>
            <a href="#" className="info-link" aria-label={t('readMore')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>


          {/* Slide Indicators */}
          <div className="slide-indicators">
            {slidesData.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true);
                    setCurrentSlide(index);
                    setTimeout(() => setIsTransitioning(false), 500);
                  }
                }}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="hero-nav-controls">
            <button className="hero-nav-btn" onClick={goToPrev} aria-label={t('previous')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <div className="nav-divider"></div>
            <button className="hero-nav-btn" onClick={goToNext} aria-label={t('next')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Suggestions;
