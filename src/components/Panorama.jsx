import React from 'react';
import './Panorama.css';

const Panorama = () => {
  return (
    <section className="panorama">
      <div className="pano-item" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&fit=crop")' }}>
        <div className="pano-overlay">
          <span className="pano-tag">Featured</span>
          <h3>Swiss Alps Panorama</h3>
        </div>
      </div>
      <div className="pano-item" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&fit=crop")' }}>
        <div className="pano-overlay">
          <span className="pano-tag">Popular</span>
          <h3>Mountain Peaks</h3>
        </div>
      </div>
    </section>
  );
};

export default Panorama;
