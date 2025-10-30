import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import ProjectsSection from '../components/home/ProjectsSection';
import AboutSection from '../components/home/AboutSection';
import TeamSection from '../components/home/TeamSection';
import StatsSection from '../components/home/StatsSection';
import BackToTop from '../components/ui/BackToTop';

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <AboutSection />
      <TeamSection />
      <StatsSection />
      <BackToTop />
    </>
  );
};

export default Home;
