// components/SignupForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../utils/firebase_config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Create user in firebase auth and get token
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      // send token and username to BE API for saving in firestore
      const response = await axios.post(`${API_BASE_URL}/cagematch/sign_up`, { username }, { headers: {Authorization: `Bearer ${token}` } } );
      if (response.status === 201) {
        console.log(response.data.result);
      }
        // Save token for future use
      localStorage.setItem("token", token);

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

      <label>Email</label>
      <input
        type="email"
        placeholder="Enter Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label>Username</label>
      <input
        type="text"
        placeholder="Enter New Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
