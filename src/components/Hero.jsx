import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';
import heroVideo from '../assets/Algeria from Above 4K UHD - A Cinematic Drone Journey.mp4';

// Categories with their videos (using same video for now, will be replaced later)
const categories = [
  { id: 0, name: "Vacances d'été", video: heroVideo },
  { id: 1, name: 'Plages', video: heroVideo },
  { id: 2, name: 'Activités familiales', video: heroVideo },
  { id: 3, name: 'Sites historiques', video: heroVideo },
  { id: 4, name: 'Montagnes', video: heroVideo },
  { id: 5, name: 'Randonnée', video: heroVideo },
  { id: 6, name: 'Désert du Sahara', video: heroVideo },
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const videoRefs = useRef([]);

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
    <section className="hero" id="hero">
      {/* Video Carousel */}
      <div className="hero-videos">
        {categories.map((cat, index) => (
          <video
            key={cat.id}
            ref={(el) => (videoRefs.current[index] = el)}
            className={`hero-video ${index === activeIndex ? 'active' : ''}`}
            autoPlay={index === activeIndex}
            muted
            loop
            playsInline
          >
            <source src={cat.video} type="video/mp4" />
          </video>
        ))}
      </div>

      {/* Overlay */}
      <div className="hero-overlay"></div>

      {/* Hero Content */}
      <div className="hero-content">
        <h1 className="hero-title" key={activeIndex}>
          {categories[activeIndex].name}
        </h1>
        <p className="hero-subtitle">Découvrez la beauté de l'Algérie</p>
      </div>

      {/* Bottom Carousel Controls - New Layout like reference image */}
      <div className="hero-carousel-controls">
        {/* Grid Toggle */}
        <button className="carousel-grid-btn" onClick={toggleGrid} aria-label="Show all sections">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </button>

        {/* Prev Arrow */}
        <button className="carousel-nav-btn" onClick={goToPrev} aria-label="Previous">
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
              {cat.name}
            </button>
          ))}
        </div>

        {/* Next Arrow */}
        <button className="carousel-nav-btn" onClick={goToNext} aria-label="Next">
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

      {/* Scroll Down Button - Center Bottom */}
      <button className="hero-scroll-down" onClick={scrollToNextSection} aria-label="Scroll to next section">
        <span className="scroll-text">Explorer</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {/* Grid Modal */}
      <div className={`hero-grid-modal ${showGrid ? 'active' : ''}`}>
        <div className="grid-modal-backdrop" onClick={() => setShowGrid(false)}></div>
        <div className="grid-modal-content">
          <div className="grid-modal-header">
            <h2>Explorez l'Algérie</h2>
            <button className="grid-close-btn" onClick={() => setShowGrid(false)}>
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
                  onMouseEnter={(e) => e.target.play()}
                  onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                />
                <div className="grid-item-overlay">
                  <span className="grid-item-name">{cat.name}</span>
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
