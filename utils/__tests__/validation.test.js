import {
  validateLogin,
  validateRegister,
  validateChangePassword,
  validateRefreshToken,
  validateClub,
  validateInvitation,
  validateJoinRequest,
  validateReview,
  validateClubCreate,
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

    it('should accept demo addresses with .local TLD', () => {
      const result = validateLogin({
        email: 'admin@demo.nosework.local',
        password: 'SeedDemo2026!',
      });
      expect(result.error).toBeNull();
      expect(result.value.email).toBe('admin@demo.nosework.local');
    });

    it('should trim email on login', () => {
      const result = validateLogin({
        email: '  user@intranet.local  ',
        password: 'x',
      });
      expect(result.error).toBeNull();
      expect(result.value.email).toBe('user@intranet.local');
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

    it('should accept demo seed email with .local domain', () => {
      const result = validateRegister({
        email: 'member@demo.nosework.local',
        password: 'SeedDemo2026!',
      });
      expect(result.error).toBeNull();
      expect(result.value.email).toBe('member@demo.nosework.local');
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

  describe('club and membership schemas', () => {
    it('should validate club payload', () => {
      const result = validateClub({ name: 'Club Nosework Centro' });
      expect(result.error).toBeNull();
    });

    it('should reject invalid invited user id', () => {
      const result = validateInvitation({ invitedUserId: 'abc' });
      expect(result.error).toBeTruthy();
    });

    it('should validate join request payload', () => {
      const result = validateJoinRequest({ message: 'Quiero unirme al club.' });
      expect(result.error).toBeNull();
    });

    it('should validate approve/reject review payload', () => {
      expect(validateReview({ action: 'approve' }).error).toBeNull();
      expect(validateReview({ action: 'reject', reason: 'Datos incompletos' }).error).toBeNull();
    });

    it('should validate full club create payload (MVP)', () => {
      const consent = new Date().toISOString();
      const result = validateClubCreate({
        name: 'Club Olfato Demo',
        description: 'Club de nosework con formación y pistas en la zona centro.',
        publicEmail: 'hola@example.com',
        publicPhone: '+34600111222',
        acceptsPublicListing: true,
        dataProcessingConsentAt: consent,
        location: {
          province: 'Madrid',
          municipality: 'Madrid',
          postalCode: '28001',
        },
        serviceCodes: ['formation_grado1', 'exam_tracks'],
      });
      expect(result.error).toBeNull();
      expect(result.value.name).toBe('Club Olfato Demo');
    });

    it('should accept club publicEmail with .local TLD', () => {
      const consent = new Date().toISOString();
      const result = validateClubCreate({
        name: 'Club Red Local',
        description: 'Descripción suficiente larga para pasar validación mínima del club.',
        publicEmail: 'contacto@club.nosework.local',
        publicPhone: '+34600111222',
        acceptsPublicListing: true,
        dataProcessingConsentAt: consent,
        location: {
          province: 'Madrid',
          municipality: 'Madrid',
          postalCode: '28001',
        },
        serviceCodes: ['nosework_trial'],
      });
      expect(result.error).toBeNull();
      expect(result.value.publicEmail).toBe('contacto@club.nosework.local');
    });

    it('should reject club create without consent or services', () => {
      const base = {
        name: 'Club X',
        description: 'Descripción suficiente larga para pasar validación mínima.',
        publicEmail: 'a@b.co',
        publicPhone: '600000000',
        dataProcessingConsentAt: new Date().toISOString(),
        location: { province: 'Madrid', municipality: 'Madrid', postalCode: '28001' },
      };
      expect(
        validateClubCreate({
          ...base,
          acceptsPublicListing: false,
          serviceCodes: ['formation_grado1'],
        }).error
      ).toBeTruthy();
      expect(
        validateClubCreate({
          ...base,
          acceptsPublicListing: true,
          serviceCodes: [],
        }).error
      ).toBeTruthy();
    });
  });
});
