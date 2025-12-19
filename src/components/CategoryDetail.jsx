import React from 'react';
import './CategoryDetail.css';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';

const CategoryDetail = ({ item, onClose, category }) => {
  const { language, isRTL } = useLanguage();
  const t = (key) => getTranslation(language, key);

  if (!item) return null;

  return (
    <div className={`category-detail-overlay ${isRTL ? 'rtl' : ''}`}>
      <div className="category-detail-content">
        {/* Hero Image */}
        <div className="detail-hero">
          <img src={item.image.replace('w=600', 'w=1400')} alt={t(item.titleKey || item.nameKey)} />
          <div className="detail-hero-gradient"></div>
          <button className="detail-close-btn" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className="detail-hero-info">
            {item.tagKey && <span className="detail-tag">{t(item.tagKey)}</span>}
            <h1>{t(item.titleKey || item.nameKey)}</h1>
            {item.region && <span className="detail-region">{item.region}</span>}
          </div>
        </div>

        {/* Content */}
        <div className="detail-body">
          <div className="detail-main">
            <section className="detail-section">
              <h2>{t('information')}</h2>
              <div className="section-underline-small"></div>
              {item.descKey ? (
                <p>{t(item.descKey)}</p>
              ) : (
                <p>
                  {category === 'museums' && 
                    `Explore the rich collections and exhibitions at ${t(item.nameKey)}. This museum offers a unique window into Algeria's cultural heritage, featuring artifacts and artworks that span centuries of history.`
                  }
                  {category === 'architecture' && 
                    `${t(item.titleKey)} represents a remarkable example of Algerian architectural heritage. This site showcases the unique blend of influences that have shaped the nation's built environment over centuries.`
                  }
                  {category === 'art' && 
                    `Discover the vibrant world of ${t(item.titleKey)}. This aspect of Algerian culture reflects the creativity and traditions passed down through generations.`
                  }
                </p>
              )}
            </section>

            <section className="detail-section">
              <h2>{t('eventPlace')}</h2>
              <div className="section-underline-small"></div>
              <div className="detail-info-grid">
                <div className="info-item">
                  <span className="info-label">{t('filterByRegion')}</span>
                  <span className="info-value">{item.region || 'Algeria'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">{t('filterByType')}</span>
                  <span className="info-value">{item.type || 'Heritage'}</span>
                </div>
              </div>
            </section>
          </div>

          <aside className="detail-sidebar">
            <div className="sidebar-card">
              <h3>{t('learnMore')}</h3>
              <p>Plan your visit and discover more about this remarkable site.</p>
              <button className="primary-btn">{t('checkAvailability')}</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
