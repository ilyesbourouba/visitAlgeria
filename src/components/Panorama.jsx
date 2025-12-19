import React from 'react';
import './Panorama.css';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';

const Panorama = () => {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  return (
    <section className="panorama">
      <div className="pano-item" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=1200&fit=crop")' }}>
        <div className="pano-overlay">
          <span className="pano-tag">{t('featured')}</span>
          <h3>{t('tassiliPano')}</h3>
        </div>
      </div>
      <div className="pano-item" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1509660933844-6910e12765a0?w=1200&fit=crop")' }}>
        <div className="pano-overlay">
          <span className="pano-tag">{t('popular')}</span>
          <h3>{t('saharaPeaks')}</h3>
        </div>
      </div>
    </section>
  );
};

export default Panorama;
