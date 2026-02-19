import React, { useState, useEffect } from 'react';
import './Panorama.css';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import { fetchAPI, localize, mediaUrl } from '../services/api';

const fallbackPanoramas = [
  { tag_key: 'featured', title_key: 'tassiliPano', image: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=1200&fit=crop' },
  { tag_key: 'popular', title_key: 'saharaPeaks', image: 'https://images.unsplash.com/photo-1509660933844-6910e12765a0?w=1200&fit=crop' },
];

const Panorama = () => {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    fetchAPI('/panoramas').then(data => {
      if (data && data.length > 0) {
        setApiData(data.filter(p => p.is_active).sort((a, b) => a.sort_order - b.sort_order));
      }
    });
  }, []);

  const panoramas = apiData
    ? apiData.map(p => ({
        tag: localize(p, 'tag', language),
        title: localize(p, 'title', language),
        image: p.image_url ? mediaUrl(p.image_url) : '',
      }))
    : fallbackPanoramas.map(p => ({
        tag: t(p.tag_key),
        title: t(p.title_key),
        image: p.image,
      }));

  return (
    <section className="panorama">
      {panoramas.map((pano, i) => (
        <div key={i} className="pano-item" style={{ backgroundImage: `url("${pano.image}")` }}>
          <div className="pano-overlay">
            <span className="pano-tag">{pano.tag}</span>
            <h3>{pano.title}</h3>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Panorama;
