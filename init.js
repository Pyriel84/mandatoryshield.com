document.addEventListener('DOMContentLoaded', function() {
    // Charger la langue sauvegardée
    const savedLang = localStorage.getItem('ms_lang') || 'en';
    applyLang(savedLang);
    
    // Ajouter les event listeners aux boutons de langue
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            applyLang(lang);
        });
    });
});