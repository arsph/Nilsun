# Modern Animation Libraries - jQuery Replacement

## 1. Install Framer Motion

```bash
cd /path/to/your/react/project
npm install framer-motion
```

## 2. Create Custom Hooks

### useSmoothScroll.ts
```typescript
import { useCallback } from 'react';

export const useSmoothScroll = () => {
  const scrollToElement = useCallback((elementId: string, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return { scrollToElement, scrollToTop };
};
```

### useActiveSection.ts
```typescript
import { useState, useEffect } from 'react';

export const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { 
          threshold: 0.3,
          rootMargin: '-50px 0px -50px 0px'
        }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
};
```

### useFocusManagement.ts
```typescript
import { useCallback } from 'react';

export const useFocusManagement = () => {
  const focusElement = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      // Make element focusable if it isn't
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1');
      }
      
      element.focus();
      
      // Scroll to element smoothly
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }, []);

  const trapFocus = useCallback((container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, []);

  return { focusElement, trapFocus };
};
```

## 3. Create Animation Components

### AnimatedSection.tsx
```typescript
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const AnimatedSection = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up'
}: AnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const directionMap = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0, 
        ...directionMap[direction]
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0 
      } : { 
        opacity: 0, 
        ...directionMap[direction]
      }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut" 
      }}
    >
      {children}
    </motion.div>
  );
};
```

### SmoothScrollLink.tsx
```typescript
import Link from 'next/link';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

interface SmoothScrollLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  offset?: number;
}

export const SmoothScrollLink = ({ 
  href, 
  children, 
  className = '',
  offset = 0 
}: SmoothScrollLinkProps) => {
  const { scrollToElement } = useSmoothScroll();

  const handleClick = (e: React.MouseEvent) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      scrollToElement(targetId, offset);
    }
  };

  return (
    <Link 
      href={href} 
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};
```

## 4. Update Your Components

### Header.tsx (Updated)
```typescript
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTranslations } from '@/lib/useTranslations';
import { useActiveSection } from '@/hooks/useActiveSection';
import { type Locale } from '@/lib/i18n';
import MobileMenu from './MobileMenu';
import { SmoothScrollLink } from './SmoothScrollLink';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const params = useParams();
  const locale = (params.locale as Locale) || 'fa';
  const t = useTranslations();
  
  // Track active section
  const activeSection = useActiveSection([
    'servicesSection',
    'projectsSection', 
    'aboutSection'
  ]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const getLinkClass = (sectionId: string) => {
    const baseClass = "text-text-secondary-dark hover:text-white transition";
    return activeSection === sectionId 
      ? "text-primary hover:text-white transition" 
      : baseClass;
  };

  return (
    <>
      <header className="flex justify-start items-center py-6">
        <div className="flex items-center space-x-4 space-x-reverse ml-8">
          <Link href={`/${locale}`}>
            <Image 
              src="/img/logo.png" 
              alt="NILSUN STUDIO Logo" 
              width={80}
              height={80}
              className="h-20 w-auto"
            />
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8 space-x-reverse mr-6">
          <SmoothScrollLink 
            href={`/${locale}`}
            className="text-primary hover:text-white transition"
          >
            {t.nav.home}
          </SmoothScrollLink>
          
          <SmoothScrollLink 
            href={`#servicesSection`}
            className={getLinkClass('servicesSection')}
          >
            {t.nav.services}
          </SmoothScrollLink>
          
          <SmoothScrollLink 
            href={`#projectsSection`}
            className={getLinkClass('projectsSection')}
          >
            {t.nav.projects}
          </SmoothScrollLink>
          
          <SmoothScrollLink 
            href={`#aboutSection`}
            className={getLinkClass('aboutSection')}
          >
            {t.nav.about}
          </SmoothScrollLink>
          
          <Link 
            className="text-text-secondary-dark hover:text-white transition" 
            href={`/${locale}/contact`}
          >
            {t.nav.contact}
          </Link>
          
          <Link href={locale === 'fa' ? '/en' : '/fa'} className="language-link">
            <Image 
              className="w-10 h-10 p-1 mr-8" 
              src="https://hatscripts.github.io/circle-flags/flags/gb.svg" 
              alt="UK Flag"
              width={40}
              height={40}
            />
          </Link>
        </nav>

        <div className="flex items-center space-x-4 space-x-reverse">
          <button 
            className="md:hidden hamburger-btn" 
            onClick={toggleMobileMenu}
            aria-label="Open menu"
          >
            <span className="material-icons text-white">menu</span>
          </button>
        </div>
      </header>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={closeMobileMenu}
        locale={locale}
        translations={t}
      />
    </>
  );
}
```

### ServicesSection.tsx (Updated)
```typescript
'use client';

import { AnimatedSection } from '@/components/AnimatedSection';
import Link from 'next/link';
import { useTranslations } from '@/lib/useTranslations';

export default function ServicesSection() {
  const t = useTranslations();

  const services = [
    {
      icon: 'web',
      title: t.services.items.webDesign.title,
      description: t.services.items.webDesign.description,
    },
    {
      icon: 'movie',
      title: t.services.items.video.title,
      description: t.services.items.video.description,
    },
    {
      icon: 'animation',
      title: t.services.items.animation.title,
      description: t.services.items.animation.description,
    },
    {
      icon: 'palette',
      title: t.services.items.graphic.title,
      description: t.services.items.graphic.description,
    },
  ];

  return (
    <div id="servicesSection" className="bg-background-dark py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <AnimatedSection 
            className="order-last md:order-first"
            direction="right"
          >
            <h2 className="section-title text-5xl font-bold text-white text-right">
              {t.services.title}
            </h2>
            <div className="w-20 h-1 bg-primary my-6 ml-auto"></div>
            <p className="text-text-secondary-dark mb-8 leading-relaxed text-right">
              {t.services.description}
            </p>
            <Link 
              className="text-secondary font-semibold border border-secondary px-4 py-2 rounded-sm text-sm hover:bg-secondary hover:text-white transition float-right" 
              href="/services"
            >
              {t.services.viewAll}
            </Link>
          </AnimatedSection>
          
          <div className="grid grid-cols-2 gap-8">
            {services.map((service, index) => (
              <AnimatedSection 
                key={index}
                className="service-card"
                delay={index * 0.1}
                direction="up"
              >
                <span className="material-icons service-icon">{service.icon}</span>
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-text-secondary-dark text-sm">{service.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

## 5. Add CSS Smooth Scrolling

Add to your `globals.css`:

```css
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--background-dark);
}

::-webkit-scrollbar-thumb {
  background: var(--primary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent);
}
```

## 6. Benefits of This Solution

✅ **No jQuery dependency** - Smaller bundle size  
✅ **Better performance** - Hardware accelerated animations  
✅ **TypeScript support** - Full type safety  
✅ **Accessibility** - Proper focus management  
✅ **Modern React patterns** - Hooks and components  
✅ **Smooth animations** - Framer Motion's optimized rendering  
✅ **Active section tracking** - Automatic navigation highlighting  
✅ **Responsive** - Works on all devices  

This solution completely replaces jQuery with modern, performant alternatives while maintaining all the original functionality!
