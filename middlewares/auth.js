import jwt from "jsonwebtoken";
import { isTokenBlacklisted } from "@/utils/tokenBlacklist";

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
