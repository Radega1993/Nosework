import { useState, useEffect, useContext } from "react";
import AuthContext from "@/contexts/AuthContext";
import { useRouter } from "next/router";

export const useAuth = () => {
    const [loading, setLoading] = useState(true);
    const { user, setUser } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = parseJwt(token);
            setUser(decoded);
        }
        setLoading(false);
    }, [setUser]);

    const login = async (email, password) => {
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error("Credenciales incorrectas");

            const data = await response.json();
            localStorage.setItem("token", data.token);
            const decoded = parseJwt(data.token);
            setUser(decoded);
            router.push("/dashboard");
        } catch (error) {
            console.error("Error en login:", error.message);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/login");
    };

    return { user, login, logout, loading };
};

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        console.error("Error al decodificar el token:", e);
        return null;
    }
};
