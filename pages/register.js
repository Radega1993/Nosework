import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
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

    // Calcular fortaleza de contraseña en tiempo real
    useEffect(() => {
        if (password) {
            const strength = calculatePasswordStrength(password);
            setPasswordStrength(strength);
        } else {
            setPasswordStrength(null);
        }
    }, [password]);

    // Validación en tiempo real
    const validateField = (field, value) => {
        const { error } = registerSchema.validate({ [field]: value }, { abortEarly: false });
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

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        if (value && password !== value) {
            setValidationErrors((prev) => ({
                ...prev,
                confirmPassword: "Las contraseñas no coinciden",
            }));
        } else {
            setValidationErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.confirmPassword;
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setValidationErrors({});

        // Validar contraseñas coinciden
        if (password !== confirmPassword) {
            setValidationErrors({ confirmPassword: "Las contraseñas no coinciden" });
            return;
        }

        // Validar formulario completo
        const { error } = registerSchema.validate({ email, password }, { abortEarly: false });
        if (error) {
            const errors = {};
            error.details.forEach((detail) => {
                errors[detail.path[0]] = detail.message;
            });
            setValidationErrors(errors);
            return;
        }

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // Include cookies (needed for CSRF token validation)
                body: JSON.stringify({ email, password, csrfToken }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                setSuccess(true);
                setError("");
            } else {
                setError(data.message || data.error || "Ocurrió un error al registrar");
                
                // Handle specific error cases
                if (data.error && data.error.includes("Demasiadas solicitudes")) {
                    setError("Demasiados intentos. Por favor, espera unos minutos antes de intentar de nuevo.");
                }
            }
        } catch (err) {
            setError("Error de conexión al servidor");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="flex items-center justify-center py-12 px-6 lg:px-8">
                <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-2xl font-bold text-center mb-6 text-green-600">
                        Registrarse
                    </h1>
                    {error && (
                        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                    )}
                    {success && (
                        <p className="text-green-500 text-sm mb-4 text-center">
                            ¡Registro exitoso! Ahora puedes{" "}
                            <a href="/login" className="text-blue-500 underline">
                                iniciar sesión
                            </a>.
                        </p>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input type="hidden" name="csrfToken" value={csrfToken} />
                        <div>
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                className={`border rounded-lg p-2 w-full focus:ring-2 focus:ring-green-500 ${
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
                                placeholder="Contraseña (mínimo 8 caracteres, mayúscula, minúscula y número)"
                                className={`border rounded-lg p-2 w-full focus:ring-2 focus:ring-green-500 ${
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
                            {passwordStrength && (
                                <div className="mt-2">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`h-2 flex-1 rounded ${
                                                passwordStrength.strength === "weak"
                                                    ? "bg-red-500"
                                                    : passwordStrength.strength === "medium"
                                                    ? "bg-yellow-500"
                                                    : "bg-green-500"
                                            }`}
                                        />
                                        <span className="text-xs text-gray-600">
                                            {passwordStrength.strength === "weak"
                                                ? "Débil"
                                                : passwordStrength.strength === "medium"
                                                ? "Media"
                                                : "Fuerte"}
                                        </span>
                                    </div>
                                    {passwordStrength.feedback.length > 0 && (
                                        <ul className="text-xs text-gray-600 mt-1 list-disc list-inside">
                                            {passwordStrength.feedback.map((msg, idx) => (
                                                <li key={idx}>{msg}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Confirmar contraseña"
                                className={`border rounded-lg p-2 w-full focus:ring-2 focus:ring-green-500 ${
                                    validationErrors.confirmPassword
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                            {validationErrors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">
                                    {validationErrors.confirmPassword}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
                        >
                            Registrarse
                        </button>
                    </form>
                    <p className="text-sm text-center mt-4">
                        ¿Ya tienes cuenta?{" "}
                        <a
                            href="/login"
                            className="text-blue-500 hover:underline"
                        >
                            Inicia sesión aquí
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
