/**
 * Validation utilities using Joi schemas
 *
 * Provides reusable validation schemas for authentication-related inputs.
 * All schemas are designed to be used on both client and server side.
 */

import Joi from "joi";

/**
 * Schema for login validation
 * Validates email and password fields
 * Allows additional fields like csrfToken (validated separately)
 */
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "El email debe tener un formato válido",
    "string.empty": "El email es obligatorio",
    "any.required": "El email es obligatorio",
  }),
  password: Joi.string().required().messages({
    "string.empty": "La contraseña es obligatoria",
    "any.required": "La contraseña es obligatoria",
  }),
}).unknown(true); // Allow additional fields like csrfToken

/**
 * Schema for registration validation
 * Validates email and password with strength requirements
 * Allows additional fields like csrfToken (validated separately)
 */
export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "El email debe tener un formato válido",
    "string.empty": "El email es obligatorio",
    "any.required": "El email es obligatorio",
  }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      "string.min": "La contraseña debe tener al menos 8 caracteres",
      "string.pattern.base":
        "La contraseña debe contener al menos una mayúscula, una minúscula y un número",
      "string.empty": "La contraseña es obligatoria",
      "any.required": "La contraseña es obligatoria",
    }),
}).unknown(true); // Allow additional fields like csrfToken

/**
 * Schema for change password validation
 * Validates current password, new password, and confirmation
 */
export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    "string.empty": "La contraseña actual es obligatoria",
    "any.required": "La contraseña actual es obligatoria",
  }),
  newPassword: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      "string.min": "La nueva contraseña debe tener al menos 8 caracteres",
      "string.pattern.base":
        "La nueva contraseña debe contener al menos una mayúscula, una minúscula y un número",
      "string.empty": "La nueva contraseña es obligatoria",
      "any.required": "La nueva contraseña es obligatoria",
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "Las contraseñas no coinciden",
      "string.empty": "La confirmación de contraseña es obligatoria",
      "any.required": "La confirmación de contraseña es obligatoria",
    }),
}).unknown(true);

/**
 * Schema for refresh token validation
 * Validates refresh token field
 */
export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    "string.empty": "El refresh token es obligatorio",
    "any.required": "El refresh token es obligatorio",
  }),
});

/**
 * Validate data against a schema
 *
 * @param {Object} schema - Joi schema to validate against
 * @param {Object} data - Data to validate
 * @returns {Object} { error: null|string, value: Object }
 */
export function validate(schema, data) {
  const { error, value } = schema.validate(data, { abortEarly: false });
  
  if (error) {
    const errorMessages = error.details.map((detail) => detail.message).join(", ");
    return { error: errorMessages, value: null };
  }
  
  return { error: null, value };
}

/**
 * Validate login data
 *
 * @param {Object} data - { email, password }
 * @returns {Object} { error: null|string, value: Object }
 */
export function validateLogin(data) {
  return validate(loginSchema, data);
}

/**
 * Validate registration data
 *
 * @param {Object} data - { email, password }
 * @returns {Object} { error: null|string, value: Object }
 */
export function validateRegister(data) {
  return validate(registerSchema, data);
}

/**
 * Validate change password data
 *
 * @param {Object} data - { currentPassword, newPassword, confirmPassword }
 * @returns {Object} { error: null|string, value: Object }
 */
export function validateChangePassword(data) {
  return validate(changePasswordSchema, data);
}

/**
 * Validate refresh token data
 *
 * @param {Object} data - { refreshToken }
 * @returns {Object} { error: null|string, value: Object }
 */
export function validateRefreshToken(data) {
  return validate(refreshTokenSchema, data);
}
