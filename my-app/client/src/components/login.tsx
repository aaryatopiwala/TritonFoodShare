import React from "react";
import "./login.css";

const LoginPage = () => {
    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-box">
                    <div className="login-logo">
                        <img src="https://png.pngtree.com/png-vector/20220708/ourmid/pngtree-fast-food-logo-png-image_5763171.png" alt="login logo" />
                    </div>
                    <h1>Log in</h1>
                    <form>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" required />

                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" required />

                        <button type="submit">Log in</button>
                    </form>
                    <p>
                        Don’t have an account? <a href="/signup">Sign up here!</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
