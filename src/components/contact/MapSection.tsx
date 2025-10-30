import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const MapSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  return (
    <motion.div 
      className="bg-card-dark rounded-lg p-8 shadow-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <h2 className={`text-2xl font-bold text-secondary mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
        {t('contact.info.location')}
      </h2>
      
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.8280303808788!2d51.38974841525882!3d35.68919738019432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00a7d9df0e19%3A0x967b085827517078!2sTehran%2C%20Iran!5e0!3m2!1sen!2sus!4v1635789123456!5m2!1sen!2sus"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Nilsun Studio Location"
        />
      </div>
    </motion.div>
  );
};

export default MapSection;
