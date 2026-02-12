import { generateCSRFToken, setCSRFTokenCookie } from "@/utils/csrf";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const token = generateCSRFToken();
    setCSRFTokenCookie(res, token);
    
    return res.status(200).json({ csrfToken: token });
  } catch (error) {
    console.error("Error generating CSRF token:", error);
    return res.status(500).json({
      error: "Error interno del servidor",
      message: "No se pudo generar el token CSRF.",
    });
  }
}
