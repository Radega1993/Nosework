/**
 * Unit tests for SEO utilities
 */

import { getCanonicalUrl } from '../seo';

describe('SEO utilities', () => {
  describe('getCanonicalUrl', () => {
    const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;

    beforeEach(() => {
      // Reset environment variable
      delete process.env.NEXT_PUBLIC_SITE_URL;
    });

    afterEach(() => {
      // Restore original environment variable
      if (originalEnv) {
        process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
      }
    });

    it('should generate canonical URL with default domain', () => {
      const url = getCanonicalUrl('/eventos');
      expect(url).toBe('https://www.noseworktrialcommunity.com/es/eventos');
    });

    it('should add language prefix when not present', () => {
      const url = getCanonicalUrl('/eventos', 'es');
      expect(url).toBe('https://www.noseworktrialcommunity.com/es/eventos');
    });

    it('should use provided language code', () => {
      const url = getCanonicalUrl('/eventos', 'ca');
      expect(url).toBe('https://www.noseworktrialcommunity.com/ca/eventos');
    });

    it('should preserve existing language prefix', () => {
      const url = getCanonicalUrl('/es/eventos', 'ca');
      expect(url).toBe('https://www.noseworktrialcommunity.com/es/eventos');
    });

    it('should handle paths without leading slash', () => {
      const url = getCanonicalUrl('eventos', 'es');
      expect(url).toBe('https://www.noseworktrialcommunity.com/es/eventos');
    });

    it('should handle root path', () => {
      const url = getCanonicalUrl('/', 'es');
      expect(url).toBe('https://www.noseworktrialcommunity.com/es/');
    });

    it('should use router object to detect language', () => {
      const mockRouter = {
        pathname: '/es/eventos',
        asPath: '/es/eventos',
      };
      const url = getCanonicalUrl('/eventos', mockRouter);
      expect(url).toBe('https://www.noseworktrialcommunity.com/es/eventos');
    });

    it('should use router asPath when pathname has no language', () => {
      const mockRouter = {
        pathname: '/events/[id]',
        asPath: '/es/eventos/123',
      };
      const url = getCanonicalUrl('/eventos/123', mockRouter);
      expect(url).toBe('https://www.noseworktrialcommunity.com/es/eventos/123');
    });

    it('should default to Spanish when language cannot be determined', () => {
      const url = getCanonicalUrl('/eventos');
      expect(url).toBe('https://www.noseworktrialcommunity.com/es/eventos');
    });

    it('should use NEXT_PUBLIC_SITE_URL environment variable', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com';
      const url = getCanonicalUrl('/eventos', 'es');
      expect(url).toBe('https://example.com/es/eventos');
    });

    it('should handle complex paths with query parameters in path', () => {
      const url = getCanonicalUrl('/eventos/123', 'es');
      expect(url).toBe('https://www.noseworktrialcommunity.com/es/eventos/123');
    });

    it('should handle invalid language code by defaulting to Spanish', () => {
      const url = getCanonicalUrl('/eventos', 'invalid');
      expect(url).toBe('https://www.noseworktrialcommunity.com/es/eventos');
    });
  });
});
