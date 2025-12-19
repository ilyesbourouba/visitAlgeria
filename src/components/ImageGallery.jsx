import React, { useEffect, useCallback } from 'react';
import './ImageGallery.css';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';

const ImageGallery = ({ images, currentIndex, onClose, onNavigate }) => {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft') {
      onNavigate(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      onNavigate(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    }
  }, [currentIndex, images.length, onClose, onNavigate]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const goToPrevious = () => {
    onNavigate(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    onNavigate(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const currentImage = images[currentIndex];

  return (
    <div className="image-gallery-overlay" onClick={onClose}>
      <div className="image-gallery-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="gallery-close-btn" onClick={onClose} aria-label={t('close')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Previous Button */}
        <button className="gallery-nav-btn gallery-prev" onClick={goToPrevious} aria-label={t('previous')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Image */}
        <div className="gallery-image-container">
          <img 
            src={currentImage.image.replace('w=300', 'w=1200')} 
            alt={currentImage.title} 
            className="gallery-image"
          />
          <div className="gallery-caption">
            <h3>{currentImage.title}</h3>
            <span className="gallery-counter">{currentIndex + 1} / {images.length}</span>
          </div>
        </div>

        {/* Next Button */}
        <button className="gallery-nav-btn gallery-next" onClick={goToNext} aria-label={t('next')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {/* Thumbnail Strip */}
        <div className="gallery-thumbnails">
          {images.map((img, index) => (
            <button
              key={index}
              className={`gallery-thumbnail ${index === currentIndex ? 'active' : ''}`}
              onClick={() => onNavigate(index)}
              aria-label={`${t('viewAll')} ${img.title}`}
            >
              <img src={img.image} alt={img.title} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;

