import AuthContext from "../context/AuthContext";
import { useContext } from "react";

export default function LandingPage() {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h1>Dashboard Admin</h1>
            <p>Selamat datang, {user.name}!</p>
            <p>Email: {user.email}</p>
        </div>
    );
}