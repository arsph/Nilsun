import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-card-dark py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-text-secondary-dark text-sm">
          {t('footer.designedBy')} <a 
            href="https://arsalanparham.com" 
            className="text-secondary hover:text-secondary/80" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Arsalan
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
