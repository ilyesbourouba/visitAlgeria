import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Discover from './components/Discover';
import TopDestinations from './components/TopDestinations';
import Suggestions from './components/Suggestions';
import Manifestations from './components/Manifestations';
import Panorama from './components/Panorama';
import InspirationCalendar from './components/InspirationCalendar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import InfoPage from './components/InfoPage';
import EventsPage from './components/EventsPage';
import EventDetail from './components/EventDetail';
import DiscoverPage from './components/DiscoverPage';
import CategoryPage from './components/CategoryPage';
import CategoryDetail from './components/CategoryDetail';
import './App.css';

function App() {
  const [showInfo, setShowInfo] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showDiscover, setShowDiscover] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Category page state
  const [showCategory, setShowCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryItem, setSelectedCategoryItem] = useState(null);

  const handleOpenCategory = (category) => {
    setSelectedCategory(category);
    setShowCategory(true);
    setShowDiscover(false);
  };

  const handleOpenDiscover = () => {
    setShowDiscover(true);
    setShowEvents(false);
    setShowInfo(false);
    setSelectedEvent(null);
  };

  const handleOpenEvents = () => {
    setShowEvents(true);
    setSelectedEvent(null);
    setShowInfo(false);
  };

  const handleOpenInfo = () => {
    setShowInfo(true);
    setShowEvents(false);
    setSelectedEvent(null);
  };

  const handleCloseAll = () => {
    setShowInfo(false);
    setShowEvents(false);
    setShowDiscover(false);
    setShowCategory(false);
    setSelectedEvent(null);
    setSelectedCategory(null);
    setSelectedCategoryItem(null);
  };

  const handleCloseCategoryPage = () => {
    setShowCategory(false);
    setSelectedCategory(null);
    setSelectedCategoryItem(null);
  };

  return (
    <div className="app-container">
      <Header 
        onInfoClick={handleOpenInfo} 
        onEventsClick={handleOpenEvents}
        onDiscoverClick={handleOpenDiscover}
      />
      <Hero />
      <main>
        <Discover />
        <TopDestinations />
        <Suggestions />
        <Manifestations 
          onViewAll={handleOpenEvents}
          onSelectEvent={setSelectedEvent}
        />
        <Panorama />
        <InspirationCalendar />
      </main>
      <Footer />
      <BackToTop />

      {showInfo && <InfoPage onClose={handleCloseAll} />}
      
      {showEvents && !selectedEvent && (
        <EventsPage 
          onClose={handleCloseAll} 
          onSelectEvent={setSelectedEvent} 
        />
      )}

      {selectedEvent && (
        <EventDetail 
          event={selectedEvent} 
          onBack={() => setSelectedEvent(null)} 
        />
      )}

      {showDiscover && (
        <DiscoverPage 
          onClose={handleCloseAll}
          onOpenCategory={handleOpenCategory}
        />
      )}

      {showCategory && !selectedCategoryItem && (
        <CategoryPage 
          category={selectedCategory}
          onClose={handleCloseCategoryPage}
          onSelectItem={setSelectedCategoryItem}
        />
      )}

      {selectedCategoryItem && (
        <CategoryDetail
          item={selectedCategoryItem}
          category={selectedCategory}
          onClose={() => setSelectedCategoryItem(null)}
        />
      )}
    </div>
  );
}

export default App;


