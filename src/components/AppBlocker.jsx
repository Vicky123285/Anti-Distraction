import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Ensure the correct path to your Sidebar component
import '../styles/AppBlocker.css';

const AppBlocker = () => {
  // Sample list of installed apps (you would fetch this in a real scenario)
  const installedApps = [
    { name: 'Facebook', packageName: 'com.facebook.katana' },
    { name: 'Instagram', packageName: 'com.instagram.android' },
    { name: 'YouTube', packageName: 'com.google.android.youtube' },
    { name: 'WhatsApp', packageName: 'com.whatsapp' },
  ];

  // State to hold selected apps
  const [selectedApps, setSelectedApps] = useState([]);

  // Function to handle selecting or unselecting an app
  const handleAppToggle = (appPackage) => {
    if (selectedApps.includes(appPackage)) {
      setSelectedApps(selectedApps.filter((app) => app !== appPackage));
    } else {
      setSelectedApps([...selectedApps, appPackage]);
    }
  };

  return (
    <div className="app-blocker-page">
      <Sidebar /> {/* Add the Sidebar component here */}
      <div className="app-blocker-content">
        <header className="app-blocker-header">
          <h1>App Blocker</h1>
          <p>Enhance your focus by blocking distracting applications.</p>
        </header>
        
        <div className="app-blocker-body">
          <h2>Select Apps to Block</h2>
          <p>
            To enhance your focus and productivity, select the applications you wish to block during your study sessions.
            Uncheck the box next to an app to unblock it.
          </p>
          <p>
            You have currently selected <strong>{selectedApps.length}</strong> app(s) to block.
          </p>
          {/* List of installed apps with checkboxes */}
          <ul>
            {installedApps.map((app) => (
              <li key={app.packageName}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedApps.includes(app.packageName)}
                    onChange={() => handleAppToggle(app.packageName)}
                  />
                  {app.name}
                </label>
              </li>
            ))}
          </ul>
          <p>Selected Apps to Block: {selectedApps.join(', ') || 'None'}</p>
        </div>
      </div>
    </div>
  );
};

export default AppBlocker;