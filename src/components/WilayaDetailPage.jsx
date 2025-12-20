import React, { useState } from 'react';
import './WilayaDetailPage.css';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';

// Extended wilaya data with descriptions, places to visit, and gallery images
const wilayaDetails = {
    1: {
        name: 'Adrar',
        nameAr: 'أدرار',
        code: 1,
        description: 'Adrar is a province in southern Algeria, known for its stunning Saharan landscapes, ancient ksour (fortified villages), and the famous Timimoun red oasis. The region boasts a rich cultural heritage with traditional Tuareg influences and spectacular desert scenery.',
        descriptionAr: 'أدرار هي ولاية في جنوب الجزائر، تشتهر بمناظرها الصحراوية الخلابة والقصور القديمة وواحة تيميمون الحمراء الشهيرة. تتمتع المنطقة بتراث ثقافي غني مع تأثيرات الطوارق التقليدية ومناظر صحراوية رائعة.',
        highlights: ['Saharan Desert', 'Timimoun Oasis', 'Ancient Ksour', 'Tuareg Culture'],
        highlightsAr: ['الصحراء الكبرى', 'واحة تيميمون', 'القصور القديمة', 'ثقافة الطوارق'],
        places: [
            { name: 'Timimoun Red Oasis', description: 'A stunning red-colored oasis town known for its unique architecture and palm groves.', image: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=400&h=300&fit=crop' },
            { name: 'Gourara Region', description: 'Historic region with ancient foggaras (underground irrigation systems) and traditional villages.', image: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=400&h=300&fit=crop' },
            { name: 'Touat Valley', description: 'A chain of oases stretching across the desert with date palm plantations.', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=300&fit=crop' }
        ],
        gallery: [
            'https://images.unsplash.com/photo-1548625361-1adba68e9f41?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'
        ],
        facts: { population: '400,000+', area: '427,968 km²', climate: 'Hot Desert', climateAr: 'صحراء حارة' }
    },
    16: {
        name: 'Algiers',
        nameAr: 'الجزائر العاصمة',
        code: 16,
        description: 'Algiers, the capital city of Algeria, is a vibrant metropolis blending French colonial architecture with traditional Moorish design. The historic Casbah, a UNESCO World Heritage site, overlooks the sparkling Mediterranean Sea.',
        descriptionAr: 'الجزائر العاصمة، عاصمة الجزائر، هي مدينة نابضة بالحياة تمزج بين العمارة الاستعمارية الفرنسية والتصميم المغربي التقليدي. القصبة التاريخية، موقع التراث العالمي لليونسكو، تطل على البحر الأبيض المتوسط.',
        highlights: ['Mediterranean Coast', 'Casbah UNESCO Site', 'French Colonial Architecture', 'Cultural Capital'],
        highlightsAr: ['ساحل البحر المتوسط', 'قصبة اليونسكو', 'العمارة الاستعمارية', 'العاصمة الثقافية'],
        places: [
            { name: 'The Casbah', description: 'UNESCO World Heritage site featuring winding streets and Ottoman-era architecture.', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' },
            { name: 'Notre Dame d\'Afrique', description: 'Beautiful basilica overlooking the Bay of Algiers with stunning views.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
            { name: 'Jardin d\'Essai', description: 'One of the most important botanical gardens in the world with diverse flora.', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop' }
        ],
        gallery: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=400&fit=crop'
        ],
        facts: { population: '3,500,000+', area: '1,190 km²', climate: 'Mediterranean', climateAr: 'متوسطي' }
    },
    25: {
        name: 'Constantine',
        nameAr: 'قسنطينة',
        code: 25,
        description: 'Constantine, the "City of Bridges", is one of the oldest cities in the world. Built on a dramatic rocky plateau with deep gorges, it features spectacular bridges and a rich history dating back over 2,500 years.',
        descriptionAr: 'قسنطينة، "مدينة الجسور"، هي واحدة من أقدم المدن في العالم. بنيت على هضبة صخرية درامية مع أخاديد عميقة، وتتميز بجسور مذهلة وتاريخ غني يعود إلى أكثر من 2500 عام.',
        highlights: ['City of Bridges', 'Ancient History', 'Rhumel Gorge', 'Cultural Heritage'],
        highlightsAr: ['مدينة الجسور', 'تاريخ قديم', 'وادي الرمل', 'التراث الثقافي'],
        places: [
            { name: 'Sidi M\'Cid Bridge', description: 'Spectacular suspension bridge spanning the Rhumel Gorge at 175 meters high.', image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&h=300&fit=crop' },
            { name: 'Palace of Ahmed Bey', description: 'Beautiful 19th-century palace showcasing Ottoman architecture and art.', image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=400&h=300&fit=crop' },
            { name: 'Tiddis Roman Ruins', description: 'Ancient Roman city ruins with well-preserved structures and mosaics.', image: 'https://images.unsplash.com/photo-1489493585363-d69421e0edd3?w=400&h=300&fit=crop' }
        ],
        gallery: [
            'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1489493585363-d69421e0edd3?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop'
        ],
        facts: { population: '950,000+', area: '2,187 km²', climate: 'Semi-arid', climateAr: 'شبه جاف' }
    }
};

// Generate default details for wilayas without specific data
function getWilayaDetails(code, name, nameAr) {
    if (wilayaDetails[code]) {
        return wilayaDetails[code];
    }
    
    // Generate default content for other wilayas
    return {
        name: name,
        nameAr: nameAr || name,
        code: code,
        description: `${name} is one of the 58 wilayas of Algeria, offering unique landscapes, rich cultural heritage, and warm hospitality.`,
        descriptionAr: `${nameAr || name} هي واحدة من 58 ولاية في الجزائر، تقدم مناظر طبيعية فريدة وتراث ثقافي غني وضيافة دافئة.`,
        highlights: ['Local Culture', 'Natural Landscapes', 'Traditional Crafts', 'Regional Cuisine'],
        highlightsAr: ['الثقافة المحلية', 'المناظر الطبيعية', 'الحرف التقليدية', 'المطبخ المحلي'],
        places: [
            { name: `${name} City Center`, description: 'The vibrant heart of the wilaya with markets and local life.', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
            { name: 'Local Markets', description: 'Traditional souks offering handicrafts and regional products.', image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=400&h=300&fit=crop' },
            { name: 'Natural Sites', description: 'Explore the diverse landscapes and natural beauty.', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop' }
        ],
        gallery: [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1489493585363-d69421e0edd3?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop'
        ],
        facts: { population: 'Various', area: 'Various', climate: 'Mediterranean/Semi-arid', climateAr: 'متوسطي/شبه جاف' }
    };
}

function WilayaDetailPage({ wilaya, onBack }) {
    const { language } = useLanguage();
    const t = (key) => getTranslation(language, key);
    const isAr = language === 'ar';
    
    const [selectedImage, setSelectedImage] = useState(null);
    const details = getWilayaDetails(wilaya.code, wilaya.name, wilaya.nameAr);
    
    const displayName = isAr ? (details.nameAr || details.name) : details.name;
    const displayDesc = isAr ? (details.descriptionAr || details.description) : details.description;
    const displayHighlights = isAr ? (details.highlightsAr || details.highlights) : details.highlights;
    const displayClimate = isAr ? (details.facts.climateAr || details.facts.climate) : details.facts.climate;

    return (
        <div className="wilaya-detail-page">
            {/* Hero Section */}
            <div className="wilaya-hero" style={{ backgroundImage: `url(${details.gallery[0]})` }}>
                <div className="hero-overlay"></div>
                <button className="back-btn" onClick={onBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    {t('backToMap')}
                </button>
                <div className="hero-content">
                    <span className="wilaya-badge">{t('wilaya')} {details.code}</span>
                    <h1>{displayName}</h1>
                    <div className="hero-highlights">
                        {displayHighlights.map((highlight, index) => (
                            <span key={index} className="highlight-tag">{highlight}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="wilaya-content">
                {/* About Section */}
                <section className="about-section">
                    <h2>{t('aboutWilaya')} {displayName}</h2>
                    <p>{displayDesc}</p>
                    
                    {/* Quick Facts */}
                    <div className="quick-facts">
                        <div className="fact-card">
                            <span className="fact-icon">👥</span>
                            <span className="fact-label">{t('population')}</span>
                            <span className="fact-value">{details.facts.population}</span>
                        </div>
                        <div className="fact-card">
                            <span className="fact-icon">📐</span>
                            <span className="fact-label">{t('area')}</span>
                            <span className="fact-value">{details.facts.area}</span>
                        </div>
                        <div className="fact-card">
                            <span className="fact-icon">🌡️</span>
                            <span className="fact-label">{t('climate')}</span>
                            <span className="fact-value">{displayClimate}</span>
                        </div>
                    </div>
                </section>

                {/* Top Places Section */}
                <section className="places-section">
                    <h2>{t('topPlacesToVisit')}</h2>
                    <div className="places-grid">
                        {details.places.map((place, index) => (
                            <div key={index} className="place-card">
                                <div className="place-image">
                                    <img src={place.image} alt={place.name} loading="lazy" />
                                </div>
                                <div className="place-info">
                                    <h3>{place.name}</h3>
                                    <p>{place.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Image Gallery Section */}
                <section className="gallery-section">
                    <h2>{t('photoGallery')}</h2>
                    <div className="gallery-grid">
                        {details.gallery.map((image, index) => (
                            <div 
                                key={index} 
                                className="gallery-item"
                                onClick={() => setSelectedImage(image)}
                            >
                                <img src={image} alt={`${displayName} ${index + 1}`} loading="lazy" />
                                <div className="gallery-overlay">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <path d="M21 21l-4.35-4.35M11 8v6M8 11h6"></path>
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Travel Tips Section */}
                <section className="tips-section">
                    <h2>{t('travelTips')}</h2>
                    <div className="tips-grid">
                        <div className="tip-card">
                            <span className="tip-icon">🕐</span>
                            <h4>{t('bestTimeToVisit')}</h4>
                            <p>{t('bestTimeDesc')}</p>
                        </div>
                        <div className="tip-card">
                            <span className="tip-icon">🍽️</span>
                            <h4>{t('localCuisine')}</h4>
                            <p>{t('localCuisineDesc')}</p>
                        </div>
                        <div className="tip-card">
                            <span className="tip-icon">🎭</span>
                            <h4>{t('culturalEtiquette')}</h4>
                            <p>{t('culturalEtiquetteDesc')}</p>
                        </div>
                        <div className="tip-card">
                            <span className="tip-icon">🚗</span>
                            <h4>{t('gettingAround')}</h4>
                            <p>{t('gettingAroundDesc')}</p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="lightbox" onClick={() => setSelectedImage(null)}>
                    <button className="lightbox-close" onClick={() => setSelectedImage(null)}>×</button>
                    <img src={selectedImage} alt="Full size" />
                </div>
            )}
        </div>
    );
}

export default WilayaDetailPage;

