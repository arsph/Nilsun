// Tailwind configuration
tailwind.config = window.tailwindConfig;

// Back to top button functionality
const btn = document.getElementById("backToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) btn.classList.remove("hidden");
  else btn.classList.add("hidden");
});

// Custom smooth scroll function with slower speed
function smoothScrollToTop(duration = 2000) {
  const start = window.pageYOffset;
  const startTime = performance.now();

  function scrollStep(timestamp) {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smoother animation (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    
    window.scrollTo(0, start * (1 - easeOut));
    
    if (progress < 1) {
      window.requestAnimationFrame(scrollStep);
    }
  }
  window.requestAnimationFrame(scrollStep);
}

btn.addEventListener("click", () => {
  smoothScrollToTop(2500); // 2.5 seconds to scroll to top
});

// Smooth scroll functionality for navigation links
$(document).ready(function() {
  $('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // Check if link is on the same page
      if (
        location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
        location.hostname === this.hostname
      ) {
        // Get the target element
        let target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        
        // If target exists, animate scroll
        if (target.length) {
          event.preventDefault();
          
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1200, function() {
            // Set focus to target for accessibility
            let $target = $(target);
            $target.focus();
            if (!$target.is(":focus")) {
              $target.attr('tabindex', '-1');
              $target.focus();
            }
          });
        }
      }
    });
});

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  const closeBtn = document.getElementById('closeBtn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    mobileMenu.classList.add('open');
    menuOverlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    menuOverlay.classList.remove('open');
    document.body.style.overflow = 'auto'; // Restore scrolling
  }

  // Open menu when hamburger is clicked
  hamburgerBtn.addEventListener('click', openMenu);

  // Close menu when close button is clicked
  closeBtn.addEventListener('click', closeMenu);

  // Close menu when overlay is clicked
  menuOverlay.addEventListener('click', closeMenu);

  // Close menu when mobile nav links are clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });
});

