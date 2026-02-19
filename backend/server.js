const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// ===== CORS CONFIGURATION - MUST BE FIRST =====
// Manual CORS handling for maximum compatibility
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Request logger for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Import route modules ---
const authRoutes = require('./routes/auth');
const eventCategoriesRoutes = require('./routes/eventCategories');
const eventsRoutes = require('./routes/events');
const destinationsRoutes = require('./routes/destinations');
const tourLocationsRoutes = require('./routes/tourLocations');
const tourGuideHeroRoutes = require('./routes/tourGuideHero');
const settingsRoutes = require('./routes/settings');
const discoverRoutes = require('./routes/discover');
const discoverSystemRoutes = require('./routes/discoverSystem');
const calendarRoutes = require('./routes/calendar');
const uploadRoutes = require('./routes/upload');
const digitalLibraryRoutes = require('./routes/digitalLibrary');
const libraryCategoriesRoutes = require('./routes/libraryCategories');
const hotelsRoutes = require('./routes/hotels');
const travelAgenciesRoutes = require('./routes/travelAgencies');
const createCrudRouter = require('./helpers/crud');

// --- Mount specialized routes ---
app.use('/api/auth', authRoutes);
app.use('/api/event-categories', eventCategoriesRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/destinations', destinationsRoutes);
app.use('/api/tour-locations', tourLocationsRoutes);
app.use('/api/tour-guide-hero', tourGuideHeroRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/discover', discoverRoutes);
app.use('/api/discover-system', discoverSystemRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/digital-library', digitalLibraryRoutes);
app.use('/api/library-categories', libraryCategoriesRoutes);
app.use('/api/hotels', hotelsRoutes);
app.use('/api/travel-agencies', travelAgenciesRoutes);

// --- Generic CRUD routes for simple tables ---
app.use('/api/hero-slides', createCrudRouter('hero_slides'));
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
const PORT = process.env.PORT || 5001;
const pool = require('./config/db');

async function startServer() {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to the database.');
    connection.release();

    app.listen(PORT, () => {
      console.log('visitAlgeria API running on http://localhost:' + PORT);
    });
  } catch (err) {
    console.error('Failed to connect to the database:', err.message);
    process.exit(1);
  }
}

startServer();