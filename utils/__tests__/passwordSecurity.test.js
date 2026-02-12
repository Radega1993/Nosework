import {
  validatePasswordStrength,
  isCommonPassword,
  calculatePasswordStrength,
} from '../passwordSecurity';

describe('Password Security Utilities', () => {
  describe('validatePasswordStrength', () => {
    it('should accept strong password', () => {
      const result = validatePasswordStrength('StrongPass123');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject password shorter than 8 characters', () => {
      const result = validatePasswordStrength('Short1');
      expect(result.isValid).toBe(false);
      expect(result.errors.some(err => err.includes('8 caracteres'))).toBe(true);
    });

    it('should reject password without uppercase', () => {
      const result = validatePasswordStrength('lowercase123');
      expect(result.isValid).toBe(false);
      expect(result.errors.some(err => err.includes('mayúscula'))).toBe(true);
    });

    it('should reject password without lowercase', () => {
      const result = validatePasswordStrength('UPPERCASE123');
      expect(result.isValid).toBe(false);
      expect(result.errors.some(err => err.includes('minúscula'))).toBe(true);
    });

    it('should reject password without number', () => {
      const result = validatePasswordStrength('NoNumber');
      expect(result.isValid).toBe(false);
      expect(result.errors.some(err => err.includes('número'))).toBe(true);
    });

    it('should reject common passwords', () => {
      const result = validatePasswordStrength('password123');
      expect(result.isValid).toBe(false);
      expect(result.errors.some(err => err.includes('común'))).toBe(true);
    });
  });

  describe('isCommonPassword', () => {
    it('should identify common passwords', () => {
      expect(isCommonPassword('password')).toBe(true);
      expect(isCommonPassword('password123')).toBe(true);
      expect(isCommonPassword('12345678')).toBe(true);
      expect(isCommonPassword('admin')).toBe(true);
    });

    it('should not flag unique passwords', () => {
      expect(isCommonPassword('MyUniquePass123')).toBe(false);
      expect(isCommonPassword('SecurePass2024!')).toBe(false);
    });

    it('should be case-insensitive', () => {
      expect(isCommonPassword('PASSWORD')).toBe(true);
      expect(isCommonPassword('Admin')).toBe(true);
    });
  });

  describe('calculatePasswordStrength', () => {
    it('should calculate weak password strength', () => {
      const result = calculatePasswordStrength('weak');
      expect(result.strength).toBe('weak');
      expect(result.score).toBeLessThanOrEqual(2);
    });

    it('should calculate medium password strength', () => {
      const result = calculatePasswordStrength('MediumPass1');
      expect(result.strength).toBe('medium');
      expect(result.score).toBeGreaterThan(2);
      expect(result.score).toBeLessThanOrEqual(4);
    });

    it('should calculate strong password strength', () => {
      const result = calculatePasswordStrength('VeryStrongPass123!');
      expect(result.strength).toBe('strong');
      expect(result.score).toBeGreaterThan(4);
    });

    it('should provide feedback for weak passwords', () => {
      const result = calculatePasswordStrength('weak');
      expect(result.feedback.length).toBeGreaterThan(0);
    });
  });
});
