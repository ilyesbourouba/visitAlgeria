import { useState, useRef } from 'react';

export const useSwipe = (onSwipeLeft, onSwipeRight, threshold = 50) => {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swiped left
        onSwipeLeft && onSwipeLeft();
      } else {
        // Swiped right
        onSwipeRight && onSwipeRight();
      }
    }
  };

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
  };
};

export default useSwipe;
