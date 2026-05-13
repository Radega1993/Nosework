import { authenticateToken } from "@/middlewares/auth";
import { getDBConnection } from "@/utils/db";
import { validateDog } from "@/utils/validation";

export default function handler(req, res) {
  const db = getDBConnection();
  const dogId = Number(req.query.id);

  if (!dogId || Number.isNaN(dogId)) {
    return res.status(400).json({ error: "ID de perro inválido" });
  }

  const getOwnedDog = (userId) =>
    db
      .prepare(
        `SELECT id, name, breed, birth_year, grade_label, photo_url, handler_user_id
         FROM dogs
         WHERE id = ? AND handler_user_id = ?`
      )
      .get(dogId, userId);

  if (req.method === "PUT") {
    return authenticateToken(req, res, () => {
      const existingDog = getOwnedDog(req.user.id);
      if (!existingDog) {
        return res.status(404).json({ error: "Perro no encontrado" });
      }

      const validation = validateDog(req.body || {});
      if (validation.error) {
        return res.status(400).json({ error: validation.error });
      }

      const { name, breed, birth_year, grade_label, photo_url } = validation.value;
      const normalizedBirthYear =
        birth_year === "" || birth_year === null || typeof birth_year === "undefined"
          ? null
          : Number(birth_year);

      db.prepare(
        `UPDATE dogs
         SET name = ?, breed = ?, birth_year = ?, grade_label = ?, photo_url = ?
         WHERE id = ? AND handler_user_id = ?`
      ).run(
        String(name).trim(),
        breed ? String(breed).trim() : null,
        normalizedBirthYear,
        grade_label ? String(grade_label).trim() : null,
        photo_url ? String(photo_url).trim() : null,
        dogId,
        req.user.id
      );

      const dog = getOwnedDog(req.user.id);
      return res.status(200).json({ message: "Perro actualizado correctamente", dog });
    });
  }

  if (req.method === "DELETE") {
    return authenticateToken(req, res, () => {
      const existingDog = getOwnedDog(req.user.id);
      if (!existingDog) {
        return res.status(404).json({ error: "Perro no encontrado" });
      }

      db.prepare("DELETE FROM dogs WHERE id = ? AND handler_user_id = ?").run(dogId, req.user.id);
      return res.status(200).json({ message: "Perro eliminado correctamente" });
    });
  }

  return res.status(405).json({ error: "Método no permitido" });
}
