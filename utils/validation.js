/**
 * Validation utilities using Joi schemas
 *
 * Provides reusable validation schemas for authentication-related inputs.
 * All schemas are designed to be used on both client and server side.
 */

import Joi from "joi";

/** Email con formato válido sin comprobar TLD IANA (permite `.local`, útil en dev / seed demo). */
function emailString() {
  return Joi.string().trim().email({ tlds: false });
}

/**
 * Schema for login validation
 * Validates email and password fields
 * Allows additional fields like csrfToken (validated separately)
 */
export const loginSchema = Joi.object({
  email: emailString().required().messages({
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
  email: emailString().required().messages({
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
 * Schema for dog CRUD validation
 * name is required; other fields optional.
 */
export const dogSchema = Joi.object({
  name: Joi.string().trim().min(1).max(80).required().messages({
    "string.empty": "El nombre es obligatorio",
    "string.min": "El nombre es obligatorio",
    "any.required": "El nombre es obligatorio",
  }),
  breed: Joi.string().trim().allow("", null).max(120).default(""),
  birth_year: Joi.number()
    .integer()
    .min(1990)
    .max(new Date().getFullYear())
    .allow(null, "")
    .messages({
      "number.base": "El año de nacimiento debe ser un número válido",
      "number.integer": "El año de nacimiento debe ser un número entero",
      "number.min": "El año de nacimiento no es válido",
      "number.max": "El año de nacimiento no puede ser futuro",
    }),
  grade_label: Joi.string().trim().allow("", null).max(60).default(""),
  photo_url: Joi.string().trim().allow("", null).max(2500).default(""),
}).unknown(true);

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

export const clubSchema = Joi.object({
  name: Joi.string().trim().min(3).max(140).required().messages({
    "string.empty": "El nombre del club es obligatorio",
    "string.min": "El nombre del club es demasiado corto",
    "any.required": "El nombre del club es obligatorio",
  }),
}).unknown(true);

const clubLocationSchema = Joi.object({
  countryCode: Joi.string().length(2).uppercase().default("ES"),
  adminAreaLevel1: Joi.string().trim().max(80).allow("", null).default(""),
  province: Joi.string().trim().min(2).max(80).required(),
  municipality: Joi.string().trim().min(2).max(120).required(),
  postalCode: Joi.string().trim().min(2).max(12).required(),
  addressLine: Joi.string().trim().max(200).allow("", null).default(""),
  trainingVenueNotes: Joi.string().trim().max(600).allow("", null).default(""),
}).unknown(true);

export const clubCreateSchema = Joi.object({
  name: Joi.string().trim().min(3).max(140).required(),
  description: Joi.string().trim().min(10).max(8000).required(),
  websiteUrl: Joi.string().trim().uri().max(500).allow("", null),
  socialLinks: Joi.object().pattern(Joi.string(), Joi.string().trim().max(500)).max(10).default({}),
  logoUrl: Joi.string().trim().max(2500).allow("", null),
  coverImageUrl: Joi.string().trim().max(2500).allow("", null),
  foundedYear: Joi.number().integer().min(1970).max(new Date().getFullYear()).allow(null, ""),
  visibility: Joi.string().valid("public", "unlisted").default("public"),
  localeDefault: Joi.string().valid("es", "ca").default("es"),
  publicEmail: emailString().required(),
  publicPhone: Joi.string().trim().min(6).max(32).required(),
  whatsappUrl: Joi.string().trim().max(500).allow("", null),
  contactName: Joi.string().trim().max(120).allow("", null),
  contactHours: Joi.string().trim().max(300).allow("", null),
  affiliationStatus: Joi.string()
    .valid("none", "applicant", "affiliated", "suspended")
    .default("none"),
  affiliationNumber: Joi.string().trim().max(80).allow("", null),
  insuranceCertificateUrl: Joi.string().trim().max(2500).allow("", null),
  acceptsPublicListing: Joi.boolean()
    .valid(true)
    .required()
    .messages({ "any.only": "Debes consentir la publicación en el directorio" }),
  dataProcessingConsentAt: Joi.string().trim().min(10).max(40).required(),
  location: clubLocationSchema.required(),
  serviceCodes: Joi.array().items(Joi.string().max(40)).min(1).max(30).required(),
}).unknown(true);

export const clubUpdateSchema = Joi.object({
  name: Joi.string().trim().min(3).max(140),
  description: Joi.string().trim().min(10).max(8000),
  websiteUrl: Joi.string().trim().uri().max(500).allow("", null),
  socialLinks: Joi.object().pattern(Joi.string(), Joi.string().trim().max(500)).max(10),
  logoUrl: Joi.string().trim().max(2500).allow("", null),
  coverImageUrl: Joi.string().trim().max(2500).allow("", null),
  foundedYear: Joi.number().integer().min(1970).max(new Date().getFullYear()).allow(null, ""),
  visibility: Joi.string().valid("public", "unlisted"),
  localeDefault: Joi.string().valid("es", "ca"),
  publicEmail: emailString(),
  publicPhone: Joi.string().trim().min(6).max(32),
  whatsappUrl: Joi.string().trim().max(500).allow("", null),
  contactName: Joi.string().trim().max(120).allow("", null),
  contactHours: Joi.string().trim().max(300).allow("", null),
  affiliationStatus: Joi.string().valid("none", "applicant", "affiliated", "suspended"),
  affiliationNumber: Joi.string().trim().max(80).allow("", null),
  insuranceCertificateUrl: Joi.string().trim().max(2500).allow("", null),
  acceptsPublicListing: Joi.boolean(),
  dataProcessingConsentAt: Joi.string().trim().min(10).max(40),
  location: clubLocationSchema,
  serviceCodes: Joi.array().items(Joi.string().max(40)).min(1).max(30),
  internalNotes: Joi.string().trim().max(2000).allow("", null),
}).unknown(true);

export const joinRequestSchema = Joi.object({
  message: Joi.string().trim().allow("", null).max(600).default(""),
}).unknown(true);

export const invitationSchema = Joi.object({
  invitedUserId: Joi.number().integer().positive().required().messages({
    "number.base": "El usuario invitado es inválido",
    "any.required": "El usuario invitado es obligatorio",
  }),
  message: Joi.string().trim().allow("", null).max(600).default(""),
}).unknown(true);

export const reviewSchema = Joi.object({
  action: Joi.string().valid("approve", "reject").required(),
  reason: Joi.string().trim().allow("", null).max(600).default(""),
}).unknown(true);

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
 * Validate dog data
 *
 * @param {Object} data - { name, breed, birth_year, grade_label, photo_url }
 * @returns {Object} { error: null|string, value: Object }
 */
export function validateDog(data) {
  return validate(dogSchema, data);
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

export function validateClub(data) {
  return validate(clubSchema, data);
}

export function validateClubCreate(data) {
  return validate(clubCreateSchema, data);
}

export function validateClubUpdate(data) {
  return validate(clubUpdateSchema, data);
}

export function validateJoinRequest(data) {
  return validate(joinRequestSchema, data);
}

export function validateInvitation(data) {
  return validate(invitationSchema, data);
}

export function validateReview(data) {
  return validate(reviewSchema, data);
}
