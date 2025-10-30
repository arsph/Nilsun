import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const BackToTop: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const smoothScrollToTop = (duration = 2000) => {
    const start = window.pageYOffset;
    const startTime = performance.now();

    const scrollStep = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smoother animation (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      window.scrollTo(0, start * (1 - easeOut));
      
      if (progress < 1) {
        window.requestAnimationFrame(scrollStep);
      }
    };
    window.requestAnimationFrame(scrollStep);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={() => smoothScrollToTop(2500)}
      className={`hidden md:block fixed bottom-6 z-20 w-12 h-12 rounded-full bg-primary text-white text-xl animate-bounce shadow-lg hover:bg-blue-700 transition-all duration-300 cursor-pointer ${
        isRTL ? 'left-6' : 'right-6'
      }`}
    >
      ↑
    </button>
  );
};

export default BackToTop;
