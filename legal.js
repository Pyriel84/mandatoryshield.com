function showTab(id) {
  document.querySelectorAll('.doc-section').forEach(function (s) { s.classList.remove('active'); });
  document.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
  document.getElementById(id).classList.add('active');
  var idx = ['privacy', 'cgu', 'cgv', 'mentions'].indexOf(id);
  document.querySelectorAll('.tab-btn')[idx].classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', '#' + id);
}

document.addEventListener('DOMContentLoaded', function () {

  // Boutons onglets (data-tab)
  document.querySelectorAll('.tab-btn[data-tab]').forEach(function (btn) {
    btn.addEventListener('click', function () { showTab(btn.getAttribute('data-tab')); });
  });

  // Boutons inline dans le contenu (data-show-tab)
  document.querySelectorAll('[data-show-tab]').forEach(function (btn) {
    btn.addEventListener('click', function () { showTab(btn.getAttribute('data-show-tab')); });
  });

  // Ouvre le bon onglet selon le hash URL
  var validTabs = ['privacy', 'cgu', 'cgv', 'mentions'];
  var hash = window.location.hash.slice(1);
  if (validTabs.includes(hash)) showTab(hash);

  // Lien retour vers la bonne version linguistique
  var ref = document.referrer;
  var targets = ['back-link', 'footer-back-link'].map(function (id) { return document.getElementById(id); });
  var dest = 'index.html';
  if (ref.includes('index-nl.html') || ref.includes('/nl')) dest = 'index-nl.html';
  else if (ref.includes('index-en.html') || ref.includes('/en')) dest = 'index-en.html';
  targets.forEach(function (el) { if (el) el.href = dest; });
});
