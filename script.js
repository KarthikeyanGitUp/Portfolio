// Global Variables
let isMenuOpen = false;
let isDarkMode = false;

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const themeIcon = document.getElementById('theme-icon');
const themeIconMobile = document.getElementById('theme-icon-mobile');
const scrollToTopBtn = document.getElementById('scroll-to-top');
const contactForm = document.getElementById('contact-form');

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeTyping();
    initializeAOS();
    initializeNavigation();
    initializeScrollEvents();
    initializeSkillsAnimation();
    initializeContactForm();
});

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    isDarkMode = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    updateTheme();
    
    themeToggle.addEventListener('click', toggleTheme);
    themeToggleMobile.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    updateTheme();
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

function updateTheme() {
    if (isDarkMode) {
        document.body.classList.add('dark');
        themeIcon.className = 'bx bx-sun';
        themeIconMobile.className = 'bx bx-sun';
    } else {
        document.body.classList.remove('dark');
        themeIcon.className = 'bx bx-moon';
        themeIconMobile.className = 'bx bx-moon';
    }
}

// Typing Animation
function initializeTyping() {
    const typed = new Typed('#typed-text', {
        strings: [
            'Mendix Developer',
            'Power Apps Specialist', 
            'Power BI Expert',
            'Low-Code Developer'
        ],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 1000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// AOS Animation
function initializeAOS() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });
}

// Navigation
function initializeNavigation() {
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMobileMenu();
            }
        });
    });
    
    // Active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Scroll Events
function initializeScrollEvents() {
    window.addEventListener('scroll', () => {
        handleScrollToTop();
        handleNavbarBackground();
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function handleScrollToTop() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}

function handleNavbarBackground() {
    const navbar = document.getElementById('navbar');
    if (window.pageYOffset > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        if (isDarkMode) {
            navbar.style.background = 'rgba(17, 24, 39, 0.95)';
        }
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.1)';
        if (isDarkMode) {
            navbar.style.background = 'rgba(0, 0, 0, 0.1)';
        }
    }
}

// Skills Animation
function initializeSkillsAnimation() {
    const observeSkills = () => {
        const skillBars = document.querySelectorAll('.skill-progress');
        const radialCharts = document.querySelectorAll('.radial-chart');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('skill-progress')) {
                        animateSkillBar(entry.target);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => observer.observe(bar));
        
        const radialObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateRadialChart(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        radialCharts.forEach(chart => radialObserver.observe(chart));
    };
    
    // Wait for DOM to be fully loaded
    setTimeout(observeSkills, 500);
}

function animateSkillBar(skillBar) {
    const width = skillBar.getAttribute('data-width');
    setTimeout(() => {
        skillBar.style.width = width + '%';
    }, 200);
}

function animateRadialChart(chart) {
    const percentage = chart.getAttribute('data-percentage');
    const circle = chart.querySelector('.progress-circle');
    const circumference = 2 * Math.PI * 60; // radius = 60
    const offset = circumference - (percentage / 100) * circumference;
    
    setTimeout(() => {
        circle.style.strokeDashoffset = offset;
    }, 200);
}

// Contact Form
function initializeContactForm() {
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    if (validateForm(data)) {
        sendMessage(data);
    }
}

function validateForm(data) {
    let isValid = true;
    
    // Validate name
    if (!data.name.trim()) {
        showFieldError('name', 'Name is required');
        isValid = false;
    }
    
    // Validate email
    if (!data.email.trim()) {
        showFieldError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (!data.message.trim()) {
        showFieldError('message', 'Message is required');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(field);
    
    switch(fieldName) {
        case 'name':
            if (!value) {
                showFieldError(fieldName, 'Name is required');
                return false;
            }
            break;
        case 'email':
            if (!value) {
                showFieldError(fieldName, 'Email is required');
                return false;
            } else if (!isValidEmail(value)) {
                showFieldError(fieldName, 'Please enter a valid email address');
                return false;
            }
            break;
        case 'message':
            if (!value) {
                showFieldError(fieldName, 'Message is required');
                return false;
            }
            break;
    }
    
    return true;
}

function showFieldError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}-error`);
    const fieldElement = document.getElementById(fieldName);
    
    if (errorElement) {
        errorElement.textContent = message;
    }
    
    if (fieldElement) {
        fieldElement.style.borderColor = '#ef4444';
    }
}

function clearFieldError(field) {
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    if (errorElement) {
        errorElement.textContent = '';
    }
    
    field.style.borderColor = '';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function sendMessage(data) {
    // Create WhatsApp message
    const whatsappMessage = `Hello! I'd like to get in touch.\
\
Name: ${data.name}\
Email: ${data.email}\
Subject: ${data.subject || 'Portfolio Contact'}\
\
Message:\
${data.message}`;
    
    const whatsappURL = `https://api.whatsapp.com/send?phone=916380538769&text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Show success message
    showSuccessMessage();
    
    // Reset form
    contactForm.reset();
}

function showSuccessMessage() {
    // Create and show success notification
    const successDiv = document.createElement('div');
    successDiv.className = 'success-notification';
    successDiv.innerHTML = `
        <div class="success-content">
            <i class="bx bx-check-circle"></i>
            <span>Message sent successfully! Opening WhatsApp...</span>
        </div>
    `;
    
    // Add styles
    successDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(successDiv);
    
    // Animate in
    setTimeout(() => {
        successDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        successDiv.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 300);
    }, 4000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
           this.style.opacity = '1';
        });
        
        // Set initial opacity
       // img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
    });
});

// Performance optimization: Lazy load images
const lazyImages = document.querySelectorAll('img[data-src]');
if (lazyImages.length) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Add resize event listener for responsive adjustments
window.addEventListener('resize', function() {
    // Close mobile menu on resize
    if (window.innerWidth > 768 && isMenuOpen) {
        toggleMobileMenu();
    }
});

// Preloader (optional)
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// Add gradient definition for radial charts
document.addEventListener('DOMContentLoaded', function() {
    const svgs = document.querySelectorAll('.radial-chart svg');
    svgs.forEach(svg => {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'gradient');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%');
        gradient.setAttribute('y2', '0%');
        
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', '#3b82f6');
        
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', '#8b5cf6');
        
        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svg.appendChild(defs);
    });
});

// Console welcome message
console.log(`
🚀 Welcome to Karthikeyan P M's Portfolio!
Built with modern HTML, CSS, and JavaScript
Features: Glassmorphism, Dark Mode, Responsive Design, and More!

Portfolio Developer: Karthikeyan P M
Contact: karthikeyanpmbe@gmail.com
`);

// Analytics tracking (optional)
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        trackEvent('Button', 'Click', e.target.textContent.trim());
    }
    
    if (e.target.classList.contains('social-link')) {
        trackEvent('Social', 'Click', e.target.getAttribute('href'));
    }
});

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            trackEvent('Section', 'View', entry.target.id);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section[id]').forEach(section => {
    sectionObserver.observe(section);
});