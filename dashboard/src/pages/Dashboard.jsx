import { useState, useEffect } from 'react';
import api from '../api';

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const endpoints = [
          { key: 'heroSlides', url: '/hero-slides', label: 'Hero Slides', icon: '🎬' },
          { key: 'destinations', url: '/destinations', label: 'Destinations', icon: '📍' },
          { key: 'unescoSites', url: '/unesco-sites', label: 'UNESCO Sites', icon: '🏛️' },
          { key: 'events', url: '/events', label: 'Events', icon: '📅' },
          { key: 'suggestions', url: '/suggestions', label: 'Suggestions', icon: '💡' },
          { key: 'panoramas', url: '/panoramas', label: 'Panoramas', icon: '🌄' },
          { key: 'tourLocations', url: '/tour-locations', label: 'Tour Locations', icon: '🗺️' },
          { key: 'digitalLibrary', url: '/digital-library', label: 'Digital Library', icon: '📚' },
        ];

        const results = {};
        for (const ep of endpoints) {
          const res = await api.get(ep.url);
          const data = res.data;
          const count = Array.isArray(data) ? data.length : (data.total ?? (Array.isArray(data.data) ? data.data.length : 0));
          results[ep.key] = { count, label: ep.label, icon: ep.icon };
        }
        setStats(results);
      } catch (err) {
        console.error('Stats error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard-page">
      <h1>Dashboard Overview</h1>
      <div className="stats-grid">
        {Object.values(stats).map((stat, i) => (
          <div key={i} className="stat-card">
            <span className="stat-icon">{stat.icon}</span>
            <div className="stat-info">
              <span className="stat-count">{stat.count}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
