
async function switchLanguage(newLang, updateUrl = false) {
    const lang = newLang || getPreferredLang();
    setPreferredLang(lang, updateUrl);

    // Load translations
    const [localeData, fallbackData] = await Promise.all([
        loadLocale(lang),
        lang !== 'en' ? loadLocale('en') : Promise.resolve(null)
    ]);

    if (localeData) {
        setLocaleData(localeData);
    }
    if (fallbackData) {
        setLocaleData(fallbackData, true);
    }

    // Apply translations
    applyTranslations();

    // Sync select value
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.value = lang;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await switchLanguage();

    // Bind language switch UI
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            switchLanguage(e.target.value, true);
        });
    }

    // Handle language switch via links if used instead of select
    document.querySelectorAll('[data-lang-switch]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchLanguage(link.getAttribute('data-lang-switch'), true);
        });
    });

    // Handle back/forward navigation
    window.addEventListener('popstate', () => {
        switchLanguage(getPreferredLang(), false);
    });
});
