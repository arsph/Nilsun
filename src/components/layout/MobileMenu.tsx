import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isEnglishPage: boolean;
  isRTL: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, isEnglishPage, isRTL }) => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fa' ? 'en' : 'fa';
    i18n.changeLanguage(newLang);
    
    // Update URL based on language
    const currentPath = window.location.pathname;
    if (newLang === 'en') {
      if (currentPath === '/') {
        window.history.pushState(null, '', '/en');
      } else if (currentPath === '/contact') {
        window.history.pushState(null, '', '/en/contact');
      }
    } else {
      if (currentPath === '/en') {
        window.history.pushState(null, '', '/');
      } else if (currentPath === '/en/contact') {
        window.history.pushState(null, '', '/contact');
      }
    }
  };

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div 
        className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />
      
      <nav className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={onClose}>
          <span className="material-icons text-white">close</span>
        </button>
        
        <ul className="mobile-nav-list">
          <li>
            <Link 
              to={isEnglishPage ? '/en' : '/'} 
              className="mobile-nav-link"
              onClick={onClose}
            >
              {t('nav.home')}
            </Link>
          </li>
          <li>
            <a 
              href={`${isEnglishPage ? '/en' : ''}#servicesSection`}
              className="text-text-secondary-dark"
              onClick={onClose}
            >
              {t('nav.services')}
            </a>
          </li>
          <li>
            <a 
              href={`${isEnglishPage ? '/en' : ''}#projectsSection`}
              className="text-text-secondary-dark"
              onClick={onClose}
            >
              {t('nav.projects')}
            </a>
          </li>
          <li>
            <a 
              href={`${isEnglishPage ? '/en' : ''}#aboutSection`}
              className="text-text-secondary-dark"
              onClick={onClose}
            >
              {t('nav.about')}
            </a>
          </li>
          <li>
            <Link 
              to={isEnglishPage ? '/en/contact' : '/contact'}
              className="text-text-secondary-dark"
              onClick={onClose}
            >
              {t('nav.contact')}
            </Link>
          </li>
          <li>
            <button 
              onClick={() => {
                toggleLanguage();
                onClose();
              }}
              className={`text-text-secondary-dark flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}
            >
              <img 
                className="w-6 h-6" 
                src={isRTL ? "https://hatscripts.github.io/circle-flags/flags/gb.svg" : "https://hatscripts.github.io/circle-flags/flags/ir.svg"}
                alt={isRTL ? "UK Flag" : "IR Flag"}
              />
              <span>{isRTL ? 'English' : 'فارسی'}</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MobileMenu;
