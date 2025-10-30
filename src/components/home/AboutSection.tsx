import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const AboutSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  return (
    <div id="aboutSection" className="bg-background-dark py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            id="aboutImage" 
            className="flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            <img 
              alt="About us image" 
              className="rounded-lg shadow-2xl w-full max-w-md object-cover transition-transform duration-500 ease-out hover:scale-105 hover:-translate-y-1 hover:-rotate-1"
              src="/img/aboutus.jpg"
            />
          </motion.div>
          
          <motion.div 
            id="aboutText"
            className={isRTL ? 'text-right' : 'text-left'}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title text-5xl font-bold text-white">
              {t('about.title')}
            </h2>
            <div className={`w-20 h-1 bg-primary my-6 ${isRTL ? 'mr-auto md:mr-0 ml-auto' : ''}`}></div>
            <p className="text-text-secondary-dark mb-8 leading-relaxed">
              {t('about.description')}
            </p>
            
            <h3 className="section-title text-3xl font-bold text-white">
              {t('about.founder.title')}
            </h3>
            <div className={`w-20 h-1 bg-primary my-6 ${isRTL ? 'mr-auto md:mr-0 ml-auto' : ''}`}></div>
            <p className="text-text-secondary-dark mb-8 leading-relaxed">
              {t('about.founder.description')}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
