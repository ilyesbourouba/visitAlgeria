const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files — serve uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Import route modules ---
const authRoutes = require('./routes/auth');
const eventsRoutes = require('./routes/events');
const eventCategoriesRoutes = require('./routes/eventCategories');
const tourLocationsRoutes = require('./routes/tourLocations');
const tourGuideHeroRoutes = require('./routes/tourGuideHero');
const settingsRoutes = require('./routes/settings');
const discoverRoutes = require('./routes/discover');
const discoverSystemRoutes = require('./routes/discoverSystem');
const calendarRoutes = require('./routes/calendar');
const uploadRoutes = require('./routes/upload');
const createCrudRouter = require('./helpers/crud');

// --- Mount routes ---
app.use('/api/auth', authRoutes);
app.use('/api/event-categories', eventCategoriesRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/tour-locations', tourLocationsRoutes);
app.use('/api/tour-guide-hero', tourGuideHeroRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/discover', discoverRoutes);
app.use('/api/discover-system', discoverSystemRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/upload', uploadRoutes);

// Generic CRUD routes for simple tables
app.use('/api/hero-slides', createCrudRouter('hero_slides'));
app.use('/api/destinations', createCrudRouter('destinations'));
app.use('/api/discover-cards', createCrudRouter('discover_cards'));
app.use('/api/suggestions', createCrudRouter('suggestions'));
app.use('/api/unesco-sites', createCrudRouter('unesco_sites'));
app.use('/api/panoramas', createCrudRouter('panoramas'));
app.use('/api/languages', createCrudRouter('languages'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ visitAlgeria API running on http://localhost:${PORT}`);
  console.log(`📋 API endpoints:`);
  console.log(`   GET  /api/health`);
  console.log(`   POST /api/auth/login`);
  console.log(`   GET  /api/hero-slides`);
  console.log(`   GET  /api/destinations`);
  console.log(`   GET  /api/discover-cards`);
  console.log(`   GET  /api/suggestions`);
  console.log(`   GET  /api/unesco-sites`);
  console.log(`   GET  /api/events`);
  console.log(`   GET  /api/tour-locations`);
  console.log(`   GET  /api/panoramas`);
  console.log(`   GET  /api/calendar`);
  console.log(`   GET  /api/discover`);
  console.log(`   GET  /api/settings`);
  console.log(`   POST /api/upload`);
});
