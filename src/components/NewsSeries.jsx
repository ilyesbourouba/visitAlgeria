import React from 'react';
import './NewsSeries.css';

const newsItems = [
  { id: 1, category: 'Travel', title: 'Exploring the Hidden Oases of Taghit', excerpt: 'Deep in the Saoura valley lies a paradise waiting to be discovered...', image: 'https://images.unsplash.com/photo-1596463059283-da212519369d?q=80&w=600&auto=format&fit=crop' },
  { id: 2, category: 'Food', title: 'A Culinary Journey Through Constantine', excerpt: 'From the famous Trida to the sweet Refiss, explore the flavors of the bridges...', image: 'https://images.unsplash.com/photo-1623156346149-d5ccd8b29818?q=80&w=600&auto=format&fit=crop' },
  { id: 3, category: 'History', title: 'The Secrets of Cherchell’s Ancient Port', excerpt: 'Walking through the ruins of Jol-Caesarea and its majestic theatre...', image: 'https://images.unsplash.com/photo-1596463059283-da212519369d?q=80&w=600&auto=format&fit=crop' },
];

const NewsSeries = () => {
  return (
    <section className="news-series" id="news">
      <div className="section-header">
        <h2 className="section-title">Stories & News</h2>
        <a href="#" className="view-all">All Stories</a>
      </div>
      <div className="news-grid">
        {newsItems.map(item => (
          <div key={item.id} className="news-card">
            <div className="news-image" style={{ backgroundImage: `url(${item.image})` }}></div>
            <div className="news-content">
              <span className="news-category">{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
              <a href="#" className="read-more">Read More →</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsSeries;
