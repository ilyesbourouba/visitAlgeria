import React, { useState, useEffect } from 'react';
import './DestinationPage.css';
import WilayaDetailPage from './WilayaDetailPage';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import axios from 'axios';
import AlgeriaSVGMap from './AlgeriaSVGMap';

const API_BASE = import.meta.env.VITE_API_URL;

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

    // Handle wilaya selection from sidebar or SVG Map
    const handleWilayaClick = (wilaya) => {
        setSelectedWilaya(wilaya);
        
        // Ensure detail view opens
        if (onSelectWilaya) {
            onSelectWilaya(wilaya);
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
                    <AlgeriaSVGMap 
                        wilayas={wilayaData} 
                        selectedWilaya={selectedWilaya}
                        onWilayaClick={handleWilayaClick}
                    />
                </div>
            </div>
        </div>
    );
}

export default DestinationPage;
