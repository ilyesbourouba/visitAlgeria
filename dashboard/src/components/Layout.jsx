import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/hero-slides', label: 'Hero Slides', icon: '🎬' },
  { path: '/destinations', label: 'Destinations', icon: '📍' },
  { path: '/discover-cards', label: 'Discover Cards', icon: '🃏' },
  { path: '/suggestions', label: 'Suggestions', icon: '💡' },
  { path: '/unesco-sites', label: 'UNESCO Sites', icon: '🏛️' },
  { path: '/events', label: 'Events', icon: '📅' },
  { path: '/tour-locations', label: 'Tour Guide', icon: '🗺️' },
  { path: '/panoramas', label: 'Panoramas', icon: '🌄' },
  { path: '/calendar', label: 'Calendar', icon: '📆' },
  { path: '/discover', label: 'Discover Page', icon: '🔍' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
];

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
          {navItems.map(item => (
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
