import React, { useState, useEffect } from 'react';
import './DiscoverPage.css';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import { fetchAPI, localize, mediaUrl } from '../services/api';

const DiscoverPage = ({ onClose, onOpenCategory }) => {
  const { language, isRTL } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const [pageSettings, setPageSettings] = useState(null);
  const [sections, setSections] = useState([]);
  const [sectionPlaces, setSectionPlaces] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch page settings and sections in parallel
        const [settingsData, sectionsData] = await Promise.all([
          fetchAPI('/discover-system/page-settings'),
          fetchAPI('/discover-system/sections')
        ]);

        if (settingsData) setPageSettings(settingsData);
        
        if (sectionsData && sectionsData.length > 0) {
          const activeSections = sectionsData.filter(s => s.is_active);
          setSections(activeSections);
          
          // Fetch places for each section
          const placesMap = {};
          for (const section of activeSections) {
            const placesData = await fetchAPI(`/discover-system/sections/${section.id}/places`);
            if (placesData) {
              placesMap[section.id] = placesData;
            }
          }
          setSectionPlaces(placesMap);
        }
      } catch (err) {
        console.error('Error loading discover data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleOpenCategory = (section) => {
    if (onOpenCategory) {
      onOpenCategory(section);
    }
  };

  const getSettingValue = (key) => {
    if (!pageSettings) return '';
    const langKey = `${key}_${language}`;
    return pageSettings[langKey] || pageSettings[`${key}_en`] || '';
  };

  if (loading) {
    return (
      <div className={`discover-page-overlay ${isRTL ? 'rtl' : ''}`}>
        <div className="discover-page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`discover-page-overlay ${isRTL ? 'rtl' : ''}`}>
        <section className="discover-hero-modern">
          <div 
            className="hero-background-layer"
            style={pageSettings?.background_image ? { 
              backgroundImage: `url(${mediaUrl(pageSettings.background_image)})`
            } : {}}
          />
          <div className="hero-overlay-cinematic"></div>
          <div className="hero-text-content">
            <span className="hero-tag">{getSettingValue('tag')}</span>
            <h1>{getSettingValue('title')}</h1>
            <p>{getSettingValue('subtitle')}</p>
          </div>
        </section>

        <div className="discover-page-content">
          <button className="page-close-btn" onClick={onClose} aria-label={t('close')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

        {sections.map(section => {
          const places = sectionPlaces[section.id] || [];
          if (places.length === 0) return null;

          return (
            <section key={section.id} className="discover-section art-culture-section">
              <div className="architecture-header">
                <div className="section-header-with-underline">
                  <h2 className="section-title-modern">{localize(section, 'name', language)}</h2>
                  <div className="section-underline"></div>
                </div>
                <button className="view-all-btn" onClick={() => handleOpenCategory(section, true)}>
                  {t('viewAll')} →
                </button>
              </div>
              <div className="art-grid">
                {places.slice(0, 4).map(place => (
                  <div key={place.id} className="art-card" onClick={() => handleOpenCategory(section, true)}>
                    <div className="art-card-media">
                      <img src={place.image_url ? mediaUrl(place.image_url) : ''} alt={localize(place, 'name', language)} />
                    </div>
                    <div className="art-card-info">
                      <h3>{localize(place, 'name', language)}</h3>
                      {place.categories && place.categories.length > 0 && (
                        <div className="discover-art-tags">
                          {place.categories.map((cat, idx) => (
                            <span key={idx} className="discover-art-tag">
                              {language === 'ar' ? (cat.name_ar || cat.name_en) : cat.name_en}
                            </span>
                          ))}
                        </div>
                      )}
                      {place.region && (
                        <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>{place.region}</p>
                      )}
                      <button className="learn-more-link" onClick={(e) => { e.stopPropagation(); handleOpenCategory(section, true); }}>
                        {t('learnMore')} <span className="arrow">→</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default DiscoverPage;
