import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getDBConnection } from "@/utils/db";
import { validateLogin } from "@/utils/validation";
import { sanitizeEmail } from "@/utils/sanitization";
import { loginRateLimiter } from "@/utils/rateLimiter";
import { validateCSRFMiddleware } from "@/utils/csrf";
import {
  logLoginSuccess,
  logLoginFailed,
  logAccountLocked,
} from "@/utils/auditLogger";
import {
  generateRefreshToken,
  storeRefreshToken,
  generateAccessToken,
} from "@/utils/refreshTokens";

const LOCKOUT_THRESHOLD = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  // Apply rate limiting
  if (!loginRateLimiter(req, res)) {
    return; // Rate limit exceeded, response already sent
  }

  // Validate CSRF token
  if (!validateCSRFMiddleware(req, res)) {
    return; // CSRF validation failed, response already sent
  }

  // Validate input
  const validation = validateLogin(req.body);
  if (validation.error) {
    return res.status(400).json({ error: validation.error });
  }

  const { email, password } = validation.value;

  // Sanitize email
  const sanitizedEmail = sanitizeEmail(email);

  try {
    const db = getDBConnection();

    // Find user
    const user = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(sanitizedEmail);

    // Check account lockout status
    if (user) {
      const now = new Date();
      const lockedUntil = user.account_locked_until
        ? new Date(user.account_locked_until)
        : null;

      if (lockedUntil && lockedUntil > now) {
        // Account is locked
        const minutesRemaining = Math.ceil(
          (lockedUntil - now) / (60 * 1000)
        );
        logLoginFailed(sanitizedEmail, req, "account_locked");
        return res.status(423).json({
          error: "Cuenta bloqueada",
          message: `Tu cuenta está bloqueada temporalmente. Intenta de nuevo en ${minutesRemaining} minutos.`,
          lockedUntil: lockedUntil.toISOString(),
        });
      } else if (lockedUntil && lockedUntil <= now) {
        // Lockout expired, unlock account
        db.prepare(
          "UPDATE users SET failed_login_attempts = 0, account_locked_until = NULL WHERE id = ?"
        ).run(user.id);
        user.failed_login_attempts = 0;
        user.account_locked_until = null;
      }
    }

    // Verify credentials (always check password, even if user doesn't exist, to prevent user enumeration)
    const isValidPassword =
      user && bcrypt.compareSync(password, user.password);

    if (!user || !isValidPassword) {
      // Login failed
      if (user) {
        // Increment failed attempts counter
        const newFailedAttempts = (user.failed_login_attempts || 0) + 1;
        let updateQuery;
        let lockoutUntil = null;

        if (newFailedAttempts >= LOCKOUT_THRESHOLD) {
          // Lock account
          lockoutUntil = new Date(Date.now() + LOCKOUT_DURATION_MS);
          updateQuery = db.prepare(
            "UPDATE users SET failed_login_attempts = ?, account_locked_until = ? WHERE id = ?"
          );
          updateQuery.run(newFailedAttempts, lockoutUntil.toISOString(), user.id);
          logAccountLocked(
            user.id,
            req,
            newFailedAttempts,
            `${LOCKOUT_DURATION_MS / 60000} minutes`
          );
        } else {
          updateQuery = db.prepare(
            "UPDATE users SET failed_login_attempts = ? WHERE id = ?"
          );
          updateQuery.run(newFailedAttempts, user.id);
        }

        logLoginFailed(sanitizedEmail, req, "invalid_password");
      } else {
        logLoginFailed(sanitizedEmail, req, "user_not_found");
      }

      // Generic error message to prevent user enumeration
      return res.status(401).json({
        error: "Credenciales inválidas",
        message: "El email o la contraseña son incorrectos.",
      });
    }

    // Login successful - reset failed attempts and unlock account
    db.prepare(
      "UPDATE users SET failed_login_attempts = 0, account_locked_until = NULL WHERE id = ?"
    ).run(user.id);

    // Generate tokens
    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken();
    const refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    // Store refresh token
    storeRefreshToken(user.id, refreshToken, refreshTokenExpiresAt);

    // Log successful login
    logLoginSuccess(user.id, req);

    return res.status(200).json({
      token: accessToken,
      refreshToken: refreshToken,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Error in login:", error);
    logLoginFailed(sanitizedEmail, req, "server_error");
    return res.status(500).json({
      error: "Error interno del servidor",
      message: "Ocurrió un error al procesar tu solicitud.",
    });
  }
}
