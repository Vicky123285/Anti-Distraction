import React, { useState, useContext } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { UserContext } from '../components/UserContext'; // Import UserContext

const Login = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();
  const { login } = useContext(UserContext); // Get the login function from context

  const handleInputChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password) return;

    try {
      const newUser = await signInWithEmailAndPassword(inputs.email, inputs.password);
      if (newUser) {
        const userData = { username: inputs.email.split('@')[0] }; // Extract username from email
        login(userData); // Call the login function to set user data
        navigate('/'); // Redirect to the dashboard after login
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Redirect to the dashboard if user is already signed in
  if (user) {
    const userData = { username: user.user.email.split('@')[0] }; // Extract username from email
    login(userData); // Call the login function to set user data
    navigate('/'); 
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Welcome Back!</h2>
        {/* <img src="/images/logo.jpg" alt="description" /> */}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error-message">Error: {error.message}</p>}
        {loading && <p>Loading...</p>}
        <p>Forgot your <a href="/forgot">password or username?</a></p>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p> {/* Changed to /signup */}
      </div>
    </div>
  );
};

export default Login;
