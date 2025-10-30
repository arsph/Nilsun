import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ServicesSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  const services = [
    { key: 'web', icon: 'web' },
    { key: 'video', icon: 'movie' },
    { key: 'animation', icon: 'animation' },
    { key: 'graphic', icon: 'palette' }
  ];

  return (
    <div id="servicesSection" className="bg-background-dark py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            id="servicesText" 
            className={isRTL ? 'order-last md:order-first' : ''}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className={`section-title text-5xl font-bold text-white ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('services.title')}
            </h2>
            <div className={`w-20 h-1 bg-primary my-6 ${isRTL ? 'ml-auto' : ''}`}></div>
            <p className={`text-text-secondary-dark mb-8 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('services.description')}
            </p>
            
          </motion.div>
          
          <div className="grid grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.key}
                id={`service${index + 1}`}
                className="service-card"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.9 + (index * 0.5) }}
                viewport={{ once: true }}
              >
                <span className="material-icons service-icon">{service.icon}</span>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {t(`services.items.${service.key}.title`)}
                </h3>
                <p className="text-text-secondary-dark text-sm">
                  {t(`services.items.${service.key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
