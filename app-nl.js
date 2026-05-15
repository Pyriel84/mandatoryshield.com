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

document.addEventListener('DOMContentLoaded', function () {

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.parentElement;
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });

  // Chatbot toggle / close
  var toggle = document.querySelector('.chatbot-toggle');
  var win    = document.querySelector('.chatbot-window');
  var close  = document.querySelector('.chatbot-close');
  if (toggle) toggle.addEventListener('click', function () { win.classList.toggle('open'); });
  if (close)  close.addEventListener('click',  function () { win.classList.remove('open'); });

  // Quick suggestion buttons (data-quick attribute)
  document.querySelectorAll('.quick-btn[data-quick]').forEach(function (btn) {
    btn.addEventListener('click', function () { sendQuick(btn.getAttribute('data-quick')); });
  });

  // Chat input: Enter key + send button
  var input   = document.getElementById('chat-input');
  var sendBtn = document.querySelector('.chat-send-btn');
  if (input)   input.addEventListener('keydown', function (e) { if (e.key === 'Enter') sendMsg(); });
  if (sendBtn) sendBtn.addEventListener('click', sendMsg);

  // Chatbot kennisbank (bijgewerkt met nieuwe tarieven)
  var answers = {
    'tarieven':           'Onze formules zijn gesegmenteerd op basis van het aantal gebruikers. Essential (€6.900/jaar) is voor organisaties tot 100 gebruikers met Azure AD & hybride cloud inbegrepen en volledige conformiteit (NIS2, CIS Controls v8, ISO 27001, AVG, DORA). Professional (€14.900/jaar) is voor 100–250 gebruikers met 4 AD-audits/jaar en multi-site AD. Enterprise (op offerte) is voor meer dan 250 gebruikers met 24/7 monitoring en SIEM/SOC integratie.',
    'nis2':               'ADSecure koppelt alle 197 controles aan NIS2 (EU-richtlijn 2022/2555, verplicht sinds oktober 2024). Het directierapport genereert automatisch een Art. 21 conformiteitsamenvatting klaar voor auditors.',
    'gegevensbeveiliging':'Nul gegevensoverdracht. De scan draait 100% on-premise in alleen-lezen modus. Geen Active Directory-gegevens worden naar onze servers doorgestuurd. Dit is architecturaal gegarandeerd, niet alleen contractueel.',
    'demo':               'We bieden geen gratis proefversies aan, maar we organiseren gepersonaliseerde afspraken. Contacteer ons op contact@mandatoryshield.com of vul het contactformulier in!',
    'default':            'Voor meer informatie, contacteer ons op contact@mandatoryshield.com of vul het contactformulier in. Onze experts reageren binnen 24 uur.'
  };

  function addMsg(text, type) {
    var div = document.createElement('div');
    div.className = 'msg ' + type;
    if (type === 'bot') {
      var img  = document.createElement('img');
      img.src  = 'images/logo-opt.png';
      img.alt  = 'Mandatory Shield';
      img.style.cssText = 'width:28px;height:28px;object-fit:contain;flex-shrink:0;border-radius:50%;background:white;border:1px solid #e2e8f0;padding:3px;';
      var span = document.createElement('span');
      span.textContent = text;
      div.style.display    = 'flex';
      div.style.alignItems = 'flex-start';
      div.style.gap        = '8px';
      div.appendChild(img);
      div.appendChild(span);
    } else {
      div.textContent = text;
    }
    var msgs = document.getElementById('chat-msgs');
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function sendMsg() {
    var msg = input.value.trim();
    if (!msg) return;
    addMsg(msg, 'user');
    input.value = '';
    var key = Object.keys(answers).find(function (k) { return msg.toLowerCase().includes(k); }) || 'default';
    setTimeout(function () { addMsg(answers[key], 'bot'); }, 600);
  }

  function sendQuick(q) { input.value = q; sendMsg(); }

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
    [{ href: 'index.html', label: 'FR' },
     { href: 'index-nl.html', label: 'NL', active: true },
     { href: 'index-en.html', label: 'EN' }].forEach(function (l) {
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
