import React from 'react';
import "./Home.css"
const HomePage = () => {
    return (
       <div className = "main-container">
            <div className = "text-content">
                Welcome to Triton Food Share!
            </div>
            <div className = "account-buttons">
                <p className = "home-login-button">
                    Login
                </p>
                <p className = "home-signup-button">
                    Sign Up
                </p>
            </div>

            <div className = "about-us">
                <div className = "text-content-box">
                    <h2>What is Triton Food Share?</h2>
                    <p>Triton Food Share is an innovative platform designed to combat food waste and promote community sharing on campus. The application empowers student organizations to submit information about leftover food, including details such as the type of food, quantity, location, and dietary considerations. These submissions are displayed for students, who can view available food options, reserve spots to pick up items, and monitor reservation counts in real-time. By streamlining the process of sharing surplus food, Triton Food Share fosters sustainability and ensures that resources are utilized effectively to benefit the campus community.</p>
                </div>
                <div className = "text-content-box">
                    <h2>How can I get started?</h2>
                    <p>For Organizations:
Getting started is easy! Simply create an account for your organization and begin submitting details about any leftover food you’d like to share. Include information such as the type of food, quantity, location, and any dietary details. You can freely edit or close your submissions at any time to keep the information up-to-date.

[insert place holder image, this will be replaced with an image with arrows labels explaining what the tools are]

For Students:
Sign up for an account and start reserving food from events today! Browse active submissions to see all the details shared by organizations, including food type, quantity, and location. If you change your plans, you can easily unreserve your spot with just a click.

[insert place holder image, this will be replaced with an image with arrows labels explaining what the tools are]</p>
                </div>
            </div>
       </div>
    );
};

export default HomePage;
