import React, { useState, useEffect } from 'react';
import './Discover.css';
import galleryImage from '../assets/discover-gallery.png';
import coupleImage from '../assets/discover-couple.png';
import mountainImage from '../assets/discover-mountain.png';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import { fetchAPI, localize, mediaUrl } from '../services/api';

const fallbackCards = [
  { id: 'gallery', title_key: 'creatorsCut', image: galleryImage, card_size: 'title' },
  { id: 'couple', title_key: 'autumnDiscover', image: coupleImage, card_size: 'wide' },
  { id: 'mountain', title_key: 'sustainableDestinations', image: mountainImage, card_size: 'narrow' },
];

const Discover = ({ onOpenDiscover }) => {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [cards, setCards] = useState(null);
  const [featuredPlaces, setFeaturedPlaces] = useState(null);

  useEffect(() => {
    // Fetch existing discover cards
    fetchAPI('/discover-cards').then(data => {
      if (data && data.length > 0) {
        setCards(data.filter(c => c.is_active).sort((a, b) => a.sort_order - b.sort_order));
      }
    });

    // Also fetch featured homepage places from new system
    fetchAPI('/discover-system/featured').then(data => {
      if (data && data.homepage && data.homepage.length > 0) {
        setFeaturedPlaces(data.homepage);
      }
    });
  }, []);

  // If we have featured places from the new system, use those
  // Map: place[0] -> title card, place[1] -> wide card, place[2] -> narrow card
  const useFeatured = featuredPlaces && featuredPlaces.length > 0;

  const titleCard = useFeatured
    ? featuredPlaces[0]
    : (cards ? cards.find(c => c.card_size === 'title') : fallbackCards[0]);
  const wideCard = useFeatured
    ? (featuredPlaces[1] || featuredPlaces[0])
    : (cards ? cards.find(c => c.card_size === 'wide') : fallbackCards[1]);
  const narrowCard = useFeatured
    ? (featuredPlaces[2] || featuredPlaces[0])
    : (cards ? cards.find(c => c.card_size === 'narrow') : fallbackCards[2]);

  const getTitle = (card) => {
    if (!card) return '';
    if (useFeatured) return localize(card, 'name', language);
    if (cards) return localize(card, 'title', language);
    return t(card.title_key);
  };

  const getImage = (card, fallback) => {
    if (!card) return fallback;
    if (useFeatured || cards) return card.image_url ? mediaUrl(card.image_url) : fallback;
    return card.image || fallback;
  };

  const handleCardClick = () => {
    if (onOpenDiscover) onOpenDiscover();
  };

  return (
    <section className="discover" id="discover-section">
      <div className="discover-bento">
        {/* Top Row */}
        <div className="bento-top-row">
          {/* Left: Section Title */}
          <div className="bento-title-block">
            <h2>{t('discoverAlgeriaNow')}</h2>
          </div>
          
          {/* Right: Gallery Card with 4 vertical strips */}
          <div className="bento-card bento-gallery-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <div className="gallery-strips">
              <div className="gallery-strip" style={{ backgroundImage: `url(${getImage(titleCard, galleryImage)})`, backgroundPosition: '0% center' }}></div>
              <div className="gallery-strip" style={{ backgroundImage: `url(${getImage(titleCard, galleryImage)})`, backgroundPosition: '33% center' }}></div>
              <div className="gallery-strip" style={{ backgroundImage: `url(${getImage(titleCard, galleryImage)})`, backgroundPosition: '66% center' }}></div>
              <div className="gallery-strip" style={{ backgroundImage: `url(${getImage(titleCard, galleryImage)})`, backgroundPosition: '100% center' }}></div>
            </div>
            <div className="bento-overlay"></div>
            <div className="bento-card-content">
              <h3>{getTitle(titleCard)}</h3>
            </div>
          </div>
        </div>


        {/* Bottom Row */}
        <div className="bento-bottom-row">
          {/* Left Card - Wider (65%) */}
          <div className="bento-card bento-card-wide" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <div className="bento-image" style={{ backgroundImage: `url(${getImage(wideCard, coupleImage)})` }}></div>
            <div className="bento-overlay"></div>
            <div className="bento-card-content">
              <h3>{getTitle(wideCard)}</h3>
            </div>
          </div>

          {/* Right Card - Narrower (35%) */}
          <div className="bento-card bento-card-narrow" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <div className="bento-image" style={{ backgroundImage: `url(${getImage(narrowCard, mountainImage)})` }}></div>
            <div className="bento-overlay"></div>
            <div className="bento-card-content">
              <h3>{getTitle(narrowCard)}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discover;
