import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation for email format
    if (!email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    // Firebase password reset logic
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('Password reset link sent to your email!');
      setErrorMessage('');
      setTimeout(() => navigate('/login'), 3000); // Redirect to login page after 3 seconds
    } catch (error) {
      setErrorMessage('Failed to send reset link. Please try again.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password or Username</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default ForgotPassword;
