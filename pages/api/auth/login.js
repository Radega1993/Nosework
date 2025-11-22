import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getDBConnection } from "@/utils/db";

export default function handler(req, res) {
    if (req.method === "POST") {
        const db = getDBConnection();
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        // Buscar usuario en la base de datos
        const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Comparar contraseñas
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        // Generar token JWT con rol incluido
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            token,
            user: { id: user.id, email: user.email, role: user.role },
        });
    }

    return res.status(405).json({ error: "Método no permitido" });
}
