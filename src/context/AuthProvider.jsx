import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { fetchUser, loginAndStore, registerAndStore, clearAuth } from "../services/authService";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const register = async (name, email, password, passwordConfirmation) => {
        const user = await registerAndStore(name, email, password, passwordConfirmation);
        setUser(user);
    }

    const login = async (email, password) => {
        const user = await loginAndStore(email, password);
        setUser(user);
    };

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
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
