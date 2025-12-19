import React, { useState } from 'react';
import './EventDetail.css';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import ImageGallery from './ImageGallery';

const EventDetail = ({ event, onBack }) => {
  const { language, isRTL } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  if (!event) return null;

  const galleryImages = event.gallery.map((img) => ({
    image: img,
    title: t(event.titleKey)
  }));

  const handleOpenGallery = () => {
    setGalleryIndex(0);
    setShowGallery(true);
  };

  return (
    <div className={`event-detail-overlay ${isRTL ? 'rtl' : ''}`}>
      <div className="event-detail-content">
        <button className="back-btn" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          {t('backToEvents')}
        </button>

        <header className="detail-header">
           <div className="header-text">
             <span className="category-tag">{t(event.category)}</span>
             <span className="location-info"> {event.location}</span>
             <h1>{t(event.titleKey)}</h1>
           </div>
        </header>

        <div className="detail-layout">
          <div className="detail-main">
            <div className="media-hero">
              <img src={event.image} alt={t(event.titleKey)} />
              <button className="gallery-trigger" onClick={handleOpenGallery}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path>
                </svg>
                {t('mediaGallery')}
              </button>
            </div>

            <div className="description-section">
              <p className="lead-text">{t(event.descriptionKey)}</p>
              <p>{t(event.descriptionKey)} {t(event.descriptionKey)}</p>
            </div>

            <section className="info-table-section">
              <h3>{t('eventInformations')}</h3>
              <div className="info-table">
                <div className="info-row">
                  <div className="info-label">{t('contactAddress')}</div>
                  <div className="info-value">
                    {event.address}<br />
                    {event.contact.phone}<br />
                    {event.contact.email}
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-label">{t('eventPlace')}</div>
                  <div className="info-value">{event.place}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">{t('eventWebsite')}</div>
                  <div className="info-value">
                    <a href={event.homepage} target="_blank" rel="noopener noreferrer">
                      {event.homepage}
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="detail-sidebar">
            <div className="sidebar-card date-card">
              <span className="sidebar-label">{t('eventDate')}</span>
              <div className="date-value">{event.dateRange}</div>
            </div>

            <div className="sidebar-card schedule-card">
              <div className="schedule-row">
                <span>Mo - Fr</span>
                <span>{event.time}</span>
              </div>
              <div className="schedule-row">
                <span>Sa</span>
                <span>{event.time}</span>
              </div>
              <div className="schedule-row">
                <span>Su</span>
                <span>{event.time}</span>
              </div>
            </div>

            <button className="check-btn">
              {t('checkAvailability')}
            </button>
          </aside>
        </div>

        <footer className="detail-footer">
          <p className="disclaimer-text">{t('disclaimerEvents')}</p>
        </footer>
      </div>

      {showGallery && (
        <ImageGallery 
          images={galleryImages} 
          currentIndex={galleryIndex}
          onClose={() => setShowGallery(false)} 
          onNavigate={setGalleryIndex}
        />
      )}
    </div>
  );
};


export default EventDetail;
