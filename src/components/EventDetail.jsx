import React, { useState } from 'react';
import './EventDetail.css';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import ImageGallery from './ImageGallery';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const EventDetail = ({ event, onBack }) => {
  const { language, isRTL } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  if (!event) return null;

  const localize = (item, field) => {
    if (!item) return '';
    if (language === 'ar') return item[`${field}_ar`] || item[`${field}_en`] || '';
    return item[`${field}_en`] || item[`${field}_ar`] || '';
  };

  const getFullUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${API_BASE}${cleanPath}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const title = localize(event, 'title');
  const description = localize(event, 'description');
  const subtitle = localize(event, 'subtitle');
  const categoryName = event.categories && event.categories.length > 0 
    ? localize(event.categories[0], 'name') 
    : '';
  const dateRange = event.date_start 
    ? `${formatDate(event.date_start)}${event.date_end ? ' — ' + formatDate(event.date_end) : ''}` 
    : '';
  const timeStart = event.time_start || '';
  const timeEnd = event.time_end || '';

  // Build gallery images array from the API gallery data
  const galleryImages = (event.gallery || []).map((img) => ({
    image: getFullUrl(typeof img === 'string' ? img : img.image_url),
    title: title
  }));

  // Add the main cover image at the beginning if it's not in the gallery
  if (event.image_url && !galleryImages.find(g => g.image === getFullUrl(event.image_url))) {
    galleryImages.unshift({ image: getFullUrl(event.image_url), title: title });
  }

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
             {categoryName && <span className="category-tag">{categoryName}</span>}
             {event.location && <span className="location-info"> {event.location}</span>}
             <h1>{title}</h1>
             {subtitle && <p className="detail-subtitle">{subtitle}</p>}
           </div>
        </header>

        <div className="detail-layout">
          <div className="detail-main">
            <div className="media-hero">
              <img src={getFullUrl(event.image_url)} alt={title} />
              {galleryImages.length > 1 && (
                <button className="gallery-trigger" onClick={handleOpenGallery}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path>
                  </svg>
                  {t('mediaGallery')}
                </button>
              )}
            </div>

            {description && (
              <div className="description-section">
                <p className="lead-text">{description}</p>
              </div>
            )}

            <section className="info-table-section">
              <h3>{t('eventInformations')}</h3>
              <div className="info-table">
                {event.address && (
                  <div className="info-row">
                    <div className="info-label">{t('address') || 'Address'}</div>
                    <div className="info-value">{event.address}</div>
                  </div>
                )}
                {event.contact_phone && (
                  <div className="info-row">
                    <div className="info-label">{t('phone') || 'phone'}</div>
                    <div className="info-value">{event.contact_phone}</div>
                  </div>
                )}
                {event.contact_email && (
                  <div className="info-row">
                    <div className="info-label">{t('email') || 'email'}</div>
                    <div className="info-value">{event.contact_email}</div>
                  </div>
                )}
                {event.place && (
                  <div className="info-row">
                    <div className="info-label">{t('eventPlace')}</div>
                    <div className="info-value">{event.place}</div>
                  </div>
                )}
                {event.homepage && (
                  <div className="info-row">
                    <div className="info-label">{t('eventWebsite')}</div>
                    <div className="info-value">
                      <a href={event.homepage} target="_blank" rel="noopener noreferrer">
                        {event.homepage}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          <aside className="detail-sidebar">
            {dateRange && (
              <div className="sidebar-card date-card">
                <span className="sidebar-label">{t('eventDate')}</span>
                <div className="date-value">{dateRange}</div>
              </div>
            )}

            {(timeStart || timeEnd) && (
              <div className="sidebar-card schedule-card">
                <span className="sidebar-label">{t('eventTime') || 'Schedule'}</span>
                {timeStart && (
                  <div className="schedule-row">
                    <span>{t('startAt') || 'start at'} :</span>
                    <span>{timeStart}</span>
                  </div>
                )}
                {timeEnd && (
                  <div className="schedule-row">
                    <span>{t('endsAt') || 'ends at'} :</span>
                    <span>{timeEnd}</span>
                  </div>
                )}
              </div>
            )}

            {event.region && (
              <div className="sidebar-card">
                <span className="sidebar-label">{t('region') || 'Region'}</span>
                <div className="date-value">{event.region}</div>
              </div>
            )}
          </aside>
        </div>

        <footer className="detail-footer">
          <p className="disclaimer-text">{t('disclaimerEvents')}</p>
        </footer>
      </div>

      {showGallery && galleryImages.length > 0 && (
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
