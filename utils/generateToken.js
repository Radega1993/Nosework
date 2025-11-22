import jwt from "jsonwebtoken";

export function generateToken(user) {
    return jwt.sign(
        { id: user.id, role: user.role }, // Incluimos id y rol en el token
        process.env.JWT_SECRET,
        { expiresIn: "1d" } // Duración de 1 día
    );
}
