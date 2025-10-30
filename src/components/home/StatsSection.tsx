import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const StatsSection: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { id: 'stat1', icon: 'folder_open', number: '30+', label: 'stats.projects' },
    { id: 'stat2', icon: 'mood', number: '8.9', label: 'stats.satisfaction' },
    { id: 'stat3', icon: 'person_outline', number: '20+', label: 'stats.clients' },
    { id: 'stat4', icon: 'groups', number: '13', label: 'stats.teamMembers' }
  ];

  return (
    <div id="statsSection" className="bg-background-dark py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              id={stat.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.8 }}
              viewport={{ once: true }}
            >
              <span className="material-icons stats-icon">{stat.icon}</span>
              <p className="stats-number">{stat.number}</p>
              <p className="stats-label">{t(stat.label)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
