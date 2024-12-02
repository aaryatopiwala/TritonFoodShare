import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { UserContext } from "../context/AppContext";
import { login } from "../utils/user-utils";
import "./login.css";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false); // New state for confirmation message

    const { setLogin, setUsername } = useContext(UserContext);
    const navigate = useNavigate(); // React Router's navigation hook

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        try {
            const user = { username: email, password };
            const isValid = await login(user);
            if (isValid) {
                setLogin(true);
                setUsername(email);
                setSuccess(true); // Show confirmation message

                // Delay redirection to allow user to see the confirmation message
                setTimeout(() => {
                    navigate("/"); // Redirect to home page
                }, 2000); // 2 seconds delay
            } else {
                setError("Invalid email or password");
            }
        } catch (err) {
            setError("An error occurred during login");
            console.error(err);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-box">
                    <div className="login-logo">
                        <img
                            src="https://png.pngtree.com/png-vector/20220708/ourmid/pngtree-fast-food-logo-png-image_5763171.png"
                            alt="login logo"
                        />
                    </div>
                    <h1>Log in</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button type="submit">Log in</button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                    {success && (
                        <p className="success-message">
                            Login successful! Redirecting to the home page...
                        </p>
                    )}
                    <p>
                        Don’t have an account? <a href="/signup">Sign up here!</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
