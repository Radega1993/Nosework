import { createContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const logout = useCallback(async () => {
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");

        // Call logout endpoint to invalidate tokens on server
        if (token || refreshToken) {
            try {
                await fetch("/api/auth/logout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                    credentials: "include", // Include cookies for CSRF protection
                    body: JSON.stringify({ refreshToken }),
                });
            } catch (error) {
                console.error("Error calling logout endpoint:", error);
                // Continue with local logout even if server call fails
            }
        }

        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        setUser(null);
        router.push("/login");
    }, [router]);

    const refreshAccessToken = useCallback(async (refreshToken) => {
        try {
            const res = await fetch("/api/auth/refresh", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // Include cookies for CSRF protection
                body: JSON.stringify({ refreshToken }),
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem("token", data.token);
                const decoded = jwtDecode(data.token);
                setUser(decoded);
                return data.token;
            } else {
                // Refresh failed, clear tokens but don't logout (to avoid redirect loops)
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                setUser(null);
                throw new Error("Failed to refresh token");
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
            // Clear tokens but don't logout (to avoid redirect loops)
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            setUser(null);
            throw error;
        }
    }, []);

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem("token");
            const refreshToken = localStorage.getItem("refreshToken");
            
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    // Check if token is expired
                    const now = Date.now() / 1000;
                    if (decoded.exp && decoded.exp < now) {
                        // Token expired, try to refresh
                        if (refreshToken) {
                            try {
                                await refreshAccessToken(refreshToken);
                            } catch (error) {
                                // Refresh failed, clear tokens
                                localStorage.removeItem("token");
                                localStorage.removeItem("refreshToken");
                                setUser(null);
                            }
                        } else {
                            // No refresh token, clear and redirect to login
                            localStorage.removeItem("token");
                            localStorage.removeItem("refreshToken");
                            setUser(null);
                        }
                    } else {
                        setUser(decoded);
                    }
                } catch (error) {
                    console.error("Error decoding token:", error);
                    localStorage.removeItem("token");
                    localStorage.removeItem("refreshToken");
                    setUser(null);
                }
            }
            setLoading(false);
        };
        
        initializeAuth();
    }, [refreshAccessToken]);

    // Interceptor for API calls to refresh token automatically
    const apiCall = async (url, options = {}) => {
        let token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");

        // Check if token is expired or about to expire (within 1 minute)
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const now = Date.now() / 1000;
                if (decoded.exp && decoded.exp < now + 60) {
                    // Token expired or expiring soon, refresh it
                    if (refreshToken) {
                        token = await refreshAccessToken(refreshToken);
                    }
                }
            } catch (error) {
                console.error("Error checking token expiration:", error);
            }
        }

        // Add authorization header
        const headers = {
            ...options.headers,
            "Content-Type": "application/json",
        };
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(url, {
            ...options,
            headers,
            credentials: "include", // Always include cookies for CSRF protection
        });

        // If 401, try to refresh token once
        if (response.status === 401 && refreshToken && token) {
            try {
                const newToken = await refreshAccessToken(refreshToken);
                // Retry request with new token
                headers.Authorization = `Bearer ${newToken}`;
                return fetch(url, {
                    ...options,
                    headers,
                    credentials: "include", // Always include cookies for CSRF protection
                });
            } catch (error) {
                // Refresh failed, logout
                logout();
                throw error;
            }
        }

        return response;
    };

    const login = async (email, password, csrfToken = null) => {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // Include cookies (needed for CSRF token validation)
            body: JSON.stringify({ email, password, csrfToken }),
        });

        if (res.ok) {
            const data = await res.json();
            localStorage.setItem("token", data.token);
            if (data.refreshToken) {
                localStorage.setItem("refreshToken", data.refreshToken);
            }
            const decoded = jwtDecode(data.token);
            setUser(decoded);
            // Use window.location as fallback for more reliable redirect
            if (typeof window !== "undefined") {
                try {
                    if (router.isReady) {
                        router.push("/dashboard");
                    } else {
                        // Router not ready, use window.location
                        window.location.href = "/dashboard";
                    }
                } catch (error) {
                    // Fallback to window.location if router.push fails
                    console.error("Router push failed, using window.location:", error);
                    window.location.href = "/dashboard";
                }
            }
        } else {
            const errorData = await res.json();
            throw new Error(errorData.message || errorData.error || "Credenciales incorrectas");
        }
    };


    return (
        <AuthContext.Provider value={{ user, login, logout, apiCall, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
