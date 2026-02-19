import React from 'react';
import './ThemedDiscovery.css';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';

const ThemedDiscovery = ({ onOpenCategory }) => {
  const { language, isRTL } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const artCultureItems = [
    {
      id: 'crafts',
      titleKey: 'traditionalCrafts',
      descKey: 'traditionalCraftsDesc',
      image: "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&fit=crop"
    },
    {
      id: 'music',
      titleKey: 'musicAndRhythms',
      descKey: 'musicAndRhythmsDesc',
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&fit=crop"
    },
    {
      id: 'events',
      titleKey: 'culturalEvents',
      descKey: 'culturalEventsDesc',
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&fit=crop"
    }
  ];

  const architectureItems = [
    {
      id: 'casbah',
      titleKey: 'casbahAlgiers',
      tagKey: 'unescoHeritage',
      image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&fit=crop",
      size: "large"
    },
    {
      id: 'mosque',
      titleKey: 'greatMosque',
      tagKey: 'modernity',
      image: "https://images.unsplash.com/photo-1542662565-7e4b66bae529?w=600&fit=crop",
      size: "small"
    },
    {
      id: 'constantine',
      titleKey: 'constantine',
      tagKey: 'suspendedBridges',
      image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=600&fit=crop",
      size: "small"
    },
    {
      id: 'timgad',
      titleKey: 'timgadRuins',
      tagKey: 'romanHistory',
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&fit=crop",
      size: "medium"
    }
  ];

  const museumItems = [
    { id: 'bardo', nameKey: 'bardoMuseum', image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&fit=crop" },
    { id: 'finearts', nameKey: 'fineArtsMuseum', image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600&fit=crop" },
    { id: 'cirta', nameKey: 'cirtaMuseum', image: "https://images.unsplash.com/photo-1572953108238-fd75adfff571?w=600&fit=crop" },
    { id: 'mama', nameKey: 'mamaAlgiers', image: "https://images.unsplash.com/photo-1564391802241-dfca4001bc67?w=600&fit=crop" }
  ];

  const handleOpenCategory = (category) => {
    if (onOpenCategory) {
      onOpenCategory(category);
    }
  };

  return (
    <div className={`themed-discovery ${isRTL ? 'rtl' : ''}`}>
        {/* Art & Culture Section */}
        <section className="discover-section art-culture-section">
          <div className="section-header-with-underline">
            <h2 className="section-title-modern">{t('artAndCulture')}</h2>
            <div className="section-underline"></div>
          </div>
          <div className="art-grid">
            {artCultureItems.map(item => (
              <div key={item.id} className="art-card" onClick={() => handleOpenCategory('art')}>
                <div className="art-card-media">
                  <img src={item.image} alt={t(item.titleKey)} />
                </div>
                <div className="art-card-info">
                  <h3>{t(item.titleKey)}</h3>
                  <p>{t(item.descKey)}</p>
                  <button className="learn-more-link" onClick={(e) => { e.stopPropagation(); handleOpenCategory('art'); }}>
                    {t('learnMore')} <span className="arrow">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture Section */}
        <section className="discover-section architecture-section">
          <div className="architecture-header">
            <div className="section-header-with-underline">
              <h2 className="section-title-modern">{t('architecture')}</h2>
              <div className="section-underline"></div>
            </div>
            <button className="view-all-btn" onClick={() => handleOpenCategory('architecture')}>
              {t('viewAllArchitecture')} →
            </button>
          </div>
          <div className="arch-bento-grid">
            {architectureItems.map(item => (
              <div key={item.id} className={`arch-item ${item.size}`} onClick={() => handleOpenCategory('architecture')}>
                <div className="arch-wrapper">
                  <img src={item.image} alt={t(item.titleKey)} />
                  <div className="arch-overlay">
                    <span className="arch-tag">{t(item.tagKey)}</span>
                    <h3>{t(item.titleKey)}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Museums Section */}
        <section className="discover-section museums-section">
          <div className="museums-header">
            <div className="section-header-with-underline">
              <h2 className="section-title-modern">{t('museums')}</h2>
              <div className="section-underline"></div>
            </div>
            <button className="view-all-btn" onClick={() => handleOpenCategory('museums')}>
              {t('viewAll')} →
            </button>
          </div>
          <div className="museums-grid">
            {museumItems.map(museum => (
              <div key={museum.id} className="museum-card-modern" onClick={() => handleOpenCategory('museums')}>
                <div className="museum-card-image">
                  <img src={museum.image} alt={t(museum.nameKey)} />
                  <div className="museum-card-gradient"></div>
                </div>
                <div className="museum-card-content">
                  <h3>{t(museum.nameKey)}</h3>
                  <button className="museum-explore-btn">
                    {t('learnMore')} <span className="arrow">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
    </div>
  );
};

export default ThemedDiscovery;

