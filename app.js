'use strict';

// Logo image error handler (remplace l'attribut onerror inline supprimé)
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
const particleCount = 80;
const connectionDistance = 150;
const mouseDistance = 200;

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

initParticles();
animate();

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
    'nis2':       'Oui, ADSecure est conforme NIS2 avec 87% de couverture. Chaque contrôle est mappé aux articles de la directive NIS2.',
    'conformité': 'ADSecure couvre NIS2 (87%), ISO 27001 (79%), CIS Controls (91%), RGPD (72%), Cyfun (83%) et DORA (68%).',
    'cloud':      'Non. ADSecure fonctionne 100% on-premise. Aucune donnée Active Directory ne quitte votre environnement.',
    'données':    'Non. ADSecure fonctionne 100% on-premise. Aucune donnée Active Directory ne quitte votre environnement.',
    'démo':       'Nous ne proposons pas d\'essai gratuit. Cependant, nous organisons des rendez-vous personnalisés. Contactez-nous à contact@mandatoryshield.com',
    'contact':    'Vous pouvez nous contacter à contact@mandatoryshield.com. Nos experts vous répondent sous 24h.'
};

document.querySelector('[data-chat-toggle]').addEventListener('click', () => {
    chatbotWindow.classList.toggle('active');
});

document.querySelector('[data-chat-close]').addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
});

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.className = 'chatbot-message ' + sender;

    const avatar = document.createElement('div');
    avatar.className = 'chatbot-avatar';
    avatar.textContent = sender === 'bot' ? 'MS' : 'VO';

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

// Mobile Menu
document.querySelector('.mobile-toggle').addEventListener('click', function () {
    const nav = document.querySelector('.nav-links');
    const isOpen = nav.classList.toggle('nav-open');
    this.setAttribute('aria-expanded', isOpen);
});

// Fermer le menu mobile après navigation
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('nav-open');
        document.querySelector('.mobile-toggle').setAttribute('aria-expanded', 'false');
    });
});

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
