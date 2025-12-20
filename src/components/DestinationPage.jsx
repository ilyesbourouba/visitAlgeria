import React, { useState, useEffect, useRef } from 'react';
import './DestinationPage.css';
import WilayaDetailPage from './WilayaDetailPage';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';

// Wilaya data with latitude/longitude for markers and placeholder images
const wilayaData = [
    { code: 1, name: 'Adrar', nameAr: 'أدرار', lat: 27.5, lng: 0.2, image: 'https://images.unsplash.com/photo-1548625361-1adba68e9f41?w=200&h=150&fit=crop' },
    { code: 2, name: 'Chlef', nameAr: 'الشلف', lat: 36.15, lng: 1.3, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop' },
    { code: 3, name: 'Laghouat', nameAr: 'الأغواط', lat: 33.8, lng: 2.9, image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=200&h=150&fit=crop' },
    { code: 4, name: 'Oum El Bouaghi', nameAr: 'أم البواقي', lat: 35.8, lng: 7.1, image: 'https://images.unsplash.com/photo-1489493585363-d69421e0edd3?w=200&h=150&fit=crop' },
    { code: 5, name: 'Batna', nameAr: 'باتنة', lat: 35.5, lng: 6.2, image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=200&h=150&fit=crop' },
    { code: 6, name: 'Béjaïa', nameAr: 'بجاية', lat: 36.7, lng: 5.1, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=150&fit=crop' },
    { code: 7, name: 'Biskra', nameAr: 'بسكرة', lat: 34.8, lng: 5.7, image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=200&h=150&fit=crop' },
    { code: 8, name: 'Béchar', nameAr: 'بشار', lat: 31.6, lng: -2.2, image: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=200&h=150&fit=crop' },
    { code: 9, name: 'Blida', nameAr: 'البليدة', lat: 36.5, lng: 2.8, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop' },
    { code: 10, name: 'Bouïra', nameAr: 'البويرة', lat: 36.3, lng: 3.9, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=150&fit=crop' },
    { code: 11, name: 'Tamanrasset', nameAr: 'تمنراست', lat: 22.8, lng: 5.5, image: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=200&h=150&fit=crop' },
    { code: 12, name: 'Tébessa', nameAr: 'تبسة', lat: 35.4, lng: 8.1, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&h=150&fit=crop' },
    { code: 13, name: 'Tlemcen', nameAr: 'تلمسان', lat: 35.3, lng: -0.6, image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=200&h=150&fit=crop' },
    { code: 14, name: 'Tiaret', nameAr: 'تيارت', lat: 35.4, lng: 1.3, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop' },
    { code: 15, name: 'Tizi Ouzou', nameAr: 'تيزي وزو', lat: 36.7, lng: 4.0, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=150&fit=crop' },
    { code: 16, name: 'Algiers', nameAr: 'الجزائر العاصمة', lat: 36.7, lng: 3.0, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop' },
    { code: 17, name: 'Djelfa', nameAr: 'الجلفة', lat: 34.7, lng: 3.2, image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=200&h=150&fit=crop' },
    { code: 18, name: 'Jijel', nameAr: 'جيجل', lat: 36.8, lng: 5.7, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=150&fit=crop' },
    { code: 19, name: 'Sétif', nameAr: 'سطيف', lat: 36.2, lng: 5.4, image: 'https://images.unsplash.com/photo-1489493585363-d69421e0edd3?w=200&h=150&fit=crop' },
    { code: 20, name: 'Saïda', nameAr: 'سعيدة', lat: 35.3, lng: 0.2, image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=200&h=150&fit=crop' },
    { code: 21, name: 'Skikda', nameAr: 'سكيكدة', lat: 36.9, lng: 6.9, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=150&fit=crop' },
    { code: 22, name: 'Sidi Bel Abbès', nameAr: 'سيدي بلعباس', lat: 35.2, lng: -0.6, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop' },
    { code: 23, name: 'Annaba', nameAr: 'عنابة', lat: 37.1, lng: 7.7, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=150&fit=crop' },
    { code: 24, name: 'Guelma', nameAr: 'قالمة', lat: 36.5, lng: 7.4, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=150&fit=crop' },
    { code: 25, name: 'Constantine', nameAr: 'قسنطينة', lat: 36.4, lng: 6.6, image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=200&h=150&fit=crop' },
    { code: 26, name: 'Médéa', nameAr: 'المدية', lat: 36.4, lng: 2.7, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop' },
    { code: 27, name: 'Mostaganem', nameAr: 'مستغانم', lat: 35.9, lng: 0.1, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=150&fit=crop' },
    { code: 28, name: "M'Sila", nameAr: 'المسيلة', lat: 35.7, lng: 4.5, image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=200&h=150&fit=crop' },
    { code: 29, name: 'Mascara', nameAr: 'معسكر', lat: 35.4, lng: 0.1, image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=200&h=150&fit=crop' },
    { code: 30, name: 'Ouargla', nameAr: 'ورقلة', lat: 31.9, lng: 5.3, image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=200&h=150&fit=crop' },
    { code: 31, name: 'Oran', nameAr: 'وهران', lat: 35.7, lng: -0.6, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=150&fit=crop' },
    { code: 32, name: 'El Bayadh', nameAr: 'البيض', lat: 33.8, lng: 1.0, image: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=200&h=150&fit=crop' },
    { code: 33, name: 'Illizi', nameAr: 'إليزي', lat: 26.1, lng: 8.5, image: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=200&h=150&fit=crop' },
    { code: 34, name: 'Bordj Bou Arréridj', nameAr: 'برج بوعريريج', lat: 36.1, lng: 4.7, image: 'https://images.unsplash.com/photo-1489493585363-d69421e0edd3?w=200&h=150&fit=crop' },
    { code: 35, name: 'Boumerdès', nameAr: 'بومرداس', lat: 36.5, lng: 3.5, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=150&fit=crop' },
    { code: 36, name: 'El Tarf', nameAr: 'الطارف', lat: 37.1, lng: 8.3, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=150&fit=crop' },
    { code: 37, name: 'Tindouf', nameAr: 'تندوف', lat: 27.7, lng: -8.0, image: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=200&h=150&fit=crop' },
    { code: 38, name: 'Tissemsilt', nameAr: 'تيسمسيلت', lat: 35.3, lng: 1.9, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop' },
    { code: 39, name: 'El Oued', nameAr: 'الوادي', lat: 33.4, lng: 6.1, image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=200&h=150&fit=crop' },
    { code: 40, name: 'Khenchela', nameAr: 'خنشلة', lat: 35.4, lng: 7.1, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&h=150&fit=crop' },
    { code: 41, name: 'Souk Ahras', nameAr: 'سوق أهراس', lat: 36.3, lng: 7.8, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&h=150&fit=crop' },
    { code: 42, name: 'Tipaza', nameAr: 'تيبازة', lat: 36.6, lng: 2.4, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=150&fit=crop' },
    { code: 43, name: 'Mila', nameAr: 'ميلة', lat: 36.5, lng: 6.3, image: 'https://images.unsplash.com/photo-1489493585363-d69421e0edd3?w=200&h=150&fit=crop' },
    { code: 44, name: 'Aïn Defla', nameAr: 'عين الدفلى', lat: 36.3, lng: 2.1, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop' },
    { code: 45, name: 'Naâma', nameAr: 'النعامة', lat: 33.3, lng: 0.3, image: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=200&h=150&fit=crop' },
    { code: 46, name: 'Aïn Témouchent', nameAr: 'عين تيموشنت', lat: 35.3, lng: -1.1, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=150&fit=crop' },
    { code: 47, name: 'Ghardaïa', nameAr: 'غرداية', lat: 32.5, lng: 3.8, image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=200&h=150&fit=crop' },
    { code: 48, name: 'Relizane', nameAr: 'غليزان', lat: 35.7, lng: 0.6, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop' },
    { code: 49, name: 'Timimoun', nameAr: 'تيميمون', lat: 29.2, lng: -0.3, image: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=200&h=150&fit=crop' },
    { code: 50, name: 'Bordj Badji Mokhtar', nameAr: 'برج باجي مختار', lat: 26.9, lng: 5.9, image: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=200&h=150&fit=crop' },
    { code: 51, name: 'Ouled Djellal', nameAr: 'أولاد جلال', lat: 33.6, lng: 4.2, image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=200&h=150&fit=crop' },
    { code: 52, name: 'Béni Abbès', nameAr: 'بني عباس', lat: 30.1, lng: -2.2, image: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=200&h=150&fit=crop' },
    { code: 53, name: 'Aïn Salah', nameAr: 'عين صالح', lat: 28.0, lng: 2.4, image: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=200&h=150&fit=crop' },
    { code: 54, name: 'Aïn Guezzam', nameAr: 'عين قزام', lat: 23.6, lng: 5.9, image: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=200&h=150&fit=crop' },
    { code: 55, name: 'Touggourt', nameAr: 'تقرت', lat: 32.6, lng: 6.0, image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=200&h=150&fit=crop' },
    { code: 56, name: 'Djanet', nameAr: 'جانت', lat: 24.2, lng: 9.5, image: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=200&h=150&fit=crop' },
    { code: 57, name: "El M'Ghair", nameAr: 'المغير', lat: 33.7, lng: 5.3, image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=200&h=150&fit=crop' },
    { code: 58, name: 'El Menia', nameAr: 'المنيعة', lat: 34.4, lng: 3.6, image: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=200&h=150&fit=crop' }
];

// Create circular marker icon
function createCircleMarkerIcon(L) {
    return L.divIcon({
        html: `<div class="circle-marker"></div>`,
        className: 'circle-marker-container',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12]
    });
}

function DestinationPage({ onClose, onSelectWilaya }) {
    const { language } = useLanguage();
    const t = (key) => getTranslation(language, key);
    
    const [selectedWilaya, setSelectedWilaya] = useState(null);
    const [showDetailPage, setShowDetailPage] = useState(false);
    const [detailWilaya, setDetailWilaya] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersRef = useRef({});

    // Filter wilayas based on search
    const filteredWilayas = wilayaData.filter(wilaya =>
        wilaya.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wilaya.code.toString().includes(searchQuery)
    );

    // Initialize map
    useEffect(() => {
        // Load Leaflet CSS
        if (!document.querySelector('link[href*="leaflet"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);
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

        loadLeaflet().then((L) => {
            if (mapRef.current && !mapInstanceRef.current) {
                // Create map
                const map = L.map(mapRef.current).setView([28.0, 3.0], 6);

                // Add OpenStreetMap tiles
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors',
                    maxZoom: 19
                }).addTo(map);

                // Set bounds to Algeria
                const algeriaBounds = L.latLngBounds(
                    L.latLng(19.36, -8.67),
                    L.latLng(37.09, 12.0)
                );
                map.setMaxBounds(algeriaBounds);
                map.setMinZoom(6);
                map.setMaxZoom(18);
                map.fitBounds(algeriaBounds);

                // Create circular icon
                const circleIcon = createCircleMarkerIcon(L);

                // Add markers
                wilayaData.forEach(wilaya => {
                    const marker = L.marker([wilaya.lat, wilaya.lng], {
                        title: wilaya.name,
                        icon: circleIcon
                    }).addTo(map);

                    marker.bindPopup(`
                        <div class="wilaya-popup">
                            <h3>${wilaya.name}</h3>
                            <p><strong>Code:</strong> ${wilaya.code}</p>
                        </div>
                    `);

                    marker.on('click', () => {
                        setSelectedWilaya(wilaya);
                    });

                    markersRef.current[wilaya.code] = marker;
                });

                mapInstanceRef.current = map;

                // Fix map size after render
                setTimeout(() => {
                    map.invalidateSize();
                }, 100);
            }
        });

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

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
            />
        );
    }

    return (
        <div className="destination-page">
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


