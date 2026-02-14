-- =============================================
-- Discover System Migration
-- Run this in phpMyAdmin on the visit_algeria database
-- =============================================

USE visit_algeria;

-- =============================================
-- 1. Discover Sections (e.g., Museums, Art & Culture, UNESCO Heritage)
-- =============================================
CREATE TABLE IF NOT EXISTS discover_sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name_en VARCHAR(150) NOT NULL,
  name_ar VARCHAR(150) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- =============================================
-- 2. Discover Places
-- =============================================
CREATE TABLE IF NOT EXISTS discover_places (
  id INT AUTO_INCREMENT PRIMARY KEY,
  section_id INT NOT NULL,
  name_en VARCHAR(200) NOT NULL,
  name_ar VARCHAR(200) NOT NULL,
  image_url VARCHAR(500),
  region VARCHAR(100),
  info_en LONGTEXT,
  info_ar LONGTEXT,
  show_on_homepage BOOLEAN NOT NULL DEFAULT FALSE,
  show_on_unesco BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (section_id) REFERENCES discover_sections(id) ON DELETE CASCADE
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- =============================================
-- 3. Discover Place Categories (many-to-many tags per place)
-- =============================================
CREATE TABLE IF NOT EXISTS discover_place_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  place_id INT NOT NULL,
  name_en VARCHAR(100) NOT NULL,
  name_ar VARCHAR(100) NOT NULL,
  FOREIGN KEY (place_id) REFERENCES discover_places(id) ON DELETE CASCADE
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- =============================================
-- 4. Discover Place Gallery
-- =============================================
CREATE TABLE IF NOT EXISTS discover_place_gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  place_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (place_id) REFERENCES discover_places(id) ON DELETE CASCADE
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- =============================================
-- 5. Discover Page Settings (hero section data)
-- =============================================
CREATE TABLE IF NOT EXISTS discover_page_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Seed default page settings
INSERT INTO discover_page_settings (setting_key, setting_value) VALUES
  ('tag_en', 'Discover Algeria Now'),
  ('tag_ar', 'اكتشف الجزائر الآن'),
  ('title_en', 'Discover Destinations'),
  ('title_ar', 'اكتشف الوجهات'),
  ('subtitle_en', 'Explore the beauty, culture, and heritage of Algeria'),
  ('subtitle_ar', 'استكشف جمال وثقافة وتراث الجزائر'),
  ('background_image', '')
ON DUPLICATE KEY UPDATE setting_key = setting_key;

-- Seed sample sections
INSERT INTO discover_sections (name_en, name_ar, sort_order) VALUES
  ('Art & Culture', 'الفن والثقافة', 1),
  ('Architecture', 'العمارة', 2),
  ('Museums', 'المتاحف', 3),
  ('UNESCO World Heritage', 'التراث العالمي لليونسكو', 4);
