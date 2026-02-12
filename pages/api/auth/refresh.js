import { validateRefreshToken } from "@/utils/validation";
import { verifyRefreshToken, generateAccessToken } from "@/utils/refreshTokens";
import { logAuditEvent } from "@/utils/auditLogger";
import { getDBConnection } from "@/utils/db";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  // Validate input
  const validation = validateRefreshToken(req.body);
  if (validation.error) {
    return res.status(400).json({ error: validation.error });
  }

  const { refreshToken } = validation.value;

  try {
    // Verify refresh token
    const tokenData = verifyRefreshToken(refreshToken);
    if (!tokenData) {
      logAuditEvent("refresh_token_failed", {
        req,
        details: {
          reason: "invalid_or_expired",
          timestamp: new Date().toISOString(),
        },
      });
      return res.status(401).json({
        error: "Token inválido o expirado",
        message: "El refresh token no es válido o ha expirado.",
      });
    }

    // Get user data
    const db = getDBConnection();
    const user = db
      .prepare("SELECT id, email, role FROM users WHERE id = ?")
      .get(tokenData.userId);

    if (!user) {
      return res.status(401).json({
        error: "Usuario no encontrado",
        message: "El usuario asociado al token no existe.",
      });
    }

    // Generate new access token
    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Log successful refresh
    logAuditEvent("refresh_token_success", {
      userId: user.id,
      req,
      details: {
        timestamp: new Date().toISOString(),
      },
    });

    return res.status(200).json({
      token: accessToken,
    });
  } catch (error) {
    console.error("Error in refresh:", error);
    logAuditEvent("refresh_token_failed", {
      req,
      details: {
        reason: "server_error",
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
