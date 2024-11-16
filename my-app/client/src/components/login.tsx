import React from 'react';
import './login.css'; 
import NavBar from './NavBar';

const LoginPage = () => {
    return (
        <div className="App">
    {/* <NavBar /> Navbar stays fixed or at the top */}
    <div className="login-page">
        <div className="login-container">
            <div className="login-box">
                <h1>Login!</h1>
                <form>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" required />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter your password" required />

                    <button type="submit">Log in</button>
                </form>
                <p>Don’t have an account? <a href="/signup">Sign up here!</a></p>
            </div>
        </div>
    </div>
</div>
    );
};

export default LoginPage;
