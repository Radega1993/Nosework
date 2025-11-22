import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
    const { user, login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    // Redirigir al dashboard si el usuario ya está autenticado
    useEffect(() => {
        if (user) {
            router.push("/dashboard");
        }
    }, [user, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (err) {
            setError("Correo o contraseña incorrectos");
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
                        <div>
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Contraseña"
                                className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
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
