import React, { useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ProjectDetail: React.FC = () => {
  const { projectKey } = useParams<{ projectKey: string }>();
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!projectKey) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl text-white mb-4">Project not found</h2>
        <Link to="/" className="text-primary hover:underline">Return to home</Link>
      </div>
    );
  }

  const projectTitle = t(`projects.items.${projectKey}.title`);
  const projectDescription = t(`projects.items.${projectKey}.description`);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Error playing video:', error);
      });
    }
  };

  return (
    <div className="min-h-screen bg-background-dark py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-text-secondary-dark hover:text-primary transition-colors mb-8"
        >
          <span className="material-icons mr-2">arrow_back</span>
          Back to projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {projectTitle}
          </h1>
          
          <div className="w-20 h-1 bg-primary mb-8"></div>

          <div className="relative bg-background-dark rounded-lg overflow-hidden mb-8">
            <video
              ref={videoRef}
              className="w-full h-auto"
              controls
              playsInline
              preload="metadata"
              poster={`/img/projects/${projectTitle}.jpg`}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            >
              <source src={`/video/${projectTitle}.mp4`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {!isPlaying && (
              <div 
                className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer z-10"
                onClick={handlePlay}
              >
                <span className="material-icons play-button text-6xl">
                  play_circle_filled
                </span>
              </div>
            )}
          </div>

          <div className="bg-card-dark rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              {t('projects.about') || 'About this project'}
            </h2>
            <p className="text-text-secondary-dark leading-relaxed text-lg">
              {projectDescription}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;

