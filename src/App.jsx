// src/App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Learning from './components/Learning';
import Assignment from './components/Assignment';
import Notes from './components/Notes'; 
import AppBlocker from "./components/AppBlocker";
import ForgotPassword from "./components/ForgotPassword";
import PerformanceAnalytics from './components/PerformanceAnalytics';
import ViewProfile from "./components/ViewProfile";
import Settings from "./components/Settings";
import Faqs from "./components/Faqs";
import { UserProvider } from './components/UserContext'; // Import UserProvider

function App() {
  return (
    <UserProvider> {/* Wrap everything with UserProvider */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} /> {/* Added root route */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/assignments" element={<Assignment />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/forgot" element={<ForgotPassword/>} />
          <Route path="/appblocker" element={<AppBlocker />} />
          <Route path="/profile" element={<ViewProfile/>} />
          <Route path="/performance" element={<PerformanceAnalytics />} /> 
          <Route path="/settings" element={<Settings/>} />
          <Route path="/Faqs" element={<Faqs/>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
