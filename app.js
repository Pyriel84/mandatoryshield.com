'use strict';

// Chargement non-bloquant des polices et icônes
(function () {
    var fontsHref = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap';
    var iconsHref = 'https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css';
    [fontsHref, iconsHref].forEach(function (href) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    });
})();

// Logo image error handler
const logoImg = document.querySelector('.logo img');
if (logoImg) {
    logoImg.addEventListener('error', function () {
        this.style.display = 'none';
    });
}

// Network Animation
const canvas = document.getElementById('network-bg');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const particles = [];
const particleCount = width < 768 ? 30 : 80;
const connectionDistance = 150;
const mouseDistance = 200;

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let mouse = { x: null, y: null };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initParticles();
});

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (mouse.x !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 0 && distance < mouseDistance) {
                const force = (mouseDistance - distance) / mouseDistance;
                this.x -= (dx / distance) * force * 0.5;
                this.y -= (dy / distance) * force * 0.5;
            }
        }
    }

    draw() {
        ctx.fillStyle = 'rgba(13, 148, 136, 0.4)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < connectionDistance) {
                const opacity = 1 - (distance / connectionDistance);
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(13, 148, 136, ' + (opacity * 0.3) + ')';
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animate);
}

if (prefersReducedMotion) {
    canvas.style.display = 'none';
} else {
    initParticles();
    animate();
}

// FAQ Toggle
document.querySelectorAll('[data-faq-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

// Chatbot
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotMessages = document.getElementById('chatbotMessages');

const knowledgeBase = {
    'prix':       'ADSecure propose trois offres : Essential à 6 900 €/an (4 audits/an), Professional à 14 900 €/an (audits illimités + Azure AD), et Enterprise sur devis.',
    'tarif':      'ADSecure propose trois offres : Essential à 6 900 €/an, Professional à 14 900 €/an, et Enterprise sur devis.',
    'nis2':       'Oui, ADSecure est entièrement conforme NIS2. Chaque contrôle est mappé aux articles de la directive NIS2 (UE 2022/2555, obligatoire depuis octobre 2024).',
    'conformité': 'ADSecure couvre intégralement : NIS2 (Couvert), ISO 27001 (Aligné), CIS Controls v8 (Intégré), RGPD (Conforme), Cyfun/CCB (Aligné) et DORA (Couvert).',
    'cloud':      'Non. ADSecure fonctionne 100% on-premise. Aucune donnée Active Directory ne quitte votre environnement.',
    'données':    'Non. ADSecure fonctionne 100% on-premise. Aucune donnée Active Directory ne quitte votre environnement.',
    'démo':       'Nous ne proposons pas d\'essai gratuit. Cependant, nous organisons des rendez-vous personnalisés. Contactez-nous à contact@mandatoryshield.com',
    'contact':    'Vous pouvez nous contacter à contact@mandatoryshield.com. Nos experts vous répondent sous 24h.'
};

const chatbotToggle = document.querySelector('[data-chat-toggle]');

chatbotToggle.addEventListener('click', () => {
    const isOpen = chatbotWindow.classList.toggle('active');
    chatbotToggle.setAttribute('aria-expanded', isOpen);
    chatbotToggle.setAttribute('aria-label', isOpen ? "Fermer l'assistant ADSecure" : "Ouvrir l'assistant ADSecure");
});

document.querySelector('[data-chat-close]').addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
    chatbotToggle.setAttribute('aria-expanded', 'false');
    chatbotToggle.setAttribute('aria-label', "Ouvrir l'assistant ADSecure");
});

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = 'chatbot-message ' + sender;

    const avatar = document.createElement('div');
    avatar.className = 'chatbot-avatar';
    if (sender === 'bot') {
        const img = document.createElement('img');
        img.src = 'images/logo-opt.png';
        img.alt = 'Mandatory Shield';
        avatar.appendChild(img);
    } else {
        avatar.textContent = 'VO';
    }

    const bubble = document.createElement('div');
    bubble.className = 'chatbot-bubble';
    bubble.textContent = text;

    div.appendChild(avatar);
    div.appendChild(bubble);
    chatbotMessages.appendChild(div);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function findResponse(msg) {
    const lower = msg.toLowerCase();
    for (const key in knowledgeBase) {
        if (lower.includes(key)) return knowledgeBase[key];
    }
    return 'Je ne suis pas sûr de comprendre. Contactez-nous à contact@mandatoryshield.com ou consultez notre FAQ.';
}

