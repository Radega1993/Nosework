import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode"; // Asegúrate de instalarlo: npm install jwt-decode

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded); // El rol estará incluido en el token
        }
    }, []);

    const login = async (email, password) => {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            const data = await res.json();
            localStorage.setItem("token", data.token);
            const decoded = jwtDecode(data.token);
            setUser(decoded);
            router.push("/dashboard");
        } else {
            throw new Error("Credenciales incorrectas");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
