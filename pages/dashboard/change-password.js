import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { changePasswordSchema } from "@/utils/validation";
import { calculatePasswordStrength } from "@/utils/passwordSecurity";

export default function ChangePasswordPage() {
    const { user, apiCall } = useContext(AuthContext);
    const router = useRouter();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [csrfToken, setCsrfToken] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const [passwordStrength, setPasswordStrength] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    // Get CSRF token on page load
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

    // Calculate password strength in real-time
    useEffect(() => {
        if (newPassword) {
            const strength = calculatePasswordStrength(newPassword);
            setPasswordStrength(strength);
        } else {
            setPasswordStrength(null);
        }
    }, [newPassword]);

    // Validation in real-time
    const validateField = (field, value) => {
        const { error } = changePasswordSchema.validate(
            { [field]: value },
            { abortEarly: false }
        );
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

    const handleCurrentPasswordChange = (e) => {
        const value = e.target.value;
        setCurrentPassword(value);
        if (value) {
            validateField("currentPassword", value);
        }
    };

    const handleNewPasswordChange = (e) => {
        const value = e.target.value;
        setNewPassword(value);
        if (value) {
            validateField("newPassword", value);
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        if (value && newPassword !== value) {
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
        setSuccess(false);
        setValidationErrors({});
        setIsSubmitting(true);

        // Validate passwords match
        if (newPassword !== confirmPassword) {
            setValidationErrors({ confirmPassword: "Las contraseñas no coinciden" });
            setIsSubmitting(false);
            return;
        }

        // Validate full form
        const { error } = changePasswordSchema.validate(
            { currentPassword, newPassword, confirmPassword },
            { abortEarly: false }
        );
        if (error) {
            const errors = {};
            error.details.forEach((detail) => {
                errors[detail.path[0]] = detail.message;
            });
            setValidationErrors(errors);
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await apiCall("/api/auth/change-password", {
                method: "POST",
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                    confirmPassword,
                    csrfToken,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setError("");
                // Redirect to login after 3 seconds
                setTimeout(() => {
                    router.push("/login");
                }, 3000);
            } else {
                setError(data.message || data.error || "Error al cambiar la contraseña");
            }
        } catch (err) {
            setError("Error de conexión al servidor");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user) {
        return null; // Will redirect
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="flex items-center justify-center py-12 px-6 lg:px-8">
                <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
                        Cambiar Contraseña
                    </h1>
                    {error && (
                        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                    )}
                    {success && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                            <p className="text-green-800 text-sm text-center">
                                ¡Contraseña cambiada exitosamente! Serás redirigido al inicio de sesión...
                            </p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input type="hidden" name="csrfToken" value={csrfToken} />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Contraseña Actual
                            </label>
                            <input
                                type="password"
                                placeholder="Contraseña actual"
                                className={`border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 ${
                                    validationErrors.currentPassword
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                value={currentPassword}
                                onChange={handleCurrentPasswordChange}
                                disabled={isSubmitting || success}
                            />
                            {validationErrors.currentPassword && (
                                <p className="text-red-500 text-xs mt-1">
                                    {validationErrors.currentPassword}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nueva Contraseña
                            </label>
                            <input
                                type="password"
                                placeholder="Nueva contraseña (mínimo 8 caracteres, mayúscula, minúscula y número)"
                                className={`border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 ${
                                    validationErrors.newPassword
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                disabled={isSubmitting || success}
                            />
                            {validationErrors.newPassword && (
                                <p className="text-red-500 text-xs mt-1">
                                    {validationErrors.newPassword}
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirmar Nueva Contraseña
                            </label>
                            <input
                                type="password"
                                placeholder="Confirmar nueva contraseña"
                                className={`border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500 ${
                                    validationErrors.confirmPassword
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                disabled={isSubmitting || success}
                            />
                            {validationErrors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">
                                    {validationErrors.confirmPassword}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting || success}
                            className={`w-full py-2 px-4 rounded font-bold ${
                                isSubmitting || success
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-500 hover:bg-blue-600"
                            } text-white`}
                        >
                            {isSubmitting ? "Cambiando..." : success ? "Contraseña Cambiada" : "Cambiar Contraseña"}
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <a
                            href="/dashboard"
                            className="text-sm text-blue-500 hover:underline"
                        >
                            Volver al Dashboard
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
