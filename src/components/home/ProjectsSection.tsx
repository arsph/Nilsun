import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ProjectsSection: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('all');

  const projects = t('projects.items', { returnObjects: true }) as Record<string, {
    title: string;
    description: string;
    category: string;
  }>;

  const tabs = ['all', 'video', 'animation', 'logo', 'graphic'] as const;

  const filteredProjects = Object.entries(projects).filter(([_, project]) => {
    if (activeTab === 'all') return true;
    return project.category === activeTab;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

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

        {/* Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-6 py-3 rounded-lg font-semibold text-sm md:text-base
                transition-all duration-300 relative overflow-hidden
                ${activeTab === tab
                  ? 'text-white shadow-lg shadow-primary/50'
                  : 'bg-background-dark text-text-secondary-dark hover:text-white hover:bg-background-dark/80'
                }
              `}
            >
              {activeTab === tab && (
                <motion.div
                  className="absolute inset-0 bg-primary rounded-lg"
                  layoutId="activeTab"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{t(`projects.tabs.${tab}`)}</span>
            </button>
          ))}
        </motion.div>
        
        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map(([key, project]) => {
              const projectTitle = project.title;
              return (
                <motion.div
                  key={key}
                  variants={itemVariants}
                  layout
                >
                  <Link 
                    to={`/project/${key}`}
                    className="bg-background-dark rounded-lg overflow-hidden group block h-full"
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={`/img/projects/${projectTitle}.jpg`}
                        alt={projectTitle}
                        className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-white">
                        {projectTitle}
                      </h3>
                      <p className="text-sm text-text-secondary-dark mt-2">
                        {project.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectsSection;
