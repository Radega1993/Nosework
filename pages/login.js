import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AuthContext from "@/contexts/AuthContext";
import AuthShell from "@/components/auth/AuthShell";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import { loginSchema } from "@/utils/validation";

export default function LoginPage() {
  const { user, login, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const router = useRouter();
  const { localizedHref } = useLocalizedLink();
  const registerHref = localizedHref("/register");

  useEffect(() => {
    if (typeof window !== "undefined" && !loading && router.isReady && user) {
      try {
        router.replace("/dashboard");
      } catch (e) {
        window.location.href = "/dashboard";
      }
    }
  }, [user, loading, router.isReady, router]);

  useEffect(() => {
    fetch("/api/auth/csrf-token", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.csrfToken) setCsrfToken(data.csrfToken);
      })
      .catch((err) => console.error("Error fetching CSRF token:", err));
  }, []);

  const validateField = (field, value) => {
    const candidate = {
      email: field === "email" ? value : email,
      password: field === "password" ? value : password,
    };
    const { error: err } = loginSchema.validate(candidate, { abortEarly: false });
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

    const { error: err } = loginSchema.validate({ email, password }, { abortEarly: false });
    if (err) {
      const errors = {};
      err.details.forEach((detail) => {
        errors[detail.path[0]] = detail.message;
      });
      setValidationErrors(errors);
      return;
    }

    try {
      await login(email, password, csrfToken);
    } catch (loginErr) {
      const errorMessage = loginErr.message || "Correo o contraseña incorrectos";
      setError(errorMessage);
    }
  };

  return (
    <AuthShell
      title="Iniciar sesión"
      subtitle="Accede a tu área privada con tu cuenta federada."
      footerLink={
        <>
          ¿No tienes cuenta?{" "}
          <Link href={registerHref} className="font-bold text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded">
            Regístrate aquí
          </Link>
        </>
      }
    >
      {error ? (
        <p className="text-red-700 text-sm mb-4 text-center bg-red-50 border border-red-200 rounded-lg py-2 px-3" role="alert">
          {error}
        </p>
      ) : null}
      <form onSubmit={handleSubmit} className="space-y-5">
        <input type="hidden" name="csrfToken" value={csrfToken} readOnly />
        <div>
          <label htmlFor="login-email" className="block text-xs font-bold uppercase tracking-wide text-on-surface-variant mb-1">
            Correo electrónico
          </label>
          <input
            id="login-email"
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
          <label htmlFor="login-password" className="block text-xs font-bold uppercase tracking-wide text-on-surface-variant mb-1">
            Contraseña
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            className={inputClass("password")}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validateField("password", e.target.value);
            }}
          />
          {validationErrors.password ? <p className="text-red-600 text-xs mt-1">{validationErrors.password}</p> : null}
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-primary text-white font-bold py-3 shadow-md hover:opacity-95 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
        >
          Entrar
        </button>
      </form>
    </AuthShell>
  );
}
