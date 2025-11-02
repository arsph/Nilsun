/**
 * Smoothly scrolls to an element by its ID
 * @param elementId - The ID of the element to scroll to
 * @param duration - Duration of the scroll animation in milliseconds (default: 1200)
 */
export const smoothScrollToElement = (elementId: string, duration: number = 1200): void => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.warn(`Element with ID "${elementId}" not found`);
    return;
  }

  const start = window.pageYOffset || document.documentElement.scrollTop;
  const target = element.getBoundingClientRect().top + window.pageYOffset;
  const distance = target - start;
  const startTime = performance.now();

  const scrollStep = (timestamp: number) => {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smoother animation (ease-in-out)
    const easeInOut = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    
    window.scrollTo(0, start + distance * easeInOut);
    
    if (progress < 1) {
      window.requestAnimationFrame(scrollStep);
    }
  };

  window.requestAnimationFrame(scrollStep);
};

/**
 * Navigates to home page and then scrolls to a section
 * @param navigate - React Router navigate function
 * @param sectionId - The ID of the section to scroll to
 * @param isEnglishPage - Whether we're on an English page
 * @param duration - Duration of the scroll animation in milliseconds (default: 1200)
 */
export const navigateAndScroll = (
  navigate: (path: string, options?: { replace?: boolean }) => void,
  sectionId: string,
  isEnglishPage: boolean,
  duration: number = 1200
): void => {
  const homePath = isEnglishPage ? '/en' : '/';
  const currentPath = window.location.pathname;
  
  // If already on home page, just scroll
  if (currentPath === homePath || currentPath === '/') {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      smoothScrollToElement(sectionId, duration);
    }, 100);
  } else {
    // Navigate to home page first
    navigate(homePath);
    
    // Wait for navigation and DOM update, then scroll
    // Use a retry mechanism to ensure element exists
    let attempts = 0;
    const maxAttempts = 20; // 2 seconds max wait time
    
    const tryScroll = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        smoothScrollToElement(sectionId, duration);
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(tryScroll, 100);
      }
    };
    
    // Start trying after a short delay
    setTimeout(tryScroll, 200);
  }
};

