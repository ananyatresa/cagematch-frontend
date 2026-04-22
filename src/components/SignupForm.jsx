// components/SignupForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../utils/firebase_config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

const FIREBASE_ERROR_MESSAGES = {
  "auth/email-already-in-use": "An account with this email already exists.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/weak-password": "Password must be at least 6 characters.",
  "auth/network-request-failed": "Network error. Please check your connection and try again.",
  "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
  "auth/operation-not-allowed": "Email/password sign-up is not enabled. Please contact support.",
};

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      setError("Username can only contain letters, numbers, underscores, and hyphens — no spaces.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      const response = await axios.post(
        `${API_BASE_URL}/cagematch/sign_up`,
        { username },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        localStorage.setItem("token", token);
        navigate("/profile");
      } else {
        setError("Signup succeeded but something went wrong. Please try again.");
      }
    } catch (err) {
      if (err.code && FIREBASE_ERROR_MESSAGES[err.code]) {
        setError(FIREBASE_ERROR_MESSAGES[err.code]);
      } else if (err.response) {
        const status = err.response.status;
        if (status === 409) {
          setError("This username is already taken. Please choose another.");
        } else if (status >= 500) {
          setError("Server error. Please try again later.");
        } else {
          setError("Signup failed. Please try again.");
        }
      } else if (err.request) {
        setError("Unable to reach the server. Please check your connection.");
      } else {
        setError("Something went wrong. Please try again.");
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-form-wrapper">
      {isLoading && (
        <div className="signup-loading-overlay">
          <div className="signup-spinner" />
        </div>
      )}

      <form onSubmit={handleSignup} className="signup-form">
        <h2>Sign up</h2>

        {error && <div className="signup-error">{error}</div>}

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />

        <label>Username</label>
        <input
          type="text"
          placeholder="Enter New Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={isLoading}
        />
        <p className="username-hint">Make it fun! Think ghostRyderr, terminator_23 or moviebuff99. No spaces allowed!</p>

        <label>Password</label>
        <input
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating account…" : "Sign Up"}
        </button>
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
