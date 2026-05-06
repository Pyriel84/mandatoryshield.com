document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('ms_lang') || 'fr';
    applyLang(savedLang);
});