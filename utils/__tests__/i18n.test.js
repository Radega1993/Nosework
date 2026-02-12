/**
 * Unit tests for i18n utilities
 */

import {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  LANGUAGE_NAMES,
  LOCALE_COOKIE_NAME,
  ROUTE_MAPPING,
  getSupportedLanguages,
  getDefaultLanguage,
  isValidLanguage,
  getLanguageFromPath,
  addLanguagePrefix,
  removeLanguagePrefix,
  mapRouteToPhysicalPath,
  getLanguageFromCookie,
  setLanguageCookie,
  detectBrowserLanguage,
  getPreferredLanguage,
} from '../i18n';

describe('i18n utilities', () => {
  describe('Constants', () => {
    it('should export SUPPORTED_LANGUAGES array', () => {
      expect(SUPPORTED_LANGUAGES).toEqual(['es', 'ca']);
    });

    it('should export DEFAULT_LANGUAGE as "es"', () => {
      expect(DEFAULT_LANGUAGE).toBe('es');
    });

    it('should export LANGUAGE_NAMES object', () => {
      expect(LANGUAGE_NAMES).toEqual({
        es: 'Español',
        ca: 'Català',
      });
    });

    it('should export LOCALE_COOKIE_NAME', () => {
      expect(LOCALE_COOKIE_NAME).toBe('NEXT_LOCALE');
    });
  });

  describe('getSupportedLanguages', () => {
    it('should return array of supported languages', () => {
      const languages = getSupportedLanguages();
      expect(Array.isArray(languages)).toBe(true);
      expect(languages).toEqual(['es', 'ca']);
    });

    it('should return a copy of SUPPORTED_LANGUAGES', () => {
      const languages = getSupportedLanguages();
      languages.push('en');
      expect(getSupportedLanguages()).toEqual(['es', 'ca']);
    });
  });

  describe('getDefaultLanguage', () => {
    it('should return "es"', () => {
      expect(getDefaultLanguage()).toBe('es');
    });
  });

  describe('isValidLanguage', () => {
    it('should return true for valid languages', () => {
      expect(isValidLanguage('es')).toBe(true);
      expect(isValidLanguage('ca')).toBe(true);
    });

    it('should return false for invalid languages', () => {
      expect(isValidLanguage('en')).toBe(false);
      expect(isValidLanguage('fr')).toBe(false);
      expect(isValidLanguage('')).toBe(false);
      expect(isValidLanguage(null)).toBe(false);
      expect(isValidLanguage(undefined)).toBe(false);
    });

    it('should be case-insensitive', () => {
      expect(isValidLanguage('ES')).toBe(true);
      expect(isValidLanguage('Ca')).toBe(true);
    });
  });

  describe('getLanguageFromPath', () => {
    it('should extract language from path with prefix', () => {
      expect(getLanguageFromPath('/es/eventos')).toBe('es');
      expect(getLanguageFromPath('/ca/about')).toBe('ca');
      expect(getLanguageFromPath('/es/')).toBe('es');
      expect(getLanguageFromPath('/ca')).toBe('ca');
    });

    it('should return null for paths without language prefix', () => {
      expect(getLanguageFromPath('/eventos')).toBeNull();
      expect(getLanguageFromPath('/about')).toBeNull();
      expect(getLanguageFromPath('/')).toBeNull();
    });

    it('should return null for invalid input', () => {
      expect(getLanguageFromPath(null)).toBeNull();
      expect(getLanguageFromPath(undefined)).toBeNull();
      expect(getLanguageFromPath('')).toBeNull();
    });
  });

  describe('addLanguagePrefix', () => {
    it('should add language prefix to path', () => {
      expect(addLanguagePrefix('/eventos', 'es')).toBe('/es/eventos');
      expect(addLanguagePrefix('/about', 'ca')).toBe('/ca/about');
      expect(addLanguagePrefix('eventos', 'es')).toBe('/es/eventos');
    });

    it('should use default language if lang not provided', () => {
      expect(addLanguagePrefix('/eventos')).toBe('/es/eventos');
    });

    it('should use default language if lang is invalid', () => {
      expect(addLanguagePrefix('/eventos', 'en')).toBe('/es/eventos');
      expect(addLanguagePrefix('/eventos', null)).toBe('/es/eventos');
    });

    it('should remove existing language prefix before adding new one', () => {
      expect(addLanguagePrefix('/es/eventos', 'ca')).toBe('/ca/eventos');
      expect(addLanguagePrefix('/ca/about', 'es')).toBe('/es/about');
    });

    it('should handle root path', () => {
      expect(addLanguagePrefix('/', 'es')).toBe('/es/');
      expect(addLanguagePrefix('', 'ca')).toBe('/ca/');
    });
  });

  describe('removeLanguagePrefix', () => {
    it('should remove language prefix from path', () => {
      expect(removeLanguagePrefix('/es/eventos')).toBe('/eventos');
      expect(removeLanguagePrefix('/ca/about')).toBe('/about');
      expect(removeLanguagePrefix('/es/')).toBe('/');
    });

    it('should return path unchanged if no prefix', () => {
      expect(removeLanguagePrefix('/eventos')).toBe('/eventos');
      expect(removeLanguagePrefix('/about')).toBe('/about');
    });

    it('should handle root path', () => {
      expect(removeLanguagePrefix('/')).toBe('/');
      expect(removeLanguagePrefix('/es')).toBe('/');
    });

    it('should handle invalid input', () => {
      expect(removeLanguagePrefix(null)).toBe('/');
      expect(removeLanguagePrefix(undefined)).toBe('/');
      expect(removeLanguagePrefix('')).toBe('/');
    });
  });

  describe('getLanguageFromCookie', () => {
    it('should return language from cookie', () => {
      const req = {
        cookies: {
          [LOCALE_COOKIE_NAME]: 'es',
        },
      };
      expect(getLanguageFromCookie(req)).toBe('es');
    });

    it('should return null if cookie not found', () => {
      const req = {
        cookies: {},
      };
      expect(getLanguageFromCookie(req)).toBeNull();
    });

    it('should return null if cookie value is invalid', () => {
      const req = {
        cookies: {
          [LOCALE_COOKIE_NAME]: 'en',
        },
      };
      expect(getLanguageFromCookie(req)).toBeNull();
    });

    it('should return null if req is invalid', () => {
      expect(getLanguageFromCookie(null)).toBeNull();
      expect(getLanguageFromCookie({})).toBeNull();
      expect(getLanguageFromCookie({ cookies: null })).toBeNull();
    });
  });

  describe('setLanguageCookie', () => {
    it('should set cookie header for valid language', () => {
      const res = {
        setHeader: jest.fn(),
      };
      setLanguageCookie(res, 'es');
      expect(res.setHeader).toHaveBeenCalledWith(
        'Set-Cookie',
        expect.stringContaining('NEXT_LOCALE=es')
      );
    });

    it('should not set cookie for invalid language', () => {
      const res = {
        setHeader: jest.fn(),
      };
      setLanguageCookie(res, 'en');
      expect(res.setHeader).not.toHaveBeenCalled();
    });

    it('should not set cookie if res is invalid', () => {
      const res = {
        setHeader: jest.fn(),
      };
      setLanguageCookie(null, 'es');
      expect(res.setHeader).not.toHaveBeenCalled();
    });
  });

  describe('detectBrowserLanguage', () => {
    it('should detect Spanish from Accept-Language header', () => {
      const req = {
        headers: {
          'accept-language': 'es-ES,es;q=0.9',
        },
      };
      expect(detectBrowserLanguage(req)).toBe('es');
    });

    it('should detect Catalan from Accept-Language header', () => {
      const req = {
        headers: {
          'accept-language': 'ca,es;q=0.9',
        },
      };
      expect(detectBrowserLanguage(req)).toBe('ca');
    });

    it('should use quality values to prioritize languages', () => {
      const req = {
        headers: {
          'accept-language': 'en;q=0.9,ca;q=0.8,es;q=0.7',
        },
      };
      expect(detectBrowserLanguage(req)).toBe('ca');
    });

    it('should return null for unsupported languages', () => {
      const req = {
        headers: {
          'accept-language': 'en-US,en;q=0.9',
        },
      };
      expect(detectBrowserLanguage(req)).toBeNull();
    });

    it('should return null if header is missing', () => {
      const req = {
        headers: {},
      };
      expect(detectBrowserLanguage(req)).toBeNull();
    });

    it('should return null if req is invalid', () => {
      expect(detectBrowserLanguage(null)).toBeNull();
      expect(detectBrowserLanguage({})).toBeNull();
    });
  });

  describe('getPreferredLanguage', () => {
    it('should prioritize cookie over browser language', () => {
      const req = {
        cookies: {
          [LOCALE_COOKIE_NAME]: 'ca',
        },
        headers: {
          'accept-language': 'es-ES,es;q=0.9',
        },
      };
      expect(getPreferredLanguage(req)).toBe('ca');
    });

    it('should use browser language if no cookie', () => {
      const req = {
        cookies: {},
        headers: {
          'accept-language': 'ca,es;q=0.9',
        },
      };
      expect(getPreferredLanguage(req)).toBe('ca');
    });

    it('should fallback to default if no cookie or browser language', () => {
      const req = {
        cookies: {},
        headers: {
          'accept-language': 'en-US,en;q=0.9',
        },
      };
      expect(getPreferredLanguage(req)).toBe('es');
    });

    it('should fallback to default if req is invalid', () => {
      expect(getPreferredLanguage(null)).toBe('es');
      expect(getPreferredLanguage({})).toBe('es');
    });
  });

  describe('mapRouteToPhysicalPath', () => {
    it('should map Spanish routes to physical page paths', () => {
      expect(mapRouteToPhysicalPath('/eventos')).toBe('/events');
    });

    it('should return path unchanged if no mapping exists', () => {
      expect(mapRouteToPhysicalPath('/about')).toBe('/about');
      expect(mapRouteToPhysicalPath('/contact')).toBe('/contact');
    });

    it('should handle root path', () => {
      expect(mapRouteToPhysicalPath('/')).toBe('/');
    });

    it('should handle invalid input', () => {
      expect(mapRouteToPhysicalPath(null)).toBe('/');
      expect(mapRouteToPhysicalPath(undefined)).toBe('/');
      expect(mapRouteToPhysicalPath('')).toBe('/');
    });
  });
});
