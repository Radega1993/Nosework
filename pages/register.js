import { useState, useEffect } from "react";
import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { registerSchema } from "@/utils/validation";
import { calculatePasswordStrength } from "@/utils/passwordSecurity";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(null);
  const { localizedHref } = useLocalizedLink();
  const loginHref = localizedHref("/login");

  useEffect(() => {
    fetch("/api/auth/csrf-token", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.csrfToken) setCsrfToken(data.csrfToken);
      })
      .catch((err) => console.error("Error fetching CSRF token:", err));
  }, []);

  useEffect(() => {
    if (password) {
      setPasswordStrength(calculatePasswordStrength(password));
    } else {
      setPasswordStrength(null);
    }
  }, [password]);

  const validateField = (field, value) => {
    const candidate = {
      email: field === "email" ? value : email,
      password: field === "password" ? value : password,
    };
    const { error: err } = registerSchema.validate(candidate, { abortEarly: false });
    if (err) {
      const fieldError = err.details.find((d) => d.path[0] === field);
      if (fieldError) {
        setValidationErrors((prev) => ({ ...prev, [field]: fieldError.message }));
      } else {
        setValidationErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    } else {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const inputClass = (field) =>
    `w-full rounded-lg border px-4 py-3 text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary ${
      validationErrors[field] ? "border-red-500" : "border-outline-variant"
    }`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setValidationErrors({});

    if (password !== confirmPassword) {
      setValidationErrors({ confirmPassword: "Las contraseñas no coinciden" });
      return;
    }

    const { error: err } = registerSchema.validate({ email, password }, { abortEarly: false });
    if (err) {
      const errors = {};
      err.details.forEach((detail) => {
        errors[detail.path[0]] = detail.message;
      });
      setValidationErrors(errors);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password, csrfToken }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setError("");
      } else {
        setError(data.message || data.error || "Ocurrió un error al registrar");
        if (data.error && String(data.error).includes("Demasiadas solicitudes")) {
          setError("Demasiados intentos. Espera unos minutos antes de intentar de nuevo.");
        }
      }
    } catch {
      setError("Error de conexión al servidor");
    }
  };

  return (
    <AuthShell
      title="Crear cuenta"
      subtitle="Registro seguro para acceder al área privada y al panel deportista."
      footerLink={
        <>
          ¿Ya tienes cuenta?{" "}
          <Link href={loginHref} className="font-bold text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded">
            Inicia sesión aquí
          </Link>
        </>
      }
    >
      {error ? (
        <p className="text-red-700 text-sm mb-4 text-center bg-red-50 border border-red-200 rounded-lg py-2 px-3" role="alert">
          {error}
        </p>
      ) : null}
      {success ? (
        <p className="text-on-secondary-container text-sm mb-4 text-center bg-secondary-container/40 border border-secondary rounded-lg py-3 px-3">
          ¡Registro exitoso! Ahora puedes{" "}
          <Link href={loginHref} className="font-bold text-primary underline">
            iniciar sesión
          </Link>
          .
        </p>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input type="hidden" name="csrfToken" value={csrfToken} readOnly />
        <div>
          <label htmlFor="reg-email" className="block text-xs font-bold uppercase tracking-wide text-on-surface-variant mb-1">
            Correo electrónico
          </label>
          <input
            id="reg-email"
            type="email"
            autoComplete="email"
            className={inputClass("email")}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateField("email", e.target.value);
            }}
          />
          {validationErrors.email ? <p className="text-red-600 text-xs mt-1">{validationErrors.email}</p> : null}
        </div>
        <div>
          <label htmlFor="reg-password" className="block text-xs font-bold uppercase tracking-wide text-on-surface-variant mb-1">
            Contraseña
          </label>
          <input
            id="reg-password"
            type="password"
            autoComplete="new-password"
            className={inputClass("password")}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validateField("password", e.target.value);
            }}
          />
          {validationErrors.password ? <p className="text-red-600 text-xs mt-1">{validationErrors.password}</p> : null}
          {passwordStrength ? (
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 flex-1 rounded ${
                    passwordStrength.strength === "weak"
                      ? "bg-red-500"
                      : passwordStrength.strength === "medium"
                        ? "bg-amber-400"
                        : "bg-secondary"
                  }`}
                />
                <span className="text-xs text-on-surface-variant">
                  {passwordStrength.strength === "weak"
                    ? "Débil"
                    : passwordStrength.strength === "medium"
                      ? "Media"
                      : "Fuerte"}
                </span>
              </div>
              {passwordStrength.feedback.length > 0 ? (
                <ul className="text-xs text-on-surface-variant mt-1 list-disc list-inside">
                  {passwordStrength.feedback.map((msg, idx) => (
                    <li key={idx}>{msg}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </div>
        <div>
          <label htmlFor="reg-confirm" className="block text-xs font-bold uppercase tracking-wide text-on-surface-variant mb-1">
            Confirmar contraseña
          </label>
          <input
            id="reg-confirm"
            type="password"
            autoComplete="new-password"
            className={inputClass("confirmPassword")}
            value={confirmPassword}
            onChange={(e) => {
              const v = e.target.value;
              setConfirmPassword(v);
              if (v && password !== v) {
                setValidationErrors((prev) => ({ ...prev, confirmPassword: "Las contraseñas no coinciden" }));
              } else {
                setValidationErrors((prev) => {
                  const next = { ...prev };
                  delete next.confirmPassword;
                  return next;
                });
              }
            }}
          />
          {validationErrors.confirmPassword ? (
            <p className="text-red-600 text-xs mt-1">{validationErrors.confirmPassword}</p>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={success}
          className="w-full rounded-lg bg-primary text-white font-bold py-3 shadow-md hover:opacity-95 transition-opacity disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
        >
          Registrarse
        </button>
      </form>
    </AuthShell>
  );
}
