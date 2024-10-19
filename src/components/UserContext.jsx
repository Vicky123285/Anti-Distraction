// context/UserContext.js
import React, { createContext, useState } from 'react';

// Create User Context
export const UserContext = createContext();

// Create a Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user state

  // Function to update user state
  const login = (userData) => {
    // Make sure you're passing an object that includes both email and username
    const { email, username } = userData; 
    setUser({ email, username }); // Set both email and username
  };

  const logout = () => {
    setUser(null); // Clear user data when logging out
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
