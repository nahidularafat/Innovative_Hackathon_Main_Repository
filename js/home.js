// Homepage Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    initializeHomepage();
    setupSmoothScrolling();
    setupAnimations();
    setupBackToTop();
});

function initializeHomepage() {
    // Add any initialization code here
    console.log('Barkah&Eats homepage loaded');
}

function setupSmoothScrolling() {
    // Smooth scrolling for navigation links
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

function setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });

    // Observe benefit cards
    document.querySelectorAll('.bg-white.rounded-2xl').forEach(card => {
        observer.observe(card);
    });
}

function setupBackToTop() {
    const backToTopButton = document.createElement('a');
    backToTopButton.href = '#';
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);

    // Show/hide back to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Smooth scroll to top
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .feature-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .feature-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .bg-white.rounded-2xl {
        opacity: 0;
        transform: translateY(30px);