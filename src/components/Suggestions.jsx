import React, { useState } from 'react';
import './Suggestions.css';
import heroImage from '../assets/suggestions-hero.png';

// Each slide can have its own image - for now using same image, will be updated later
const slides = [
  {
    id: 1,
    tag: 'Top attractions',
    title: 'Le Train des Aurès',
    description: "Découvrez les paysages spectaculaires des montagnes des Aurès à bord d'un train panoramique. Un voyage inoubliable à travers les gorges, les vallées verdoyantes et les villages traditionnels berbères perchés sur les hauteurs.",
    image: heroImage
  },
  {
    id: 2,
    tag: 'Patrimoine mondial',
    title: 'Les ruines de Timgad',
    description: "Explorez les vestiges de l'ancienne cité romaine de Timgad, inscrite au patrimoine mondial de l'UNESCO. Une fenêtre ouverte sur l'histoire de l'Empire romain en Afrique du Nord.",
    image: heroImage // Will be replaced with unique image
  },
  {
    id: 3,
    tag: 'Nature',
    title: 'Le parc national du Djurdjura',
    description: "Parcourez les sentiers du massif du Djurdjura et découvrez une biodiversité exceptionnelle. Des forêts de cèdres aux sommets enneigés, une immersion totale dans la nature kabyle.",
    image: heroImage // Will be replaced with unique image
  }
];

const Suggestions = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const current = slides[currentSlide];

  return (
    <section className="suggestions" id="suggestions">
      <div className="suggestions-container">
        {/* Section Title */}
        <div className="suggestions-header">
          <h2 className="section-title">Suggestions</h2>
        </div>

        {/* Hero Card */}
        <div className="suggestions-hero">
          {/* Background Images - all slides for smooth transition */}
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`hero-background ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>
          ))}

          {/* Floating Info Box */}
          <div className={`info-box ${isTransitioning ? 'transitioning' : ''}`}>
            <span className="info-tag">{current.tag}</span>
            <h2 className="info-title">{current.title}</h2>
            <p className="info-description">{current.description}</p>
            <a href="#" className="info-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          {/* Slide Indicators */}
          <div className="slide-indicators">
            {slides.map((_, index) => (
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
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="hero-nav-controls">
            <button className="hero-nav-btn" onClick={goToPrev} aria-label="Previous slide">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <div className="nav-divider"></div>
            <button className="hero-nav-btn" onClick={goToNext} aria-label="Next slide">
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
