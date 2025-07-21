import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/LoginPage.css";

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

const LoginForm = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/cagematch/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.access_token);
      setIsAuthenticated(true);
      navigate("/profile");
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2>Login</h2>

      <label>Email</label>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label>Password</label>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Login</button>

      <p className="signup-link">
        Don’t have an account? <a href="/signup">Sign up</a>
      </p>
    </form>
  );
};

export default LoginForm;