import {
  validateLogin,
  validateRegister,
  validateChangePassword,
  validateRefreshToken,
  loginSchema,
  registerSchema,
  changePasswordSchema,
  refreshTokenSchema,
} from '../validation';

describe('Validation Utilities', () => {
  describe('loginSchema', () => {
    it('should validate correct login data', () => {
      const result = validateLogin({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(result.error).toBeNull();
      expect(result.value).toEqual({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    it('should reject invalid email', () => {
      const result = validateLogin({
        email: 'invalid-email',
        password: 'password123',
      });
      expect(result.error).toBeTruthy();
      expect(result.error).toContain('email');
    });

    it('should reject missing password', () => {
      const result = validateLogin({
        email: 'test@example.com',
      });
      expect(result.error).toBeTruthy();
      expect(result.error).toContain('contraseña');
    });

    it('should reject empty email', () => {
      const result = validateLogin({
        email: '',
        password: 'password123',
      });
      expect(result.error).toBeTruthy();
    });

    it('should allow additional fields like csrfToken', () => {
      const result = validateLogin({
        email: 'test@example.com',
        password: 'password123',
        csrfToken: 'some-csrf-token',
      });
      expect(result.error).toBeNull();
      expect(result.value.email).toBe('test@example.com');
      expect(result.value.password).toBe('password123');
    });
  });

  describe('registerSchema', () => {
    it('should validate correct registration data', () => {
      const result = validateRegister({
        email: 'test@example.com',
        password: 'Password123',
      });
      expect(result.error).toBeNull();
    });

    it('should reject weak password (too short)', () => {
      const result = validateRegister({
        email: 'test@example.com',
        password: 'Pass1',
      });
      expect(result.error).toBeTruthy();
      expect(result.error).toContain('8 caracteres');
    });

    it('should reject password without uppercase', () => {
      const result = validateRegister({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(result.error).toBeTruthy();
    });

    it('should reject password without number', () => {
      const result = validateRegister({
        email: 'test@example.com',
        password: 'Password',
      });
      expect(result.error).toBeTruthy();
    });

    it('should allow additional fields like csrfToken', () => {
      const result = validateRegister({
        email: 'test@example.com',
        password: 'Password123',
        csrfToken: 'some-csrf-token',
      });
      expect(result.error).toBeNull();
      expect(result.value.email).toBe('test@example.com');
      expect(result.value.password).toBe('Password123');
    });
  });

  describe('changePasswordSchema', () => {
    it('should validate correct change password data', () => {
      const result = validateChangePassword({
        currentPassword: 'OldPass123',
        newPassword: 'NewPass123',
        confirmPassword: 'NewPass123',
      });
      expect(result.error).toBeNull();
    });

    it('should reject mismatched passwords', () => {
      const result = validateChangePassword({
        currentPassword: 'OldPass123',
        newPassword: 'NewPass123',
        confirmPassword: 'Different123',
      });
      expect(result.error).toBeTruthy();
      expect(result.error).toContain('no coinciden');
    });

    it('should reject weak new password', () => {
      const result = validateChangePassword({
        currentPassword: 'OldPass123',
        newPassword: 'weak',
        confirmPassword: 'weak',
      });
      expect(result.error).toBeTruthy();
    });
  });

  describe('refreshTokenSchema', () => {
    it('should validate refresh token', () => {
      const result = validateRefreshToken({
        refreshToken: 'valid-token-string',
      });
      expect(result.error).toBeNull();
    });

    it('should reject missing refresh token', () => {
      const result = validateRefreshToken({});
      expect(result.error).toBeTruthy();
    });
  });
});
