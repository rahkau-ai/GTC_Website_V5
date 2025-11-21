// Gene Therapy Consultancy - Interactive JavaScript
// Modern, smooth interactions and animations

document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Enhanced navbar scroll effect
    let ticking = false;
    
    function updateNavbar() {
        const scrolled = window.pageYOffset;
        
        if (scrolled > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Add subtle parallax effect to navbar
        const parallaxOffset = scrolled * 0.1;
        navbar.style.transform = `translateY(${Math.min(parallaxOffset, 10)}px)`;
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        const isActive = navMenu.classList.toggle('active');
        
        // Update ARIA attribute
        navToggle.setAttribute('aria-expanded', isActive);
        
        // Animate hamburger menu
        const spans = navToggle.querySelectorAll('span');
        isActive 
            ? animateHamburgerToX(spans)
            : animateXToHamburger(spans);
    });
    
    function animateHamburgerToX(spans) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    }
    
    function animateXToHamburger(spans) {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
    
    // Enhanced navigation functionality
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Set active navigation state based on current page
    function setActiveNavigation() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage || 
                (currentPage === '' && linkHref === 'index.html') ||
                (currentPage === 'index.html' && linkHref === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    // Animate navigation links on load
    function animateNavigation() {
        navLinks.forEach((link, index) => {
            setTimeout(() => {
                link.classList.add('animate');
            }, index * 100);
        });
    }
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            animateXToHamburger(navToggle.querySelectorAll('span'));
        });
    });
    
    // Initialize navigation enhancements
    setActiveNavigation();
    animateNavigation();
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navbar.contains(event.target)) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            animateXToHamburger(navToggle.querySelectorAll('span'));
        }
    });
    
    // Smooth scrolling for anchor links (but exclude recommendation-link which gets dynamic href)
    document.querySelectorAll('a[href^="#"]:not(#recommendation-link)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Enhanced scroll animations with multiple triggers
    const observeOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Main scroll animation observer
    const scrollAnimationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add appropriate animation class based on element type
                if (element.classList.contains('scroll-animate')) {
                    element.classList.add('animate');
                } else if (element.classList.contains('scroll-animate-left')) {
                    element.classList.add('animate');
                } else if (element.classList.contains('scroll-animate-right')) {
                    element.classList.add('animate');
                } else if (element.classList.contains('scroll-animate-scale')) {
                    element.classList.add('animate');
                } else if (element.classList.contains('scroll-fade-in')) {
                    element.classList.add('animate');
                } else if (element.classList.contains('scroll-slide-up')) {
                    element.classList.add('animate');
                } else if (element.classList.contains('scroll-slide-down')) {
                    element.classList.add('animate');
                } else if (element.classList.contains('scroll-rotate-in')) {
                    element.classList.add('animate');
                } else if (element.classList.contains('scroll-bounce-in')) {
                    element.classList.add('animate');
                } else if (element.classList.contains('section-reveal')) {
                    element.classList.add('animate');
                } else if (element.classList.contains('card-reveal')) {
                    element.classList.add('animate');
                } else if (element.classList.contains('text-reveal')) {
                    element.classList.add('animate');
                } else if (element.classList.contains('counter-number')) {
                    element.classList.add('animate');
                } else if (element.classList.contains('image-reveal')) {
                    element.classList.add('animate');
                } else if (element.classList.contains('animated-list')) {
                    element.classList.add('animate');
                } else if (element.classList.contains('progress-fill')) {
                    element.classList.add('animate');
                } else {
                    // Default fade-in-up animation for cards and other elements
                    element.classList.add('fade-in-up');
                }
                
                // Disconnect observer for performance (one-time animation)
                scrollAnimationObserver.unobserve(element);
            }
        });
    }, observeOptions);
    
    // Observe all elements with animation classes
    const animatableSelectors = [
        '.scroll-animate', '.scroll-animate-left', '.scroll-animate-right', '.scroll-animate-scale',
        '.scroll-fade-in', '.scroll-slide-up', '.scroll-slide-down', '.scroll-rotate-in', '.scroll-bounce-in',
        '.section-reveal', '.card-reveal', '.text-reveal', '.counter-number', '.image-reveal',
        '.animated-list', '.progress-fill',
        '.feature-card', '.service-card', '.team-member', '.stat-item'
    ];
    
    animatableSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            scrollAnimationObserver.observe(el);
        });
    });
    
    // Counter animation for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = counter.innerText;
            const numTarget = parseFloat(target.replace(/[^0-9.]/g, ''));
            const suffix = target.replace(/[0-9.]/g, '');
            
            if (!isNaN(numTarget)) {
                let current = 0;
                const increment = numTarget / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numTarget) {
                        current = numTarget;
                        clearInterval(timer);
                    }
                    counter.innerText = Math.floor(current) + suffix;
                }, 30);
            }
        });
    }
    
    // Animate counters when stats section is visible
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.disconnect();
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    // Enhanced form handling with animations
    const contactForm = document.getElementById('gtc-contact-form');
    if (contactForm) {
        // Add form field animations
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach((group, index) => {
            group.style.animationDelay = `${index * 0.1}s`;
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
        
        // Enhanced form field interactions
        const formFields = contactForm.querySelectorAll('input, select, textarea');
        formFields.forEach(field => {
            field.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
                this.classList.add('focused');
            });
            
            field.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                this.classList.remove('focused');
                
                // Validate field on blur
                if (this.value.trim()) {
                    this.classList.add('valid');
                    this.classList.remove('invalid');
                } else if (this.hasAttribute('required')) {
                    this.classList.add('invalid');
                    this.classList.remove('valid');
                }
            });
        });
    }
    
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSubmission(this);
        });
    }
    
    async function handleFormSubmission(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Add loading class and animation
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = 'Processing...';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with actual API call)
            await simulateFormSubmission(new FormData(form));
            
            // Remove loading class
            submitBtn.classList.remove('loading');
            
            // Show success animation
            const successDiv = document.createElement('div');
            successDiv.className = 'form-success';
            successDiv.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <div style="font-size: 3rem; color: #28a745; margin-bottom: 1rem;">✓</div>
                    <h3>Thank you for your inquiry!</h3>
                    <p>We'll get back to you within 24 hours to discuss your AI strategy needs.</p>
                </div>
            `;
            
            form.parentNode.insertBefore(successDiv, form);
            form.style.display = 'none';
            
            // Scroll to success message
            successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Track form submission (replace with actual analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'Contact',
                    'event_label': 'AI Strategy Call Request'
                });
            }
            
        } catch (error) {
            // Error handling - form submission failed
            
            // Remove loading class
            submitBtn.classList.remove('loading');
            
            // Show error animation
            submitBtn.style.background = '#dc3545';
            submitBtn.innerHTML = 'Error - Try Again';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    }
    
    async function handleNewsletterSubmission(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<div class="loading"></div> Subscribing...';
        submitBtn.disabled = true;
        
        try {
            // Simulate newsletter submission (replace with actual API call)
            await simulateFormSubmission(new FormData(form));
            
            // Show success message
            submitBtn.innerHTML = '✓ Subscribed!';
            submitBtn.style.background = '#28a745';
            
            // Reset form
            form.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
            
        } catch (error) {
            // Error handling - newsletter subscription failed
            alert('There was an error subscribing. Please try again.');
            
            // Restore button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }
    
    // Simulate form submission (replace with actual implementation)
    function simulateFormSubmission(formData) {
        return new Promise((resolve) => {
            console.log('Simulating form submission with data:', Object.fromEntries(formData));
            setTimeout(() => {
                // Form data would be sent to server here
                resolve();
            }, 2000);
        });
    }
    
    // Smooth hover effects for cards
    document.querySelectorAll('.feature-card, .service-card, .team-member').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Button ripple effect
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Parallax effect for hero sections (subtle)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroes = document.querySelectorAll('.hero');
        
        heroes.forEach(hero => {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    });
    
    // Auto-hide mobile menu on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            animateXToHamburger(navToggle.querySelectorAll('span'));
        }
    });
    
    // Progressive enhancement for JavaScript disabled users
    document.documentElement.classList.add('js-enabled');
    
    // Add loading complete class
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Preload critical images
    function preloadImages() {
        const imageUrls = [
            // Add any critical images here
        ];
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
    
    preloadImages();
    
    // Enhanced accessibility
    document.addEventListener('keydown', function(e) {
        // Skip to main content on Tab press from start of page
        if (e.key === 'Tab' && e.target === document.body) {
            const mainContent = document.querySelector('main') || document.querySelector('.hero');
            if (mainContent) {
                mainContent.focus();
            }
        }
        
        // Close mobile menu on Escape
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            animateXToHamburger(navToggle.querySelectorAll('span'));
            navToggle.focus();
        }
    });
    
    // Form validation enhancements
    document.querySelectorAll('input[required], select[required], textarea[required]').forEach(field => {
        field.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.classList.add('error');
            
            // Custom validation messages
            const customMessages = {
                'valueMissing': 'This field is required',
                'typeMismatch': 'Please enter a valid value',
                'patternMismatch': 'Please match the requested format'
            };
            
            const validity = this.validity;
            let message = this.validationMessage;
            
            for (let error in customMessages) {
                if (validity[error]) {
                    message = customMessages[error];
                    break;
                }
            }
            
            this.setCustomValidity(message);
        });
        
        field.addEventListener('input', function() {
            if (this.classList.contains('error') && this.validity.valid) {
                this.classList.remove('error');
                this.setCustomValidity('');
            }
        });
    });
    
    // Initialize premium animations
    initializePremiumAnimations();
    
    // Page transition effects
    initializePageTransitions();
    
    // Tooltip initialization
    initializeTooltips();
    
    // Floating elements
    initializeFloatingElements();
    
    // Website loaded successfully
});

// ===== GLOBAL ERROR HANDLING =====

// Catch all JavaScript errors
window.addEventListener('error', function(event) {
    // Log error details (in production, send to error tracking service)
    const errorInfo = {
        message: event.message,
        source: event.filename,
        line: event.lineno,
        column: event.colno,
        error: event.error
    };
    
    // In production, send to error tracking service like Sentry
    // Example: Sentry.captureException(event.error);
    
    // Prevent default browser error handling
    // event.preventDefault();
    
    // Optional: Show user-friendly message (only for critical errors)
    // showErrorMessage('Something went wrong. Please refresh the page.');
});

// Catch unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
    // Log promise rejection
    const errorInfo = {
        reason: event.reason,
        promise: event.promise
    };
    
    // In production, send to error tracking service
    // Example: Sentry.captureException(event.reason);
    
    // Prevent default browser handling
    // event.preventDefault();
});

// Optional: User-friendly error message display
function showErrorMessage(message) {
    // Create error toast/notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-toast';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #dc3545;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(errorDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        errorDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => errorDiv.remove(), 300);
    }, 5000);
}

// Premium animation functions
function initializePremiumAnimations() {
    // Add floating animation to specific elements
    document.querySelectorAll('.feature-icon, .member-image').forEach(el => {
        el.classList.add('floating');
    });
    
    // Add glow effects to interactive elements
    document.querySelectorAll('.btn-primary, .service-number').forEach(el => {
        el.classList.add('glow-on-hover');
    });
    
    // Add pulse animation to CTA buttons
    document.querySelectorAll('.btn-large').forEach(el => {
        el.classList.add('cta-pulse');
    });
    
    // Initialize progress bars
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const fill = bar.querySelector('.progress-fill');
        if (fill) {
            const percentage = fill.getAttribute('data-percentage') || '75';
            fill.style.width = percentage + '%';
        }
    });
}

function initializePageTransitions() {
    // Add page transition overlay
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'page-transition';
    document.body.appendChild(transitionOverlay);
    
    // Handle internal navigation with transitions
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        
        // Handle cross-page hash links (e.g., about.html#founder, services.html#development-category-overview)
        if (href && href.includes('.html#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Show transition
                transitionOverlay.classList.add('active');
                
                // Navigate after animation
                setTimeout(() => {
                    window.location.href = href;
                }, 250);
            });
        }
        // Only add transitions to internal pages (but exclude hash-only links, external links, mailto, tel)
        else if (href && !href.startsWith('#') && !href.startsWith('http') && !href.includes('mailto:') && !href.includes('tel:') && !href.includes('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Show transition
                transitionOverlay.classList.add('active');
                
                // Navigate after animation
                setTimeout(() => {
                    window.location.href = href;
                }, 250);
            });
        }
    });
    
    // Hide transition overlay on page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            transitionOverlay.classList.remove('active');
        }, 100);
    });
}

function initializeTooltips() {
    // Add tooltips to elements with data-tooltip attribute
    document.querySelectorAll('[data-tooltip]').forEach(el => {
        el.classList.add('tooltip');
    });
    
    // Add interactive tooltips for service numbers
    document.querySelectorAll('.service-number').forEach(num => {
        num.setAttribute('data-tooltip', 'Service ' + num.textContent);
        num.classList.add('tooltip');
    });
}

function initializeFloatingElements() {
    // Add random delays to floating animations for more natural movement
    document.querySelectorAll('.floating').forEach((el, index) => {
        el.style.animationDelay = (Math.random() * 3) + 's';
        el.style.animationDuration = (5 + Math.random() * 2) + 's';
    });
}

// Enhanced micro-interactions
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.interactive-icon, .social-icon').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Statistics shine effect trigger
    document.querySelectorAll('.stat-number').forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            this.classList.add('animate-shine');
            setTimeout(() => {
                this.classList.remove('animate-shine');
            }, 1000);
        });
    });
    
    // Initialize Service Selection
    initServiceSelection();
    
    // Handle cross-page anchor links (like services.html#vector-design)
    handleCrossPageAnchors();
});

// Service Selection Functionality
function initServiceSelection() {
    const audienceSelect = document.getElementById('audience-select');
    const interestSelect = document.getElementById('interest-select');
    const serviceSelect = document.getElementById('service-select');
    const serviceRecommendation = document.getElementById('service-recommendation');
    const recommendationTitle = document.getElementById('recommendation-title');
    const recommendationDescription = document.getElementById('recommendation-description');
    const recommendationLink = document.getElementById('recommendation-link');

    if (!audienceSelect || !interestSelect || !serviceSelect) return;

    // Role-specific interest options
    const interestOptions = {
        academic: [
            { value: 'finding-technologies', text: 'Finding the Right Technologies & Solutions' },
            { value: 'advancing-programs', text: 'Advancing My Research Program' },
            { value: 'securing-funding', text: 'Securing Grant Funding & Support' },
            { value: 'grant-evaluation', text: 'Grant Portfolio & Foundation Management' },
            { value: 'preparing-translation', text: 'Preparing for Translation' },
            { value: 'building-capabilities', text: 'Building Lab Capabilities' },
            { value: 'ai-transformation', text: 'AI Transformation Services' }
        ],
        biotech: [
            { value: 'advancing-programs', text: 'Advancing Drug Development Programs' },
            { value: 'securing-funding', text: 'Securing Non-Dilutive Funding' },
            { value: 'scaling-operations', text: 'Scaling Manufacturing & Operations' },
            { value: 'ai-transformation', text: 'AI Transformation Services' }
        ],
        technology: [
            { value: 'product-market-fit', text: 'Finding Product-Market Fit' },
            { value: 'kol-engagement', text: 'Identifying & Engaging Key Opinion Leaders' },
            { value: 'market-adoption', text: 'Building Market Adoption Strategy' },
            { value: 'customer-acquisition', text: 'Scaling Customer Acquisition' },
            { value: 'ai-transformation', text: 'AI Transformation Services' }
        ],
        service: [
            { value: 'expanding-capabilities', text: 'Expanding Service Capabilities' },
            { value: 'client-acquisition', text: 'Acquiring New Clients & Markets' },
            { value: 'ai-transformation', text: 'AI Transformation Services' }
        ],
        foundation: [
            { value: 'grant-evaluation', text: 'Grant Portfolio & Foundation Management' },
            { value: 'ai-transformation', text: 'AI Transformation Services' }
        ],
        investor: [
            { value: 'evaluating-opportunities', text: 'Evaluating Investment Opportunities' }
        ]
    };

    const serviceOptions = {
        academic: {
            'finding-technologies': [
                { value: 'technology-comparison', text: 'Vector Platform Comparative Analysis', title: 'AAV vs Lentiviral vs Alternative Vector Technology Assessment', description: 'Expert comparative analysis of gene delivery platforms to help you select the optimal technology for your specific research goals and lab capabilities.', link: 'services.html#technology-validation' },
                { value: 'vendor-evaluation', text: 'Technology Vendor & Partner Evaluation', title: 'AAV Technology Vendor Selection & Partnership Framework', description: 'Strategic framework to evaluate and select the right technology vendors, CROs, and academic-industry partnerships for your program.', link: 'services.html#partnership-strategy' },
                { value: 'characterization-methods', text: 'Vector Characterization Methodology Selection', title: 'Full/Empty Capsid & Quality Assessment Method Selection', description: 'Expert guidance on selecting optimal analytical methods and technologies for comprehensive vector characterization and quality control.', link: 'services.html#cmc-assessment' }
            ],
            'advancing-programs': [
                { value: 'target-validation', text: 'Therapeutic Target Prioritization & Validation', title: 'Therapeutic Target Prioritization & Validation Blueprint', description: 'Expert-driven framework to systematically evaluate, prioritize, and build robust validation cases for AAV therapeutic targets.', link: 'services.html#target-validation' },
                { value: 'vector-design', text: 'AAV Vector Design & Disease-Specific Optimization', title: 'AAV Vector Translational Design & Disease-Specific Optimization Blueprint', description: 'Comprehensive strategy to optimize your AAV vector for enhanced efficacy, safety, and manufacturability, incorporating disease-specific biology and patient population requirements.', link: 'services.html#vector-design' },
                { value: 'preclinical-design', text: 'Preclinical Program Strategy & Design', title: 'Strategic Preclinical Program Design & De-Risking Roadmap', description: 'Design a lean, milestone-driven preclinical program that generates robust data for grant funding and eventual translation.', link: 'services.html#preclinical-design' }
            ],
            'securing-funding': [
                { value: 'public-grant', text: 'Public Grant Strategy (NIH, EU, National Agencies)', title: 'Public Translational Grant Services for AAV Founders', description: 'Strategic guidance to secure specialized public funding for university spin-offs, proof-of-concept validation, and AAV commercialization.', link: 'services.html#public-grant' },
                { value: 'private-grant', text: 'Family Office & Disease Foundation Funding', title: 'Family Office & Disease Foundation Grant Services for AAV Founders', description: 'Navigate disease foundations, family offices, and private donors to secure funding for rare disease AAV research.', link: 'services.html#private-grant' }
            ],
            'grant-evaluation': [
                { value: 'grant-navigator', text: 'Grant Proposal Evaluation & Portfolio Review', title: 'Grant Navigator: Maximizing Translational Potential for Patient Impact', description: 'Expert AAV technical and strategic review of proposals and programs, maximizing translational success and impact of donor funds.', link: 'services.html#grant-navigator' },
                { value: 'patient-tpp', text: 'Patient-Driven TPP Development for Foundations', title: 'Patient-Driven TPP: Aligning Therapeutic Profile with Rare Disease Needs', description: 'Comprehensive Target Product Profile development rooted in patient needs and AAV technical feasibility for rare disease foundations.', link: 'services.html#patient-tpp' }
            ],
            'preparing-translation': [
                { value: 'translation-roadmap', text: 'Translation Roadmap & Commercial Pathway', title: 'Academic-to-Commercial Translation Strategy', description: 'Strategic roadmap for transitioning academic research toward commercial translation and industry partnerships.', link: 'services.html#preclinical-design' }
            ],
            'building-capabilities': [
                { value: 'lab-setup', text: 'Gene Therapy Lab Setup & Capabilities', title: 'Academic Gene Therapy Lab Development & Optimization', description: 'Strategic guidance for setting up or expanding gene therapy capabilities in academic settings, including equipment, workflows, and partnerships.', link: 'services.html#lab-setup' }
            ],
            'ai-transformation': [
                { value: 'ai-audit', text: 'AI Audit', title: 'Comprehensive AI Readiness Assessment & Strategic Audit', description: 'Comprehensive assessment of your current capabilities and identification of AI transformation opportunities for enhanced research efficiency.', link: 'services.html#ai-audit' },
                { value: 'ai-education', text: 'AI Education', title: 'AI Education & Strategic Training Programs', description: 'Customized AI education and training programs to build internal capabilities and strategic understanding for academic research transformation.', link: 'services.html#ai-education' },
                { value: 'ai-implementation', text: 'AI Implementation', title: 'AI Implementation & Integration Services', description: 'End-to-end AI implementation services to transform your research operations with custom AI solutions and automated workflows.', link: 'services.html#ai-implementation' }
            ]
        },
        biotech: {
            'advancing-programs': [
                { value: 'target-validation', text: 'Target Validation & Program Prioritization', title: 'Therapeutic Target Prioritization & Validation Blueprint', description: 'Expert-driven framework to systematically evaluate, prioritize, and build robust validation cases for AAV therapeutic targets.', link: 'services.html#target-validation' },
                { value: 'vector-design', text: 'Vector Design & Disease-Specific Optimization Strategy', title: 'AAV Vector Translational Design & Disease-Specific Optimization Blueprint', description: 'Comprehensive strategy to optimize your AAV vector for enhanced efficacy, safety, and manufacturability, incorporating disease-specific biology and patient population requirements for maximum therapeutic impact.', link: 'services.html#vector-design' },
                { value: 'preclinical-design', text: 'IND-Enabling Preclinical Program Design', title: 'Strategic Preclinical Program Design & De-Risking Roadmap', description: 'Expert guidance for lean, milestone-driven preclinical programs that generate robust IND-enabling data and maximize investor confidence.', link: 'services.html#preclinical-design' }
            ],
            'securing-funding': [
                { value: 'public-grant', text: 'Public Grant Strategy (SBIR, EU, National Programs)', title: 'Public Translational Grant Services for AAV Founders', description: 'Strategic guidance to secure specialized public commercialization funding including SBIR/STTR, EIC Accelerator, and national biotech programs.', link: 'services.html#public-grant' },
                { value: 'private-grant', text: 'Family Office & Disease Foundation Funding', title: 'Family Office & Disease Foundation Grant Services for AAV Founders', description: 'Navigate disease foundations, family offices, and patient advocacy organizations to secure non-dilutive funding for rare disease AAV therapeutics.', link: 'services.html#private-grant' }
            ],

            'scaling-operations': [
                { value: 'cmc-assessment', text: 'Manufacturing Scale-Up & CMC Strategy', title: 'CMC Scale-Up Strategy & Manufacturing Readiness Assessment', description: 'Expert early-stage CMC guidance and scalability assessments to avoid costly manufacturing roadblocks during scale-up.', link: 'services.html#cmc-assessment' },
                { value: 'vendor-partnerships', text: 'Strategic Vendor, CDMO & CRO partnership selection', title: 'Manufacturing & CRO Partner Selection Framework', description: 'Strategic framework for selecting optimal manufacturing, CRO, and technology partners to accelerate development timelines.', link: 'services.html#outsourcing-strategy' }
            ],
            'ai-transformation': [
                { value: 'ai-audit', text: 'AI Audit', title: 'Biotech AI Readiness Assessment & Strategic Planning', description: 'Comprehensive assessment of your biotech operations to identify AI transformation opportunities for enhanced efficiency and competitive advantage.', link: 'services.html#ai-audit' },
                { value: 'ai-education', text: 'AI Education', title: 'AI Education & Leadership Training for Biotech Teams', description: 'Executive and team AI education programs designed for biotech organizations to build internal AI capabilities and strategic understanding.', link: 'services.html#ai-education' },
                { value: 'ai-implementation', text: 'AI Implementation', title: 'AI Implementation & Operational Integration', description: 'Complete AI implementation services to transform biotech operations with custom AI solutions, automated workflows, and decision support systems.', link: 'services.html#ai-implementation' }
            ]
        },
        service: {
            'expanding-capabilities': [
                { value: 'target-validation', text: 'Target Validation Consulting Services', title: 'Expert Target Validation Services for Client Programs', description: 'Expand your consulting portfolio with expert target validation frameworks and strategic guidance for client AAV therapeutic development.', link: 'services.html#target-validation' },
                { value: 'preclinical-design', text: 'Preclinical Program Design Consulting', title: 'Strategic Preclinical Program Design Services', description: 'Support your clients with expert preclinical program design and milestone-driven development strategies backed by deep AAV expertise.', link: 'services.html#preclinical-design' },
                { value: 'cmc-assessment', text: 'CMC & Manufacturing Consulting Services', title: 'CMC Readiness Assessment Services', description: 'Help your clients avoid costly manufacturing roadblocks with expert early-stage CMC guidance and scalability assessment services.', link: 'services.html#cmc-assessment' },
                { value: 'cns-services', text: 'CNS Expertise Development & Service Expansion', title: 'CNS Gene Therapy Service Specialization', description: 'Build CNS expertise and enhance service capabilities with specialized CNS gene therapy knowledge and service offerings.', link: 'services.html#cns-services' }
            ],
            'client-acquisition': [
                { value: 'client-development', text: 'Gene Therapy Client Acquisition Strategy', title: 'Gene Therapy Service Market Development Strategy', description: 'Strategic guidance to expand your gene therapy service offerings and acquire new clients in the growing AAV therapeutics market.', link: 'services.html#partnership-strategy' },
                { value: 'market-positioning', text: 'Service Market Positioning', title: 'Gene Therapy Service Market Positioning', description: 'Develop compelling market positioning and competitive differentiation strategies using AI-powered consulting methodologies.', link: 'services.html#consulting' }
            ],
            'ai-transformation': [
                { value: 'ai-audit', text: 'AI Audit', title: 'Consulting Firm AI Capability Assessment & Enhancement', description: 'Comprehensive AI readiness assessment for consulting firms to identify opportunities for AI-enhanced service delivery and competitive differentiation.', link: 'services.html#ai-audit' },
                { value: 'ai-education', text: 'AI Education', title: 'AI Education & Training for Consulting Teams', description: 'Specialized AI education programs for consulting professionals to build AI capabilities and enhance client service delivery with AI-powered methodologies.', link: 'services.html#ai-education' },
                { value: 'ai-implementation', text: 'AI Implementation', title: 'AI Implementation for Enhanced Consulting Services', description: 'Implementation of AI tools and systems to enhance consulting service delivery, improve client outcomes, and create competitive advantages.', link: 'services.html#ai-implementation' }
            ]
        },
        technology: {
            'product-market-fit': [
                { value: 'market-research', text: 'Market Research & Customer Analysis', title: 'AAV Laboratory Market Research & Segmentation', description: 'Comprehensive AI-powered market research to identify high-potential AAV laboratory segments and understand customer needs.', link: 'services.html#consulting' },
                { value: 'technology-validation', text: 'User-Centric Product Validation', title: 'AAV Lab User-Centric Integration & Workflow Validation', description: 'Validate your AAV technology\'s real-world value and workflow fit with laboratory end-users, de-risking market entry through expert user feedback.', link: 'services.html#technology-validation' }
            ],
            'kol-engagement': [
                { value: 'kol-strategy', text: 'AAV KOL Identification & Engagement Strategy', title: 'AAV KOL Strategy: Cultivating Lab Leader Validation & Market Advocacy', description: 'Targeted Key Opinion Leader identification and engagement strategy to build credibility, validation, and market advocacy among AAV laboratory leaders.', link: 'services.html#kol-strategy' },
                { value: 'kol-validation', text: 'KOL-Driven Product Validation Programs', title: 'KOL Validation & Market Advocacy Development', description: 'Develop comprehensive KOL validation programs that generate credible third-party endorsements and accelerate market acceptance.', link: 'services.html#kol-strategy' }
            ],
            'market-adoption': [
                { value: 'lab-penetration', text: 'Academic Lab Market Penetration Strategy', title: 'AAV Laboratory Market Penetration & Adoption Strategy', description: 'Strategic framework for penetrating academic and biotech laboratory markets with your AAV enabling technologies and solutions.', link: 'services.html#partnership-strategy' },
                { value: 'roi-toolkit', text: 'Customer ROI Communication & Value Demonstration', title: 'ROI Toolkit: Crafting Compelling Technology Value Narratives', description: 'Transform unclear value propositions into compelling, data-driven ROI narratives that accelerate AAV technology adoption in laboratories.', link: 'services.html#roi-toolkit' },
                { value: 'niche-navigator', text: 'Specialized Market Niche Navigation', title: 'Niche Navigator: Specialized AAV Technology Market Development', description: 'Navigate specialized market niches and identify unique technology adoption opportunities in targeted AAV research segments.', link: 'services.html#niche-navigator' },
                { value: 'customer-success', text: 'Customer Success & Adoption Optimization', title: 'Laboratory Customer Success & Technology Adoption Strategy', description: 'Develop comprehensive customer success frameworks to maximize laboratory adoption, satisfaction, and technology utilization.', link: 'services.html#launch-assurance' }
            ],

            'customer-acquisition': [
                { value: 'partnership-strategy', text: 'Strategic Partnership & Channel Development', title: 'AAV Technology Partnership & Distribution Channel Strategy', description: 'Strategic identification and development of high-impact partnerships and distribution channels for scalable customer acquisition and growth.', link: 'services.html#partnership-strategy' },
                { value: 'competitive-intelligence', text: 'Competitive Strategy & Analysis', title: 'AAV Technology Competitive Strategy', description: 'Leverage AI-powered consulting to stay ahead of technology trends, competitive dynamics, and customer acquisition opportunities.', link: 'services.html#consulting' },
                { value: 'regulatory-compatibility', text: 'Customer Compliance & Regulatory Strategy', title: 'Regulatory Compatibility Service: Customer Compliance Strategy', description: 'Strategic regulatory intelligence ensuring your AAV enabling technologies facilitate customer compliance and accelerate adoption.', link: 'services.html#regulatory-compatibility' }
            ],
            'ai-transformation': [
                { value: 'ai-audit', text: 'AI Audit', title: 'Technology Company AI Readiness & Strategic Assessment', description: 'Comprehensive AI readiness assessment for technology companies to identify AI integration opportunities and competitive advantages in the AAV market.', link: 'services.html#ai-audit' },
                { value: 'ai-education', text: 'AI Education', title: 'AI Education & Strategic Training for Technology Teams', description: 'Targeted AI education programs for technology companies to build internal AI capabilities and enhance product development and market positioning.', link: 'services.html#ai-education' },
                { value: 'ai-implementation', text: 'AI Implementation', title: 'AI Implementation & Technology Integration', description: 'End-to-end AI implementation to enhance technology offerings, improve customer experiences, and create competitive differentiation in the AAV market.', link: 'services.html#ai-implementation' }
            ]
        },
        foundation: {
            'grant-evaluation': [
                { value: 'grant-navigator', text: 'Grant Proposal Evaluation & Portfolio Review', title: 'Grant Navigator: Maximizing Translational Potential for Patient Impact', description: 'Expert AAV technical and strategic review of proposals and programs, maximizing translational success and impact of donor funds.', link: 'services.html#grant-navigator' },
                { value: 'patient-tpp', text: 'Patient-Driven TPP Development for Foundations', title: 'Patient-Driven TPP: Aligning Therapeutic Profile with Rare Disease Needs', description: 'Comprehensive Target Product Profile development rooted in patient needs and AAV technical feasibility for rare disease foundations.', link: 'services.html#patient-tpp' }
            ],
            'ai-transformation': [
                { value: 'ai-audit', text: 'AI Audit', title: 'Foundation AI Readiness Assessment & Strategic Planning', description: 'Comprehensive assessment of foundation operations to identify AI transformation opportunities for enhanced grant evaluation and portfolio management.', link: 'services.html#ai-audit' },
                { value: 'ai-education', text: 'AI Education', title: 'AI Education & Training for Foundation Teams', description: 'Customized AI education programs for foundation teams to build internal capabilities for AI-enhanced grant evaluation and strategic decision-making.', link: 'services.html#ai-education' },
                { value: 'ai-implementation', text: 'AI Implementation', title: 'AI Implementation for Foundation Operations', description: 'End-to-end AI implementation to enhance foundation operations, grant evaluation processes, and portfolio management with custom AI solutions.', link: 'services.html#ai-implementation' }
            ]
        },
        investor: {
            'evaluating-opportunities': [
                { value: 'technology-screening', text: 'AAV Technology Investment Screening', title: 'AAV Technology Investment Opportunity Screening & Assessment', description: 'Systematic screening and assessment of AAV technology investment opportunities, evaluating technical merit, market potential, and competitive positioning.', link: 'services.html#technology-screening' },
                { value: 'investment-diligence', text: 'Technical Due Diligence & Risk Assessment', title: 'Investment-Grade Technical Due Diligence & De-Risking Framework', description: 'Expert AAV technical due diligence with rapid red flag identification and comprehensive risk assessment for confident investment decisions.', link: 'services.html#investment-diligence' },
                { value: 'preclinical-validate', text: 'Preclinical Data Validation & Assessment', title: 'Preclinical Validate: Independent Expert Review for Investment Decisions', description: 'Expert, independent assessment of AAV preclinical packages to validate data integrity and clinical translation potential for investment confidence.', link: 'services.html#preclinical-validate' },
                { value: 'patent-review', text: 'IP Technical Strength & Patent Assessment', title: 'Scientific & Technical Patent Review: IP Investment Assessment', description: 'Expert scientific and technical assessment of AAV patent portfolios to complement legal due diligence with crucial technical strength evaluation.', link: 'services.html#patent-review' }
            ],

        }
    };

    function populateAllInterests() {
        interestSelect.innerHTML = '<option value="">Select what you need help with...</option>';
        
        // Create organized interest groups
        const interestGroups = {
            'Research & Development': [],
            'Business & Strategy': [],
            'Operations & Growth': [],
            'Investment & Funding': []
        };
        
        // Collect all unique interests and categorize them
        const uniqueInterests = new Map();
        
        Object.keys(interestOptions).forEach(audience => {
            interestOptions[audience].forEach(interest => {
                if (!uniqueInterests.has(interest.value)) {
                    uniqueInterests.set(interest.value, interest);
                    
                    // Detailed categorization to ensure all interests are properly placed
                    const value = interest.value;
                    
                    if (value === 'finding-technologies' || 
                        value === 'advancing-programs' || 
                        value === 'building-capabilities' || 
                        value === 'expanding-capabilities' || 
                        value === 'preparing-translation' || 
                        value === 'securing-funding') {
                        interestGroups['Research & Development'].push(interest);
                    } else if (value === 'market-entry' || 
                               value === 'market-adoption' || 
                               value === 'market-dynamics' || 
                               value === 'building-partnerships' || 
                               value === 'kol-engagement' || 
                               value === 'client-acquisition' || 
                               value === 'competitive-intelligence' || 
                               value === 'product-market-fit' || 
                               value === 'strategic-decisions') {
                        interestGroups['Business & Strategy'].push(interest);
                    } else if (value === 'scaling-operations' || 
                               value === 'operational-excellence' || 
                               value === 'customer-acquisition' || 
                               value === 'portfolio-management' || 
                               value === 'ai-transformation') {
                        interestGroups['Operations & Growth'].push(interest);
                    } else if (value === 'evaluating-opportunities' || 
                               value === 'supporting-portfolio' || 
                               value === 'grant-evaluation') {
                        interestGroups['Investment & Funding'].push(interest);
                    } else {
                        // Fallback - should not happen with proper categorization above
                        interestGroups['Research & Development'].push(interest);
                    }
                }
            });
        });
        
        // Add interests to dropdown with optgroups
        Object.keys(interestGroups).forEach(groupName => {
            if (interestGroups[groupName].length > 0) {
                const optgroup = document.createElement('optgroup');
                optgroup.label = groupName;
                
                // Sort interests within each group alphabetically
                interestGroups[groupName].sort((a, b) => a.text.localeCompare(b.text));
                
                interestGroups[groupName].forEach(interest => {
                    const optionElement = document.createElement('option');
                    optionElement.value = interest.value;
                    optionElement.textContent = interest.text;
                    optgroup.appendChild(optionElement);
                });
                
                interestSelect.appendChild(optgroup);
            }
        });
    }

    function updateInterestOptions() {
        const audience = audienceSelect.value;
        
        // Clear and populate interest dropdown based on selected audience
        interestSelect.innerHTML = '<option value="">Select what you need help with...</option>';
        
        if (audience && interestOptions[audience]) {
            interestOptions[audience].forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.text;
                interestSelect.appendChild(optionElement);
            });
        } else {
            // Show all interests organized by category when no role is selected
            populateAllInterests();
        }
        
        // Clear services when audience changes
        serviceSelect.innerHTML = '<option value="">Select a service</option>';
        hideRecommendation();
    }

    function updateServiceOptions() {
        const audience = audienceSelect.value;
        const interest = interestSelect.value;
        
        if (audience && interest && serviceOptions[audience] && serviceOptions[audience][interest]) {
            // Show filtered services for specific audience and interest
            serviceSelect.innerHTML = '<option value="">Select a service</option>';
            
            serviceOptions[audience][interest].forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.text;
                optionElement.dataset.title = option.title;
                optionElement.dataset.description = option.description;
                optionElement.dataset.link = option.link;
                serviceSelect.appendChild(optionElement);
            });
        } else if (!audience && !interest) {
            // Show all services when no filters are selected
            populateAllServices();
        }
        
        hideRecommendation();
    }

    function populateAllServices() {
        serviceSelect.innerHTML = '<option value="">Select a service</option>';
        
        // Create organized service groups
        const serviceGroups = {
            'AAV Grant Services': [],
            'AAV Drug Development Services': [],
            'AI Transformation Services': [],
            'Enabling Technology Services': [],
            'Investment and Strategy Services': [],
            'Foundation Services': [],
            'CNS Specific Services': []
        };
        
        // Collect all unique services and categorize them
        const uniqueServices = new Map();
        
        Object.keys(serviceOptions).forEach(audience => {
            Object.keys(serviceOptions[audience]).forEach(interest => {
                serviceOptions[audience][interest].forEach(service => {
                    if (!uniqueServices.has(service.value)) {
                        uniqueServices.set(service.value, service);
                        
                        // Categorize services
                        if (service.value.includes('grant-navigator') || service.value.includes('patient-tpp')) {
                            serviceGroups['Foundation Services'].push(service);
                        } else if (service.value.includes('public-grant') || service.value.includes('private-grant')) {
                            serviceGroups['AAV Grant Services'].push(service);
                        } else if (service.value.includes('target-validation') || service.value.includes('preclinical-design') || service.value.includes('cmc-assessment') || service.value.includes('outsourcing-strategy') || service.value.includes('vector-design') || service.value.includes('vendor-partnerships') || service.value.includes('technology-comparison') || service.value.includes('vendor-evaluation') || service.value.includes('characterization-methods') || service.value.includes('translation-roadmap') || service.value.includes('lab-setup')) {
                            serviceGroups['AAV Drug Development Services'].push(service);
                        } else if (service.value.includes('ai-') || service.value.includes('transformation') || service.value.includes('decision-support') || service.value.includes('operational-ai') || service.value.includes('client-intelligence')) {
                            serviceGroups['AI Transformation Services'].push(service);
                        } else if (service.value.includes('technology-validation') || service.value.includes('roi-toolkit') || service.value.includes('niche-navigator') || service.value.includes('kol-strategy') || service.value.includes('kol-validation') || service.value.includes('partnership-strategy') || service.value.includes('regulatory-compatibility') || service.value.includes('launch-assurance') || service.value.includes('lab-penetration') || service.value.includes('customer-success')) {
                            serviceGroups['Enabling Technology Services'].push(service);
                        } else if (service.value.includes('investment-diligence') || service.value.includes('portfolio') || service.value.includes('preclinical-validate') || service.value.includes('patent-review') || service.value.includes('portfolio-guard') || service.value.includes('technology-screening') || service.value.includes('market-research') || service.value.includes('competitive-intelligence') || service.value.includes('client-development') || service.value.includes('market-positioning')) {
                            serviceGroups['Investment and Strategy Services'].push(service);
                        } else if (service.value.includes('cns-') || service.value.includes('neurodegeneration') || service.value.includes('neuroscience')) {
                            serviceGroups['CNS Specific Services'].push(service);
                        }
                    }
                });
            });
        });
        
        // Add services to dropdown with optgroups
        Object.keys(serviceGroups).forEach(groupName => {
            if (serviceGroups[groupName].length > 0) {
                const optgroup = document.createElement('optgroup');
                optgroup.label = groupName;
                
                serviceGroups[groupName].forEach(service => {
                    const optionElement = document.createElement('option');
                    optionElement.value = service.value;
                    optionElement.textContent = service.text;
                    optionElement.dataset.title = service.title;
                    optionElement.dataset.description = service.description;
                    optionElement.dataset.link = service.link;
                    optgroup.appendChild(optionElement);
                });
                
                serviceSelect.appendChild(optgroup);
            }
        });
    }

    function showRecommendation(option) {
        if (recommendationTitle && recommendationDescription && recommendationLink) {
            recommendationTitle.textContent = option.dataset.title;
            recommendationDescription.textContent = option.dataset.description;
            recommendationLink.href = option.dataset.link;
            serviceRecommendation.style.display = 'block';
        }
    }

    function hideRecommendation() {
        if (serviceRecommendation) {
            serviceRecommendation.style.display = 'none';
        }
    }

    // ===== BI-DIRECTIONAL FILTERING SYSTEM =====
    // Build reverse mapping: service -> audiences, service -> interests
    const serviceToAudiences = new Map();
    const serviceToInterests = new Map();
    const interestToAudiences = new Map();
    const audienceToServices = new Map();
    const interestToServices = new Map();
    
    // Build comprehensive mappings
    Object.keys(serviceOptions).forEach(audience => {
        Object.keys(serviceOptions[audience]).forEach(interest => {
            serviceOptions[audience][interest].forEach(service => {
                // Service -> Audiences
                if (!serviceToAudiences.has(service.value)) {
                    serviceToAudiences.set(service.value, new Set());
                }
                serviceToAudiences.get(service.value).add(audience);
                
                // Service -> Interests
                if (!serviceToInterests.has(service.value)) {
                    serviceToInterests.set(service.value, new Set());
                }
                serviceToInterests.get(service.value).add(interest);
                
                // Interest -> Audiences
                if (!interestToAudiences.has(interest)) {
                    interestToAudiences.set(interest, new Set());
                }
                interestToAudiences.get(interest).add(audience);
                
                // Audience -> Services
                if (!audienceToServices.has(audience)) {
                    audienceToServices.set(audience, new Set());
                }
                audienceToServices.get(audience).add(service.value);
                
                // Interest -> Services
                if (!interestToServices.has(interest)) {
                    interestToServices.set(interest, new Set());
                }
                interestToServices.get(interest).add(service.value);
            });
        });
    });
    
    // All audience options with their display names
    const allAudienceOptions = [
        { value: 'academic', text: 'Academic Founder / Principal Investigator' },
        { value: 'foundation', text: 'Non-Profit Research Director / Foundation Leader' },
        { value: 'biotech', text: 'Biotech CEO / CSO (Early-Mid Stage)' },
        { value: 'biotech', text: 'Pharma/Biotech Strategic Planning (Director/VP)' },
        { value: 'technology', text: 'Technology Company (Product/BD Lead)' },
        { value: 'investor', text: 'Investor / VC Partner' },
        { value: 'service', text: 'Consulting Firm Project Lead' }
    ];
    
    // Filter audiences based on selected interest or service
    function filterAudienceOptions(selectedInterest, selectedService) {
        let compatibleAudiences = new Set();
        
        if (selectedService) {
            // Filter by service
            compatibleAudiences = serviceToAudiences.get(selectedService) || new Set();
        } else if (selectedInterest) {
            // Filter by interest
            compatibleAudiences = interestToAudiences.get(selectedInterest) || new Set();
        }
        
        // Rebuild audience dropdown
        const currentValue = audienceSelect.value;
        audienceSelect.innerHTML = '<option value="">Select your role</option>';
        
        if (compatibleAudiences.size > 0) {
            // Add only compatible audience options
            allAudienceOptions.forEach(option => {
                if (compatibleAudiences.has(option.value)) {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.value;
                    optionElement.textContent = option.text;
                    audienceSelect.appendChild(optionElement);
                }
            });
            
            // Restore selection if still valid
            if (compatibleAudiences.has(currentValue)) {
                audienceSelect.value = currentValue;
            }
        } else {
            // Show all audience options when no filtering
            allAudienceOptions.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.text;
                audienceSelect.appendChild(optionElement);
            });
            
            // Restore selection
            audienceSelect.value = currentValue;
        }
    }
    
    // Filter interests based on selected audience or service
    function filterInterestOptions(selectedAudience, selectedService) {
        let compatibleInterests = new Set();
        const currentInterestValue = interestSelect.value;
        
        if (selectedService) {
            // Get interests that have this service
            compatibleInterests = serviceToInterests.get(selectedService) || new Set();
            
            // If audience is also selected, intersect with audience's interests
            if (selectedAudience && interestOptions[selectedAudience]) {
                const audienceInterests = new Set(interestOptions[selectedAudience].map(i => i.value));
                compatibleInterests = new Set([...compatibleInterests].filter(i => audienceInterests.has(i)));
            }
        } else if (selectedAudience) {
            // Just filter by audience
            if (interestOptions[selectedAudience]) {
                compatibleInterests = new Set(interestOptions[selectedAudience].map(i => i.value));
            }
        }
        
        // If we have filters, apply them
        if (compatibleInterests.size > 0) {
            // Rebuild interest dropdown with only compatible options
            interestSelect.innerHTML = '<option value="">Select what you need help with...</option>';
            
            // Group compatible interests
            const interestGroups = {
                'Research & Development': [],
                'Business & Strategy': [],
                'Operations & Growth': [],
                'Investment & Funding': []
            };
            
            // Collect all unique interests that are compatible
            Object.keys(interestOptions).forEach(audience => {
                // Only include interests from selected audience if specified
                if (!selectedAudience || audience === selectedAudience) {
                    interestOptions[audience].forEach(interest => {
                        if (compatibleInterests.has(interest.value)) {
                            const value = interest.value;
                            
                            if (value === 'finding-technologies' || 
                                value === 'advancing-programs' || 
                                value === 'building-capabilities' || 
                                value === 'expanding-capabilities' || 
                                value === 'preparing-translation' || 
                                value === 'securing-funding') {
                                interestGroups['Research & Development'].push(interest);
                            } else if (value === 'market-entry' || 
                                       value === 'market-adoption' || 
                                       value === 'market-dynamics' || 
                                       value === 'building-partnerships' || 
                                       value === 'kol-engagement' || 
                                       value === 'client-acquisition' || 
                                       value === 'competitive-intelligence' || 
                                       value === 'product-market-fit' || 
                                       value === 'strategic-decisions') {
                                interestGroups['Business & Strategy'].push(interest);
                            } else if (value === 'scaling-operations' || 
                                       value === 'operational-excellence' || 
                                       value === 'customer-acquisition' || 
                                       value === 'portfolio-management' || 
                                       value === 'ai-transformation') {
                                interestGroups['Operations & Growth'].push(interest);
                            } else if (value === 'evaluating-opportunities' || 
                                       value === 'supporting-portfolio') {
                                interestGroups['Investment & Funding'].push(interest);
                            } else {
                                interestGroups['Research & Development'].push(interest);
                            }
                        }
                    });
                }
            });
            
            // Add interests to dropdown with optgroups
            Object.keys(interestGroups).forEach(groupName => {
                if (interestGroups[groupName].length > 0) {
                    const optgroup = document.createElement('optgroup');
                    optgroup.label = groupName;
                    
                    // Remove duplicates and sort
                    const uniqueInterests = Array.from(new Map(interestGroups[groupName].map(i => [i.value, i])).values());
                    uniqueInterests.sort((a, b) => a.text.localeCompare(b.text));
                    
                    uniqueInterests.forEach(interest => {
                        const optionElement = document.createElement('option');
                        optionElement.value = interest.value;
                        optionElement.textContent = interest.text;
                        optgroup.appendChild(optionElement);
                    });
                    
                    interestSelect.appendChild(optgroup);
                }
            });
            
            // Restore selection if still valid
            if (compatibleInterests.has(currentInterestValue)) {
                interestSelect.value = currentInterestValue;
            }
        } else if (!selectedAudience && !selectedService) {
            // Show all interests when no filters
            populateAllInterests();
            interestSelect.value = currentInterestValue;
        }
    }
    
    // Filter services based on selected audience and/or interest
    function filterServiceOptions(selectedAudience, selectedInterest) {
        let compatibleServices = new Set();
        const currentServiceValue = serviceSelect.value;
        
        if (selectedAudience && selectedInterest) {
            // Both selected - use specific mapping
            if (serviceOptions[selectedAudience] && serviceOptions[selectedAudience][selectedInterest]) {
                serviceOptions[selectedAudience][selectedInterest].forEach(s => compatibleServices.add(s.value));
            }
        } else if (selectedAudience) {
            // Only audience selected - show all services for this audience
            compatibleServices = audienceToServices.get(selectedAudience) || new Set();
        } else if (selectedInterest) {
            // Only interest selected - show all services for this interest
            compatibleServices = interestToServices.get(selectedInterest) || new Set();
        }
        
        if (compatibleServices.size > 0) {
            // Rebuild service dropdown with only compatible options
            serviceSelect.innerHTML = '<option value="">Select a service</option>';
            
            const serviceGroups = {
                'AAV Grant and Foundation Services': [],
                'AAV Drug Development Services': [],
                'AI Transformation Services': [],
                'Enabling Technology Services': [],
                'Investment and Strategy Services': [],
                'CNS Specific Services': []
            };
            
            // Collect compatible services
            Object.keys(serviceOptions).forEach(audience => {
                Object.keys(serviceOptions[audience]).forEach(interest => {
                    serviceOptions[audience][interest].forEach(service => {
                        if (compatibleServices.has(service.value)) {
                            // Categorize service
                            if (service.value.includes('grant-navigator') || service.value.includes('patient-tpp')) {
                                serviceGroups['AAV Grant and Foundation Services'].push(service);
                            } else if (service.value.includes('target-validation') || service.value.includes('preclinical-design') || service.value.includes('cmc-assessment') || service.value.includes('outsourcing-strategy') || service.value.includes('vector-design') || service.value.includes('vendor-partnerships') || service.value.includes('technology-comparison') || service.value.includes('vendor-evaluation') || service.value.includes('characterization-methods') || service.value.includes('translation-roadmap') || service.value.includes('lab-setup')) {
                                serviceGroups['AAV Drug Development Services'].push(service);
                            } else if (service.value.includes('ai-') || service.value.includes('transformation') || service.value.includes('decision-support') || service.value.includes('operational-ai') || service.value.includes('client-intelligence')) {
                                serviceGroups['AI Transformation Services'].push(service);
                            } else if (service.value.includes('technology-validation') || service.value.includes('roi-toolkit') || service.value.includes('niche-navigator') || service.value.includes('kol-strategy') || service.value.includes('kol-validation') || service.value.includes('partnership-strategy') || service.value.includes('regulatory-compatibility') || service.value.includes('launch-assurance') || service.value.includes('lab-penetration') || service.value.includes('customer-success')) {
                                serviceGroups['Enabling Technology Services'].push(service);
                            } else if (service.value.includes('investment-diligence') || service.value.includes('portfolio') || service.value.includes('preclinical-validate') || service.value.includes('patent-review') || service.value.includes('portfolio-guard') || service.value.includes('technology-screening') || service.value.includes('market-research') || service.value.includes('competitive-intelligence') || service.value.includes('client-development') || service.value.includes('market-positioning')) {
                                serviceGroups['Investment and Strategy Services'].push(service);
                            } else if (service.value.includes('cns-') || service.value.includes('neurodegeneration') || service.value.includes('neuroscience')) {
                                serviceGroups['CNS Specific Services'].push(service);
                            }
                        }
                    });
                });
            });
            
            // Add services to dropdown with optgroups (remove duplicates)
            Object.keys(serviceGroups).forEach(groupName => {
                if (serviceGroups[groupName].length > 0) {
                    const optgroup = document.createElement('optgroup');
                    optgroup.label = groupName;
                    
                    // Remove duplicates
                    const uniqueServices = Array.from(new Map(serviceGroups[groupName].map(s => [s.value, s])).values());
                    
                    uniqueServices.forEach(service => {
                        const optionElement = document.createElement('option');
                        optionElement.value = service.value;
                        optionElement.textContent = service.text;
                        optionElement.dataset.title = service.title;
                        optionElement.dataset.description = service.description;
                        optionElement.dataset.link = service.link;
                        optgroup.appendChild(optionElement);
                    });
                    
                    serviceSelect.appendChild(optgroup);
                }
            });
            
            // Restore selection if still valid
            if (compatibleServices.has(currentServiceValue)) {
                serviceSelect.value = currentServiceValue;
                // Show recommendation if service is selected
                const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
                if (selectedOption && selectedOption.dataset.title) {
                    showRecommendation(selectedOption);
                }
            }
        } else if (!selectedAudience && !selectedInterest) {
            // Show all services when no filters
            populateAllServices();
            serviceSelect.value = currentServiceValue;
            
            // Show recommendation if service is selected
            if (currentServiceValue) {
                const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
                if (selectedOption && selectedOption.dataset.title) {
                    showRecommendation(selectedOption);
                }
            }
        }
    }
    
    // Master update function - handles all filtering logic
    function updateAllDropdowns(triggerDropdown) {
        const selectedAudience = audienceSelect.value;
        const selectedInterest = interestSelect.value;
        const selectedService = serviceSelect.value;
        
        // Don't filter if all are empty
        if (!selectedAudience && !selectedInterest && !selectedService) {
            // Reset to show all options
            const currentAudience = audienceSelect.value;
            const currentInterest = interestSelect.value;
            const currentService = serviceSelect.value;
            
            audienceSelect.innerHTML = '<option value="">Select your role</option>';
            allAudienceOptions.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.text;
                audienceSelect.appendChild(optionElement);
            });
            audienceSelect.value = currentAudience;
            
            populateAllInterests();
            interestSelect.value = currentInterest;
            
            populateAllServices();
            serviceSelect.value = currentService;
            
            hideRecommendation();
            return;
        }
        
        // Apply bi-directional filtering based on which dropdown triggered the change
        if (triggerDropdown === 'audience') {
            // User selected audience - filter interests and services
            filterInterestOptions(selectedAudience, selectedService);
            filterServiceOptions(selectedAudience, selectedInterest);
            
            // Keep recommendation visible if service is still selected
            if (selectedService) {
                const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
                if (selectedOption && selectedOption.dataset.title) {
                    showRecommendation(selectedOption);
                }
            } else {
                hideRecommendation();
            }
        } else if (triggerDropdown === 'interest') {
            // User selected interest - filter audiences and services
            filterAudienceOptions(selectedInterest, selectedService);
            filterServiceOptions(selectedAudience, selectedInterest);
            
            // Keep recommendation visible if service is still selected
            if (selectedService) {
                const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
                if (selectedOption && selectedOption.dataset.title) {
                    showRecommendation(selectedOption);
                }
            } else {
                hideRecommendation();
            }
        } else if (triggerDropdown === 'service') {
            // User selected service - filter audiences and interests
            filterAudienceOptions(selectedInterest, selectedService);
            filterInterestOptions(selectedAudience, selectedService);
            
            // Show recommendation
            if (selectedService) {
                const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
                if (selectedOption && selectedOption.dataset.title) {
                    showRecommendation(selectedOption);
                }
            } else {
                hideRecommendation();
            }
        }
    }
    
    // Populate all services and interests on page load
    populateAllServices();
    populateAllInterests();
    
    // Event listeners with bi-directional filtering
    audienceSelect.addEventListener('change', function() {
        updateAllDropdowns('audience');
    });
    
    interestSelect.addEventListener('change', function() {
        updateAllDropdowns('interest');
    });
    
    serviceSelect.addEventListener('change', function() {
        updateAllDropdowns('service');
    });
    
    // Reset button functionality
    const resetButton = document.getElementById('reset-selections');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            // Clear all dropdown selections
            audienceSelect.value = '';
            interestSelect.value = '';
            serviceSelect.value = '';
            
            // Reset all dropdowns to show all options
            audienceSelect.innerHTML = '<option value="">Select your role</option>';
            allAudienceOptions.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.text;
                audienceSelect.appendChild(optionElement);
            });
            
            populateAllInterests();
            populateAllServices();
            
            // Hide recommendation card
            hideRecommendation();
            
            // Optional: Smooth scroll to top of section or visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    }
}

// Handle cross-page anchor navigation (for services.html#vector-design etc.)
function handleCrossPageAnchors() {
    // Check if there's a hash in the URL when the page loads
    if (window.location.hash) {
        // Function to scroll to the target
        const scrollToTarget = (attempts = 0) => {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            } else if (attempts < 5) {
                // Retry if element not found yet (up to 5 times)
                setTimeout(() => scrollToTarget(attempts + 1), 200);
            }
        };
        
        // Initial delay to ensure page is fully loaded
        setTimeout(() => scrollToTarget(), 300);
    }
}

// Service navigation functions - these are now managed by the unified system in services.html
// Keeping these as placeholders for any potential cross-page navigation needs

// Category navigation functions are now handled in services.html for unified UX