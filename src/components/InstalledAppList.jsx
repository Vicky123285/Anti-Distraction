// src/components/InstalledAppsList.js
import React, { useEffect, useState } from 'react';

const InstalledAppsList = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    // Simulating fetching installed apps. Replace with actual fetching logic.
    const fetchInstalledApps = () => {
      // Dummy data for demonstration
      const dummyApps = [
        { appName: 'App One', packageName: 'com.example.app1' },
        { appName: 'App Two', packageName: 'com.example.app2' },
        { appName: 'App Three', packageName: 'com.example.app3' },
      ];
      setApps(dummyApps);
    };

    fetchInstalledApps();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Installed Apps:</h2>
      <ul>
        {apps.map((app) => (
          <li key={app.packageName}>
            {app.appName} ({app.packageName})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstalledAppsList;
