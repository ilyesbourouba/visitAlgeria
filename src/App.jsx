import React from 'react';
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
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Hero />
      <main>
        <Discover />
        <TopDestinations />
        <Suggestions />
        <Manifestations />
        <Panorama />
        <InspirationCalendar />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
