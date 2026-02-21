import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const mainItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
];

const homePageItems = [
  { path: '/hero-slides', label: 'Hero Slides', icon: '🎬' },
  { path: '/discover-cards', label: 'Discover Cards', icon: '🃏' },
  { path: '/suggestions', label: 'Suggestions', icon: '💡' },
  { path: '/unesco-sites', label: 'UNESCO Sites', icon: '🏛️' },
  { path: '/panoramas', label: 'Panoramas', icon: '🌄' },
  { path: '/calendar', label: 'Calendar', icon: '📆' },
  { path: '/discover', label: 'Discover Page', icon: '🔍' },
];

const destinationsItems = [
  { path: '/destinations', label: 'Wilayas', icon: '🏛️' },
];

const eventsItems = [
  { path: '/event-categories', label: 'Categories', icon: '📂' },
  { path: '/events', label: 'Events', icon: '📅' },
];

const discoverItems = [
  { path: '/discover-sections', label: 'Sections', icon: '📑' },
  { path: '/discover-places', label: 'Places', icon: '📍' },
  { path: '/discover-page-settings', label: 'Page Settings', icon: '🎨' },
];

const standaloneItems = [
  { path: '/tour-locations', label: 'Virtual Tour', icon: '🗺️' },
  { path: '/hotels', label: 'Hotels', icon: '🏨' },
  { path: '/travel-agencies', label: 'Travel Agencies', icon: '✈️' },
  { path: '/social-media', label: 'Social Media', icon: '📱' },
];

const libraryItems = [
  { path: '/library-categories', label: 'Categories', icon: '📂' },
  { path: '/digital-library', label: 'Files', icon: '📄' },
];

const systemItems = [
  { path: '/languages', label: 'Languages', icon: '🌐' },
  { path: '/settings', label: 'Footer', icon: '🦶' },
];

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isHomePageExpanded, setIsHomePageExpanded] = useState(false);
  const [isDestinationsExpanded, setIsDestinationsExpanded] = useState(false);
  const [isEventsExpanded, setIsEventsExpanded] = useState(false);
  const [isDiscoverExpanded, setIsDiscoverExpanded] = useState(false);
  const [isLibraryExpanded, setIsLibraryExpanded] = useState(false);

  // Auto-expand if current route is within a group
  useEffect(() => {
    if (homePageItems.some(item => location.pathname === item.path)) {
      setIsHomePageExpanded(true);
    }
    if (destinationsItems.some(item => location.pathname === item.path)) {
      setIsDestinationsExpanded(true);
    }
    if (eventsItems.some(item => location.pathname === item.path)) {
      setIsEventsExpanded(true);
    }
    if (discoverItems.some(item => location.pathname === item.path)) {
      setIsDiscoverExpanded(true);
    }
    if (libraryItems.some(item => location.pathname === item.path)) {
      setIsLibraryExpanded(true);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Visit Algeria</h2>
          <span className="sidebar-badge">Admin</span>
        </div>

        <nav className="sidebar-nav">
          {mainItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}

          {/* Home Page group */}
          <div className={`sidebar-group ${isHomePageExpanded ? 'expanded' : ''}`}>
            <button 
              className="sidebar-group-header" 
              onClick={() => setIsHomePageExpanded(!isHomePageExpanded)}
            >
              <span className="sidebar-icon">🏠</span>
              <span className="group-label">Home Page</span>
              <span className="chevron"></span>
            </button>
            <div className="sidebar-submenu">
              {homePageItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `sidebar-link submenu-link ${isActive ? 'active' : ''}`}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Destinations group */}
          <div className={`sidebar-group ${isDestinationsExpanded ? 'expanded' : ''}`}>
            <button 
              className="sidebar-group-header" 
              onClick={() => setIsDestinationsExpanded(!isDestinationsExpanded)}
            >
              <span className="sidebar-icon">🏛️</span>
              <span className="group-label">Destinations</span>
              <span className="chevron"></span>
            </button>
            <div className="sidebar-submenu">
              {destinationsItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `sidebar-link submenu-link ${isActive ? 'active' : ''}`}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Events & Festivals group */}
          <div className={`sidebar-group ${isEventsExpanded ? 'expanded' : ''}`}>
            <button 
              className="sidebar-group-header" 
              onClick={() => setIsEventsExpanded(!isEventsExpanded)}
            >
              <span className="sidebar-icon">🎉</span>
              <span className="group-label">Events & Festivals</span>
              <span className="chevron"></span>
            </button>
            <div className="sidebar-submenu">
              {eventsItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `sidebar-link submenu-link ${isActive ? 'active' : ''}`}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Discover group */}
          <div className={`sidebar-group ${isDiscoverExpanded ? 'expanded' : ''}`}>
            <button 
              className="sidebar-group-header" 
              onClick={() => setIsDiscoverExpanded(!isDiscoverExpanded)}
            >
              <span className="sidebar-icon">🔍</span>
              <span className="group-label">Discover</span>
              <span className="chevron"></span>
            </button>
            <div className="sidebar-submenu">
              {discoverItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `sidebar-link submenu-link ${isActive ? 'active' : ''}`}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          {standaloneItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}

          {/* Digital Library group */}
          <div className={`sidebar-group ${isLibraryExpanded ? 'expanded' : ''}`}>
            <button 
              className="sidebar-group-header" 
              onClick={() => setIsLibraryExpanded(!isLibraryExpanded)}
            >
              <span className="sidebar-icon">📚</span>
              <span className="group-label">Digital Library</span>
              <span className="chevron"></span>
            </button>
            <div className="sidebar-submenu">
              {libraryItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `sidebar-link submenu-link ${isActive ? 'active' : ''}`}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          {systemItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <span className="user-avatar">{user?.username?.[0]?.toUpperCase()}</span>
            <span className="user-name">{user?.username}</span>
          </div>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
