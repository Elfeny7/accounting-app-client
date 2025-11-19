import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthContext from "../context/AuthContext";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { register } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            setLoading(true);
            await register(name, email, password, passwordConfirmation);
            navigate("/");
        } catch (err) {
            let message = "Register failed";
            if (err.response?.data?.reason) {
                const reason = err.response.data.reason;
                const firstKey = Object.keys(reason)[0]; // contoh: "email"
                message = reason[firstKey][0];
            } else if (err.message) {
                message = err.message;
            }
            setError(message);
        } finally {
            setLoading(false);
        } 
    };

    return (
        <div className="flex h-screen bg-gray-100 justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="p-6 bg-white shadow-md rounded w-80 relative"
            >
                <h1 className="text-xl mb-4">Register</h1>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    className="p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed mb-2"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed mb-2"
                />
                <div className="relative mb-2">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        className="p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                <div className="relative mb-2">
                    <input
                        type={showPasswordConfirmation ? "text" : "password"}
                        name="passwordConfirmation"
                        placeholder="Password Confirmation"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        disabled={loading}
                        className="p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                        onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                    >
                        {showPasswordConfirmation ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                <Button type="submit" loading={loading} disabled={loading} className="mt-2 w-full">Register</Button>
            </form>
        </div>
    );
}
