// ============================================
// INTERACTIVE LIZARD LANE - SUPER FUN EDITION
// ============================================

// Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const logo = document.querySelector('.logo');

// Hamburger menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.style.animation = 'spin 0.5s ease-in-out';
    });
}

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Easter egg: Logo click does a flip
if (logo) {
    let clickCount = 0;
    logo.addEventListener('click', () => {
        clickCount++;
        logo.style.animation = 'spin 0.6s ease-in-out';
        
        if (clickCount === 5) {
            createConfetti();
            clickCount = 0;
        }
    });
}

// Smooth scroll for CTA button
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// PARTICLE & CURSOR EFFECTS
// ============================================

// Cursor trail particles
document.addEventListener('mousemove', (e) => {
    createCursorParticle(e.clientX, e.clientY);
});

function createCursorParticle(x, y) {
    if (Math.random() > 0.8) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, var(--primary-color), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 999;
            animation: particleFade 1s ease-out forwards;
            box-shadow: 0 0 6px rgba(46, 204, 113, 0.6);
        `;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
}

// Click particle explosion
document.addEventListener('click', (e) => {
    createClickParticles(e.clientX, e.clientY);
});

function createClickParticles(x, y) {
    const particleCount = 8;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const angle = (360 / particleCount) * i;
        const velocity = 5 + Math.random() * 5;
        const vx = Math.cos(angle * Math.PI / 180) * velocity;
        const vy = Math.sin(angle * Math.PI / 180) * velocity;

        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 8px;
            height: 8px;
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            border-radius: 50%;
            pointer-events: none;
            z-index: 999;
            --vx: ${vx}px;
            --vy: ${vy}px;
            animation: particleExplode 0.8s ease-out forwards;
            box-shadow: 0 0 10px rgba(46, 204, 113, 0.8);
        `;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
    }
}

// ============================================
// INTERACTIVE GALLERY
// ============================================

const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const modal = createModal(img.src, img.alt);
        document.body.appendChild(modal);
    });

    // Extra hover effect
    item.addEventListener('mouseenter', () => {
        item.style.filter = 'drop-shadow(0 10px 30px rgba(46, 204, 113, 0.6))';
    });

    item.addEventListener('mouseleave', () => {
        item.style.filter = 'drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3))';
    });
});

function createModal(imageSrc, imageAlt) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease-out;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        border-radius: 12px;
        overflow: hidden;
        animation: pop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;

    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = imageAlt;
    img.style.cssText = `
        width: 100%;
        height: auto;
        display: block;
        border-radius: 12px;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(46, 204, 113, 0.2);
        color: var(--primary-color);
        border: 2px solid var(--primary-color);
        font-size: 28px;
        cursor: pointer;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        font-weight: bold;
    `;

    closeBtn.addEventListener('mouseover', () => {
        closeBtn.style.background = 'var(--primary-color)';
        closeBtn.style.color = '#0f1419';
        closeBtn.style.transform = 'scale(1.2) rotateZ(90deg)';
    });

    closeBtn.addEventListener('mouseout', () => {
        closeBtn.style.background = 'rgba(46, 204, 113, 0.2)';
        closeBtn.style.color = 'var(--primary-color)';
        closeBtn.style.transform = 'scale(1) rotateZ(0deg)';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => modal.remove(), 300);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => modal.remove(), 300);
        }
    });

    modalContent.appendChild(img);
    modalContent.appendChild(closeBtn);
    modal.appendChild(modalContent);

    return modal;
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) rotateZ(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all gallery items and species cards
const animatedElements = document.querySelectorAll('.gallery-item, .species-card');
animatedElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px) rotateZ(-3deg)';
    element.style.transition = `all 0.6s ease-out ${index * 0.05}s`;
    observer.observe(element);
});

// ============================================
// SPECIES CARDS INTERACTIVE
// ============================================

const speciesCards = document.querySelectorAll('.species-card');
speciesCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        card.style.animation = 'heartbeat 0.6s ease-in-out';
    });

    card.addEventListener('click', () => {
        card.style.animation = 'jiggle 0.4s ease-in-out';
        const title = card.querySelector('h3');
        title.style.animation = 'glow 0.8s ease-in-out';
    });

    // Add a fun hover effect to description
    const description = card.querySelector('p');
    if (description) {
        description.addEventListener('mouseenter', () => {
            description.style.textShadow = '0 0 10px rgba(46, 204, 113, 0.6)';
            description.style.color = 'var(--primary-color)';
        });

        description.addEventListener('mouseleave', () => {
            description.style.textShadow = 'none';
            description.style.color = '#bdc3c7';
        });
    }
});

// ============================================
// STATS COUNTER ANIMATION
// ============================================

const statsSection = document.querySelector('.stats');
const statItems = document.querySelectorAll('.stat-item h3');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            animateCounters();
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

function animateCounters() {
    statItems.forEach(stat => {
        const text = stat.textContent;
        const target = parseInt(text.replace(/\D/g, ''));
        const increment = target / 50;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = text;
                clearInterval(timer);
                stat.style.animation = 'bounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            } else {
                const suffix = text.replace(/[0-9]/g, '');
                stat.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    });
}

// ============================================
// CONFETTI & CELEBRATION EFFECTS
// ============================================