function sendMessage() {
    const text = chatbotInput.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    chatbotInput.value = '';
    setTimeout(() => addMessage(findResponse(text), 'bot'), 500);
}

document.querySelector('[data-chat-send]').addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

document.querySelectorAll('.chatbot-suggestion').forEach(btn => {
    btn.addEventListener('click', () => {
        chatbotInput.value = btn.getAttribute('data-suggestion');
        sendMessage();
    });
});

// Language Switcher
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Mobile Menu — overlay appended to body (contourne le backdrop-filter du header)
(function () {
    var toggle = document.querySelector('.mobile-toggle');
    if (!toggle) return;

    // Construire l'overlay
    var overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Menu de navigation');

    // Bouton fermer
    var closeBtn = document.createElement('button');
    closeBtn.className = 'mobile-close-btn';
    closeBtn.setAttribute('aria-label', 'Fermer le menu');
    closeBtn.textContent = '×';
    overlay.appendChild(closeBtn);

    // Liens de navigation
    var links = [
        { href: '#product',    label: 'Produit' },
        { href: '#conformite', label: 'Conformité' },
        { href: '#pricing',    label: 'Tarifs' },
        { href: '#faq',        label: 'FAQ' },
        { href: '#entreprise', label: 'Entreprise' },
        { href: '#contact',    label: 'Contact' }
    ];
    links.forEach(function (l) {
        var a = document.createElement('a');
        a.href = l.href;
        a.textContent = l.label;
        overlay.appendChild(a);
    });

    // Sélecteur de langue
    var langDiv = document.createElement('div');
    langDiv.className = 'mobile-lang-switcher';
    [{ href: 'index-fr.html', label: 'FR', active: true },
     { href: 'index-nl.html', label: 'NL', active: false },
     { href: 'index.html', label: 'EN', active: false }].forEach(function (l) {
        var a = document.createElement('a');
        a.href = l.href;
        a.textContent = l.label;
        if (l.active) a.className = 'active';
        langDiv.appendChild(a);
    });
    overlay.appendChild(langDiv);

    document.body.appendChild(overlay);

    function openMenu() {
        overlay.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
        overlay.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        overlay.classList.contains('open') ? closeMenu() : openMenu();
    });
    closeBtn.addEventListener('click', closeMenu);
    overlay.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeMenu);
    });
}());

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Formulaire contact — envoi réel via Web3Forms
const contactForm = document.querySelector('.contact-form-list');
if (contactForm) {
    let formLoadTime = Date.now();
    contactForm.addEventListener('focusin', () => { formLoadTime = Date.now(); }, { once: true });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('[type="submit"]');

        // Anti-spam : honeypot rempli = bot
        if (contactForm.querySelector('[name="botcheck"]')?.checked) return;
        // Anti-spam : soumission trop rapide (< 3s) = bot
        if (Date.now() - formLoadTime < 3000) return;

        const originalText = btn.textContent;
        btn.textContent = 'Envoi en cours…';
        btn.disabled = true;

        const data = {
            access_key: '7aa759a1-7d56-4c93-821e-c7d0ab4cf63e',
            subject: 'Nouveau contact — ' + (contactForm.querySelector('[name="subject"]')?.value || 'Demande'),
            from_name: 'Mandatory Shield Website',
            name: contactForm.querySelector('[name="name"]')?.value || '',
            email: contactForm.querySelector('[name="email"]')?.value || '',
            company: contactForm.querySelector('[name="company"]')?.value || '',
            message: contactForm.querySelector('[name="message"]')?.value || ''
        };

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data)
            });
            const json = await res.json();
            if (json.success) {
                btn.textContent = '✓ Message envoyé !';
                contactForm.reset();
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 4000);
            } else {
                throw new Error(json.message || 'Erreur serveur');
            }
        } catch (err) {
            btn.textContent = '✗ Erreur — réessayez';
            btn.disabled = false;
            setTimeout(() => { btn.textContent = originalText; }, 4000);
        }
    });
}

// Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .stat-item, .compliance-card, .pricing-card, .team-card').forEach(el => {
    observer.observe(el);
});
