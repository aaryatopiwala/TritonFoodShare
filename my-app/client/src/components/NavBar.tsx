import React from 'react';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="https://png.pngtree.com/png-vector/20220708/ourmid/pngtree-fast-food-logo-png-image_5763171.png" alt="Triton FoodShare Logo" className="navbar-logo" />
        <span className="navbar-title">Triton FoodShare</span>
      </div>
      <div className="navbar-right">
        <img src="https://static.vecteezy.com/system/resources/thumbnails/019/879/198/small_2x/user-icon-on-transparent-background-free-png.png" alt="Profile" className="profile-icon" />
      </div>
    </nav>
  );
}

export default NavBar;
