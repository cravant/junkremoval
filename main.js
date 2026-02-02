// ===================================
// MOBILE NAVIGATION TOGGLE
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    // Toggle mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (mainNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mainNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            if (mainNav.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// ===================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (targetId === '#') {
            e.preventDefault();
            return;
        }
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            
            // Calculate offset for fixed header
            const headerHeight = document.querySelector('.site-header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// HEADER SCROLL EFFECT
// ===================================

let lastScroll = 0;
const header = document.querySelector('.site-header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.12)';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// FORM HANDLING
// ===================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form elements
        const submitButton = this.querySelector('.btn-submit');
        const btnText = submitButton.querySelector('.btn-text');
        const btnLoading = submitButton.querySelector('.btn-loading');
        const successMessage = document.querySelector('.form-success');
        const errorMessage = document.querySelector('.form-error');
        
        // Hide any previous messages
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        
        // Show loading state
        submitButton.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        
        try {
            // Get form data
            const formData = new FormData(this);
            
            // Send to Formspree (or handle differently)
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success - show success message
                successMessage.style.display = 'block';
                
                // Reset form
                this.reset();
                
                // Scroll to success message
                successMessage.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
                
                // Add animation to success message
                successMessage.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                // Error response from server
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Show error message
            console.error('Form submission error:', error);
            errorMessage.style.display = 'block';
            
            // Scroll to error message
            errorMessage.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
            
            // Add animation to error message
            errorMessage.style.animation = 'fadeInUp 0.5s ease-out';
        } finally {
            // Reset button state
            submitButton.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    });
}

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================

// Fade in elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements that should animate
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.step-card, .service-card, .benefit-item, .value-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

// ===================================
// PHONE NUMBER FORMATTING (OPTIONAL)
// ===================================

const phoneInput = document.getElementById('phone');

if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        // Format as (XXX) XXX-XXXX
        if (value.length >= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        } else if (value.length >= 3) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        }
        
        e.target.value = value;
    });
}

// ===================================
// DATE PICKER - SET MIN DATE TO TODAY
// ===================================

const dateInput = document.getElementById('preferred-date');

if (dateInput) {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// ===================================
// CALL TRACKING (OPTIONAL)
// ===================================

// Track phone number clicks for analytics
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

phoneLinks.forEach(link => {
    link.addEventListener('click', function() {
        // You can add analytics tracking here
        console.log('Phone link clicked:', this.href);
        
        // Example: Google Analytics event
        // gtag('event', 'click', {
        //     'event_category': 'Contact',
        //     'event_label': 'Phone Call'
        // });
    });
});

// ===================================
// CTA BUTTON TRACKING (OPTIONAL)
// ===================================

const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Track CTA button clicks
        console.log('CTA clicked:', this.textContent.trim());
        
        // Example: Google Analytics event
        // gtag('event', 'click', {
        //     'event_category': 'CTA',
        //     'event_label': this.textContent.trim()
        // });
    });
});

// ===================================
// LAZY LOADING FOR IMAGES (IF ADDED)
// ===================================

// This is a placeholder for future image optimization
// If you add real images to the site, uncomment this code

/*
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
*/

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const mainNav = document.querySelector('.main-nav');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        
        if (mainNav && mainNav.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Focus trap for mobile menu (accessibility)
const focusableElements = 'a[href], button:not([disabled]), textarea, input, select';

function trapFocus(element) {
    const focusable = element.querySelectorAll(focusableElements);
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    element.addEventListener('keydown', function(e) {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    });
}

// Apply focus trap to mobile menu
const mainNav = document.querySelector('.main-nav');
if (mainNav) {
    trapFocus(mainNav);
}

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c🚛 ClearPath Junk Removal', 'font-size: 24px; font-weight: bold; color: #D97706;');
console.log('%cWebsite successfully loaded!', 'font-size: 14px; color: #059669;');
console.log('%cFor business inquiries: info@clearpathhaul.com', 'font-size: 12px; color: #6B7280;');
