// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.remove('dark-mode');
    sunIcon.classList.add('active');
    moonIcon.classList.remove('active');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        sunIcon.classList.remove('active');
        moonIcon.classList.add('active');
    } else {
        localStorage.setItem('theme', 'light');
        sunIcon.classList.add('active');
        moonIcon.classList.remove('active');
    }
});

// Sidebar Navigation
const navTrigger = document.getElementById('navTrigger');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

function openSidebar() {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    navTrigger.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    navTrigger.classList.remove('active');
    document.body.style.overflow = '';
}

navTrigger.addEventListener('click', () => {
    if (sidebar.classList.contains('active')) {
        closeSidebar();
    } else {
        openSidebar();
    }
});

sidebarOverlay.addEventListener('click', closeSidebar);

// Close sidebar when clicking on a link
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeSidebar();
    });
});

// Close sidebar on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeSidebar();
    }
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: stop observing once visible
            // observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe section headers
const sectionHeaders = document.querySelectorAll('.section-header');
sectionHeaders.forEach(header => {
    observer.observe(header);
});

// Observe about text
const aboutText = document.querySelector('.about-text');
if (aboutText) {
    observer.observe(aboutText);
}

// Observe capability cards with stagger
const capabilityCards = document.querySelectorAll('.capability-card');
capabilityCards.forEach(card => {
    observer.observe(card);
});

// Observe spotlight panel
const spotlightPanel = document.querySelector('.spotlight-panel');
if (spotlightPanel) {
    observer.observe(spotlightPanel);
}

// Observe contact cards
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach(card => {
    observer.observe(card);
});

// Smooth scroll offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add parallax effect to hero background
let lastScroll = 0;
const heroBackground = document.querySelector('.gradient-mesh');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    if (heroBackground && scrolled < window.innerHeight) {
        const parallaxSpeed = 0.5;
        heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
    
    lastScroll = scrolled;
});

// Add cursor trail effect on capability cards (subtle)
capabilityCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Add similar effect to contact cards
contactCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Preload optimization - fade in body after load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Add loading state
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease-in';

// Enhance scroll indicator visibility
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = document.querySelector('.hero').offsetHeight;
        
        if (scrolled > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'all';
        }
    });
}

// Add active state to sidebar links based on scroll position
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.sidebar-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Initialize
updateActiveLink();

// Add smooth reveal for hero elements on page load
window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('.hero-logo, .hero-name, .hero-title, .hero-tagline, .hero-intro');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Performance optimization: debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-intensive functions
const debouncedUpdateActiveLink = debounce(updateActiveLink, 100);
window.removeEventListener('scroll', updateActiveLink);
window.addEventListener('scroll', debouncedUpdateActiveLink);

// Add Easter egg: konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Trigger special animation
        document.body.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
});

// Add CSS for rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Console message
console.log('%c彡𝔽𝕣𝕒𝕟𝕟𝕫𝕚 𝕃𝕦𝕩彡', 'font-size: 24px; font-weight: bold; color: #5a8fd3;');
console.log('%cLux Tech Empire - The Empire of Digital Brilliance', 'font-size: 14px; color: #7aa8e5;');
console.log('%cBuilt with precision, designed with vision.', 'font-size: 12px; font-style: italic; color: #8a90a0;');
