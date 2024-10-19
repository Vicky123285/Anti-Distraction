import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/Setting.css'; // Your main CSS file for settings

const Settings = () => {
  const navigate = useNavigate();

  // State for dark mode
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' || false;
  });

  // State for username, profile picture, blocked apps, and notification preferences
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [blockedApps, setBlockedApps] = useState([]);
  const [newBlockedApp, setNewBlockedApp] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBlockedAppChange = (e) => {
    setNewBlockedApp(e.target.value);
  };

  const addBlockedApp = () => {
    if (newBlockedApp && !blockedApps.includes(newBlockedApp)) {
      setBlockedApps([...blockedApps, newBlockedApp]);
      setNewBlockedApp('');
    }
  };

  const removeBlockedApp = (app) => {
    setBlockedApps(blockedApps.filter(item => item !== app));
  };

  const handleSaveChanges = () => {
    // Here you would normally send the updated data to the server
    alert(`Changes saved!\nUsername: ${username}\nBlocked Apps: ${blockedApps.join(', ')}\nNotifications: ${notificationsEnabled ? "Enabled" : "Disabled"}`);
    navigate("/dashboard");
  };

  const resetSettings = () => {
    setDarkMode(false);
    setUsername('');
    setProfilePicture(null);
    setBlockedApps([]);
    setNotificationsEnabled(true);
    setNewPassword("");
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      
      <div className="setting-option">
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          Day/Night Mode
        </label>
      </div>

      <div className="setting-option">
        <label>
          Change Username:
          <input 
            type="text" 
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter new username" 
          />
        </label>
      </div>

      <div className="setting-option">
        <label>
          Change Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </label>
      </div>

      <div className="setting-option">
        <label>
          Change Profile Picture:
          <input 
            type="file" 
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <div className="setting-option">
        <label>
          Blocked Apps:
          <div>
            <input 
              type="text" 
              value={newBlockedApp}
              onChange={handleBlockedAppChange}
              placeholder="Enter app name" 
            />
            <button onClick={addBlockedApp}>Add</button>
          </div>
          <ul>
            {blockedApps.map((app, index) => (
              <li key={index}>
                {app}
                <button onClick={() => removeBlockedApp(app)}>Remove</button>
              </li>
            ))}
          </ul>
        </label>
      </div>

      <div className="setting-option">
        <label>
          Notifications:
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
        </label>
      </div>

      <button onClick={handleSaveChanges}>Save Changes</button>
      <button onClick={resetSettings}>Reset to Default</button>
    </div>
  );
};

export default Settings;
