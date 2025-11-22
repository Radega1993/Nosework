import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                setSuccess(true);
                setError("");
            } else {
                setError("Ocurrió un error al registrar");
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
                        <div>
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-green-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Contraseña"
                                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-green-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Confirmar contraseña"
                                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-green-500"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
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
