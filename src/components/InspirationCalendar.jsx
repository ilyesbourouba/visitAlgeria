import React, { useState, useEffect } from 'react';
import './InspirationCalendar.css';
import ImageGallery from './ImageGallery';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import { fetchAPI, localize, mediaUrl } from '../services/api';

const fallbackMonths = ['december', 'january', 'february', 'march'];
const fallbackItems = [
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
  const [apiData, setApiData] = useState(null);
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  useEffect(() => {
    fetchAPI('/calendar').then(data => {
      if (data && data.length > 0) {
        setApiData(data.filter(m => m.is_active).sort((a, b) => a.sort_order - b.sort_order));
      }
    });
  }, []);

  // Derive months and items
  const months = apiData
    ? apiData.map(m => localize(m, 'name', language))
    : fallbackMonths.map(m => t(m));

  const currentMonth = apiData ? apiData[activeMonth] : null;

  const itemsData = apiData && currentMonth && currentMonth.items
    ? currentMonth.items.filter(i => i.is_active).sort((a, b) => a.sort_order - b.sort_order).map(i => ({
        title: localize(i, 'title', language),
        image: i.image_url ? mediaUrl(i.image_url) : '',
      }))
    : fallbackItems.map(i => ({
        title: t(i.titleKey),
        image: i.image,
      }));

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
    title: item.title
  }));

  return (
    <section className="inspiration-calendar">
      <div className="calendar-header">
        <h2 className="section-title">{t('inspirationCalendar')}</h2>
        <div className="month-tabs">
          {months.map((m, i) => (
            <button
              key={i}
              className={`month-tab ${i === activeMonth ? 'active' : ''}`}
              onClick={() => setActiveMonth(i)}
            >
              {m}
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
            aria-label={`${t('viewAll')} ${item.title}`}
          >
            <div className="cal-overlay">
              <span>{item.title}</span>
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
