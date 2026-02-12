import bcrypt from "bcryptjs";
import { getDBConnection } from "@/utils/db";
import { validateRegister } from "@/utils/validation";
import { sanitizeEmail } from "@/utils/sanitization";
import { registerRateLimiter } from "@/utils/rateLimiter";
import { validateCSRFMiddleware } from "@/utils/csrf";
import { validatePasswordStrength } from "@/utils/passwordSecurity";
import { logAuditEvent } from "@/utils/auditLogger";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  // Apply rate limiting
  if (!registerRateLimiter(req, res)) {
    return; // Rate limit exceeded, response already sent
  }

  // Validate CSRF token
  if (!validateCSRFMiddleware(req, res)) {
    return; // CSRF validation failed, response already sent
  }

  // Validate input
  const validation = validateRegister(req.body);
  if (validation.error) {
    return res.status(400).json({ error: validation.error });
  }

  const { email, password } = validation.value;

  // Additional password strength validation
  const passwordValidation = validatePasswordStrength(password);
  if (!passwordValidation.isValid) {
    return res.status(400).json({
      error: "Contraseña no válida",
      message: passwordValidation.errors.join(", "),
    });
  }

  // Sanitize email
  const sanitizedEmail = sanitizeEmail(email);

  try {
    const db = getDBConnection();

    // Check if email already exists
    const existingUser = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(sanitizedEmail);
    if (existingUser) {
      return res.status(409).json({
        error: "El correo ya está registrado",
        message: "Este correo electrónico ya está en uso.",
      });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create user
    const result = db
      .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
      .run(sanitizedEmail, hashedPassword);

    const userId = result.lastInsertRowid;

    // Log successful registration
    logAuditEvent("registration_success", {
      userId,
      req,
      details: {
        email: sanitizedEmail,
        timestamp: new Date().toISOString(),
      },
    });

    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: { id: userId, email: sanitizedEmail },
    });
  } catch (error) {
    console.error("Error in register:", error);
    logAuditEvent("registration_failed", {
      req,
      details: {
        email: sanitizedEmail,
        error: error.message,
        timestamp: new Date().toISOString(),
      },
    });
    return res.status(500).json({
      error: "Error interno del servidor",
      message: "Ocurrió un error al procesar tu solicitud.",
    });
  }
}
