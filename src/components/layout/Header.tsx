import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MobileMenu from './MobileMenu';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const switchingToEn = i18n.language === 'fa';
    const newLang = switchingToEn ? 'en' : 'fa';
    i18n.changeLanguage(newLang);

    const path = location.pathname;
    const newPath = switchingToEn
      ? (path.startsWith('/en') ? path : `/en${path === '/' ? '' : path}`)
      : (path.startsWith('/en') ? path.replace(/^\/en/, '') || '/' : path);
    navigate(newPath, { replace: true });
  };

  const isRTL = i18n.language === 'fa';
  const isEnglishPage = location.pathname.startsWith('/en');

  return (
    <>
      <header className="flex justify-start items-center py-6">
        <div className={`flex items-center space-x-4 ${isRTL ? 'ml-8' : 'mr-8'}`}>
          <Link to={isEnglishPage ? '/en' : '/'}>
            <img 
              src="/img/logo.png" 
              alt="NILSUN STUDIO Logo" 
              className="h-20 w-auto"
            />
          </Link>
          <div className="text-2xl font-bold">
          </div>
        </div>
        
        <nav className={`hidden md:flex items-center space-x-8 ${isRTL ? 'mr-8' : 'ml-8'}`}>
          <Link 
            to={isEnglishPage ? '/en' : '/'} 
            className={`transition ${location.pathname === (isEnglishPage ? '/en' : '/') ? 'text-primary hover:text-white' : 'text-text-secondary-dark hover:text-white'}`}
          >
            {t('nav.home')}
          </Link>
          <a 
            href={`${isEnglishPage ? '/en' : ''}#servicesSection`}
            className="text-text-secondary-dark hover:text-white transition"
          >
            {t('nav.services')}
          </a>
          <a 
            href={`${isEnglishPage ? '/en' : ''}#projectsSection`}
            className="text-text-secondary-dark hover:text-white transition"
          >
            {t('nav.projects')}
          </a>
          <a 
            href={`${isEnglishPage ? '/en' : ''}#aboutSection`}
            className="text-text-secondary-dark hover:text-white transition"
          >
            {t('nav.about')}
          </a>
          <Link 
            to={isEnglishPage ? '/en/contact' : '/contact'}
            className={`transition ${location.pathname === (isEnglishPage ? '/en/contact' : '/contact') ? 'text-primary hover:text-white' : 'text-text-secondary-dark hover:text-white'}`}
          >
            {t('nav.contact')}
          </Link>
          <button 
            onClick={toggleLanguage}
            className="language-link"
          >
            <img 
              className={`w-10 h-10 p-1 cursor-pointer ${isRTL ? 'mr-8' : 'ml-8'}`}
              src={isRTL ? "/flags/gb.svg" : "/flags/ir.svg"}
              alt={isRTL ? "UK Flag" : "IR Flag"}
            />
          </button>
        </nav>

        <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
          <button 
            className="md:hidden hamburger-btn" 
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="material-icons text-white">menu</span>
          </button>
        </div>
      </header>

      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isEnglishPage={isEnglishPage}
        isRTL={isRTL}
      />
    </>
  );
};

export default Header;
