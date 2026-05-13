import { authenticateToken } from "@/middlewares/auth";
import { getDBConnection } from "@/utils/db";
import { validateDog } from "@/utils/validation";

export default function handler(req, res) {
  const db = getDBConnection();

  if (req.method === "GET") {
    return authenticateToken(req, res, () => {
      const dogs = db
        .prepare(
          `SELECT id, name, breed, birth_year, grade_label, photo_url
           FROM dogs
           WHERE handler_user_id = ?
           ORDER BY name`
        )
        .all(req.user.id);
      return res.status(200).json({ dogs });
    });
  }

  if (req.method === "POST") {
    return authenticateToken(req, res, () => {
      const validation = validateDog(req.body || {});
      if (validation.error) {
        return res.status(400).json({ error: validation.error });
      }

      const { name, breed, birth_year, grade_label, photo_url } = validation.value;
      const normalizedBirthYear =
        birth_year === "" || birth_year === null || typeof birth_year === "undefined"
          ? null
          : Number(birth_year);

      const result = db
        .prepare(
          `INSERT INTO dogs (handler_user_id, name, breed, birth_year, grade_label, photo_url)
           VALUES (?, ?, ?, ?, ?, ?)`
        )
        .run(
          req.user.id,
          String(name).trim(),
          breed ? String(breed).trim() : null,
          normalizedBirthYear,
          grade_label ? String(grade_label).trim() : null,
          photo_url ? String(photo_url).trim() : null
        );

      const dog = db
        .prepare(
          `SELECT id, name, breed, birth_year, grade_label, photo_url
           FROM dogs
           WHERE id = ?`
        )
        .get(result.lastInsertRowid);

      return res.status(201).json({ message: "Perro registrado correctamente", dog });
    });
  }

  return res.status(405).json({ error: "Método no permitido" });
}
