import React, { useState } from "react";
import "./signup.css";
import { signup } from "../utils/user-utils";
import { User } from "../types/types";

const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Clear any previous error
        try {
            const user: User = { username, password }; // Construct the user object
            const result = await signup(user);
            if (result) {
                setSuccess(true); // Handle success
            } else {
                setError("Signup failed. Please try again with a different username.");
            }
        } catch (err) {
            setError((err as Error).message); // Capture error messages
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <div className="signup-box">
                    <div className="signup-logo">
                        <img
                            src="https://png.pngtree.com/png-vector/20220708/ourmid/pngtree-fast-food-logo-png-image_5763171.png"
                            alt="sign up logo"
                        />
                    </div>
                    <h1>Sign up</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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

                        <button type="submit">Sign up</button>
                    </form>

                    {success && <p style={{ color: "green" }}>Signup successful! You can now <a href="/login">login</a>.</p>}
                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <p>
                        Already have an account? <a href="/login">Login here!</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
