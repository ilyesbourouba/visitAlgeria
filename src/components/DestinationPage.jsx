import React, { useState, useEffect, useRef } from 'react';
import './DestinationPage.css';
import WilayaDetailPage from './WilayaDetailPage';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

// Wilaya coordinates for all 58 wilayas
const WILAYA_COORDS = {
    1: { lat: 27.5, lng: 0.2 }, 2: { lat: 36.15, lng: 1.3 }, 3: { lat: 33.8, lng: 2.9 },
    4: { lat: 35.8, lng: 7.1 }, 5: { lat: 35.5, lng: 6.2 }, 6: { lat: 36.7, lng: 5.1 },
    7: { lat: 34.8, lng: 5.7 }, 8: { lat: 31.6, lng: -2.2 }, 9: { lat: 36.5, lng: 2.8 },
    10: { lat: 36.3, lng: 3.9 }, 11: { lat: 22.8, lng: 5.5 }, 12: { lat: 35.4, lng: 8.1 },
    13: { lat: 35.3, lng: -0.6 }, 14: { lat: 35.4, lng: 1.3 }, 15: { lat: 36.7, lng: 4.0 },
    16: { lat: 36.7, lng: 3.0 }, 17: { lat: 34.7, lng: 3.2 }, 18: { lat: 36.8, lng: 5.7 },
    19: { lat: 36.2, lng: 5.4 }, 20: { lat: 35.3, lng: 0.2 }, 21: { lat: 36.9, lng: 6.9 },
    22: { lat: 35.2, lng: -0.6 }, 23: { lat: 37.1, lng: 7.7 }, 24: { lat: 36.5, lng: 7.4 },
    25: { lat: 36.4, lng: 6.6 }, 26: { lat: 36.4, lng: 2.7 }, 27: { lat: 35.9, lng: 0.1 },
    28: { lat: 35.7, lng: 4.5 }, 29: { lat: 35.4, lng: 0.1 }, 30: { lat: 31.9, lng: 5.3 },
    31: { lat: 35.7, lng: -0.6 }, 32: { lat: 33.8, lng: 1.0 }, 33: { lat: 26.1, lng: 8.5 },
    34: { lat: 36.1, lng: 4.7 }, 35: { lat: 36.5, lng: 3.5 }, 36: { lat: 37.1, lng: 8.3 },
    37: { lat: 27.7, lng: -8.0 }, 38: { lat: 35.3, lng: 1.9 }, 39: { lat: 33.4, lng: 6.1 },
    40: { lat: 35.4, lng: 7.1 }, 41: { lat: 36.3, lng: 7.8 }, 42: { lat: 36.6, lng: 2.4 },
    43: { lat: 36.5, lng: 6.3 }, 44: { lat: 36.3, lng: 2.1 }, 45: { lat: 33.3, lng: 0.3 },
    46: { lat: 35.3, lng: -1.1 }, 47: { lat: 32.5, lng: 3.8 }, 48: { lat: 35.7, lng: 0.6 },
    49: { lat: 29.2, lng: -0.3 }, 50: { lat: 26.9, lng: 5.9 }, 51: { lat: 33.6, lng: 4.2 },
    52: { lat: 30.1, lng: -2.2 }, 53: { lat: 28.0, lng: 2.4 }, 54: { lat: 23.6, lng: 5.9 },
    55: { lat: 32.6, lng: 6.0 }, 56: { lat: 24.2, lng: 9.5 }, 57: { lat: 33.7, lng: 5.3 },
    58: { lat: 34.4, lng: 3.6 }
};

/**
 * Create a circular marker icon with a wilaya name label using Leaflet divIcon.
 */
