import React from 'react';
import './Series.css';

const series = [
  { title: 'Hidden Trails of the Alps', category: 'Adventure', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&fit=crop' },
  { title: 'Swiss Cheese Stories', category: 'Food & Culture', image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&fit=crop' },
  { title: 'The Art of Watchmaking', category: 'Heritage', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&fit=crop' },
  { title: 'Glacier Expeditions', category: 'Nature', image: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=400&fit=crop' },
];

const Series = () => {
  return (
    <section className="series">
      <h2 className="section-title">Series</h2>
      <div className="series-scroll">
        {series.map((item, i) => (
          <div key={i} className="series-card">
            <div className="series-img" style={{ backgroundImage: `url(${item.image})` }}></div>
            <div className="series-info">
              <span className="series-cat">{item.category}</span>
              <h4>{item.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Series;
