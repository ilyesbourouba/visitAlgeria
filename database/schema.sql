-- =============================================
-- visitAlgeria Database Schema
-- MySQL 8.0+
-- =============================================

CREATE DATABASE IF NOT EXISTS visit_algeria
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE visit_algeria;

-- =============================================
-- 1. Admin Users
-- =============================================
CREATE TABLE admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'editor') NOT NULL DEFAULT 'editor',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =============================================
-- 2. Hero Slides
-- =============================================
CREATE TABLE hero_slides (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title_en VARCHAR(100) NOT NULL,
  title_ar VARCHAR(100) NOT NULL,
  video_url VARCHAR(500),
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB;

-- =============================================
-- 3. Destinations
-- =============================================
CREATE TABLE destinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name_en VARCHAR(100) NOT NULL,
  name_ar VARCHAR(100) NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  image_url VARCHAR(500),
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB;

-- =============================================
-- 4. Discover Cards (Bento Grid)
-- =============================================
CREATE TABLE discover_cards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title_en VARCHAR(150) NOT NULL,
  title_ar VARCHAR(150) NOT NULL,
  image_url VARCHAR(500),
  card_size ENUM('title', 'wide', 'narrow') NOT NULL DEFAULT 'wide',
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB;

-- =============================================
-- 5. Suggestions
-- =============================================
CREATE TABLE suggestions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tag_en VARCHAR(50) NOT NULL,
  tag_ar VARCHAR(50) NOT NULL,
  title_en VARCHAR(150) NOT NULL,
  title_ar VARCHAR(150) NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  image_url VARCHAR(500),
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB;

-- =============================================
-- 6. UNESCO Sites
-- =============================================
CREATE TABLE unesco_sites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name_en VARCHAR(100) NOT NULL,
  name_ar VARCHAR(100) NOT NULL,
  year_inscribed VARCHAR(30) NOT NULL,
  year_inscribed_ar VARCHAR(30) NOT NULL,
  image_url VARCHAR(500),
  description_en TEXT,
  description_ar TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB;

-- =============================================
-- 7. Events
-- =============================================
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title_en VARCHAR(200) NOT NULL,
  title_ar VARCHAR(200) NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  category ENUM('festivals', 'exhibitions', 'concerts', 'sports', 'other') NOT NULL DEFAULT 'other',
  region VARCHAR(100),
  location VARCHAR(200),
  address VARCHAR(300),
  place VARCHAR(200),
  date_start DATE,
  date_end DATE,
  time_start TIME,
  time_end TIME,
  image_url VARCHAR(500),
  contact_phone VARCHAR(30),
  contact_email VARCHAR(100),
  homepage VARCHAR(300),
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =============================================
-- 8. Event Tags
-- =============================================
CREATE TABLE event_tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT NOT NULL,
  tag_en VARCHAR(50) NOT NULL,
  tag_ar VARCHAR(50) NOT NULL,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =============================================
-- 9. Event Gallery
-- =============================================
CREATE TABLE event_gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =============================================
-- 10. Tour Locations
-- =============================================
CREATE TABLE tour_locations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title_en VARCHAR(150) NOT NULL,
  title_ar VARCHAR(150) NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  image_url VARCHAR(500),
  matterport_url VARCHAR(500),
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB;

-- =============================================
-- 11. Tour Location Tags
-- =============================================
CREATE TABLE tour_location_tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tour_location_id INT NOT NULL,
  tag_en VARCHAR(50) NOT NULL,
  tag_ar VARCHAR(50) NOT NULL,
  FOREIGN KEY (tour_location_id) REFERENCES tour_locations(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =============================================
-- 12. Panoramas
-- =============================================
CREATE TABLE panoramas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title_en VARCHAR(150) NOT NULL,
  title_ar VARCHAR(150) NOT NULL,
  tag_en VARCHAR(50),
  tag_ar VARCHAR(50),
  image_url VARCHAR(500),
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB;

-- =============================================
-- 13. Calendar Months
-- =============================================
CREATE TABLE calendar_months (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name_en VARCHAR(30) NOT NULL,
  name_ar VARCHAR(30) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB;

-- =============================================
-- 14. Calendar Items
-- =============================================
CREATE TABLE calendar_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  month_id INT NOT NULL,
  title_en VARCHAR(100) NOT NULL,
  title_ar VARCHAR(100) NOT NULL,
  image_url VARCHAR(500),
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  FOREIGN KEY (month_id) REFERENCES calendar_months(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =============================================
-- 15. Discover Categories
-- =============================================
CREATE TABLE discover_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name_en VARCHAR(100) NOT NULL,
  name_ar VARCHAR(100) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB;

-- =============================================
-- 16. Discover Items
-- =============================================
CREATE TABLE discover_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  title_en VARCHAR(150) NOT NULL,
  title_ar VARCHAR(150) NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  tag_en VARCHAR(50),
  tag_ar VARCHAR(50),
  image_url VARCHAR(500),
  card_size ENUM('small', 'medium', 'large') NOT NULL DEFAULT 'medium',
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  FOREIGN KEY (category_id) REFERENCES discover_categories(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =============================================
-- 17. Site Settings (Key-Value)
-- =============================================
CREATE TABLE site_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(50) NOT NULL UNIQUE,
  setting_value TEXT
) ENGINE=InnoDB;


-- =============================================
-- SEED DATA
-- =============================================

-- Default admin user (password: admin123 — change immediately)
INSERT INTO admin_users (username, email, password_hash, role) VALUES
('admin', 'admin@visitalgeria.dz', '$2b$10$placeholder_hash_change_me', 'admin');

-- Hero Slides
INSERT INTO hero_slides (title_en, title_ar, video_url, sort_order) VALUES
('Summer Vacations', 'العطلة الصيفية', NULL, 1),
('Beaches', 'الشواطئ', NULL, 2),
('Family Activities', 'أنشطة عائلية', NULL, 3),
('Historical Sites', 'المواقع التاريخية', NULL, 4),
('Mountains', 'الجبال', NULL, 5),
('Hiking', 'المشي لمسافات طويلة', NULL, 6),
('Sahara Desert', 'الصحراء الكبرى', NULL, 7);

-- Destinations
INSERT INTO destinations (name_en, name_ar, image_url, sort_order) VALUES
('Algiers', 'الجزائر العاصمة', 'https://images.unsplash.com/photo-1599423300746-b62533397364?w=600&h=400&fit=crop', 1),
('Constantine', 'قسنطينة', 'https://images.unsplash.com/photo-1569288063643-5d29ad64df09?w=600&h=400&fit=crop', 2),
('Oran', 'وهران', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop', 3),
('Tlemcen', 'تلمسان', 'https://images.unsplash.com/photo-1590076083220-8e12f9f8d6b7?w=600&h=400&fit=crop', 4),
('Béjaïa', 'بجاية', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop', 5),
('Ghardaïa', 'غرداية', 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=600&h=400&fit=crop', 6),
('Annaba', 'عنابة', 'https://images.unsplash.com/photo-1533929736562-6f2cded85c6c?w=600&h=400&fit=crop', 7),
('Tamanrasset', 'تمنراست', 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&h=400&fit=crop', 8);

-- UNESCO Sites
INSERT INTO unesco_sites (name_en, name_ar, year_inscribed, year_inscribed_ar, image_url, sort_order) VALUES
('Tipasa', 'تيبازة', 'Inscribed 1982', 'مُدرج 1982', 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&fit=crop', 1),
('Djémila', 'جميلة', 'Inscribed 1982', 'مُدرج 1982', 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&fit=crop', 2),
('Timgad', 'تيمقاد', 'Inscribed 1982', 'مُدرج 1982', 'https://images.unsplash.com/photo-1549145177-238518f1ec1a?w=800&fit=crop', 3),
('M''Zab Valley', 'وادي ميزاب', 'Inscribed 1982', 'مُدرج 1982', 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&fit=crop', 4),
('Tassili n''Ajjer', 'طاسيلي ناجر', 'Inscribed 1982', 'مُدرج 1982', 'https://images.unsplash.com/photo-1575664274476-e02d99195164?w=800&fit=crop', 5),
('Casbah of Algiers', 'قصبة الجزائر', 'Inscribed 1992', 'مُدرج 1992', 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&fit=crop', 6),
('Béni Hammad Fort', 'قلعة بني حماد', 'Inscribed 1980', 'مُدرج 1980', 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&fit=crop', 7);

-- Featured Events (for Upcoming Activities section)
INSERT INTO events (title_en, title_ar, description_en, description_ar, category, region, location, date_start, date_end, time_start, time_end, image_url, is_featured, sort_order) VALUES
('Sahara Cultural Festival', 'مهرجان الصحراء الثقافي', 
 'Experience the vibrant traditions of the Tuareg people through music, dance, and storytelling under a canopy of stars in the world''s greatest desert.',
 'عِش تقاليد الطوارق النابضة بالحياة من خلال الموسيقى والرقص وسرد القصص تحت سماء مرصعة بالنجوم في أعظم صحراء في العالم.',
 'festivals', 'Tamanrasset', 'Tamanrasset, Sahara', '2025-12-15', '2025-12-20', '18:00', '23:00',
 'https://images.unsplash.com/photo-1575664274476-e02d99195164?w=800&fit=crop', TRUE, 1),

('Timgad International Music Festival', 'مهرجان تيمقاد الدولي للموسيقى',
 'A legendary open-air concert held in the ancient Roman theater of Timgad. World-class artists perform against a backdrop of 2,000-year-old ruins.',
 'حفل موسيقي أسطوري في الهواء الطلق يُقام في المسرح الروماني القديم بتيمقاد. فنانون عالميون يؤدون على خلفية أطلال عمرها 2000 عام.',
 'concerts', 'Batna', 'Timgad', '2025-07-05', '2025-07-12', '19:00', '01:00',
 'https://images.unsplash.com/photo-1549145177-238518f1ec1a?w=800&fit=crop', TRUE, 2),

('Mediterranean Coastal Tour', 'جولة الساحل المتوسطي',
 'Discover Algeria''s stunning 1,200km coastline with pristine beaches, hidden coves, and charming coastal towns. Crystal-clear waters and fresh seafood await.',
 'اكتشف ساحل الجزائر المذهل الممتد على 1200 كم مع شواطئ نقية وخلجان مخفية ومدن ساحلية ساحرة.',
 'other', 'Multiple', 'Algerian Coast', '2025-05-01', '2025-09-30', '08:00', '20:00',
 'https://images.unsplash.com/photo-1642088995585-e97a4af093ef?w=800&fit=crop', TRUE, 3);

-- Event Tags for featured events
INSERT INTO event_tags (event_id, tag_en, tag_ar) VALUES
(1, 'Festival', 'مهرجان'), (1, 'Culture', 'ثقافة'),
(2, 'Music', 'موسيقى'), (2, 'Heritage', 'تراث'),
(3, 'Beach', 'شاطئ'), (3, 'Nature', 'طبيعة');

-- More Events (for EventsPage)
INSERT INTO events (title_en, title_ar, description_en, description_ar, category, region, location, date_start, date_end, time_start, time_end, image_url, is_featured, sort_order) VALUES
('Timgad Festival', 'مهرجان تيمقاد', 'Annual international music festival at the Roman theater of Timgad.', 'مهرجان الموسيقى الدولي السنوي في المسرح الروماني بتيمقاد.', 'festivals', 'Batna', 'Timgad', '2025-07-05', '2025-07-12', '19:00', '01:00', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&fit=crop', FALSE, 4),
('Puppet Festival', 'مهرجان الدمى', 'International puppet theater festival.', 'مهرجان مسرح الدمى الدولي.', 'festivals', 'Aïn Témouchent', 'Aïn Témouchent', '2025-08-15', '2025-08-20', '10:00', '18:00', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&fit=crop', FALSE, 5),
('Sbiba Festival', 'مهرجان السبيبة', 'Traditional Tuareg celebration in the heart of the Sahara.', 'احتفال تقليدي للطوارق في قلب الصحراء.', 'festivals', 'Illizi', 'Djanet, Sahara', '2025-09-10', '2025-09-12', '08:00', '23:00', 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&fit=crop', FALSE, 6);

-- Tour Locations
INSERT INTO tour_locations (title_en, title_ar, description_en, description_ar, image_url, matterport_url, sort_order) VALUES
('Ghardaïa: The M''zab Valley', 'غرداية: وادي ميزاب',
 'Explore the fortified cities of the M''zab valley. A masterpiece of medieval architecture, perfectly adapted to the desert environment.',
 'استكشف المدن المحصنة في وادي ميزاب. تحفة من العمارة الإسلامية في العصور الوسطى.',
 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&fit=crop',
 'https://my.matterport.com/show/?m=M6gCqdgrcmQ', 1),
('Timgad: The Roman Outpost', 'تيمقاد: الحصن الروماني',
 'Walk through the remarkably preserved Roman colonial city founded by Emperor Trajan around 100 AD.',
 'تجول في المدينة الاستعمارية الرومانية المحفوظة بشكل رائع التي أسسها الإمبراطور تراجان.',
 'https://images.unsplash.com/photo-1549145177-238518f1ec1a?w=800&fit=crop',
 'https://my.matterport.com/show/?m=M6gCqdgrcmQ', 2),
('Casbah of Algiers', 'قصبة الجزائر',
 'Navigate the labyrinthine streets of the historic Casbah, a UNESCO World Heritage Site since 1992.',
 'تنقل عبر الشوارع المتاهة للقصبة التاريخية، موقع تراث عالمي لليونسكو منذ 1992.',
 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&fit=crop',
 'https://my.matterport.com/show/?m=M6gCqdgrcmQ', 3);

-- Tour Location Tags
INSERT INTO tour_location_tags (tour_location_id, tag_en, tag_ar) VALUES
(1, 'UNESCO', 'يونسكو'), (1, 'Architecture', 'عمارة'), (1, '360°', '360°'),
(2, 'History', 'تاريخ'), (2, 'Ruins', 'أطلال'), (2, 'Interactive', 'تفاعلي'),
(3, 'Culture', 'ثقافة'), (3, 'Labyrinth', 'متاهة'), (3, 'Audio', 'صوتي');

-- Panoramas
INSERT INTO panoramas (title_en, title_ar, tag_en, tag_ar, image_url, sort_order) VALUES
('Tassili n''Ajjer', 'طاسيلي ناجر', 'Featured', 'مميز', 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=1200&fit=crop', 1),
('Sahara Peaks', 'كثبان الصحراء', 'Popular', 'شائع', 'https://images.unsplash.com/photo-1509660933844-6910e12765a0?w=1200&fit=crop', 2);

-- Calendar Months
INSERT INTO calendar_months (name_en, name_ar, sort_order) VALUES
('December', 'ديسمبر', 1),
('January', 'يناير', 2),
('February', 'فبراير', 3),
('March', 'مارس', 4);

-- Calendar Items (all linked to month 1 for now)
INSERT INTO calendar_items (month_id, title_en, title_ar, image_url, sort_order) VALUES
(1, 'Christmas Markets', 'أسواق عيد الميلاد', 'https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=300&fit=crop', 1),
(1, 'New Year''s Eve', 'ليلة رأس السنة', 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=300&fit=crop', 2),
(1, 'Winter Hiking', 'المشي في الشتاء', 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=300&fit=crop', 3),
(1, 'Ski Season', 'موسم التزلج', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&fit=crop', 4),
(1, 'Fondue Nights', 'ليالي الفوندو', 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=300&fit=crop', 5),
(1, 'Ice Skating', 'التزلج على الجليد', 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=300&fit=crop', 6),
(1, 'Spa & Wellness', 'سبا و استجمام', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=300&fit=crop', 7),
(1, 'Snow Shoeing', 'المشي على الثلج', 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=300&fit=crop', 8);

-- Discover Categories
INSERT INTO discover_categories (name_en, name_ar, sort_order) VALUES
('Art & Culture', 'الفن والثقافة', 1),
('Architecture', 'العمارة', 2),
('Museums', 'المتاحف', 3);

-- Discover Items
INSERT INTO discover_items (category_id, title_en, title_ar, description_en, description_ar, image_url, card_size, sort_order) VALUES
(1, 'Traditional Crafts', 'الحرف التقليدية', 'Discover centuries-old artisan techniques passed down through generations.', 'اكتشف تقنيات حرفية عمرها قرون توارثتها الأجيال.', 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800&fit=crop', 'medium', 1),
(1, 'Music & Rhythms', 'الموسيقى والإيقاعات', 'From chaabi to raï, explore Algeria''s rich musical heritage.', 'من الشعبي إلى الراي، استكشف التراث الموسيقي الغني للجزائر.', 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&fit=crop', 'medium', 2),
(1, 'Cultural Events', 'الفعاليات الثقافية', 'Year-round festivals celebrating Algeria''s diverse cultural identity.', 'مهرجانات على مدار السنة تحتفي بالهوية الثقافية المتنوعة للجزائر.', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&fit=crop', 'medium', 3),
(2, 'Casbah of Algiers', 'قصبة الجزائر', NULL, NULL, 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&fit=crop', 'large', 1),
(2, 'Great Mosque', 'الجامع الكبير', NULL, NULL, 'https://images.unsplash.com/photo-1542662565-7e4b66bae529?w=600&fit=crop', 'small', 2),
(2, 'Constantine', 'قسنطينة', NULL, NULL, 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=600&fit=crop', 'small', 3),
(2, 'Timgad Ruins', 'أطلال تيمقاد', NULL, NULL, 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&fit=crop', 'medium', 4);

-- Suggestions
INSERT INTO suggestions (tag_en, tag_ar, title_en, title_ar, description_en, description_ar, sort_order) VALUES
('Top Attractions', 'أبرز المعالم', 'The Aurès Mountains', 'جبال الأوراس',
 'Discover the majestic Aurès mountains, home to ancient Berber civilizations, dramatic gorges, and traditional villages perched on rocky cliffs.',
 'اكتشف جبال الأوراس المهيبة، موطن الحضارات الأمازيغية القديمة والأخاديد الدراماتيكية والقرى التقليدية.',
 1),
('World Heritage', 'تراث عالمي', 'Timgad Roman City', 'مدينة تيمقاد الرومانية',
 'Walk through the remarkably preserved ruins of this Roman colonial city founded by Emperor Trajan around 100 AD.',
 'تجول في الأطلال المحفوظة بشكل رائع لهذه المدينة الاستعمارية الرومانية.',
 2),
('Nature', 'طبيعة', 'Djurdjura National Park', 'حديقة جرجرة الوطنية',
 'Experience the breathtaking landscapes of the Djurdjura range, from snow-capped peaks to lush cedar forests.',
 'عِش المناظر الطبيعية الخلابة لسلسلة جرجرة من القمم المغطاة بالثلوج إلى غابات الأرز.',
 3);

-- Discover Cards (Bento Grid)
INSERT INTO discover_cards (title_en, title_ar, card_size, sort_order) VALUES
('Creator''s Cut', 'اختيار المبدعين', 'title', 1),
('Autumn Discovery', 'اكتشاف الخريف', 'wide', 2),
('Sustainable Destinations', 'وجهات مستدامة', 'narrow', 3);

-- Site Settings
INSERT INTO site_settings (setting_key, setting_value) VALUES
('unesco_badge_en', 'UNESCO World Heritage'),
('unesco_badge_ar', 'التراث العالمي لليونسكو'),
('unesco_headline_en', 'Discover Algeria''s UNESCO World Heritage Sites'),
('unesco_headline_ar', 'اكتشف مواقع التراث العالمي في الجزائر'),
('unesco_description_en', 'Algeria is home to seven exceptional sites recognized by UNESCO for their outstanding universal value.'),
('unesco_description_ar', 'تضم الجزائر سبعة مواقع استثنائية معترف بها من قبل اليونسكو لقيمتها العالمية المتميزة.'),
('unesco_cta_en', 'Explore Heritage Sites'),
('unesco_cta_ar', 'استكشف مواقع التراث'),
('hero_subtitle_en', 'Discover the beauty of Algeria'),
('hero_subtitle_ar', 'اكتشف جمال الجزائر'),
('footer_tagline_en', 'Your gateway to Algeria''s beauty and heritage.'),
('footer_tagline_ar', 'بوابتك لجمال الجزائر وتراثها.'),
('contact_address', '02, Rue Amar El Kama, Algiers, Algeria'),
('contact_phone', '+213 (0) 21 71 30 60'),
('contact_email', 'contact@visitalgeria.dz');
