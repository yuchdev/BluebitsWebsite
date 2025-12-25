
import { describe, it, expect, beforeEach, vi } from 'vitest';
const i18n = require('../js/i18n.js');

describe('i18n logic', () => {
    const enData = {
        "nav": { "services": "Services" },
        "index": { "hero": { "title": "Welcome" } }
    };
    const viData = {
        "nav": { "services": "Dịch vụ" }
    };

    beforeEach(() => {
        i18n.setLocaleData(viData);
        i18n.setLocaleData(enData, true);
    });

    it('t() should return correct translation from current locale', () => {
        expect(i18n.t('nav.services')).toBe('Dịch vụ');
    });

    it('t() should fallback to English if key missing in current locale', () => {
        expect(i18n.t('index.hero.title')).toBe('Welcome');
    });

    it('t() should return sentinel if key missing in both locales', () => {
        expect(i18n.t('missing.key')).toBe('[missing:missing.key]');
    });

    it('getPreferredLang() should return default if nothing set', () => {
        // Mock localStorage and window.location
        global.localStorage = { getItem: vi.fn().mockReturnValue(null) };
        global.window = { location: { search: '' } };
        expect(i18n.getPreferredLang()).toBe('en');
    });

    it('getPreferredLang() should return from query param', () => {
        global.window = { location: { search: '?lang=vi' } };
        expect(i18n.getPreferredLang()).toBe('vi');
    });

    it('getPreferredLang() should return from localStorage', () => {
        global.window = { location: { search: '' } };
        global.localStorage = { getItem: vi.fn().mockReturnValue('vi') };
        expect(i18n.getPreferredLang()).toBe('vi');
    });

    it('setPreferredLang() should update URL if updateUrl is true', () => {
        const pushStateSpy = vi.fn();
        global.window = {
            location: { href: 'http://localhost/index.html' },
            history: { pushState: pushStateSpy }
        };
        global.localStorage = { setItem: vi.fn() };
        
        i18n.setPreferredLang('vi', true);
        
        expect(pushStateSpy).toHaveBeenCalled();
        const callArgs = pushStateSpy.mock.calls[0];
        expect(callArgs[2].toString()).toContain('lang=vi');
    });
});

describe('Locale parity', () => {
    it('en.json and vi.json should have the same keys', () => {
        const en = require('../i18n/en.json');
        const vi = require('../i18n/vi.json');

        function flattenKeys(obj, prefix = '') {
            return Object.keys(obj).reduce((res, el) => {
                if (Array.isArray(obj[el])) {
                    return res;
                } else if (typeof obj[el] === 'object' && obj[el] !== null) {
                    return [...res, ...flattenKeys(obj[el], prefix + el + '.')];
                }
                return [...res, prefix + el];
            }, []);
        }

        const enKeys = flattenKeys(en).sort();
        const viKeys = flattenKeys(vi).sort();

        expect(enKeys).toEqual(viKeys);
    });
});
