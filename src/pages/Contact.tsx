import React from 'react';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import MapSection from '../components/contact/MapSection';
import BackToTop from '../components/ui/BackToTop';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'fa';

  return (
    <>
      {/* Contact Page Header */}
      <motion.section 
        className="py-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div id="contactHeader">
          <h1 className="hero-title text-5xl font-bold text-white leading-tight">
            <span className="text-secondary">{t('contact.title')}</span>
          </h1>
          <div className="w-20 h-1 bg-primary my-6 mx-auto"></div>
          <p className="text-text-secondary-dark leading-relaxed max-w-2xl mx-auto">
            {t('contact.subtitle')}
            <br />
            {t('contact.subtitle2')}
          </p>
        </div>
      </motion.section>

      {/* Contact Form and Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side (Right Side for RTL): ContactInfo and MapSection stacked vertically */}
            <div className={`space-y-8 ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
              <ContactInfo />
              <MapSection />
            </div>

            {/* Right Side (Left Side for RTL): ContactForm */}
            <div className={isRTL ? 'lg:order-1' : 'lg:order-2'}>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <BackToTop />
    </>
  );
};

export default Contact;