// Main page animations and video functionality
document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('heroVideo');
  const servicesSection = document.getElementById('servicesSection');
  const projectsSection = document.getElementById('projectsSection');
  let hasPlayedOnce = false;
  let servicesAnimated = false;
  let projectsAnimated = false;
  
  // Lazy load video function
  function lazyLoadVideo(videoElement) {
    const sources = videoElement.querySelectorAll('source[data-src]');
    sources.forEach(source => {
      source.src = source.dataset.src;
      source.removeAttribute('data-src');
    });
    videoElement.load(); // Reload the video with new sources
  }
  
  // Load video when it's about to be played
  function setupVideoLazyLoading() {
    const allVideos = document.querySelectorAll('video[preload="none"]');
    
    allVideos.forEach(video => {
      // Load video on hover (for project videos)
      video.addEventListener('mouseenter', function() {
        if (this.querySelector('source[data-src]')) {
          lazyLoadVideo(this);
        }
      });
      
      // Load video on click/play
      video.addEventListener('play', function() {
        if (this.querySelector('source[data-src]')) {
          lazyLoadVideo(this);
        }
      });
      
      // Load video when it comes into viewport (for hero video)
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target.querySelector('source[data-src]')) {
            lazyLoadVideo(entry.target);
            observer.unobserve(entry.target); // Stop observing once loaded
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(video);
    });
  }
  
  // Initialize lazy loading
  setupVideoLazyLoading();
  
  // Function to play video only once
  function playVideoOnce() {
    if (!hasPlayedOnce) {
      video.play().then(() => {
        hasPlayedOnce = true;
      }).catch(error => {
        console.log('Autoplay failed:', error);
      });
    }
  }
  
  // Play video on page load
  playVideoOnce();
  
  // Function to animate services section with staggered delays
  function animateServicesSection() {
    if (!servicesAnimated) {
      servicesAnimated = true;
      
      // Animate text first
      setTimeout(() => {
        document.getElementById('servicesText').style.opacity = '1';
      }, 0);
      
      // Animate service cards with 500ms delays
      const serviceIds = ['service1', 'service2', 'service3', 'service4'];
      serviceIds.forEach((id, index) => {
        setTimeout(() => {
          document.getElementById(id).style.opacity = '1';
        }, 900 + (index * 500)); // 500ms, 1000ms, 1500ms, 2000ms
      });
      
    }
  }
  
  // Function to animate projects section with staggered delays
  function animateProjectsSection() {
    if (!projectsAnimated) {
      projectsAnimated = true;
      
      // Animate header first
      setTimeout(() => {
        document.getElementById('projectsHeader').style.opacity = '1';
      }, 0);
      
      // Reveal carousel wrapper after header
      setTimeout(() => {
        const wrapper = document.getElementById('projectsCarouselWrapper');
        if (wrapper) wrapper.style.opacity = '1';
      }, 900);
      
    }
  }

  // Function to animate stats section: 4 items right-to-left with 500ms stagger
  let statsAnimated = false;
  function animateStatsSection() {
    if (statsAnimated) return;
    statsAnimated = true;
    const ids = ['stat1', 'stat2', 'stat3', 'stat4'];
    // Right-to-left for RTL: start from stat1 (rightmost) to stat4 (leftmost)
    ids.forEach((id, index) => {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.style.opacity = '1';
      }, index * 800);
    });
  }

  // Function to animate team section: header in 700ms, then all cards 700ms later
  let teamAnimated = false;
  function animateTeamSection() {
    if (teamAnimated) return;
    teamAnimated = true;
    const teamHeader = document.getElementById('teamHeader');
    const teamCards = Array.from(document.querySelectorAll('#teamSection .team-card'));
    if (teamHeader) {
      setTimeout(() => { teamHeader.style.opacity = '1'; }, 700);
    }
    if (teamCards.length) {
      setTimeout(() => {
        teamCards.forEach(card => { card.style.opacity = '1'; });
      }, 1400);
    }
  }

  // Function to animate about section with 900ms transitions
  function animateAboutSection() {
    const aboutImage = document.getElementById('aboutImage');
    const aboutText = document.getElementById('aboutText');
    if (aboutImage) {
      setTimeout(() => { aboutImage.style.opacity = '1'; }, 0);
    }
    if (aboutText) {
      setTimeout(() => { aboutText.style.opacity = '1'; }, 900);
    }
  }
  
  // Intersection Observer for video
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasPlayedOnce) {
        playVideoOnce();
      }
    });
  }, {
    threshold: 0.5
  });
  
  // Intersection Observer for services section
  const servicesObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateServicesSection();
      }
    });
  }, {
    threshold: 0.3
  });
  
  // Intersection Observer for projects section
  const projectsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateProjectsSection();
      }
    });
  }, {
    threshold: 0.3
  });

  // Intersection Observer for stats section
  const statsSection = document.getElementById('statsSection');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStatsSection();
      }
    });
  }, {
    threshold: 0.3
  });

  // Intersection Observer for team section
  const teamSection = document.getElementById('teamSection');
  const teamObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateTeamSection();
      }
    });
  }, {
    threshold: 0.3
  });

  // Intersection Observer for about section
  const aboutSection = document.getElementById('aboutSection');
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateAboutSection();
      }
    });
  }, {
    threshold: 0.3
  });
  
  videoObserver.observe(video);
  servicesObserver.observe(servicesSection);
  projectsObserver.observe(projectsSection);
  if (statsSection) {
    statsObserver.observe(statsSection);
  }
  if (teamSection) {
    teamObserver.observe(teamSection);
  }
  if (aboutSection) {
    aboutObserver.observe(aboutSection);
  }
});

// Video Modal Functions
function openVideoModal(videoSrc, title, description = '') {
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const modalTitle = document.getElementById('modalVideoTitle');
  const modalDescription = document.getElementById('modalVideoDescription');
  
  // Set video source
  modalVideo.src = videoSrc;
  
  // Set title and description
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  
  // Show modal
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  
  // Play video
  modalVideo.play();
}

// Enhanced video modal function for lazy loading
function openVideoModalLazy(videoSrc, title, description = '') {
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const modalTitle = document.getElementById('modalVideoTitle');
  const modalDescription = document.getElementById('modalVideoDescription');
  
  // Show modal first
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  
  // Set title and description
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  
  // Show loading state
  modalVideo.innerHTML = '<div class="flex items-center justify-center h-64 text-white">در حال بارگذاری...</div>';
  
  // Load and play video
  modalVideo.src = videoSrc;
  modalVideo.load();
  
  modalVideo.addEventListener('canplaythrough', function() {
    modalVideo.play();
  }, { once: true });
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  
  // Hide modal
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
  
  // Pause and reset video
  modalVideo.pause();
  modalVideo.currentTime = 0;
}

// Close modal when clicking outside the video
document.getElementById('videoModal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeVideoModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeVideoModal();
  }
});
