import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import algeriaPaths from './algeria_paths.json';

// Mapping between SimpleMaps ID (DZ01) and our Wilaya ID (1)
const getWilayaIdFromDZCode = (dzCode) => {
    return parseInt(dzCode.replace('DZ', ''), 10);
};

// Mapping from our Wilaya ID to SimpleMaps DZ Code
const getDZCodeFromWilayaId = (id) => {
    return `DZ${id.toString().padStart(2, '0')}`;
};

const AlgeriaSVGMap = ({ wilayas, selectedWilaya, onWilayaClick }) => {
    const { language } = useLanguage();
    const [hoveredWilaya, setHoveredWilaya] = useState(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const [selectedCenter, setSelectedCenter] = useState(null);
    
    // Pan and Zoom state
    const [viewBox, setViewBox] = useState({ x: 0, y: 0, w: 1000, h: 1000 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    
    const svgRef = useRef(null);
    const containerRef = useRef(null);

    // Initial centering/scaling based on container size
    useEffect(() => {
        if (containerRef.current) {
            setViewBox({ x: 0, y: 0, w: 1000, h: 1000 });
        }
    }, []);

    // Center on selected wilaya when it changes from the sidebar
    useEffect(() => {
        if (selectedWilaya && containerRef.current && svgRef.current) {
            // Find the path element to get its bounding box
            const pathEl = document.getElementById(`path-${getDZCodeFromWilayaId(selectedWilaya.code)}`);
            if (pathEl) {
                const bbox = pathEl.getBBox();
                
                // Calculate center for popup using bounding box
                setSelectedCenter({
                    x: bbox.x + bbox.width / 2,
                    y: bbox.y + bbox.height / 2
                });
                
                // Add some padding around the wilaya (e.g., 20%)
                const padding = 0;
                
                // Calculate new viewBox to center the wilaya
                let newW = bbox.width * 2;
                let newH = bbox.height * 2;
                
                // Maintain aspect ratio of the 1000x1000 square map roughly
                const size = Math.max(newW, newH, 200);
                
                setViewBox({ 
                    x: bbox.x + bbox.width/2 - size/2, 
                    y: bbox.y + bbox.height/2 - size/2, 
                    w: size, 
                    h: size 
                });
            }
        } else {
            setSelectedCenter(null);
        }
    }, [selectedWilaya]);

    // We attach the wheel event listener manually to set { passive: false } and prevent full page scroll warning
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e) => {
            e.preventDefault();
            
            if (!containerRef.current) return;
            
            const zoomSensitivity = 0.001;
            const delta = e.deltaY > 0 ? 1.1 : 0.9;
            
            setViewBox(prev => {
                let newW = prev.w * delta;
                let newH = prev.h * delta;
                
                // Prevent zooming out too much or too little
                if (newW > 2000) return prev;
                if (newW < 100) return prev;

                // Zoom towards center of current view
                let newX = prev.x + (prev.w - newW) / 2;
                let newY = prev.y + (prev.h - newH) / 2;
                
                return { x: newX, y: newY, w: newW, h: newH };
            });
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, []);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const dx = e.clientX - dragStart.x;
            const dy = e.clientY - dragStart.y;
            
            // Adjust pan sensitivity based on current zoom level
            const sensitivity = viewBox.w / containerRef.current.getBoundingClientRect().width;
            
            setViewBox(prev => ({
                ...prev,
                x: prev.x - dx * sensitivity,
                y: prev.y - dy * sensitivity
            }));
            
            setDragStart({ x: e.clientX, y: e.clientY });
        }
        
        if (hoveredWilaya && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setTooltipPos({
                x: e.clientX - rect.left + 15,
                y: e.clientY - rect.top + 15
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
        setHoveredWilaya(null);
    };

    const handlePathMouseEnter = (wilayaObj, e) => {
        setHoveredWilaya(wilayaObj);
    };

    const handlePathMouseLeave = () => {
        setHoveredWilaya(null);
    };
    
    const handleZoomIn = () => {
        setViewBox(prev => {
            const newW = prev.w * 0.7;
            const newH = prev.h * 0.7;
            if (newW < 100) return prev;
            return {
                x: prev.x + (prev.w - newW) / 2,
                y: prev.y + (prev.h - newH) / 2,
                w: newW,
                h: newH
            };
        });
    };

    const handleZoomOut = () => {
        setViewBox(prev => {
            const newW = prev.w * 1.5;
            const newH = prev.h * 1.5;
            if (newW > 2000) return prev;
            return {
                x: prev.x + (prev.w - newW) / 2,
                y: prev.y + (prev.h - newH) / 2,
                w: newW,
                h: newH
            };
        });
    };

    const handleResetZoom = () => {
        setViewBox({ x: 0, y: 0, w: 1000, h: 1000 });
    };

    // Calculate DOM position for the selected wilaya's static tooltip
    let selectedTooltipPos = null;
    if (selectedWilaya && selectedCenter && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const { width, height } = rect;
        const scale = Math.min(width / viewBox.w, height / viewBox.h);
        
        const actualW = viewBox.w * scale;
        const actualH = viewBox.h * scale;
        
        const offsetX = (width - actualW) / 2;
        const offsetY = (height - actualH) / 2;
        
        selectedTooltipPos = {
            x: offsetX + (selectedCenter.x - viewBox.x) * scale,
            y: offsetY + (selectedCenter.y - viewBox.y) * scale
        };
    }

    return (
        <div 
            className="algeria-svg-wrapper" 
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        >
            <div className="svg-zoom-controls">
                <button onClick={handleZoomIn} title="Zoom In">+</button>
                <button onClick={handleZoomOut} title="Zoom Out">−</button>
                <button onClick={handleResetZoom} title="Reset" style={{ fontSize: '12px' }}>⟳</button>
            </div>
            
            <svg 
                ref={svgRef}
                className="algeria-svg" 
                viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`} 
                preserveAspectRatio="xMidYMid meet"
                style={{ transition: isDragging ? 'none' : 'viewBox 0.3s cubic-bezier(0.2, 0, 0, 1)' }}
            >
                <g>
                    {Object.entries(algeriaPaths).map(([dzCode, pathData]) => {
                        const wilayaId = getWilayaIdFromDZCode(dzCode);
                        const wilayaObj = wilayas.find(w => w.code === wilayaId);
                        
                        const isSelected = selectedWilaya?.code === wilayaId;
                        const isHovered = hoveredWilaya?.code === wilayaId;
                        
                        let className = 'wilaya-path';
                        if (wilayaObj) className += ' has-data';
                        if (isSelected) className += ' selected';
                        
                        return (
                            <path
                                id={`path-${dzCode}`}
                                key={dzCode}
                                d={pathData}
                                className={className}
                                vectorEffect="non-scaling-stroke"
                                onMouseEnter={(e) => wilayaObj ? handlePathMouseEnter(wilayaObj, e) : null}
                                onMouseLeave={wilayaObj ? handlePathMouseLeave : null}
                                onClick={() => wilayaObj ? onWilayaClick(wilayaObj) : null}
                            />
                        );
                    })}
                </g>
            </svg>
            
            {hoveredWilaya && (!selectedWilaya || hoveredWilaya.code !== selectedWilaya.code) && (
                <div 
                    className="map-tooltip" 
                    style={{ 
                        left: `${tooltipPos.x}px`, 
                        top: `${tooltipPos.y}px` 
                    }}
                >
                    <div className="tooltip-num">{hoveredWilaya.code}</div>
                    <div className="tooltip-name">
                        {language === 'ar' ? hoveredWilaya.nameAr : hoveredWilaya.name}
                    </div>
                </div>
            )}
            
            {selectedWilaya && selectedTooltipPos && (
                <div 
                    className="map-tooltip selected-tooltip" 
                    style={{ 
                        left: `${selectedTooltipPos.x}px`, 
                        top: `${selectedTooltipPos.y}px`,
                        transform: 'translate(-50%, -100%)', // Center directly over the coordinate
                        marginTop: '-10px', // Extra offset to not cover the exact center point
                        opacity: hoveredWilaya && hoveredWilaya.code !== selectedWilaya.code ? 0.4 : 1, // Dim if hovering another
                        transition: 'opacity 0.2s ease, left 0.1s linear, top 0.1s linear'
                    }}
                >
                    <div className="tooltip-num">{selectedWilaya.code}</div>
                    <div className="tooltip-name">
                        {language === 'ar' ? selectedWilaya.nameAr : selectedWilaya.name}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AlgeriaSVGMap;