function createCircleMarkerIcon(L, wilayaName) {
    return L.divIcon({
        className: 'wilaya-marker-icon',
        html: `
            <div class="marker-container">
                <div class="marker-circle-large"></div>
                <div class="marker-permanent-label">${wilayaName}</div>
            </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20]
    });
}

function DestinationPage({ onClose, onSelectWilaya, initialWilaya, onSelectPlace }) {
    const { language } = useLanguage();
    const t = (key) => getTranslation(language, key);
    
    const [wilayaData, setWilayaData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedWilaya, setSelectedWilaya] = useState(null);
    const [showDetailPage, setShowDetailPage] = useState(false);
    const [detailWilaya, setDetailWilaya] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersRef = useRef({});

    // If we received an initialWilaya from home page, open its detail view immediately
    useEffect(() => {
        if (initialWilaya) {
            console.log("Navigating to initial wilaya:", initialWilaya.name_en);
            const enhanced = {
                ...initialWilaya,
                code: initialWilaya.id,
                name: initialWilaya.name_en,
                nameAr: initialWilaya.name_ar,
                lat: WILAYA_COORDS[initialWilaya.id]?.lat || 28.0,
                lng: WILAYA_COORDS[initialWilaya.id]?.lng || 3.0,
                image: initialWilaya.background_image
                    ? `${API_BASE}${initialWilaya.background_image}`
                    : 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=200&h=150&fit=crop'
            };
            setDetailWilaya(enhanced);
            setShowDetailPage(true);
        }
    }, [initialWilaya]);

    // Fetch wilayas from API
    useEffect(() => {
        const fetchWilayas = async () => {
            try {
                const res = await axios.get(`${API_BASE}/api/destinations?active=true`);
                const enhanced = res.data.map(w => ({
                    ...w,
                    code: w.id,
                    name: w.name_en,
                    nameAr: w.name_ar,
                    lat: WILAYA_COORDS[w.id]?.lat || 28.0,
                    lng: WILAYA_COORDS[w.id]?.lng || 3.0,
                    image: w.background_image
                        ? `${API_BASE}${w.background_image}`
                        : 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=200&h=150&fit=crop'
                }));
                setWilayaData(enhanced);
            } catch (err) {
                console.error('Error fetching wilayas:', err);
                setError('Failed to load wilayas');
            } finally {
                setLoading(false);
            }
        };
        fetchWilayas();
    }, []);

    const handleCloseDetail = () => {
        setShowDetailPage(false);
        setDetailWilaya(null);
    };

    // Filter wilayas based on search
    const filteredWilayas = wilayaData.filter(wilaya =>
        wilaya.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wilaya.nameAr.includes(searchQuery) ||
        wilaya.code.toString().includes(searchQuery)
    );

    // Initialize map when wilayaData is available OR when returning from detail page
    useEffect(() => {
        if (wilayaData.length === 0 || showDetailPage) return;

        // Load Leaflet CSS
        if (!document.querySelector('link[href*="leaflet"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);
        }

        // Inject custom marker CSS
        if (!document.querySelector('#wilaya-marker-styles')) {
            const style = document.createElement('style');
            style.id = 'wilaya-marker-styles';
            style.textContent = `
                .wilaya-marker-icon {
                    background: none !important;
                    border: none !important;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    pointer-events: auto;
                    z-index: 1000 !important;
                }
                .marker-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                }
                .marker-circle-large {
                    width: 16px;
                    height: 16px;
                    background: #ff3e6c;
                    border: 2px solid #fff;
                    border-radius: 50%;
                    box-shadow: 0 0 10px rgba(255, 62, 108, 0.5), 0 2px 5px rgba(0,0,0,0.4);
                    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    position: relative;
                    z-index: 2;
                }
                .marker-pulse {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 16px;
                    height: 16px;
                    background: #ff3e6c;
                    border-radius: 50%;
                    opacity: 0.6;
                    animation: marker-pulse 2s infinite;
                    z-index: 1;
                }
                @keyframes marker-pulse {
                    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
                    100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
                }
                .wilaya-marker-icon:hover .marker-circle-large {
                    transform: scale(1.3);
                    background: #e61e50;
                }
                .marker-permanent-label {
                    margin-top: 4px;
                    font-size: 11px;
                    font-weight: 800;
                    color: #fff;
                    background: #1c0208;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    padding: 2px 7px;
                    border-radius: 10px;
                    white-space: nowrap;
                    pointer-events: none;
                    box-shadow: 0 3px 8px rgba(0,0,0,0.4);
                    text-transform: uppercase;
                    letter-spacing: 0.3px;
                }
                .wilaya-marker-icon:hover .marker-permanent-label {
                    background: #ff3e6c;
                    border-color: #fff;
                    z-index: 1001;
                }
            `;
            document.head.appendChild(style);
        }

        // Load Leaflet JS
        const loadLeaflet = () => {
            return new Promise((resolve) => {
                if (window.L) {
                    resolve(window.L);
                    return;
                }
                const script = document.createElement('script');
                script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
                script.onload = () => resolve(window.L);
                document.head.appendChild(script);
            });
        };

        let map = null;

        loadLeaflet().then((L) => {
            if (mapRef.current && !mapInstanceRef.current && !showDetailPage) {
                // Create map
                map = L.map(mapRef.current, {
                    zoomControl: true,
                    scrollWheelZoom: true
                }).setView([28.0, 3.0], 6);

                // Add OpenStreetMap tiles
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors',
                    maxZoom: 19
                }).addTo(map);

                // Set bounds to Algeria
                const algeriaBounds = L.latLngBounds(
                    L.latLng(18.0, -9.0),
                    L.latLng(37.5, 12.5)
                );
                map.setMaxBounds(algeriaBounds);
                map.setMinZoom(5);
                
                // Add markers for each wilaya
                wilayaData.forEach(wilaya => {
                    const displayName = language === 'ar' ? wilaya.nameAr : wilaya.name;
                    const circleIcon = L.divIcon({
                        className: 'wilaya-marker-icon',
                        html: `
                            <div class="marker-container">
                                <div class="marker-pulse"></div>
                                <div class="marker-circle-large"></div>
                                <div class="marker-permanent-label">${displayName}</div>
                            </div>
                        `,
                        iconSize: [40, 40],
                        iconAnchor: [20, 20]
                    });

                    const marker = L.marker([wilaya.lat, wilaya.lng], {
                        title: wilaya.name,
                        icon: circleIcon
                    }).addTo(map);

                    marker.bindPopup(`
                        <div class="wilaya-popup">
                            <h3 style="margin-bottom:5px">${displayName}</h3>
                            <button class="popup-btn" style="width:100%; padding:8px; background:#ff3e6c; color:white; border:none; border-radius:6px; cursor:pointer; font-weight:bold">
                                ${language === 'ar' ? 'مشاهدة التفاصيل' : 'View Details'}
                            </button>
                        </div>
                    `, { closeButton: false, offset: [0, -10] });

                    marker.on('popupopen', () => {
                        const btn = document.querySelector('.popup-btn');
                        if (btn) btn.onclick = () => { setDetailWilaya(wilaya); setShowDetailPage(true); };
                    });

                    marker.on('click', () => setSelectedWilaya(wilaya));
                    markersRef.current[wilaya.code] = marker;
                });

                mapInstanceRef.current = map;
                
                // If we have an initial wilaya or a selected one, center on it
                const target = initialWilaya || selectedWilaya;
                if (target) {
                    const lat = WILAYA_COORDS[target.id]?.lat || 28.0;
                    const lng = WILAYA_COORDS[target.id]?.lng || 3.0;
                    map.setView([lat, lng], 9);
                    if (markersRef.current[target.id]) {
                        markersRef.current[target.id].openPopup();
                    }
                } else {
                    map.fitBounds(algeriaBounds);
                }

                // Fix map size after render
                setTimeout(() => map.invalidateSize(), 200);
            }
        });

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [wilayaData, language, showDetailPage]);

    // Handle wilaya selection from sidebar
    const handleWilayaClick = (wilaya) => {
        setSelectedWilaya(wilaya);
        
        if (mapInstanceRef.current) {
            mapInstanceRef.current.setView([wilaya.lat, wilaya.lng], 9);
            if (markersRef.current[wilaya.code]) {
                markersRef.current[wilaya.code].openPopup();
            }
        }
    };

    // Handle "View Details" link click
    const handleViewDetails = (e, wilaya) => {
        e.stopPropagation(); // Prevent triggering map click
        setDetailWilaya(wilaya);
        setShowDetailPage(true);
    };

    // Handle back from detail page
    const handleBackFromDetail = () => {
        setShowDetailPage(false);
        setDetailWilaya(null);
    };

    // If showing detail page, render it instead
    if (showDetailPage && detailWilaya) {
        return (
            <WilayaDetailPage 
                wilaya={detailWilaya} 
                onBack={handleBackFromDetail}
                onSelectPlace={onSelectPlace}
            />
        );
    }

    if (loading) return <div className="destination-page loading">Loading...</div>;
    if (error) return <div className="destination-page error">{error}</div>;

    return (
        <div className="destination-page">
            {showDetailPage && (
                <WilayaDetailPage 
                    wilaya={detailWilaya} 
                    onClose={handleCloseDetail} 
                    onSelectPlace={onSelectPlace}
                />
            )}
            {/* Close button */}
            <button className="destination-close-btn" onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>

            <div className="destination-container">
                {/* Sidebar */}
                <div className="destination-sidebar">
                    <div className="sidebar-header">
                        <h1>{t('wilayasOfAlgeria')}</h1>
                        <input
                            type="text"
                            className="search-box"
                            placeholder={t('searchWilaya')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    
                    <div className="wilaya-list">
                        {filteredWilayas.map(wilaya => (
                            <div
                                key={wilaya.code}
                                className={`wilaya-item ${selectedWilaya?.code === wilaya.code ? 'active' : ''}`}
                                onClick={() => handleWilayaClick(wilaya)}
                            >
                                <div className="wilaya-thumbnail">
                                    <img 
                                        src={wilaya.image} 
                                        alt={language === 'ar' ? wilaya.nameAr : wilaya.name}
                                        loading="lazy"
                                    />
                                </div>
                                <span className="wilaya-name">{language === 'ar' ? wilaya.nameAr : wilaya.name}</span>
                                <span className="wilaya-code">{wilaya.code}</span>
                                <button 
                                    className="view-details-btn"
                                    onClick={(e) => handleViewDetails(e, wilaya)}
                                >
                                    {t('viewDetails')} →
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    {filteredWilayas.length === 0 && (
                        <div className="no-results">No wilayas found</div>
                    )}
                </div>

                {/* Map Container */}
                <div className="map-section">
                    <div className="map-header">
                        <h2>{t('algeriaMapsTitle')}</h2>
                    </div>
                    <div ref={mapRef} className="map"></div>
                </div>
            </div>
        </div>
    );
}

export default DestinationPage;
