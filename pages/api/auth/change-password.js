import bcrypt from "bcryptjs";
import { getDBConnection } from "@/utils/db";
import { authenticateToken } from "@/middlewares/auth";
import { validateChangePassword } from "@/utils/validation";
import { changePasswordRateLimiter } from "@/utils/rateLimiter";
import { validatePasswordStrength } from "@/utils/passwordSecurity";
import {
  logPasswordChanged,
  logPasswordChangeFailed,
} from "@/utils/auditLogger";
import {
  revokeAllUserRefreshTokens,
  invalidateUserTokens,
} from "@/utils/refreshTokens";
import { addToBlacklist } from "@/utils/tokenBlacklist";
import jwt from "jsonwebtoken";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  // Authenticate user
  authenticateToken(req, res, () => {
    // Apply rate limiting (uses user ID from req.user)
    if (!changePasswordRateLimiter(req, res)) {
      return; // Rate limit exceeded, response already sent
    }

    // Validate input
    const validation = validateChangePassword(req.body);
    if (validation.error) {
      return res.status(400).json({ error: validation.error });
    }

    const { currentPassword, newPassword, confirmPassword } = validation.value;

    // Additional password strength validation
    const passwordValidation = validatePasswordStrength(newPassword);
    if (!passwordValidation.isValid) {
      logPasswordChangeFailed(req.user.id, req, "weak_password");
      return res.status(400).json({
        error: "Contraseña no válida",
        message: passwordValidation.errors.join(", "),
      });
    }

    // Verify passwords match
    if (newPassword !== confirmPassword) {
      logPasswordChangeFailed(req.user.id, req, "passwords_dont_match");
      return res.status(400).json({
        error: "Las contraseñas no coinciden",
        message: "La nueva contraseña y la confirmación no coinciden.",
      });
    }

    try {
      const db = getDBConnection();

      // Get user with current password
      const user = db
        .prepare("SELECT * FROM users WHERE id = ?")
        .get(req.user.id);

      if (!user) {
        return res.status(404).json({
          error: "Usuario no encontrado",
          message: "El usuario no existe.",
        });
      }

      // Verify current password
      const isValidCurrentPassword = bcrypt.compareSync(
        currentPassword,
        user.password
      );
      if (!isValidCurrentPassword) {
        logPasswordChangeFailed(req.user.id, req, "invalid_current_password");
        return res.status(401).json({
          error: "Contraseña actual incorrecta",
          message: "La contraseña actual no es correcta.",
        });
      }

      // Check if new password is same as current
      const isSamePassword = bcrypt.compareSync(newPassword, user.password);
      if (isSamePassword) {
        logPasswordChangeFailed(req.user.id, req, "same_password");
        return res.status(400).json({
          error: "La nueva contraseña debe ser diferente",
          message: "La nueva contraseña debe ser diferente a la actual.",
        });
      }

      // Hash new password
      const hashedPassword = bcrypt.hashSync(newPassword, 10);

      // Update password in database
      db.prepare("UPDATE users SET password = ? WHERE id = ?").run(
        hashedPassword,
        req.user.id
      );

      // Invalidate all refresh tokens for user
      revokeAllUserRefreshTokens(req.user.id);

      // Invalidate current access token (add to blacklist)
      const token = req.headers["authorization"]?.split(" ")[1];
      if (token) {
        const decoded = jwt.decode(token);
        const expiresAt = decoded?.exp
          ? new Date(decoded.exp * 1000)
          : new Date(Date.now() + 15 * 60 * 1000);
        addToBlacklist(token, expiresAt);
      }

      // Log password change
      logPasswordChanged(req.user.id, req);

      return res.status(200).json({
        message: "Contraseña cambiada exitosamente",
      });
    } catch (error) {
      console.error("Error in change-password:", error);
      logPasswordChangeFailed(req.user.id, req, "server_error");
      return res.status(500).json({
        error: "Error interno del servidor",
        message: "Ocurrió un error al cambiar la contraseña.",
      });
    }
  });
}
