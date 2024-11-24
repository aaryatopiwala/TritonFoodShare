import React from "react";
import "./signup.css";

const SignUpPage = () => {
    return (
        <div className="signup-page">
            <div className="signup-container">
                <div className="signup-box">
                    <div className="signup-logo">
                        <img src="https://png.pngtree.com/png-vector/20220708/ourmid/pngtree-fast-food-logo-png-image_5763171.png" alt="sign up logo" />
                    </div>
                    <h1>Sign up</h1>
                    <form>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" required />

                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" required />

                        <button type="submit">Sign up</button>
                    </form>
                    <p>
                        Already have an account? <a href="/login">Login here!</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
