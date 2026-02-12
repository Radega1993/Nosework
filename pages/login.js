import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { loginSchema } from "@/utils/validation";

export default function LoginPage() {
    const { user, login, loading } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [csrfToken, setCsrfToken] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const router = useRouter();

    // Redirigir al dashboard si el usuario ya está autenticado
    useEffect(() => {
        // Wait for auth to finish loading and router to be ready before redirecting
        if (typeof window !== "undefined" && !loading && router.isReady && user && router.pathname !== "/dashboard") {
            // Only redirect if user is authenticated and not already on dashboard
            if (user.role === "organizador" && router.pathname !== "/dashboard") {
                try {
                    router.replace("/dashboard");
                } catch (error) {
                    // Fallback to window.location if router.push fails
                    console.error("Router push failed, using window.location:", error);
                    window.location.href = "/dashboard";
                }
            }
        }
    }, [user, loading, router.isReady, router.pathname]);

    // Obtener CSRF token al cargar la página
    useEffect(() => {
        fetch("/api/auth/csrf-token", {
            credentials: "include", // Include cookies
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.csrfToken) {
                    setCsrfToken(data.csrfToken);
                }
            })
            .catch((err) => {
                console.error("Error fetching CSRF token:", err);
            });
    }, []);

    // Validación en tiempo real
    const validateField = (field, value) => {
        const { error } = loginSchema.validate({ [field]: value }, { abortEarly: false });
        if (error) {
            const fieldError = error.details.find((d) => d.path[0] === field);
            if (fieldError) {
                setValidationErrors((prev) => ({
                    ...prev,
                    [field]: fieldError.message,
                }));
            }
        } else {
            setValidationErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (value) {
            validateField("email", value);
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        if (value) {
            validateField("password", value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setValidationErrors({});

        // Validar formulario completo
        const { error } = loginSchema.validate({ email, password }, { abortEarly: false });
        if (error) {
            const errors = {};
            error.details.forEach((detail) => {
                errors[detail.path[0]] = detail.message;
            });
            setValidationErrors(errors);
            return;
        }

        try {
            await login(email, password, csrfToken);
        } catch (err) {
            const errorMessage = err.message || "Correo o contraseña incorrectos";
            setError(errorMessage);
            
            // Handle specific error cases
            if (errorMessage.includes("bloqueada")) {
                setError(errorMessage);
            } else if (errorMessage.includes("Demasiadas solicitudes")) {
                setError("Demasiados intentos. Por favor, espera unos minutos antes de intentar de nuevo.");
            } else {
                setError("Correo o contraseña incorrectos");
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="flex items-center justify-center py-12 px-6 lg:px-8">
                <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
                        Iniciar Sesión
                    </h1>
                    {error && (
                        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input type="hidden" name="csrfToken" value={csrfToken} />
                        <div>
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                className={`border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 ${
                                    validationErrors.email
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                value={email}
                                onChange={handleEmailChange}
                            />
                            {validationErrors.email && (
                                <p className="text-red-500 text-xs mt-1">
                                    {validationErrors.email}
                                </p>
                            )}
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Contraseña"
                                className={`border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 ${
                                    validationErrors.password
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            {validationErrors.password && (
                                <p className="text-red-500 text-xs mt-1">
                                    {validationErrors.password}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
                        >
                            Iniciar Sesión
                        </button>
                    </form>
                    <p className="text-sm text-center mt-4">
                        ¿No tienes cuenta?{" "}
                        <a
                            href="/register"
                            className="text-blue-500 hover:underline"
                        >
                            Regístrate aquí
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
