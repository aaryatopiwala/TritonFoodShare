import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import "./Home.css"
const HomePage = () => {
    return (
       <div className = "main-container">
            <div className = "text-content">
                <h3>Welcome to</h3>
                <h1>Triton FoodShare!</h1>
                <div className="text-block">
                    <p>
                        the innovative platform designed to 
                        <span className="emphasis">combat food waste</span>, 
                        <span className="emphasis">alleviate stress</span> and 
                        <span className="emphasis">build community</span>. 

                        Together, we can foster 
                        <span className="emphasis">sustainability</span> by ensuring that resources are accesible 
                        for those facing <span className="emphasis">food insecurity</span>
                    </p>
                </div>

            </div>
           

            <div className = "about-us">
                <div className = "text-content-box">
                    <h2>Join Us!</h2>
                    <div className = "account-buttons">
                        <Link to = "/login">
                            <p className = "home-login-button">
                                Login
                            </p>
                        </Link>
                        <Link to = "/signup">
                            <p className = "home-signup-button">
                                Sign Up
                            </p>
                        </Link>
                        
                    </div>
                    <div className = "user-options">
                        <div className = "org-box">
                        <h4>For Organizations:</h4>
                            <p>Getting started is easy! Simply create an account for your organization and begin submitting details about any leftover food you’d like to share. Include information such as the type of food, quantity, location, and any dietary details. You can freely edit or close your submissions at any time to keep the information up-to-date.

                            [insert place holder image, this will be replaced with an image with arrows labels explaining what the tools are]</p>
                        </div>
                        <div className = "student-box">
                        <h4>For Students:</h4>
                                <p>Sign up for an account and start reserving food from events today! Browse active submissions to see all the details shared by organizations, including food type, quantity, and location. If you change your plans, you can easily unreserve your spot with just a click.

                                [insert place holder image, this will be replaced with an image with arrows labels explaining what the tools are]</p>
                        </div>
                    </div>
                </div>
            </div>
       </div>
    );
};

export default HomePage;
