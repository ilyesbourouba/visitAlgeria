import React, { useState, useMemo } from 'react';
import './CategoryPage.css';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';

// Data for each category
const categoryData = {
  art: {
    titleKey: 'artAndCulture',
    items: [
      { id: 'crafts', titleKey: 'traditionalCrafts', descKey: 'traditionalCraftsDesc', region: 'Ghardaia', type: 'crafts', image: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=600&fit=crop' },
      { id: 'music', titleKey: 'musicAndRhythms', descKey: 'musicAndRhythmsDesc', region: 'Oran', type: 'music', image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&fit=crop' },
      { id: 'events', titleKey: 'culturalEvents', descKey: 'culturalEventsDesc', region: 'Algiers', type: 'events', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&fit=crop' },
      { id: 'pottery', titleKey: 'traditionalCrafts', descKey: 'traditionalCraftsDesc', region: 'Kabylie', type: 'crafts', image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&fit=crop' },
      { id: 'dance', titleKey: 'culturalEvents', descKey: 'culturalEventsDesc', region: 'Tamanrasset', type: 'events', image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=600&fit=crop' },
    ]
  },
  architecture: {
    titleKey: 'architecture',
    items: [
      { id: 'casbah', titleKey: 'casbahAlgiers', tagKey: 'unescoHeritage', region: 'Algiers', type: 'heritage', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&fit=crop' },
      { id: 'mosque', titleKey: 'greatMosque', tagKey: 'modernity', region: 'Algiers', type: 'religious', image: 'https://images.unsplash.com/photo-1542662565-7e4b66bae529?w=600&fit=crop' },
      { id: 'constantine', titleKey: 'constantine', tagKey: 'suspendedBridges', region: 'Constantine', type: 'heritage', image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=600&fit=crop' },
      { id: 'timgad', titleKey: 'timgadRuins', tagKey: 'romanHistory', region: 'Batna', type: 'heritage', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&fit=crop' },
    ]
  },
  museums: {
    titleKey: 'museums',
    items: [
      { id: 'bardo', titleKey: 'bardoMuseum', region: 'Algiers', type: 'history', image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&fit=crop' },
      { id: 'finearts', titleKey: 'fineArtsMuseum', region: 'Algiers', type: 'art', image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600&fit=crop' },
      { id: 'cirta', titleKey: 'cirtaMuseum', region: 'Constantine', type: 'history', image: 'https://images.unsplash.com/photo-1572953108238-fd75adfff571?w=600&fit=crop' },
      { id: 'mama', titleKey: 'mamaAlgiers', region: 'Algiers', type: 'contemporary', image: 'https://images.unsplash.com/photo-1564391802241-dfca4001bc67?w=600&fit=crop' },
    ]
  }
};

const CategoryPage = ({ category, onClose, onSelectItem }) => {
  const { language, isRTL } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const data = categoryData[category] || categoryData.art;

  // Get unique regions and types for filters
  const regions = useMemo(() => {
    const unique = [...new Set(data.items.map(item => item.region))];
    return ['all', ...unique];
  }, [data.items]);

  const types = useMemo(() => {
    const unique = [...new Set(data.items.map(item => item.type))];
    return ['all', ...unique];
  }, [data.items]);

  // Filter items
  const filteredItems = useMemo(() => {
    return data.items.filter(item => {
      const regionMatch = selectedRegion === 'all' || item.region === selectedRegion;
      const typeMatch = selectedType === 'all' || item.type === selectedType;
      return regionMatch && typeMatch;
    });
  }, [data.items, selectedRegion, selectedType]);

  return (
    <div className={`category-page-overlay ${isRTL ? 'rtl' : ''}`}>
      <div className="category-page-content">
        {/* Header */}
        <header className="category-page-header">
          <button className="back-btn" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            {t('backToHome')}
          </button>
          <h1>{t(data.titleKey)}</h1>
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
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? t('allTypes') : type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Items Grid */}
        <div className="category-items-grid">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="category-item-card"
              onClick={() => onSelectItem && onSelectItem(item)}
            >
              <div className="item-card-image">
                <img src={item.image} alt={t(item.titleKey)} />
                <div className="item-card-gradient"></div>
              </div>
              <div className="item-card-content">
                {item.tagKey && <span className="item-tag">{t(item.tagKey)}</span>}
                <h3>{t(item.titleKey)}</h3>
                <span className="item-region">{item.region}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="no-results">
            <p>No items found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
