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
    'nis2':               'ADSecure koppelt alle 164 controles aan NIS2 (EU-richtlijn 2022/2555, verplicht sinds oktober 2024). Het directierapport genereert automatisch een Art. 21 conformiteitsamenvatting klaar voor auditors.',
    'gegevensbeveiliging':'Nul gegevensoverdracht. De scan draait 100% on-premise in alleen-lezen modus. Geen Active Directory-gegevens worden naar onze servers doorgestuurd. Dit is architecturaal gegarandeerd, niet alleen contractueel.',
    'demo':               'We bieden geen gratis proefversies aan, maar we organiseren gepersonaliseerde afspraken. Contacteer ons op contact@mandatoryshield.com of vul het contactformulier in!',
    'default':            'Voor meer informatie, contacteer ons op contact@mandatoryshield.com of vul het contactformulier in. Onze experts reageren binnen 24 uur.'
  };

  function addMsg(text, type) {
    var div = document.createElement('div');
    div.className = 'msg ' + type;
    if (type === 'bot') {
      var img  = document.createElement('img');
      img.src  = 'images/logo.png';
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
});
