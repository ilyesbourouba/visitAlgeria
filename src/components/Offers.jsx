import React from 'react';
import './Offers.css';

const offers = [
  { title: 'Winter Package', desc: '3 nights in Zermatt', price: '$599', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&fit=crop' },
  { title: 'Ski Pass Bundle', desc: '7-day all-access pass', price: '$349', image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=400&fit=crop' },
  { title: 'Spa Retreat', desc: '2 nights + wellness', price: '$429', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&fit=crop' },
];

const Offers = () => {
  return (
    <section className="offers">
      <h2 className="section-title">Offers</h2>
      <div className="offers-grid">
        {offers.map((offer, i) => (
          <div key={i} className="offer-card">
            <div className="offer-img" style={{ backgroundImage: `url(${offer.image})` }}></div>
            <div className="offer-info">
              <h4>{offer.title}</h4>
              <p>{offer.desc}</p>
              <span className="offer-price">{offer.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Offers;
