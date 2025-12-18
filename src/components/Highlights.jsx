import React from 'react';
import './Highlights.css';

const highlights = [
  { title: 'Lucerne Lake', tag: 'Nature', image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=400&fit=crop' },
  { title: 'Bern Old Town', tag: 'Heritage', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&fit=crop' },
  { title: 'Jungfrau Region', tag: 'Adventure', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&fit=crop' },
  { title: 'Geneva Lakefront', tag: 'City', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&fit=crop' },
  { title: 'Montreux Riviera', tag: 'Relax', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&fit=crop' },
  { title: 'St. Moritz', tag: 'Luxury', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&fit=crop' },
];

const Highlights = () => {
  return (
    <section className="highlights">
      <h2 className="section-title">Highlights</h2>
      <div className="highlights-grid">
        {highlights.map((item, i) => (
          <div key={i} className="highlight-card" style={{ backgroundImage: `url(${item.image})` }}>
            <div className="highlight-overlay">
              <span className="highlight-tag">{item.tag}</span>
              <h4>{item.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Highlights;
