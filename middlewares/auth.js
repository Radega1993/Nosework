import jwt from "jsonwebtoken";
import { isTokenBlacklisted } from "@/utils/tokenBlacklist";
import { getDBConnection } from "@/utils/db";

export function authenticateToken(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1]; // Obtén el token del encabezado
    if (!token) {
        console.log("Token no proporcionado");
        return res.status(401).json({ error: "Token requerido" });
    }

    // Check if token is blacklisted before verifying signature
    if (isTokenBlacklisted(token)) {
        console.log("Token está en blacklist");
        return res.status(403).json({ error: "Token inválido" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("Error al verificar el token:", err.message);
            return res.status(403).json({ error: "Token inválido" });
        }

        console.log("Usuario en la solicitud:", user);
        req.user = user;
        next();
    });
}

export function authorizeRoles(...roles) {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            console.log("Acceso denegado. Roles requeridos:", roles);
            return res.status(403).json({ error: "Acceso denegado" });
        }
        next();
    };
}

/**
 * Permite crear/gestionar eventos si rol organizador/admin o si es dueño de al menos un club.
 */
export function authorizeOrganizerCapable(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ error: "No autorizado" });
    }
    const { id, role } = req.user;
    if (role === "organizador" || role === "administrador") {
        return next();
    }
    const db = getDBConnection();
    const row = db.prepare("SELECT 1 AS ok FROM clubs WHERE owner_user_id = ? LIMIT 1").get(id);
    if (row) {
        return next();
    }
    return res.status(403).json({ error: "Acceso denegado" });
}
