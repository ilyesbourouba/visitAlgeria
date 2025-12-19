import React, { useState, useMemo } from 'react';
import './EventsPage.css';
import { eventsData } from '../data/events';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';

const EventsPage = ({ onClose, onSelectEvent }) => {
  const { language, isRTL } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');

  const categories = ['all', 'festivals', 'exhibitions', 'concerts', 'sports'];
  const regions = ['all', ...new Set(eventsData.map(e => e.region))];

  const filteredEvents = useMemo(() => {
    return eventsData.filter(event => {
      const matchesSearch = t(event.titleKey).toLowerCase().includes(search.toLowerCase()) || 
                            event.location.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
      const matchesRegion = regionFilter === 'all' || event.region === regionFilter;
      return matchesSearch && matchesCategory && matchesRegion;
    });
  }, [search, categoryFilter, regionFilter, language]);

  return (
    <div className={`events-page-overlay ${isRTL ? 'rtl' : ''}`}>
      <div className="events-page-content">
        <button className="events-close-btn" onClick={onClose} aria-label={t('close')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <header className="events-header">
          <h1>{t('eventsPageTitle')}</h1>
          
          <div className="events-controls">
            <div className="search-bar">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder={t('searchEvents')} 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <select 
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="filter-select"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? t('allCategories') : t(cat)}
                  </option>
                ))}
              </select>

              <select 
                value={regionFilter} 
                onChange={(e) => setRegionFilter(e.target.value)}
                className="filter-select"
              >
                {regions.map(reg => (
                  <option key={reg} value={reg}>
                    {reg === 'all' ? t('allRegions') : reg}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>

        <div className="events-grid">
          {filteredEvents.map(event => (
            <div 
              key={event.id} 
              className="event-card-big"
              onClick={() => onSelectEvent(event)}
            >
              <div className="event-card-image">
                <img src={event.image} alt={t(event.titleKey)} />
                <div className="event-card-overlay">
                  <span className="event-card-category">{t(event.category)}</span>
                </div>
              </div>
              <div className="event-card-info">
                <h3>{t(event.titleKey)}</h3>
                <div className="event-card-meta">
                  <span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    {event.dateRange}
                  </span>
                  <span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {event.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
