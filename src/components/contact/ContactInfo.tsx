import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ContactInfo: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  return (
    <motion.div 
      className="bg-card-dark rounded-lg p-8 shadow-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className={`text-2xl font-bold text-secondary mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
        {t('contact.info.title')}
      </h2>
      
      <div className="space-y-6">
        <div className={`flex items-start space-x-3`}>
          <div className="shrink-0">
            <span className="material-icons text-primary text-2xl">phone</span>
          </div>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h3 className="text-white font-semibold mb-1">
              {t('contact.info.phone')}
            </h3>
            <a 
              href="tel:+989135659211" 
              className="text-text-secondary-dark hover:text-primary transition-colors"
            >
              09135659211
            </a>
          </div>
        </div>
        
        <div className={`flex items-start space-x-3`}>
          <div className="shrink-0">
            <span className="material-icons text-primary text-2xl">email</span>
          </div>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h3 className="text-white font-semibold mb-1">
              {t('contact.info.email')}
            </h3>
            <a 
              href="mailto:info@nilsunstudio.ir" 
              className="text-text-secondary-dark hover:text-primary transition-colors"
            >
              info@nilsunstudio.ir
            </a>
          </div>
        </div>
        
        <div className={`flex items-start space-x-3`}>
          <div className="shrink-0">
            <span className="material-icons text-primary text-2xl">chat</span>
          </div>
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <h3 className="text-white font-semibold mb-1">
              {t('contact.info.messengers')}
            </h3>
            <div className={`flex space-x-4 mt-2`}>
              <a 
                href="https://t.me/nilsunstudio" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center space-x-2 text-text-secondary-dark hover:text-primary transition-colors`}
              >
                <i className="fab fa-telegram text-xl"></i>
                <span>{t('contact.info.telegram')}</span>
              </a>
              <a 
                href="https://wa.me/989135659211" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center space-x-2 text-text-secondary-dark hover:text-primary transition-colors`}
              >
                <i className="fab fa-whatsapp text-xl"></i>
                <span>{t('contact.info.whatsapp')}</span>
              </a>
              <a 
                href="https://instagram.com/nilsunstudio" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center space-x-2 text-text-secondary-dark hover:text-primary transition-colors`}
              >
                <i className="fab fa-instagram text-xl"></i>
                <span>{t('contact.info.instagram')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactInfo;
