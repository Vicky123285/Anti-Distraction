import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      {/* Add Logo with navigation to Dashboard */}
      <img
        src="/images/logo.jpg"
        alt="App Logo"
        className="logo"
        onClick={() => navigate('/dashboard')}
        style={{ cursor: 'pointer' }}  // Make the logo clickable
      />
      
      <h2 className="sidebar-header">Focus Pro</h2>
      <button onClick={() => navigate('/learning')}>Learning</button>
      <button onClick={() => navigate('/assignments')}>Assignment</button>
      <button onClick={() => navigate('/notes')}>Notes</button>
      <button onClick={() => navigate('/performance')}>Performance Analytics</button>

    </div>
  );
};

export default Sidebar;
