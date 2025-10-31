import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const HeroSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className={isRTL ? 'order-last md:order-first' : ''}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className={`text-lg font-semibold text-primary tracking-widest mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('hero.subtitle')}
            </p>
            <h1 className={`hero-title text-5xl font-bold text-white leading-tight ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('hero.title')} <span className="text-secondary">{t('hero.titleHighlight')}</span>{t('hero.titleEnd')}
            </h1>
            <div className={`w-20 h-1 bg-primary my-6 ${isRTL ? 'ml-auto' : ''}`}></div>
            <p className={`text-text-secondary-dark leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('hero.description')}
            </p>
          </motion.div>
          
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-2 blur-xl rounded-lg"></div>
              <video 
                className="relative rounded-lg shadow-xl w-full h-full object-cover" 
                playsInline 
                autoPlay 
                muted
                >
                <source src="/video/main.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
          <motion.div 
            className={isRTL ? 'order-first md:order-last' : 'md:order-last'}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className={`text-text-secondary-dark leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('hero.description2')}
            </p>
          </motion.div>
          
          <motion.div 
            className={isRTL ? 'relative' : 'relative md:order-first'}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, rotate: -1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute -inset-2 blur-xl rounded-lg"></div>
            <img 
            alt="Hero image 2" 
            className="rounded-lg shadow-2xl max-w-lg object-cover transition-transform duration-500 ease-out hover:scale-105 hover:-translate-y-1 hover:-rotate-1 hover:animate-pulse"
            src="/img/hero-2.jpg"/>
          </motion.div>
          
        </div>
        
      </div>
    </section>
  );
};

export default HeroSection;
