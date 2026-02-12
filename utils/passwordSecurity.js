/**
 * Password security utilities
 *
 * Provides functions to validate password strength and check against common passwords.
 */

/**
 * Common passwords blacklist
 * List of commonly used passwords that should be rejected
 */
const COMMON_PASSWORDS = [
  "password",
  "password123",
  "12345678",
  "123456789",
  "1234567890",
  "qwerty",
  "qwerty123",
  "abc123",
  "letmein",
  "welcome",
  "monkey",
  "dragon",
  "master",
  "sunshine",
  "princess",
  "football",
  "iloveyou",
  "admin",
  "root",
  "nosework",
  "nosework123",
];

/**
 * Validate password strength
 *
 * @param {string} password - Password to validate
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
export function validatePasswordStrength(password) {
  const errors = [];
  
  if (!password || typeof password !== "string") {
    return { isValid: false, errors: ["La contraseña es obligatoria"] };
  }
  
  // Check minimum length
  if (password.length < 8) {
    errors.push("La contraseña debe tener al menos 8 caracteres");
  }
  
  // Check for uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push("La contraseña debe contener al menos una letra mayúscula");
  }
  
  // Check for lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push("La contraseña debe contener al menos una letra minúscula");
  }
  
  // Check for number
  if (!/\d/.test(password)) {
    errors.push("La contraseña debe contener al menos un número");
  }
  
  // Check against common passwords
  if (isCommonPassword(password)) {
    errors.push("La contraseña es demasiado común. Por favor, elige una más segura");
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Check if password is in common passwords blacklist
 *
 * @param {string} password - Password to check
 * @returns {boolean} True if password is common
 */
export function isCommonPassword(password) {
  if (!password || typeof password !== "string") {
    return false;
  }
  const lowercased = password.toLowerCase();
  return COMMON_PASSWORDS.includes(lowercased);
}

/**
 * Calculate password strength score
 *
 * @param {string} password - Password to evaluate
 * @returns {Object} { score: number, strength: 'weak'|'medium'|'strong', feedback: string[] }
 */
export function calculatePasswordStrength(password) {
  if (!password || typeof password !== "string") {
    return {
      score: 0,
      strength: "weak",
      feedback: ["La contraseña es obligatoria"],
    };
  }
  
  let score = 0;
  const feedback = [];
  
  // Length scoring
  if (password.length >= 8) score += 1;
  else feedback.push("Usa al menos 8 caracteres");
  
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  
  // Character variety scoring
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push("Añade letras minúsculas");
  
  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push("Añade letras mayúsculas");
  
  if (/\d/.test(password)) score += 1;
  else feedback.push("Añade números");
  
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  else feedback.push("Considera añadir símbolos especiales");
  
  // Determine strength
  let strength;
  if (score <= 2) {
    strength = "weak";
  } else if (score <= 4) {
    strength = "medium";
  } else {
    strength = "strong";
  }
  
  return {
    score,
    strength,
    feedback: feedback.length > 0 ? feedback : ["Contraseña segura"],
  };
}
