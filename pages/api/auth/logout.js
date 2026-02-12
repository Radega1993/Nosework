import { authenticateToken } from "@/middlewares/auth";
import { addToBlacklist } from "@/utils/tokenBlacklist";
import { revokeRefreshToken } from "@/utils/refreshTokens";
import { logTokensInvalidated } from "@/utils/auditLogger";
import jwt from "jsonwebtoken";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  // Authenticate user
  authenticateToken(req, res, () => {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      const refreshToken = req.body?.refreshToken;

      // Decode token to get expiration
      const decoded = jwt.decode(token);
      const expiresAt = decoded?.exp
        ? new Date(decoded.exp * 1000)
        : new Date(Date.now() + 15 * 60 * 1000); // Default 15 minutes

      // Add access token to blacklist
      if (token) {
        addToBlacklist(token, expiresAt);
      }

      // Revoke refresh token if provided
      if (refreshToken) {
        revokeRefreshToken(refreshToken);
      }

      // Log token invalidation
      logTokensInvalidated(req.user.id, "logout", req);

      return res.status(200).json({
        message: "Sesión cerrada exitosamente",
      });
    } catch (error) {
      console.error("Error in logout:", error);
      return res.status(500).json({
        error: "Error interno del servidor",
        message: "Ocurrió un error al cerrar sesión.",
      });
    }
  });
}
