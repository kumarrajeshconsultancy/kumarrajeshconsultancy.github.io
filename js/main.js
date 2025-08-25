/**
 * Main JavaScript file for Kumar Rajesh Consultancy
 * Handles navigation, animations, and interactive features
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

/**
 * Initialize all website functionality
 */
function initializeWebsite() {
    setupNavigation();
    setupScrollAnimations();
    setupSmoothScrolling();
    setupFormValidation();
    setupLoadingAnimations();
    setupResponsiveFeatures();
    setupPerformanceOptimizations();
}

/**
 * Navigation functionality
 */
function setupNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Throttled scroll handler for better performance
    let ticking = false;
    function throttledScrollHandler() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleNavbarScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    // Active nav link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', throttledScrollHandler);
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navbarCollapse.classList.contains('show')) {
            navbarToggler.click();
        }
    });
}

/**
 * Smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

/**
 * Scroll-triggered animations
 */
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Add staggered animation for card grids
                if (entry.target.classList.contains('course-card') || 
                    entry.target.classList.contains('consultancy-card')) {
                    const cards = entry.target.parentElement.children;
                    Array.from(cards).forEach((card, index) => {
                        if (card.classList.contains('course-card') || 
                            card.classList.contains('consultancy-card')) {
                            setTimeout(() => {
                                card.classList.add('animate');
                            }, index * 100);
                        }
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.course-card, .consultancy-card, .feature-item, .stat-item, .contact-info-item'
    );
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

/**
 * Form validation and enhancement
 */
function setupFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const formFields = contactForm.querySelectorAll('input, textarea, select');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    // Real-time validation
    formFields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => clearFieldError(field));
    });
    
    // Form submission handling
    contactForm.addEventListener('submit', handleFormSubmission);
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error styling
        field.classList.remove('error', 'success');
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = `${getFieldLabel(fieldName)} is required`;
        }
        
        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Phone validation
        if (fieldName === 'phone' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }
        
        // Apply styling and error message
        if (isValid) {
            field.classList.add('success');
            removeFieldError(field);
        } else {
            field.classList.add('error');
            showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    function clearFieldError(field) {
        field.classList.remove('error');
        removeFieldError(field);
    }
    
    function showFieldError(field, message) {
        removeFieldError(field);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error text-danger mt-1';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
    
    function removeFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    function getFieldLabel(fieldName) {
        const labels = {
            'name': 'Name',
            'email': 'Email Address',
            'phone': 'Phone Number',
            'service': 'Service',
            'message': 'Message'
        };
        return labels[fieldName] || fieldName;
    }
    
    function handleFormSubmission(e) {
        let isFormValid = true;
        
        // Validate all required fields
        const requiredFields = contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });
        
        // Consent checkbox validation
        const consentCheckbox = contactForm.querySelector('#consent');
        if (consentCheckbox && !consentCheckbox.checked) {
            isFormValid = false;
            showAlert('Please agree to the consent terms before submitting.', 'danger');
        }
        
        if (!isFormValid) {
            e.preventDefault();
            showAlert('Please correct the errors in the form before submitting.', 'danger');
            // Scroll to first error
            const firstError = contactForm.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return;
        }
        
        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        submitBtn.disabled = true;
        
        // The form will submit naturally to FormSubmit
        // Add a timeout to reset button state in case of issues
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 10000);
    }
}

/**
 * Loading animations for page elements
 */
function setupLoadingAnimations() {
    // Add loading class to main elements
    const mainElements = document.querySelectorAll('.hero-content, .course-card, .consultancy-card');
    mainElements.forEach((el, index) => {
        el.classList.add('loading');
        el.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Trigger animations after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            mainElements.forEach(el => {
                el.classList.remove('loading');
            });
        }, 500);
    });
}

/**
 * Responsive features and mobile optimizations
 */
function setupResponsiveFeatures() {
    // Handle viewport changes
    function handleViewportChange() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    handleViewportChange();
    window.addEventListener('resize', handleViewportChange);
    
    // Touch device optimizations
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Improve hover effects on touch devices
        const hoverElements = document.querySelectorAll('.course-card, .consultancy-card, .btn');
        hoverElements.forEach(el => {
            el.addEventListener('touchstart', function() {
                this.classList.add('touch-hover');
            });
            
            el.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-hover');
                }, 300);
            });
        });
    }
    
    // Keyboard navigation improvements
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

/**
 * Performance optimizations
 */
function setupPerformanceOptimizations() {
    // Lazy load images (if any are added later)
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
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
    
    // Preload critical resources
    const criticalResources = [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = resource;
        document.head.appendChild(link);
    });
}

/**
 * Utility Functions
 */

// Show alert messages
function showAlert(message, type = 'info') {
    const alertContainer = document.createElement('div');
    alertContainer.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertContainer.style.cssText = 'top: 100px; right: 20px; z-index: 1060; max-width: 400px;';
    alertContainer.innerHTML = `
        <strong>${type === 'danger' ? 'Error!' : type === 'success' ? 'Success!' : 'Info!'}</strong> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertContainer);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertContainer.parentNode) {
            alertContainer.remove();
        }
    }, 5000);
}

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get device type
function getDeviceType() {
    const width = window.innerWidth;
    if (width < 576) return 'mobile';
    if (width < 768) return 'mobile-large';
    if (width < 992) return 'tablet';
    if (width < 1200) return 'desktop-small';
    return 'desktop';
}

// Analytics and tracking (placeholder for future implementation)
function trackEvent(eventName, eventData = {}) {
    // This can be connected to Google Analytics or other tracking services
    console.log('Event tracked:', eventName, eventData);
    
    // Example: Send to Google Analytics if available
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // In production, this could send errors to a logging service
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}

// UPI Copy Function
function copyUPI() {
    const upiId = "KumarRajeshConsultancy@ybl";
    
    // Try to copy to clipboard
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(upiId).then(function() {
            showCopySuccess();
        }).catch(function() {
            fallbackCopy(upiId);
        });
    } else {
        fallbackCopy(upiId);
    }
}

function fallbackCopy(text) {
    // Fallback method for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess();
    } catch (err) {
        alert('UPI ID: ' + text + '\n\nPlease copy manually');
    } finally {
        document.body.removeChild(textArea);
    }
}

function showCopySuccess() {
    // Create and show success message
    const toast = document.createElement('div');
    toast.innerHTML = '<i class="fas fa-check me-2"></i>UPI ID copied: KumarRajeshConsultancy@ybl';
    toast.className = 'position-fixed bg-success text-white p-3 rounded shadow';
    toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; font-size: 14px;';
    
    document.body.appendChild(toast);
    
    // Animate in
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    requestAnimationFrame(() => {
        toast.style.transition = 'all 0.3s ease';
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Export functions for external use
window.KRCWebsite = {
    showAlert,
    debounce,
    throttle,
    isInViewport,
    getDeviceType,
    trackEvent,
    copyUPI
};