function createConfetti() {
    const confettiPieces = 50;
    for (let i = 0; i < confettiPieces; i++) {
        const confetti = document.createElement('div');
        const left = Math.random() * window.innerWidth;
        const delay = Math.random() * 0.3;
        const duration = 2 + Math.random() * 1;
        const rotation = Math.random() * 360;

        confetti.style.cssText = `
            position: fixed;
            left: ${left}px;
            top: -10px;
            width: 10px;
            height: 10px;
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            border-radius: 50%;
            pointer-events: none;
            z-index: 999;
            animation: confettiFall ${duration}s linear ${delay}s forwards;
            box-shadow: 0 0 8px rgba(46, 204, 113, 0.8);
        `;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), (duration + delay) * 1000);
    }
}

// ============================================
// BADGE CLICKING INTERACTION
// ============================================

const badges = document.querySelectorAll('.badge');
badges.forEach(badge => {
    badge.addEventListener('click', (e) => {
        e.stopPropagation();
        badge.style.animation = 'spin 0.8s linear';
        createClickParticles(e.clientX, e.clientY);
        
        // Show a fun tooltip
        const tooltip = document.createElement('div');
        tooltip.textContent = '🦎 Cool fact!';
        tooltip.style.cssText = `
            position: absolute;
            background: var(--primary-color);
            color: #0f1419;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: bold;
            pointer-events: none;
            animation: pop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        `;
        badge.parentElement.appendChild(tooltip);
        setTimeout(() => tooltip.remove(), 400);
    });
});

// ============================================
// BUTTON HOVER EFFECTS
// ============================================

const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('mouseenter', () => {
        ctaButton.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
    });

    ctaButton.addEventListener('mouseleave', () => {
        ctaButton.style.textShadow = 'none';
    });
}

// ============================================
// KEYBOARD NAVIGATION & SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => modal.remove(), 300);
        });
    }

    // Fun easter egg: Press Space to celebrate
    if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        createConfetti();
    }

    // Navigation with arrow keys
    if (e.key === 'ArrowDown') {
        const sections = document.querySelectorAll('section');
        const current = Array.from(sections).find(s => s.getBoundingClientRect().top > 0);
        if (current) {
            current.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ============================================
// CSS INJECTIONS FOR ANIMATIONS
// ============================================

const styles = document.createElement('style');
styles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }

    @keyframes particleFade {
        to {
            opacity: 0;
            transform: translateY(-30px);
        }
    }

    @keyframes particleExplode {
        to {
            opacity: 0;
            transform: translate(var(--vx), var(--vy)) scale(0);
        }
    }

    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotateZ(720deg);
            opacity: 0;
        }
    }

    @keyframes pop {
        0% { 
            transform: scale(0) rotateZ(-180deg); 
            opacity: 0;
        }
        50% { transform: scale(1.2); }
        100% { 
            transform: scale(1) rotateZ(0deg);
            opacity: 1;
        }
    }

    @keyframes jiggle {
        0%, 100% { transform: rotateZ(0); }
        25% { transform: rotateZ(5deg); }
        75% { transform: rotateZ(-5deg); }
    }

    @keyframes spin {
        from { transform: rotateZ(0deg); }
        to { transform: rotateZ(360deg); }
    }

    @keyframes heartbeat {
        0%, 100% { transform: scale(1); }
        10%, 30% { transform: scale(0.95); }
        20%, 50%, 80%, 100% { transform: scale(1); }
        40%, 60% { transform: scale(1.1); }
    }

    @keyframes glow {
        0%, 100% { 
            text-shadow: 0 0 5px rgba(46, 204, 113, 0.5);
        }
        50% { 
            text-shadow: 0 0 20px rgba(46, 204, 113, 1);
        }
    }

    button {
        cursor: pointer !important;
    }

    /* Extra playful effect on interactive elements */
    a, button, [role="button"] {
        position: relative;
    }

    a:hover, button:hover {
        z-index: 10;
    }
`;
document.head.appendChild(styles);

// ============================================
// PAGE LOAD CELEBRATION
// ============================================

window.addEventListener('load', () => {
    // Small confetti burst on load
    setTimeout(() => {
        const miniBurst = 20;
        for (let i = 0; i < miniBurst; i++) {
            const confetti = document.createElement('div');
            const left = Math.random() * window.innerWidth;
            const delay = Math.random() * 0.5;

            confetti.style.cssText = `
                position: fixed;
                left: ${left}px;
                top: -10px;
                width: 6px;
                height: 6px;
                background: var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 999;
                animation: confettiFall 1.5s linear ${delay}s forwards;
            `;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 2000);
        }
    }, 500);
});

// ============================================
// RANDOM FUN MESSAGES IN CONSOLE
// ============================================

const messages = [
    "🦎 Welcome to Lizard Lane!",
    "🦎 Did you know? There are over 6,500 lizard species!",
    "🦎 Click the logo 5 times for a surprise! 🎉",
    "🦎 Try pressing Space for confetti!",
    "🦎 Check out the gallery - interactive goodness awaits!",
    "🦎 This website is made with lots of ❤️ and lizards!",
    "🦎 Hover over everything - things get bouncy!",
];

console.log('%c🦎 Lizard Lane - Super Fun Interactive Edition! 🦎', 'color: #2ecc71; font-size: 16px; font-weight: bold;');
console.log('%c' + messages[Math.floor(Math.random() * messages.length)], 'color: #3498db; font-size: 14px;');

