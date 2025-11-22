import bcrypt from "bcryptjs";
import { getDBConnection } from "@/utils/db";

export default function handler(req, res) {
    if (req.method === "POST") {
        const db = getDBConnection();

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        // Verificar si el correo ya está registrado
        const existingUser = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
        if (existingUser) {
            return res.status(409).json({ error: "El correo ya está registrado" });
        }

        // Cifrar contraseña
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Guardar usuario en la base de datos
        db.prepare("INSERT INTO users (email, password) VALUES (?, ?)").run(email, hashedPassword);

        return res.status(201).json({ message: "Usuario registrado exitosamente" });
    }

    return res.status(405).json({ error: "Método no permitido" });
}
