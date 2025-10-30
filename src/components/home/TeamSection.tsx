import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const TeamSection: React.FC = () => {
  const { t } = useTranslation();

  const teamRoles = [
    'marketing', 'webDesigner', 'graphicDesigner', 'videographer', 'photographer',
    'modeler3d', 'animator', 'editor', 'ideation', 'copywriter', 'screenwriter',
    'narrator', 'model'
  ];

  return (
    <div id="teamSection" className="bg-card-dark py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          id="teamHeader" 
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title text-4xl md:text-5xl font-bold text-white">
            {t('team.title')}
          </h2>
          <div className="w-20 h-1 bg-primary my-6 mx-auto"></div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.4 }}
          viewport={{ once: true }}
        >
          {teamRoles.map((role, index) => (
            <div key={role} className="team-card text-center group">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <img 
                  alt="Team member photo" 
                  className="w-full h-full rounded-full object-cover" 
                  src={`/img/team/team-member-${index + 1}.jpg`}
                />
              </div>
              <h3 className="text-white font-semibold">
                {t(`team.roles.${role}`)}
              </h3>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TeamSection;
