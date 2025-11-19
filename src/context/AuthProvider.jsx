import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { fetchUser, clearAuth } from "../services/authService";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        clearAuth();
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const loadUser = async () => {
            if (token) {
                await fetchUser()
                    .then(setUser)
                    .catch(() => logout())
                    .finally(() => setLoading(false));
            } else {
                setLoading(false);
            }
        }

        loadUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
