import React, { useState } from 'react';
import './InspirationCalendar.css';

const months = ['December', 'January', 'February', 'March'];
const items = [
  { title: 'Christmas Markets', image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=300&fit=crop' },
  { title: 'New Year Eve', image: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=300&fit=crop' },
  { title: 'Winter Hiking', image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=300&fit=crop' },
  { title: 'Ski Season', image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&fit=crop' },
  { title: 'Fondue Nights', image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=300&fit=crop' },
  { title: 'Ice Skating', image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=300&fit=crop' },
  { title: 'Spa & Wellness', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=300&fit=crop' },
  { title: 'Snow Shoeing', image: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=300&fit=crop' },
];

const InspirationCalendar = () => {
  const [activeMonth, setActiveMonth] = useState(0);

  return (
    <section className="inspiration-calendar">
      <div className="calendar-header">
        <h2 className="section-title">Inspiration Calendar</h2>
        <div className="month-tabs">
          {months.map((m, i) => (
            <button
              key={m}
              className={`month-tab ${i === activeMonth ? 'active' : ''}`}
              onClick={() => setActiveMonth(i)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <div className="calendar-grid">
        {items.map((item, i) => (
          <div key={i} className="cal-card" style={{ backgroundImage: `url(${item.image})` }}>
            <div className="cal-overlay">
              <span>{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InspirationCalendar;
