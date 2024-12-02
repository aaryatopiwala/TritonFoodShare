import React, { useState, useContext } from "react";
import { UserContext } from "../context/AppContext"; 
import { login } from "../utils/user-utils"; 
import "./login.css";

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { setLogin, setUsername } = useContext(UserContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page refresh
        setError(""); // Clear any previous errors

        try {
            const user = { username: email, password }; // Adjust if backend expects different fields
            const isValid = await login(user); // Call login function from user-utils
            console.log(isValid);
            if (isValid) {
                setLogin(true); // Update global login state
                setUsername(email); // Update global username
                console.log("User logged in:", email);
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
                            type="username"
                            id="username"
                            placeholder="Enter your email"
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
                    <p>
                        Don’t have an account? <a href="/signup">Sign up here!</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
