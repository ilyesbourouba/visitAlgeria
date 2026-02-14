import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Discover from './components/Discover';
import TopDestinations from './components/TopDestinations';
import Suggestions from './components/Suggestions';
import Panorama from './components/Panorama';
import TourGuidePage from './components/TourGuide';
import UpcomingActivities from './components/UpcomingActivities';
import UnescoHeritage from './components/UnescoHeritage';
import InspirationCalendar from './components/InspirationCalendar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import InfoPage from './components/InfoPage';
import EventsPage from './components/EventsPage';
import EventDetail from './components/EventDetail';
import DiscoverPage from './components/DiscoverPage';
import CategoryPage from './components/CategoryPage';
import CategoryDetail from './components/CategoryDetail';
import DestinationPage from './components/DestinationPage';
import './App.css';

function App() {
  const [showInfo, setShowInfo] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showDiscover, setShowDiscover] = useState(false);
  const [showDestinations, setShowDestinations] = useState(false);
  const [showTourGuide, setShowTourGuide] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedWilaya, setSelectedWilaya] = useState(null);
  
  // Category page state
  const [showCategory, setShowCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryItem, setSelectedCategoryItem] = useState(null);
  const [openedFromDiscover, setOpenedFromDiscover] = useState(false);

  const handleOpenCategory = (category, fromDiscover = false) => {
    setSelectedCategory(category);
    setShowCategory(true);
    setShowDiscover(false);
    setOpenedFromDiscover(fromDiscover);
  };

  const handleOpenDiscover = () => {
    setShowDiscover(true);
    setShowEvents(false);
    setShowInfo(false);
    setSelectedEvent(null);
    setOpenedFromDiscover(false);
  };

  const handleOpenEvents = () => {
    setShowEvents(true);
    setSelectedEvent(null);
    setShowInfo(false);
    setOpenedFromDiscover(false);
  };

  const handleOpenInfo = () => {
    setShowInfo(true);
    setShowEvents(false);
    setSelectedEvent(null);
    setOpenedFromDiscover(false);
  };

  const handleOpenDestinations = () => {
    setShowDestinations(true);
    setShowInfo(false);
    setShowEvents(false);
    setShowDiscover(false);
    setShowTourGuide(false);
    setSelectedEvent(null);
    setOpenedFromDiscover(false);
  };

  const handleOpenTourGuide = () => {
    setShowTourGuide(true);
    setShowInfo(false);
    setShowEvents(false);
    setShowDiscover(false);
    setSelectedEvent(null);
    setOpenedFromDiscover(false);
  };

  const handleCloseAll = () => {
    setShowInfo(false);
    setShowEvents(false);
    setShowDiscover(false);
    setShowDestinations(false);
    setShowTourGuide(false);
    setShowCategory(false);
    setSelectedEvent(null);
    setSelectedCategory(null);
    setSelectedCategoryItem(null);
    setSelectedWilaya(null);
    setOpenedFromDiscover(false);
  };

  const handleCloseCategoryPage = () => {
    setShowCategory(false);
    setSelectedCategory(null);
    setSelectedCategoryItem(null);
    
    // If we opened this from discover, go back to discover
    if (openedFromDiscover) {
      setShowDiscover(true);
    }
  };

  return (
    <div className="app-container">
      <Header 
        onInfoClick={handleOpenInfo} 
        onEventsClick={handleOpenEvents}
        onDiscoverClick={handleOpenDiscover}
        onDestinationsClick={handleOpenDestinations}
        onTourGuideClick={handleOpenTourGuide}
      />
      <Hero />
      <main>
        <Discover />
        <TopDestinations onOpenDestinations={handleOpenDestinations} />
        <Suggestions />
        <UnescoHeritage onExploreUNESCO={handleOpenCategory} />
        <UpcomingActivities 
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

      {showDestinations && (
        <DestinationPage 
          onClose={handleCloseAll}
          onSelectWilaya={setSelectedWilaya}
        />
      )}

      {showTourGuide && (
        <TourGuidePage onClose={handleCloseAll} />
      )}
    </div>
  );
}

export default App;


