import { useContext, useEffect } from "react";
import AuthContext from "@/contexts/AuthContext";
import { useRouter } from "next/router";

export default function PrivateRoute({ children }) {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user]);

    if (!user) return null; // Mostrar nada mientras se redirige.
    return children;
}
