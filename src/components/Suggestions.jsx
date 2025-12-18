import React from 'react';
import './Suggestions.css';

const Suggestions = () => {
  return (
    <section className="suggestions">
      <h2 className="section-title">Suggestions</h2>
      <div className="suggestions-grid">
        {/* Row 1: 1 tall + 2 stacked */}
        <div className="sg-item tall" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&fit=crop")' }}>
          <div className="sg-overlay"><span>Mountains</span></div>
        </div>
        <div className="sg-stack">
          <div className="sg-item" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&fit=crop")' }}>
            <div className="sg-overlay"><span>Skiing</span></div>
          </div>
          <div className="sg-item" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600&fit=crop")' }}>
            <div className="sg-overlay"><span>Cabins</span></div>
          </div>
        </div>

        {/* Row 2: 3 equal */}
        <div className="sg-item" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=400&fit=crop")' }}>
          <div className="sg-overlay"><span>Lakes</span></div>
        </div>
        <div className="sg-item" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=400&fit=crop")' }}>
          <div className="sg-overlay"><span>Villages</span></div>
        </div>
        <div className="sg-item" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&fit=crop")' }}>
          <div className="sg-overlay"><span>Trails</span></div>
        </div>

        {/* Row 3: 2 wide */}
        <div className="sg-item wide" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&fit=crop")' }}>
          <div className="sg-overlay"><span>Adventure</span></div>
        </div>
        <div className="sg-item wide" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800&fit=crop")' }}>
          <div className="sg-overlay"><span>Wellness</span></div>
        </div>
      </div>
    </section>
  );
};

export default Suggestions;
