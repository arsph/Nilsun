import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './i18n/i18n';

import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';

function App() {
  const { i18n, t } = useTranslation();
  
  // Set document direction and title based on language
  React.useEffect(() => {
    document.documentElement.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    document.title = t('title');
  }, [i18n.language, t]);

  return (
    <Router>
      <div className="dark bg-background-dark text-text-dark min-h-screen">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project/:projectKey" element={<ProjectDetail />} />
            <Route path="/en" element={<Home />} />
            <Route path="/en/contact" element={<Contact />} />
            <Route path="/en/project/:projectKey" element={<ProjectDetail />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;