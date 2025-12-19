import React from 'react';
import './Discover.css';
import galleryImage from '../assets/discover-gallery.png';
import coupleImage from '../assets/discover-couple.png';
import mountainImage from '../assets/discover-mountain.png';

const Discover = () => {
  return (
    <section className="discover" id="discover-section">
      <div className="discover-bento">
        {/* Top Row */}
        <div className="bento-top-row">
          {/* Left: Title */}
          <div className="bento-title-block">
            <h2 className="bento-title">
              Découvrir<br />
              l'Algérie<br />
              maintenant
            </h2>
          </div>

          {/* Right: Gallery Card with 4 vertical strips */}
          <div className="bento-card bento-gallery-card">
            <div className="gallery-strips">
              <div className="gallery-strip" style={{ backgroundImage: `url(${galleryImage})`, backgroundPosition: '0% center' }}></div>
              <div className="gallery-strip" style={{ backgroundImage: `url(${galleryImage})`, backgroundPosition: '33% center' }}></div>
              <div className="gallery-strip" style={{ backgroundImage: `url(${galleryImage})`, backgroundPosition: '66% center' }}></div>
              <div className="gallery-strip" style={{ backgroundImage: `url(${galleryImage})`, backgroundPosition: '100% center' }}></div>
            </div>
            <div className="bento-overlay"></div>
            <div className="bento-card-content">
              <h3>Creator's Cut Algeria</h3>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="bento-bottom-row">
          {/* Left Card - Wider (65%) */}
          <div className="bento-card bento-card-wide">
            <div className="bento-image" style={{ backgroundImage: `url(${coupleImage})` }}></div>
            <div className="bento-overlay"></div>
            <div className="bento-card-content">
              <h3>Découvrir l'automne algérien avec des experts locaux</h3>
            </div>
          </div>

          {/* Right Card - Narrower (35%) */}
          <div className="bento-card bento-card-narrow">
            <div className="bento-image" style={{ backgroundImage: `url(${mountainImage})` }}></div>
            <div className="bento-overlay"></div>
            <div className="bento-card-content">
              <h3>Voici les destinations les plus durables</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discover;
