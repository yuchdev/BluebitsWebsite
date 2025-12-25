
const I18N_CONFIG = {
    defaultLang: 'en',
    supportedLangs: ['en', 'vi'],
    storageKey: 'preferred_lang'
};

let currentLocaleData = {};
let englishFallbackData = {};

/**
 * Get preferred language from localStorage, query param, or default.
 */
function getPreferredLang() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && I18N_CONFIG.supportedLangs.includes(langParam)) {
        return langParam;
    }

    const storedLang = localStorage.getItem(I18N_CONFIG.storageKey);
    if (storedLang && I18N_CONFIG.supportedLangs.includes(storedLang)) {
        return storedLang;
    }

    return I18N_CONFIG.defaultLang;
}

/**
 * Set preferred language and store it.
 */
function setPreferredLang(lang, updateUrl = false) {
    if (I18N_CONFIG.supportedLangs.includes(lang)) {
        localStorage.setItem(I18N_CONFIG.storageKey, lang);
        
        if (updateUrl) {
            const url = new URL(window.location.href);
            url.searchParams.set('lang', lang);
            window.history.pushState({}, '', url.toString());
        }
    }
}

/**
 * Load locale JSON file.
 */
async function loadLocale(lang) {
    try {
        const response = await fetch(`i18n/${lang}.json`);
        if (!response.ok) throw new Error(`Failed to load ${lang} locale`);
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

/**
 * Resolve nested keys in an object using dot notation.
 */
function resolveKey(obj, key) {
    return key.split('.').reduce((prev, curr) => prev ? prev[curr] : undefined, obj);
}

/**
 * Translate a key with fallback to English then sentinel.
 */
function t(key) {
    let value = resolveKey(currentLocaleData, key);
    if (value === undefined) {
        value = resolveKey(englishFallbackData, key);
    }
    return value !== undefined ? value : `[missing:${key}]`;
}

/**
 * Apply translations to the document.
 */
function applyTranslations(root = document) {
    // Translate textContent
    root.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });

    // Translate attributes
    root.querySelectorAll('[data-i18n-attr]').forEach(el => {
        const attrValue = el.getAttribute('data-i18n-attr');
        // format: attrName:key,attrName2:key2
        attrValue.split(',').forEach(part => {
            const [attrName, key] = part.split(':').map(s => s.trim());
            if (attrName && key) {
                el.setAttribute(attrName, t(key));
            }
        });
    });

    // Update <html lang>
    const currentLang = localStorage.getItem(I18N_CONFIG.storageKey) || I18N_CONFIG.defaultLang;
    document.documentElement.lang = currentLang;

    // Update <title>
    const pageId = getPageId();
    if (pageId) {
        const titleKey = `meta.title.${pageId}`;
        const translatedTitle = t(titleKey);
        if (translatedTitle !== `[missing:${titleKey}]`) {
            document.title = translatedTitle;
        }
    }
}

/**
 * Set current or fallback locale data.
 */
function setLocaleData(data, isFallback = false) {
    if (isFallback) englishFallbackData = data;
    else currentLocaleData = data;
}

/**
 * Helper to identify current page.
 */
function getPageId() {
    const path = window.location.pathname;
    const parts = path.split('/');
    const page = parts[parts.length - 1];
    if (!page || page === 'index.html' || page === '/') return 'index';
    return page.replace('.html', '');
}

const i18nExport = {
    getPreferredLang,
    setPreferredLang,
    loadLocale,
    t,
    applyTranslations,
    getPageId,
    I18N_CONFIG,
    setLocaleData
};

// Global assignments for browser support
if (typeof window !== 'undefined') {
    Object.assign(window, i18nExport);
}

// Export for use in other scripts or tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = i18nExport;
}
