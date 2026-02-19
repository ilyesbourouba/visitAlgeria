import React, { useState, useEffect, useMemo } from 'react';
import './CategoryPage.css';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import { fetchAPI, localize, mediaUrl } from '../services/api';

const CategoryPage = ({ category, onClose, onSelectItem }) => {
  const { language, isRTL } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // category can be a section object {id, name_en, name_ar} or a legacy string
  const sectionId = typeof category === 'object' ? category.id : null;
  const sectionTitle = typeof category === 'object' 
    ? localize(category, 'name', language) 
    : t(category === 'art' ? 'artAndCulture' : category === 'architecture' ? 'architecture' : 'museums');

  useEffect(() => {
    const loadPlaces = async () => {
      setLoading(true);
      try {
        if (sectionId) {
          const data = await fetchAPI(`/discover-system/sections/${sectionId}/places`);
          if (data) setPlaces(data);
        }
      } catch (err) {
        console.error('Error loading places:', err);
      } finally {
        setLoading(false);
      }
    };
    loadPlaces();
  }, [sectionId]);

  // Get unique regions and categories for filters
  const regions = useMemo(() => {
    const unique = [...new Set(places.map(p => p.region).filter(Boolean))];
    return ['all', ...unique];
  }, [places]);

  const categoryOptions = useMemo(() => {
    const allCats = [];
    places.forEach(p => {
      if (p.categories) {
        p.categories.forEach(cat => {
          const name = language === 'ar' ? (cat.name_ar || cat.name_en) : cat.name_en;
          if (name && !allCats.includes(name)) allCats.push(name);
        });
      }
    });
    return ['all', ...allCats];
  }, [places, language]);

  // Filter places
  const filteredPlaces = useMemo(() => {
    return places.filter(place => {
      const regionMatch = selectedRegion === 'all' || place.region === selectedRegion;
      const catMatch = selectedCategory === 'all' || (place.categories && place.categories.some(cat => {
        const name = language === 'ar' ? (cat.name_ar || cat.name_en) : cat.name_en;
        return name === selectedCategory;
      }));
      return regionMatch && catMatch;
    });
  }, [places, selectedRegion, selectedCategory, language]);

  return (
    <div className={`category-page-overlay ${isRTL ? 'rtl' : ''}`}>
      <div className="category-page-content">
        {/* Header */}
        <header className="category-page-header">
          <button className="back-btn" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            {t('backToDiscover')}
          </button>
          <h1>{sectionTitle}</h1>
          <div className="header-underline"></div>
        </header>

        {/* Filters */}
        <div className="category-filters">
          <div className="filter-group">
            <label>{t('filterByRegion')}</label>
            <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
              {regions.map(region => (
                <option key={region} value={region}>
                  {region === 'all' ? t('allRegions') : region}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>{t('filterByType')}</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {categoryOptions.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? t('allTypes') : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading" style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
        ) : (
          <>
            {/* Items Grid */}
            <div className="category-items-grid">
              {filteredPlaces.map(place => (
                <div
                  key={place.id}
                  className="category-item-card"
                  onClick={() => onSelectItem && onSelectItem(place)}
                >
                  <div className="item-card-image">
                    <img src={place.image_url ? mediaUrl(place.image_url) : ''} alt={localize(place, 'name', language)} />
                    <div className="item-card-gradient"></div>
                  </div>
                  <div className="item-card-content">
                    {place.categories && place.categories.length > 0 && (
                      <span className="item-tag">
                        {language === 'ar' ? (place.categories[0].name_ar || place.categories[0].name_en) : place.categories[0].name_en}
                      </span>
                    )}
                    <h3>{localize(place, 'name', language)}</h3>
                    {place.region && <span className="item-region">{place.region}</span>}
                  </div>
                </div>
              ))}
            </div>

            {filteredPlaces.length === 0 && (
              <div className="no-results">
                <p>No items found matching your filters.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
