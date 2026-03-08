/**
 * Enhanced Animation System
 * Professional animation utilities for portfolio website
 * Following UI/UX Pro Max best practices
 */

class AnimationController {
    constructor() {
        this.observers = new Map();
        this.animatedElements = new Set();
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.performanceMonitor = new PerformanceMonitor();
        
        // Initialize animation system
        this.init();
    }

    init() {
        // Respect user's motion preferences
        if (this.prefersReducedMotion.matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.01ms');
            document.documentElement.style.setProperty('--transition-duration', '0.01ms');
            return;
        }

        // Set up main intersection observer for scroll animations
        this.setupScrollAnimations();
        
        // Initialize performance monitoring
        this.performanceMonitor.start();
    }

    setupScrollAnimations() {
        const options = {
            root: null,
            rootMargin: '-10% 0px -10% 0px',
            threshold: [0, 0.1, 0.3, 0.5, 0.7, 1.0]
        };

        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.triggerAnimation(entry.target, entry.intersectionRatio);
                    this.animatedElements.add(entry.target);
                }
            });
        }, options);
    }

    triggerAnimation(element, ratio) {
        const animationType = element.dataset.animation || 'fadeInUp';
        const delay = parseInt(element.dataset.delay) || 0;
        const duration = parseInt(element.dataset.duration) || 600;

        setTimeout(() => {
            this.performanceMonitor.startMeasure(`animation-${animationType}`);
            element.style.setProperty('--animation-duration', `${duration}ms`);
            element.classList.add('animate-in', `animate-${animationType}`);
            
            // Clean up after animation
            setTimeout(() => {
                this.performanceMonitor.endMeasure(`animation-${animationType}`);
            }, duration);
        }, delay);
    }

    // Enhanced fade in with multiple directions
    fadeIn(element, direction = 'up', options = {}) {
        if (this.prefersReducedMotion.matches) return;

        const {
            duration = 600,
            delay = 0,
            distance = '30px',
            easing = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        } = options;

        const transforms = {
            up: `translateY(${distance})`,
            down: `translateY(-${distance})`,
            left: `translateX(${distance})`,
            right: `translateX(-${distance})`,
            scale: 'scale(0.8)'
        };

        element.style.cssText = `
            opacity: 0;
            transform: ${transforms[direction] || transforms.up};
            transition: all ${duration}ms ${easing} ${delay}ms;
        `;

        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translate(0) scale(1)';
        });
    }

    // Staggered animations for multiple elements
    stagger(elements, options = {}) {
        if (this.prefersReducedMotion.matches) return;

        const {
            direction = 'up',
            staggerDelay = 100,
            baseDelay = 0
        } = options;

        elements.forEach((element, index) => {
            const delay = baseDelay + (index * staggerDelay);
            this.fadeIn(element, direction, { ...options, delay });
        });
    }

    // Advanced hover effects with GPU acceleration
    enhanceHover(element, options = {}) {
        if (this.prefersReducedMotion.matches) return;

        const {
            scale = 1.05,
            translateY = '-5px',
            shadow = '0 20px 40px rgba(0,0,0,0.1)',
            duration = 300
        } = options;

        element.style.cssText += `
            will-change: transform, box-shadow;
            transition: all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `;

        element.addEventListener('mouseenter', () => {
            element.style.transform = `scale(${scale}) translateY(${translateY})`;
            element.style.boxShadow = shadow;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1) translateY(0)';
            element.style.boxShadow = '';
        });
    }

    // Observe element for scroll animations
    observe(element, animationType = 'fadeInUp') {
        if (this.prefersReducedMotion.matches) return;

        element.dataset.animation = animationType;
        this.scrollObserver.observe(element);
    }

    // Batch observe multiple elements
    observeAll(selector, animationType = 'fadeInUp') {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => this.observe(element, animationType));
    }

    // Cleanup
    destroy() {
        this.scrollObserver?.disconnect();
        this.observers.forEach(observer => observer.disconnect());
        this.performanceMonitor.stop();
    }
}

class PerformanceMonitor {
    constructor() {
        this.measures = new Map();
        this.isMonitoring = false;
    }

    start() {
        this.isMonitoring = true;
        console.log('🎬 Animation Performance Monitor started');
    }

    startMeasure(name) {
        if (!this.isMonitoring) return;
        performance.mark(`${name}-start`);
    }

    endMeasure(name) {
        if (!this.isMonitoring) return;
        
        try {
            performance.mark(`${name}-end`);
            performance.measure(name, `${name}-start`, `${name}-end`);
            
            const measure = performance.getEntriesByName(name, 'measure')[0];
            if (measure && measure.duration > 16) { // Slower than 60fps
                console.warn(`⚠️ Slow animation: ${name} took ${measure.duration.toFixed(2)}ms`);
            }
        } catch (e) {
            // Ignore performance API errors
        }
    }

    stop() {
        this.isMonitoring = false;
        console.log('🎬 Animation Performance Monitor stopped');
    }
}

// Enhanced Animation Utilities
const AnimationUtils = {
    // Smooth counter animation
    animateCounter(element, target, options = {}) {
        const {
            duration = 2000,
            easing = 'easeOutCubic',
            prefix = '',
            suffix = ''
        } = options;

        const start = parseInt(element.textContent) || 0;
        const startTime = performance.now();

        const easingFunctions = {
            easeOutCubic: t => 1 - Math.pow(1 - t, 3),
            easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
        };

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easingFunctions[easing](progress);
            
            const current = Math.round(start + (target - start) * easedProgress);
            element.textContent = `${prefix}${current}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    },

    // Typewriter effect with cursor
    typeWriter(element, text, options = {}) {
        const {
            speed = 50,
            cursor = '|',
            cursorBlink = true
        } = options;

        let i = 0;
        element.textContent = '';

        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else if (cursorBlink) {
                this.addBlinkingCursor(element, cursor);
            }
        };

        type();
    },

    addBlinkingCursor(element, cursor = '|') {
        const cursorSpan = document.createElement('span');
        cursorSpan.textContent = cursor;
        cursorSpan.style.animation = 'blink 1s infinite';
        element.appendChild(cursorSpan);
    },

    // Ripple effect for buttons
    addRippleEffect(button) {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
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
                animation: rippleAnimation 0.6s ease-out;
                pointer-events: none;
            `;

            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    }
};

// Export for use in main script
window.AnimationController = AnimationController;
window.AnimationUtils = AnimationUtils;