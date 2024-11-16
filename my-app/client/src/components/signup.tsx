import React from 'react';
import './signup.css'; 
import NavBar from './NavBar';

const SignUpPage = () => {
    return (
        <div className="App">
    {/* <NavBar /> Navbar stays fixed or at the top */}
    <div className="signup-page">
        <div className="signup-container">
            <div className="signup-box">
                <h1>Sign Up!</h1>
                <form>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" required />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter your password" required />

                    <button type="submit">Sign Up</button>
                </form>
                <p>Already have an account? <a href="/login">Login here!</a></p>
            </div>
        </div>
    </div>
</div>
    );
};

export default SignUpPage;
