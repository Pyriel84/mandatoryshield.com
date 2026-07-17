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

// FAQ accordion — top-level (script is defer, DOM is already ready)
document.querySelectorAll('[data-faq-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
        var item = btn.parentElement;
        var isOpen = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('active'); });
        if (!isOpen) item.classList.add('active');
    });
});

document.addEventListener('DOMContentLoaded', function () {

  // Chatbot
  var chatbotWindow   = document.getElementById('chatbotWindow');
  var chatbotInput    = document.getElementById('chatbotInput');
  var chatbotMessages = document.getElementById('chatbotMessages');
  var chatToggle      = document.querySelector('[data-chat-toggle]');
  var chatClose       = document.querySelector('[data-chat-close]');
  var chatSend        = document.querySelector('[data-chat-send]');

  if (chatToggle) {
    chatToggle.addEventListener('click', function () {
      var isOpen = chatbotWindow.classList.toggle('active');
      chatToggle.setAttribute('aria-expanded', isOpen);
    });
  }
  if (chatClose) {
    chatClose.addEventListener('click', function () {
      chatbotWindow.classList.remove('active');
      if (chatToggle) chatToggle.setAttribute('aria-expanded', 'false');
    });
  }

  var kb = {
    'tarief':    'Oneshot: €2.400 (eenmalig). Essential: €6.900/jaar (€575/maand). Professional: €14.900/jaar (€1.242/maand). Alle formules bevatten interventie ter plaatse met SHA-256-validatie en 7 regelgevende rapporten.',
    'prijs':     'Oneshot: €2.400 (eenmalig). Essential: €6.900/jaar (€575/maand). Professional: €14.900/jaar (€1.242/maand). Alle formules bevatten interventie ter plaatse met SHA-256-validatie en 7 regelgevende rapporten.',
    'nis2':      'ShieldAD koppelt alle 344 controles aan NIS2 (EU-richtlijn 2022/2555, verplicht sinds oktober 2024). Het directierapport genereert automatisch een Art. 21 conformiteitsamenvatting klaar voor auditors.',
    'gegeven':   'Nul gegevensoverdracht. De scan draait 100% on-premise in alleen-lezen modus. Geen Active Directory-gegevens worden naar onze servers doorgestuurd — architecturaal gegarandeerd.',
    'demo':      'We bieden geen gratis proefversies aan, maar organiseren gepersonaliseerde afspraken. Contacteer ons op contact@mandatoryshield.com of vul het contactformulier in.',
    'default':   'Contacteer ons op contact@mandatoryshield.com. Onze experts reageren binnen 24 uur.'
  };

  function addMessage(text, sender) {
    var div = document.createElement('div');
    div.className = 'chatbot-message ' + sender;
    var avatar = document.createElement('div');
    avatar.className = 'chatbot-avatar';
    if (sender === 'bot') {
      var img = document.createElement('img');
      img.src = 'images/logo.webp';
      img.alt = 'Mandatory Shield';
      avatar.appendChild(img);
    } else {
      avatar.textContent = 'U';
    }
    var bubble = document.createElement('div');
    bubble.className = 'chatbot-bubble';
    bubble.textContent = text;
    div.appendChild(avatar);
    div.appendChild(bubble);
    chatbotMessages.appendChild(div);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function findAnswer(msg) {
    var lower = msg.toLowerCase();
    for (var k in kb) { if (lower.includes(k)) return kb[k]; }
    return kb['default'];
  }

  function sendMessage() {
    var text = chatbotInput.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    chatbotInput.value = '';
    setTimeout(function () { addMessage(findAnswer(text), 'bot'); }, 500);
  }

  if (chatSend) chatSend.addEventListener('click', sendMessage);
  if (chatbotInput) chatbotInput.addEventListener('keypress', function (e) { if (e.key === 'Enter') sendMessage(); });

  document.querySelectorAll('.chatbot-suggestion').forEach(function (btn) {
    btn.addEventListener('click', function () {
      chatbotInput.value = btn.getAttribute('data-suggestion');
      sendMessage();
    });
  });

  // Mobile Menu — overlay appended to body
  (function () {
    var toggle = document.querySelector('.mobile-toggle');
    if (!toggle) return;

    var overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';

    var closeBtn = document.createElement('button');
    closeBtn.className = 'mobile-close-btn';
    closeBtn.setAttribute('aria-label', 'Menu sluiten');
    closeBtn.textContent = '×';
    overlay.appendChild(closeBtn);

    var links = [
      { href: '#product',    label: 'Product' },
      { href: '#conformite', label: 'Conformiteit' },
      { href: '#pricing',    label: 'Tarieven' },
      { href: '#faq',        label: 'FAQ' },
      { href: '#entreprise', label: 'Bedrijf' },
      { href: '#contact',    label: 'Contact' }
    ];
    links.forEach(function (l) {
      var a = document.createElement('a');
      a.href = l.href; a.textContent = l.label;
      overlay.appendChild(a);
    });

    var langDiv = document.createElement('div');
    langDiv.className = 'mobile-lang-switcher';
    [{ href: 'index-fr.html', label: 'FR' },
     { href: 'index-nl.html', label: 'NL', active: true },
     { href: 'index.html', label: 'EN' }].forEach(function (l) {
      var a = document.createElement('a');
      a.href = l.href; a.textContent = l.label;
      if (l.active) a.className = 'active';
      langDiv.appendChild(a);
    });
    overlay.appendChild(langDiv);
    document.body.appendChild(overlay);

    function openMenu()  { overlay.classList.add('open');    toggle.setAttribute('aria-expanded','true');  document.body.style.overflow='hidden'; }
    function closeMenu() { overlay.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); document.body.style.overflow=''; }

    toggle.addEventListener('click', function (e) { e.stopPropagation(); overlay.classList.contains('open') ? closeMenu() : openMenu(); });
    closeBtn.addEventListener('click', closeMenu);
    overlay.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  }());
});

// Contactformulier — echte verzending via Web3Forms
const contactForm = document.querySelector('.contact-form-list');
if (contactForm) {
    let formLoadTime = Date.now();
    contactForm.addEventListener('focusin', () => { formLoadTime = Date.now(); }, { once: true });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('[type="submit"]');

        if (contactForm.querySelector('[name="botcheck"]')?.checked) return;
        if (Date.now() - formLoadTime < 3000) return;

        const originalText = btn.textContent;
        btn.textContent = 'Verzenden…';
        btn.disabled = true;

        const data = {
            access_key: '7aa759a1-7d56-4c93-821e-c7d0ab4cf63e',
            subject: 'Nieuw contact — ' + (contactForm.querySelector('[name="subject"]')?.value || 'Aanvraag'),
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
                btn.textContent = '✓ Bericht verzonden!';
                contactForm.reset();
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 4000);
            } else {
                throw new Error(json.message || 'Serverfout');
            }
        } catch (err) {
            btn.textContent = '✗ Fout — probeer opnieuw';
            btn.disabled = false;
            setTimeout(() => { btn.textContent = originalText; }, 4000);
        }
    });
}
