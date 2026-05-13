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

  // Chatbot knowledge base (updated with new pricing)
  var answers = {
    'pricing':      'Our plans are segmented by user count. Essential (€6,900/year) covers up to 100 users with Azure AD & hybrid cloud included and full compliance (NIS2, CIS Controls v8, ISO 27001, GDPR, DORA). Professional (€14,900/year) targets 100–250 users with 4 AD audits/year and multi-site AD. Enterprise (on quote) covers 250+ users with 24/7 monitoring and SIEM/SOC integration.',
    'nis2':         'ADSecure maps all 164 controls to NIS2 (EU Directive 2022/2555, mandatory since October 2024). The management report automatically generates an Art. 21 compliance summary ready for auditors.',
    'data security':'Zero data transmitted. The scan runs 100% on-premise in read-only mode. No Active Directory data transits to our servers. This is guaranteed architecturally, not contractually.',
    'demo':         'We do not offer free trials, but we organize personalized appointments. Contact us at contact@mandatoryshield.com or fill out the contact form!',
    'default':      'For more information, contact us at contact@mandatoryshield.com or fill out the contact form. Our experts will respond within 24 hours.'
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
      div.style.display     = 'flex';
      div.style.alignItems  = 'flex-start';
      div.style.gap         = '8px';
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

  // Mobile Menu
  var mobileToggle = document.querySelector('.mobile-toggle');
  var navLinks = document.querySelector('.nav-links');
  var langSwitcher = document.querySelector('.nav-right .lang-switcher');

  if (mobileToggle && navLinks) {
    if (langSwitcher && window.innerWidth <= 768) {
      navLinks.appendChild(langSwitcher.cloneNode(true));
    }

    mobileToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', function (e) {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
});
