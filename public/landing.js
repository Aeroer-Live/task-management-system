// Landing Page JavaScript

// Particle system
class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particle-container');
        this.particles = [];
        this.particleTypes = ['small', 'medium', 'large', 'glow', 'sparkle'];
        this.animationTypes = ['particle-float', 'particle-drift', 'particle-spiral'];
        this.colors = [
            'rgba(255, 255, 255, 0.6)',
            'rgba(59, 130, 246, 0.4)',
            'rgba(147, 51, 234, 0.3)',
            'rgba(34, 197, 94, 0.5)',
            'rgba(236, 72, 153, 0.4)',
            'rgba(6, 182, 212, 0.4)',
            'rgba(245, 158, 11, 0.4)'
        ];
        this.init();
    }

    init() {
        this.createParticles();
        this.startParticleLoop();
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random type
        const type = this.particleTypes[Math.floor(Math.random() * this.particleTypes.length)];
        particle.classList.add(type);
        
        // Random animation type
        const animationType = this.animationTypes[Math.floor(Math.random() * this.animationTypes.length)];
        if (animationType !== 'particle-float') {
            particle.classList.add(animationType.replace('particle-', ''));
        }
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random delay
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        // Random duration variation
        const baseDuration = this.getBaseDuration(type);
        const variation = baseDuration * 0.3;
        const duration = baseDuration + (Math.random() - 0.5) * variation;
        particle.style.animationDuration = duration + 's';
        
        // Add to container
        this.container.appendChild(particle);
        
        // Remove after animation completes
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, (duration + 5) * 1000);
        
        return particle;
    }

    getBaseDuration(type) {
        const durations = {
            'small': 12,
            'medium': 15,
            'large': 20,
            'glow': 18,
            'sparkle': 10
        };
        return durations[type] || 15;
    }

    createParticles() {
        // Create initial particles
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createParticle();
            }, i * 200);
        }
    }

    startParticleLoop() {
        // Continuously create new particles
        setInterval(() => {
            if (this.particles.length < 30) {
                this.createParticle();
            }
        }, 800);
    }
}

// Smooth scrolling utility
function initSmoothScrolling() {
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
}

// Parallax effect for floating icons
function initParallaxEffect() {
    window.addEventListener('mousemove', function(e) {
        const icons = document.querySelectorAll('.floating-icon');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        icons.forEach((icon, index) => {
            const speed = (index + 1) * 0.5;
            const xPos = (x - 0.5) * speed * 20;
            const yPos = (y - 0.5) * speed * 20;
            icon.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    });
}

// Intersection Observer for entrance animations
function initEntranceAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Mouse interaction with particles
function initMouseInteraction() {
    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create particles on mouse movement (occasionally)
        if (Math.random() < 0.1) {
            const particle = document.createElement('div');
            particle.className = 'particle sparkle';
            particle.style.left = mouseX + 'px';
            particle.style.top = mouseY + 'px';
            particle.style.position = 'fixed';
            particle.style.animationDuration = '2s';
            particle.style.animationName = 'particle-float';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 2000);
        }
    });
}

// Performance optimization: Throttle function
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
    }
}

// Enhanced parallax with throttling
function initEnhancedParallax() {
    const throttledParallax = throttle(function(e) {
        const icons = document.querySelectorAll('.floating-icon');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        icons.forEach((icon, index) => {
            const speed = (index + 1) * 0.3;
            const xPos = (x - 0.5) * speed * 15;
            const yPos = (y - 0.5) * speed * 15;
            icon.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    }, 16); // ~60fps

    window.addEventListener('mousemove', throttledParallax);
}

// Initialize all functionality
function initLandingPage() {
    // Initialize particle system
    new ParticleSystem();
    
    // Initialize all effects
    initSmoothScrolling();
    initEnhancedParallax();
    initEntranceAnimations();
    initMouseInteraction();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
}

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', initLandingPage);

// Handle window resize for responsive adjustments
window.addEventListener('resize', throttle(function() {
    // Recalculate particle positions if needed
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        // Adjust particle behavior on resize if needed
    });
}, 250));

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ParticleSystem,
        initLandingPage,
        initSmoothScrolling,
        initParallaxEffect,
        initEntranceAnimations,
        initMouseInteraction
    };
}
