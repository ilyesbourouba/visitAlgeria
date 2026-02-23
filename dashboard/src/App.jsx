import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import HeroSlides from './pages/HeroSlides';
import Destinations from './pages/Destinations';
import DiscoverCards from './pages/DiscoverCards';
import Suggestions from './pages/Suggestions';
import UnescoSites from './pages/UnescoSites';
import Events from './pages/Events';
import EventCategories from './pages/EventCategories';
import TourLocations from './pages/TourLocations';
import Panoramas from './pages/Panoramas';
import CalendarPage from './pages/Calendar';
import DiscoverPage from './pages/Discover';
import Settings from './pages/Settings';
import Languages from './pages/Languages';
import DiscoverSections from './pages/DiscoverSections';
import DiscoverPlaces from './pages/DiscoverPlaces';
import DiscoverPageSettings from './pages/DiscoverPageSettings';
import DigitalLibrary from './pages/DigitalLibrary';
import LibraryCategories from './pages/LibraryCategories';
import Hotels from './pages/Hotels';
import TravelAgencies from './pages/TravelAgencies';
import SocialMedia from './pages/SocialMedia';
import './App.css';

const basename = import.meta.env.PROD ? '/dashboard' : '/';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="hero-slides" element={<HeroSlides />} />
            <Route path="destinations" element={<Destinations />} />
            <Route path="discover-cards" element={<DiscoverCards />} />
            <Route path="suggestions" element={<Suggestions />} />
            <Route path="unesco-sites" element={<UnescoSites />} />
            <Route path="event-categories" element={<EventCategories />} />
            <Route path="events" element={<Events />} />
            <Route path="tour-locations" element={<TourLocations />} />
            <Route path="panoramas" element={<Panoramas />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="discover" element={<DiscoverPage />} />
            <Route path="discover-sections" element={<DiscoverSections />} />
            <Route path="discover-places" element={<DiscoverPlaces />} />
            <Route path="discover-page-settings" element={<DiscoverPageSettings />} />
            <Route path="settings" element={<Settings />} />
            <Route path="languages" element={<Languages />} />
            <Route path="digital-library" element={<DigitalLibrary />} />
            <Route path="library-categories" element={<LibraryCategories />} />
            <Route path="hotels" element={<Hotels />} />
            <Route path="travel-agencies" element={<TravelAgencies />} />
            <Route path="social-media" element={<SocialMedia />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
