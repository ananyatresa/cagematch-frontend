// components/SignupForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/cagematch/sign_up`, {
        email,
        username,
        password,
      });

      // Save token (if your API returns it)
      localStorage.setItem("token", res.data.access_token);

      // Redirect to profile page after signup
      navigate("/profile");
    } catch (err) {
      alert("Signup failed");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSignup} className="signup-form">
      <h2>Sign up</h2>

      <label>Username</label>
      <input
        type="text"
        placeholder="Enter New Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      
      <label>Email</label>
      <input
        type="email"
        placeholder="Enter Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label>Password</label>
      <input
        type="password"
        placeholder="Create password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Sign Up</button>
      <p className="login-link">
        Already have an account? <a href="/login">Login</a>
      </p>
    </form>
  );
};

export default SignupForm;
