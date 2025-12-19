import React, { useState } from 'react';
import './InspirationCalendar.css';
import ImageGallery from './ImageGallery';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';

const monthsData = ['december', 'january', 'february', 'march'];
const itemsData = [
  { titleKey: 'christmasMarkets', image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=300&fit=crop' },
  { titleKey: 'newYearEve', image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=300&fit=crop' },
  { titleKey: 'winterHiking', image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=300&fit=crop' },
  { titleKey: 'skiSeason', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&fit=crop' },
  { titleKey: 'fondueNights', image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=300&fit=crop' },
  { titleKey: 'iceSkating', image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=300&fit=crop' },
  { titleKey: 'spaWellness', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=300&fit=crop' },
  { titleKey: 'snowShoeing', image: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=300&fit=crop' },
];

const InspirationCalendar = () => {
  const [activeMonth, setActiveMonth] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const openGallery = (index) => {
    setCurrentImageIndex(index);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
  };

  const navigateGallery = (index) => {
    setCurrentImageIndex(index);
  };

  const galleryImages = itemsData.map(item => ({
    ...item,
    title: t(item.titleKey)
  }));

  return (
    <section className="inspiration-calendar">
      <div className="calendar-header">
        <h2 className="section-title">{t('inspirationCalendar')}</h2>
        <div className="month-tabs">
          {monthsData.map((m, i) => (
            <button
              key={m}
              className={`month-tab ${i === activeMonth ? 'active' : ''}`}
              onClick={() => setActiveMonth(i)}
            >
              {t(m)}
            </button>
          ))}
        </div>
      </div>
      <div className="calendar-grid">
        {itemsData.map((item, i) => (
          <div 
            key={i} 
            className="cal-card" 
            style={{ backgroundImage: `url(${item.image})` }}
            onClick={() => openGallery(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openGallery(i)}
            aria-label={`${t('viewAll')} ${t(item.titleKey)}`}
          >
            <div className="cal-overlay">
              <span>{t(item.titleKey)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Image Gallery Modal */}
      {galleryOpen && (
        <ImageGallery
          images={galleryImages}
          currentIndex={currentImageIndex}
          onClose={closeGallery}
          onNavigate={navigateGallery}
        />
      )}
    </section>
  );
};

export default InspirationCalendar;


