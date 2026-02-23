import React, { useState, useEffect, useMemo } from 'react';
import './EventsPage.css';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';

const API_BASE = import.meta.env.VITE_API_URL;

const EventsPage = ({ onClose, onSelectEvent }) => {
  const { language, isRTL } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');

  // Fetch events and categories from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [evRes, catRes] = await Promise.all([
          fetch(`${API_BASE}/api/events?active=true`),
          fetch(`${API_BASE}/api/event-categories`)
        ]);
        const evData = await evRes.json();
        const catData = await catRes.json();
        setEvents(Array.isArray(evData) ? evData : []);
        setCategories(Array.isArray(catData) ? catData : []);
      } catch (err) {
        console.error('Failed to load events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const regions = useMemo(() => {
    const all = events.map(e => e.region).filter(Boolean);
    return ['all', ...new Set(all)];
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const title = localize(event, 'title');
      const matchesSearch = title.toLowerCase().includes(search.toLowerCase()) ||
                            (event.location || '').toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || 
        (event.categories && event.categories.some(c => String(c.id) === String(categoryFilter)));
      const matchesRegion = regionFilter === 'all' || event.region === regionFilter;
      return matchesSearch && matchesCategory && matchesRegion;
    });
  }, [search, categoryFilter, regionFilter, events, language]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

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
                <option value="all">{t('allCategories')}</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {localize(cat, 'name')}
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

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
            Loading events...
          </div>
        ) : (
          <div className="events-grid">
            {filteredEvents.map(event => (
              <div 
                key={event.id} 
                className="event-card-big"
                onClick={() => onSelectEvent(event)}
              >
                <div className="event-card-image">
                  <img src={getFullUrl(event.image_url)} alt={localize(event, 'title')} />
                  <div className="event-card-overlay">
                    {event.categories && event.categories.length > 0 && (
                      <span className="event-card-category">
                        {localize(event.categories[0], 'name')}
                      </span>
                    )}
                  </div>
                </div>
                <div className="event-card-info">
                  <h3>{localize(event, 'title')}</h3>
                  {localize(event, 'subtitle') && (
                    <p className="event-card-subtitle">{localize(event, 'subtitle')}</p>
                  )}
                  <div className="event-card-meta">
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      {formatDate(event.date_start)}{event.date_end ? ` — ${formatDate(event.date_end)}` : ''}
                    </span>
                    {event.location && (
                      <span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        {event.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
