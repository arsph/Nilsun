import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ProjectsSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div id="projectsSection" className="bg-card-dark py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          id="projectsHeader" 
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title text-4xl md:text-5xl font-bold text-white">
            {t('projects.title')}
          </h2>
          <div className="w-20 h-1 bg-primary my-6 mx-auto"></div>
        </motion.div>
        
        <motion.div 
          id="projectsCarouselWrapper"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          viewport={{ once: true }}
        >
          {Object.keys(t('projects.items', { returnObjects: true })).map((key) => {
            const projectTitle = t(`projects.items.${key}.title`);
            return (
            <Link 
              key={key} 
              to={`/project/${key}`}
              className="bg-background-dark rounded-lg overflow-hidden group block"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={`/img/projects/${projectTitle}.jpg`}
                  alt={projectTitle}
                  className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-white">
                  {projectTitle}
                </h3>
                <p className="text-sm text-text-secondary-dark mt-2">
                  {t(`projects.items.${key}.description`)}
                </p>
              </div>
            </Link>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsSection;
