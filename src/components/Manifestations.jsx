import React from 'react';
import './Manifestations.css';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import { eventsData } from '../data/events';

const Manifestations = ({ onViewAll, onSelectEvent }) => {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  // Map months for the badge since eventsData might use full date range
  const getMonthKey = (dateStr) => {
    if (dateStr.includes('.07.')) return 'monthJuly';
    if (dateStr.includes('.08.')) return 'monthAugust';
    if (dateStr.includes('.09.')) return 'monthSeptember';
    if (dateStr.includes('.10.')) return 'monthOctober';
    if (dateStr.includes('.11.')) return 'monthNovember';
    return 'monthJuly';
  };

  const getDay = (dateStr) => dateStr.split('.')[0];

  return (
    <section className="manifestations" id="manifestations-section">
      <div className="manifestations-container">
        <div className="manifestations-header">
          <h2 className="section-title">{t('manifestations')}</h2>
          <button 
            className="show-all-link-btn" 
            onClick={onViewAll}
          >
            {t('viewAll')}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        <div className="events-grid">
          {eventsData.slice(0, 4).map((event) => (
            <div 
              className="event-card" 
              key={event.id}
              onClick={() => onSelectEvent(event)}
              style={{ cursor: 'pointer' }}
            >
              <div className="event-thumbnail">
                <img src={event.image} alt={t(event.titleKey)} className="event-image" />
                <div className="date-badge">
                  <p className="badge-prefix">{t('from')}</p>
                  <p className="badge-day">{getDay(event.dateRange)}</p>
                  <p className="badge-month">{t(getMonthKey(event.dateRange))}</p>
                </div>
              </div>
              <h3 className="event-title">{t(event.titleKey)}</h3>
              <p className="event-details">{event.location}, {event.dateRange}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Manifestations;
