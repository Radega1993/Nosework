import {
  sanitizeHTML,
  sanitizeEmail,
  sanitizeURL,
  sanitizeText,
  sanitizeObject,
} from '../sanitization';

describe('Sanitization Utilities', () => {
  describe('sanitizeHTML', () => {
    it('should remove HTML tags', () => {
      const result = sanitizeHTML('<script>alert("xss")</script>');
      expect(result).not.toContain('<script>');
      expect(result).not.toContain('</script>');
    });

    it('should handle empty strings', () => {
      expect(sanitizeHTML('')).toBe('');
    });

    it('should handle plain text', () => {
      expect(sanitizeHTML('plain text')).toBe('plain text');
    });
  });

  describe('sanitizeEmail', () => {
    it('should normalize valid email', () => {
      const result = sanitizeEmail('  Test@Example.COM  ');
      expect(result).toBe('test@example.com');
    });

    it('should trim whitespace', () => {
      const result = sanitizeEmail('  test@example.com  ');
      expect(result).toBe('test@example.com');
    });

    it('should handle invalid email format', () => {
      const result = sanitizeEmail('invalid-email');
      expect(result).toBe('invalid-email'); // Returns trimmed even if invalid
    });

    it('should handle empty string', () => {
      expect(sanitizeEmail('')).toBe('');
    });
  });

  describe('sanitizeURL', () => {
    it('should accept valid http URL', () => {
      const result = sanitizeURL('http://example.com');
      expect(result).toBe('http://example.com');
    });

    it('should accept valid https URL', () => {
      const result = sanitizeURL('https://example.com');
      expect(result).toBe('https://example.com');
    });

    it('should reject javascript: URLs', () => {
      const result = sanitizeURL('javascript:alert("xss")');
      expect(result).toBe('');
    });

    it('should reject invalid URLs', () => {
      const result = sanitizeURL('not-a-url');
      expect(result).toBe('');
    });

    it('should trim whitespace', () => {
      const result = sanitizeURL('  https://example.com  ');
      expect(result).toBe('https://example.com');
    });
  });

  describe('sanitizeText', () => {
    it('should remove HTML tags', () => {
      const result = sanitizeText('<p>Hello</p>');
      expect(result).toBe('Hello');
    });

    it('should remove null bytes', () => {
      const result = sanitizeText('text\0with\0nulls');
      expect(result).toBe('textwithnulls');
    });

    it('should trim whitespace', () => {
      const result = sanitizeText('  text  ');
      expect(result).toBe('text');
    });

    it('should handle empty string', () => {
      expect(sanitizeText('')).toBe('');
    });
  });

  describe('sanitizeObject', () => {
    it('should sanitize email fields', () => {
      const result = sanitizeObject({
        email: '  Test@Example.COM  ',
        name: 'John',
      });
      expect(result.email).toBe('test@example.com');
      expect(result.name).toBe('John');
    });

    it('should sanitize URL fields', () => {
      const result = sanitizeObject({
        url: '  https://example.com  ',
        website: 'http://test.com',
      });
      expect(result.url).toBe('https://example.com');
      expect(result.website).toBe('http://test.com');
    });

    it('should sanitize nested objects', () => {
      const result = sanitizeObject({
        user: {
          email: '  test@example.com  ',
          name: '<script>alert("xss")</script>',
        },
      });
      expect(result.user.email).toBe('test@example.com');
      expect(result.user.name).not.toContain('<script>');
    });

    it('should sanitize arrays', () => {
      const result = sanitizeObject({
        tags: ['<p>tag1</p>', 'tag2'],
      });
      expect(result.tags[0]).not.toContain('<p>');
      expect(result.tags[1]).toBe('tag2');
    });
  });
});
