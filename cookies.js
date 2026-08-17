document.addEventListener('DOMContentLoaded', function () {
    var overlay = document.querySelector('[data-cookie-modal]');
    if (!overlay) return;

    var toggles = document.querySelectorAll('[data-cookie-settings-toggle]');
    var closeBtns = overlay.querySelectorAll('[data-cookie-modal-close]');
    var analyticsInput = overlay.querySelector('[data-cookie-category="analytics"]');
    var acceptAllBtn = overlay.querySelector('[data-cookie-accept-all]');
    var rejectBtn = overlay.querySelector('[data-cookie-reject]');
    var saveBtn = overlay.querySelector('[data-cookie-save]');

    function openModal() {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function storePreference(analyticsEnabled) {
        try {
            localStorage.setItem('ms_cookie_prefs', JSON.stringify({ analytics: analyticsEnabled, updatedAt: new Date().toISOString() }));
        } catch (e) {
            // localStorage unavailable (private browsing, storage disabled, etc.)
        }
    }

    try {
        var saved = JSON.parse(localStorage.getItem('ms_cookie_prefs') || 'null');
        if (saved && analyticsInput) analyticsInput.checked = !!saved.analytics;
    } catch (e) {
        // ignore malformed stored value
    }

    toggles.forEach(function (btn) { btn.addEventListener('click', openModal); });
    closeBtns.forEach(function (btn) { btn.addEventListener('click', closeModal); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
    });

    if (acceptAllBtn) acceptAllBtn.addEventListener('click', function () {
        if (analyticsInput) analyticsInput.checked = true;
        storePreference(true);
        closeModal();
    });
    if (rejectBtn) rejectBtn.addEventListener('click', function () {
        if (analyticsInput) analyticsInput.checked = false;
        storePreference(false);
        closeModal();
    });
    if (saveBtn) saveBtn.addEventListener('click', function () {
        storePreference(analyticsInput ? analyticsInput.checked : false);
        closeModal();
    });
});
