import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-background-dark opacity-95 z-10"></div>
      <div className="absolute inset-0"></div>
      
      {/* Header in container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <Header />
      </div>
      
      {/* Main content - full width */}
      <main className="relative z-20">
        {children}
      </main>
      
      {/* Footer - full width */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
