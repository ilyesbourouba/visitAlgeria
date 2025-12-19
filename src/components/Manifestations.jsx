import React from 'react';
import './Manifestations.css';

const events = [
  {
    id: 1,
    title: "Festival International de Musique de Timgad",
    location: "Batna, Timgad",
    dateRange: "05.07. - 12.07.2025",
    badgeType: "De",
    day: "05",
    month: "juil.",
    image: "https://images.unsplash.com/photo-1514525253361-b83f859b73c0?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Festival National de la Marionnette",
    location: "Aïn Témouchent",
    dateRange: "15.08. - 20.08.2025",
    badgeType: "jusqu'à",
    day: "20",
    month: "août",
    image: "https://images.unsplash.com/photo-1543333309-87458f334ee4?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Djanet – S'biba Festival",
    location: "Djanet, Sahara",
    dateRange: "10.09. - 12.09.2025",
    badgeType: "De",
    day: "10",
    month: "sept.",
    image: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    title: "Salon International du Livre d’Alger (SILA)",
    location: "Alger, SAFEX",
    dateRange: "25.10. - 05.11.2025",
    badgeType: "jusqu'à",
    day: "05",
    month: "nov.",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80"
  }
];

const Manifestations = () => {
  return (
    <section className="manifestations" id="manifestations-section">
      <div className="manifestations-container">
        <div className="manifestations-header">
          <h2 className="section-title">Manifestations</h2>
          <a href="#" className="show-all-link">
            Afficher tout 
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>

        <div className="events-grid">
          {events.map((event) => (
            <div className="event-card" key={event.id}>
              <div className="event-thumbnail">
                <img src={event.image} alt={event.title} className="event-image" />
                <div className="date-badge">
                  <p className="badge-prefix">{event.badgeType}</p>
                  <p className="badge-day">{event.day}</p>
                  <p className="badge-month">{event.month}</p>
                </div>
              </div>
              <h3 className="event-title">{event.title}</h3>
              <p className="event-details">{event.location}, {event.dateRange}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Manifestations;
