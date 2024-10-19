import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const navigate = useNavigate();
  
  const handleInputChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const [createUserWithEmailAndPassword, loading1, error1] =
    useCreateUserWithEmailAndPassword(auth);
    
  const handleRegister = async (e) => {
    e.preventDefault();

    if (inputs.password !== inputs.confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      const newUser = await createUserWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (!newUser) return;
      
      const userData = {
        uid: newUser.user.uid,
        email: newUser.user.email,
        username: inputs.username,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        learning: "",
        assignmentsCompleted: 0,
        notes: "", // you have to change it later
      };

      await setDoc(doc(firestore, "users", newUser.user.uid), userData);

      setSuccessMessage("Registration successful! Redirecting to the login page...");
      setTimeout(() => {
        navigate("/login"); // Navigate to the login page after 3 seconds
      }, 3000); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleRegister}>
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleInputChange}
            required
          />
          <input
            name="username"
            type="text"
            placeholder="Username"
            onChange={handleInputChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleInputChange}
            required
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={handleInputChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>

        {successMessage && <p className="success-message">{successMessage}</p>} {/* Success message */}

        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;