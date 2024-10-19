import React, { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext'; // Import UserContext
import '../styles/Dashboard.css'; // Link to the new CSS file

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { user, logout } = useContext(UserContext); // Get user and logout function from context
  const [profileDropdown, setProfileDropdown] = useState(false);

  const toggleDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };

  const handleOptionClick = (option) => {
    if (option === "logout") {
      handleLogout(); // Call the logout function
    } else if (option === "viewProfile") {
      navigate("/profile");
    } else if (option === "signup") {
      navigate("/signup");
    } else if (option === "faqs") {
      navigate("/faqs"); // Navigate to FAQs page
    }
  };

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate("/login"); // Navigate to login page after logout
  };

  return (
    <div className="dashboard">
      {/* Header Section */}
      <header className="dashboard-header">
        {/* App Name (Focus Pro) */}
        <div className="app-name">
          <h1>Focus Pro</h1>
        </div>

        {/* Add Logo */}
        <div className="logo">
          <img src="/images/logo.jpg" alt="App Logo" />
        </div>

        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-icon" onClick={toggleDropdown}>
            <img
              src="/images/default-profile.jpg" // Replace with actual profile picture
              alt="Profile"
            />
          </div>

          {/* Dropdown Menu */}
          {profileDropdown && (
            <ul className="profile-dropdown">
              <li onClick={() => handleOptionClick("viewProfile")}>View Profile</li>
              <li onClick={() => handleOptionClick("signup")}>Sign Up</li>
              <li onClick={() => handleOptionClick("logout")}>Logout</li>
              <li onClick={() => navigate("/settings")}>Settings</li>
              <li onClick={() => handleOptionClick("faqs")}>FAQs</li> {/* FAQs moved to the bottom */}
            </ul>
          )}
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        <h1>Welcome, {user ? user.username : "User"}</h1>
        <p>Let's focus and minimize distractions while studying.</p>

        {/* Dashboard Cards */}
        <div className="dashboard-cards">
          {/* Learning Section */}
          <div className="dashboard-card">
            <h3>Learning Progress</h3>
            <p>Track your learning modules and progress efficiently.</p>
            <Link to="/learning">
              <button>Go to Learning</button>
            </Link>
          </div>

          {/* Assignments Section */}
          <div className="dashboard-card">
            <h3>Assignments</h3>
            <p>View and complete your pending assignments.</p>
            <Link to="/assignments">
              <button>Check Assignments</button>
            </Link>
          </div>

          {/* Notes Section */}
          <div className="dashboard-card">
            <h3>Notes</h3>
            <p>Review your notes and organize your study material.</p>
            <Link to="/notes">
              <button>View Notes</button>
            </Link>
          </div>

          {/* Performance Analytics Section */}
          <div className="dashboard-card">
            <h3>Performance Analytics</h3>
            <p>Track your performance and study habits with analytics.</p>
            <Link to="/performance">
              <button>View Analytics</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
