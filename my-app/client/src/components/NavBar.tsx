import React, { useState,useContext } from 'react';
import './NavBar.css';
import { Link } from "react-router-dom";
import {UserContext } from "../context/AppContext";
import { log } from 'console';


const NavBar: React.FC = () => {
  const {setUsername,username, login, setLogin} = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    dietaryPreferences: ["Vegan", "Gluten-Free"],
  });

  const [editableProfile, setEditableProfile] = useState({
    name: userProfile.name,
    dietaryPreferences: userProfile.dietaryPreferences.join(", "),
  });

  const handleEditSave = () => {
    // Save changes
    setUserProfile({
      ...userProfile,
      name: editableProfile.name,
      dietaryPreferences: editableProfile.dietaryPreferences.split(",").map((item) => item.trim()),
    });
    setIsEditMode(false); // Exit edit mode
  };

  const logout = () => {
    setLogin(false);
    setUsername("Have not logged in");
    setUserProfile({
      name: "",
      email: "",
      dietaryPreferences: ["Vegan", "Gluten-Free"],
    });
    setIsModalOpen(false); // Close modal on logout
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-left">
          <img
            src="https://png.pngtree.com/png-vector/20220708/ourmid/pngtree-fast-food-logo-png-image_5763171.png"
            alt="Triton FoodShare Logo"
            className="navbar-logo"
          />
          <span className="navbar-title">Triton FoodShare</span>
        </div>
        {/* only if the user hasnt logged in */}
        <div className = "navbar-links">
          {login ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/eventsubmit">Event Submission</Link>
              <Link to="/eventdisplay">Event Display</Link>
              <Link to = "/contact">Contact Us</Link>
            </>
          ) : (
            <>
              <Link to="/">Home</Link>
              <Link to="/eventsubmit">Event Submission</Link>
              <Link to="/eventdisplay">Event Display</Link>
              <Link to = "/contact">Contact Us</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
        <div className="navbar-right">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/019/879/198/small_2x/user-icon-on-transparent-background-free-png.png"
            alt="Profile"
            className="profile-icon"
            onClick={() => setIsModalOpen(true)} // Open modal
          />
        </div>
      </nav>

      {/* Profile Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => {
                setIsModalOpen(false);
                setIsEditMode(false); // Reset edit mode when closing
              }}
            >
              &times;
            </span>
            <h2>Profile Information</h2>

            {/* Display Mode */}
            {!isEditMode ? (
              <>
              <p><strong>Name:</strong> {username}</p>
              <p><strong>Dietary Preferences:</strong> {userProfile.dietaryPreferences.join(", ")}</p>
              <div className="button-container">
                <button className="edit-btn" onClick={() => setIsEditMode(true)}>
                  Edit Profile
                </button>
                {login ? (
                  <button className="edit-btn" onClick={logout}>
                    Logout
                  </button>
                ) : (
                  <Link to="/login" className="edit-btn">
                    Login
                  </Link>
                )}
              </div>
              </>
            ) : (
              // Edit Mode
              <>
                <div className="edit-field">
                  <label>Name:</label>
                  <input
                    type="text"
                    value={editableProfile.name}
                    onChange={(e) => setEditableProfile({ ...editableProfile, name: e.target.value })}
                  />
                </div>
                <div className="edit-field">
                  <label>Dietary Preferences (comma-separated):</label>
                  <input
                    type="text"
                    value={editableProfile.dietaryPreferences}
                    onChange={(e) =>
                      setEditableProfile({ ...editableProfile, dietaryPreferences: e.target.value })
                    }
                  />
                </div>
                <button className="save-btn" onClick={handleEditSave}>
                  Save
                </button>
                <button className="cancel-btn" onClick={() => setIsEditMode(false)}>
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;