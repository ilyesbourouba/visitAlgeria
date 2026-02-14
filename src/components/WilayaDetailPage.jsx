import React, { useState, useEffect, useCallback } from 'react';
import './WilayaDetailPage.css';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import axios from 'axios';

const API_BASE = 'http://localhost:5000';

function WilayaDetailPage({ wilaya, onBack }) {
    const { language } = useLanguage();
    const t = (key) => getTranslation(language, key);
    const isAr = language === 'ar';
    
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [topPlaces, setTopPlaces] = useState([]);
    const [loadingPlaces, setLoadingPlaces] = useState(true);
    const [showFullAbout, setShowFullAbout] = useState(false);

    // Fetch top places for this wilaya from Discovery system
    useEffect(() => {
        const fetchTopPlaces = async () => {
            try {
                // Fetch places matching the wilaya name (Region)
                const res = await axios.get(`${API_BASE}/api/discover-system/places?region=${wilaya.name_en}`);
                setTopPlaces(res.data);
            } catch (err) {
                console.error('Error fetching top places:', err);
            } finally {
                setLoadingPlaces(false);
            }
        };
        fetchTopPlaces();
    }, [wilaya.name_en]);

    const displayName = isAr ? (wilaya.name_ar || wilaya.name_en) : wilaya.name_en;
    const displayAbout = isAr ? (wilaya.about_ar || wilaya.about_en) : wilaya.about_en;
    const displayClimate = isAr ? (wilaya.climate_ar || wilaya.climate_en) : wilaya.climate_en;
    
    // Tips
    const displayBestTime = isAr ? (wilaya.best_time_ar || wilaya.best_time_en) : wilaya.best_time_en;
    const displayCuisine = isAr ? (wilaya.cuisine_ar || wilaya.cuisine_en) : wilaya.cuisine_en;
    const displayEtiquette = isAr ? (wilaya.etiquette_ar || wilaya.etiquette_en) : wilaya.etiquette_en;
    const displayTransport = isAr ? (wilaya.transport_ar || wilaya.transport_en) : wilaya.transport_en;

    const heroImage = wilaya.background_image ? `${API_BASE}${wilaya.background_image}` : (wilaya.gallery?.[0]?.image_url ? `${API_BASE}${wilaya.gallery[0].image_url}` : '');

    const gallery = wilaya.gallery || [];

    // Lightbox navigation
    const goToNextImage = useCallback(() => {
        if (selectedImageIndex !== null && gallery.length > 0) {
            setSelectedImageIndex((selectedImageIndex + 1) % gallery.length);
        }
    }, [selectedImageIndex, gallery.length]);

    const goToPrevImage = useCallback(() => {
        if (selectedImageIndex !== null && gallery.length > 0) {
            setSelectedImageIndex((selectedImageIndex - 1 + gallery.length) % gallery.length);
        }
    }, [selectedImageIndex, gallery.length]);

    // Keyboard navigation for lightbox
    useEffect(() => {
        if (selectedImageIndex === null) return;
        const handleKey = (e) => {
            if (e.key === 'ArrowRight') goToNextImage();
            else if (e.key === 'ArrowLeft') goToPrevImage();
            else if (e.key === 'Escape') setSelectedImageIndex(null);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [selectedImageIndex, goToNextImage, goToPrevImage]);

    const selectedItem = selectedImageIndex !== null ? gallery[selectedImageIndex] : null;

    return (
        <div className="wilaya-detail-page">
            {/* Hero Section */}
            <div className="wilaya-hero" style={{ backgroundImage: heroImage ? `url(${heroImage})` : 'none' }}>
                <div className="hero-overlay"></div>
                <button className="back-btn" onClick={onBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    {t('backToMap') || 'Back to Map'}
                </button>
                <div className="hero-content">
                    <span className="wilaya-badge">{t('wilaya') || 'Wilaya'} {wilaya.id}</span>
                    <h1>{displayName}</h1>
                    <div className="hero-highlights">
                        {(wilaya.tags || []).map((tag, index) => (
                            <span key={index} className="highlight-tag">{isAr ? tag.name_ar : tag.name_en}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="wilaya-content">
                {/* About Section */}
                <section className="about-section">
                    <h2>{t('aboutWilaya') || 'About'} {displayName}</h2>
                    <div 
                        className={`about-text ${showFullAbout ? 'expanded' : ''}`}
                        dangerouslySetInnerHTML={{ __html: displayAbout || '' }}
                    />
                    {displayAbout && displayAbout.length > 500 && (
                        <button className="show-more-link" onClick={() => setShowFullAbout(!showFullAbout)}>
                            {showFullAbout ? (isAr ? 'عرض أقل' : 'Show less') : (isAr ? 'عرض المزيد' : 'Show more')}
                        </button>
                    )}
                    
                    {/* Quick Facts */}
                    <div className="quick-facts">
                        <div className="fact-card">
                            <span className="fact-icon">👥</span>
                            <span className="fact-label">{t('population') || 'Population'}</span>
                            <span className="fact-value">{wilaya.population || '—'}</span>
                        </div>
                        <div className="fact-card">
                            <span className="fact-icon">📐</span>
                            <span className="fact-label">{t('area') || 'Area'}</span>
                            <span className="fact-value">{wilaya.area || '—'}</span>
                        </div>
                        <div className="fact-card">
                            <span className="fact-icon">🌡️</span>
                            <span className="fact-label">{t('climate') || 'Climate'}</span>
                            <span className="fact-value">{displayClimate || '—'}</span>
                        </div>
                    </div>
                </section>

                {/* Top Places Section - Pulling from Discover System */}
                {topPlaces.length > 0 && (
                    <section className="places-section">
                        <h2>{t('topPlacesToVisit') || 'Top Places to Visit'}</h2>
                        <div className="places-grid">
                            {topPlaces.map((place, index) => (
                                <div
                                    key={index}
                                    className="place-card place-card-link"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (onSelectPlace) onSelectPlace(place);
                                    }}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="place-image">
                                        <img src={place.image_url ? `${API_BASE}${place.image_url}` : ''} alt={isAr ? place.name_ar : place.name_en} loading="lazy" />
                                    </div>
                                    <div className="place-info">
                                        <h3>{isAr ? place.name_ar : place.name_en}</h3>
                                        <p>{isAr ? (place.description_ar || place.description_en) : place.description_en}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Image & Video Gallery Section */}
                {gallery.length > 0 && (
                    <section className="gallery-section">
                        <h2>{t('photoGallery') || 'Photo & Video Gallery'}</h2>
                        <div className="gallery-grid">
                            {gallery.map((item, index) => (
                                <div 
                                    key={index} 
                                    className="gallery-item"
                                    onClick={() => setSelectedImageIndex(index)}
                                >
                                    {item.type === 'video' ? (
                                        <div className="video-thumb-container">
                                            <video src={`${API_BASE}${item.image_url}`} muted />
                                            <div className="play-overlay">▶</div>
                                        </div>
                                    ) : (
                                        <img src={`${API_BASE}${item.image_url}`} alt={`${displayName} ${index + 1}`} loading="lazy" />
                                    )}
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
                )}

                {/* Travel Tips Section */}
                <section className="tips-section">
                    <h2>{t('travelTips') || 'Travel Tips'}</h2>
                    <div className="tips-grid">
                        {displayBestTime && (
                            <div className="tip-card">
                                <span className="tip-icon">🕐</span>
                                <h4>{t('bestTimeToVisit') || 'Best Time to Visit'}</h4>
                                <p>{displayBestTime}</p>
                            </div>
                        )}
                        {displayCuisine && (
                            <div className="tip-card">
                                <span className="tip-icon">🍽️</span>
                                <h4>{t('localCuisine') || 'Local Cuisine'}</h4>
                                <p>{displayCuisine}</p>
                            </div>
                        )}
                        {displayEtiquette && (
                            <div className="tip-card">
                                <span className="tip-icon">🎭</span>
                                <h4>{t('culturalEtiquette') || 'Cultural Etiquette'}</h4>
                                <p>{displayEtiquette}</p>
                            </div>
                        )}
                        {displayTransport && (
                            <div className="tip-card">
                                <span className="tip-icon">🚗</span>
                                <h4>{t('gettingAround') || 'Getting Around'}</h4>
                                <p>{displayTransport}</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            {/* Lightbox Modal with Navigation */}
            {selectedItem && (
                <div className="lightbox" onClick={() => setSelectedImageIndex(null)}>
                    <button className="lightbox-close" onClick={() => setSelectedImageIndex(null)}>×</button>
                    
                    {/* Previous Arrow */}
                    {gallery.length > 1 && (
                        <button
                            className="lightbox-nav lightbox-prev"
                            onClick={(e) => { e.stopPropagation(); goToPrevImage(); }}
                            aria-label="Previous"
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                    )}

                    {selectedItem.type === 'video' ? (
                        <video src={`${API_BASE}${selectedItem.image_url}`} controls autoPlay onClick={(e) => e.stopPropagation()} />
                    ) : (
                        <img src={`${API_BASE}${selectedItem.image_url}`} alt="Full size" onClick={(e) => e.stopPropagation()} />
                    )}

                    {/* Next Arrow */}
                    {gallery.length > 1 && (
                        <button
                            className="lightbox-nav lightbox-next"
                            onClick={(e) => { e.stopPropagation(); goToNextImage(); }}
                            aria-label="Next"
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    )}

                    {/* Counter */}
                    {gallery.length > 1 && (
                        <div className="lightbox-counter" onClick={(e) => e.stopPropagation()}>
                            {selectedImageIndex + 1} / {gallery.length}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default WilayaDetailPage;
