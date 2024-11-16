import React from 'react';
import './NavBar.css';
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="https://png.pngtree.com/png-vector/20220708/ourmid/pngtree-fast-food-logo-png-image_5763171.png" alt="Triton FoodShare Logo" className="navbar-logo" />
        <span className="navbar-title">Triton FoodShare</span>
      </div>
      <Link to="/">Home</Link>
      <Link to="/eventsubmit">Event Submission</Link>
      <Link to="/eventdisplay">Event Display</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
      <div className="navbar-right">
        <img src="https://static.vecteezy.com/system/resources/thumbnails/019/879/198/small_2x/user-icon-on-transparent-background-free-png.png" alt="Profile" className="profile-icon" />
      </div>
    </nav>
  );
}

export default NavBar;
