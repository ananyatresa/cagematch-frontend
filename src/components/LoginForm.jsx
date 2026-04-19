import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/LoginPage.css";
import { auth, db } from "../utils/firebase_config";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const LoginForm = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
      console.log("Authenticated")

      // Fetch user uid from firebase auth and use it to fetch username from firestore
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      console.log(userDoc)
      if (userDoc.exists()) {
        const username = userDoc.data().username;
        const watchlist = userDoc.data().watchlist;
        console.log(username)
        localStorage.setItem("username", username);
        localStorage.setItem("watchlist", watchlist);
      }
      
      setIsAuthenticated(true);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/wrong-password") {
        alert("Incorrect password");
      } else if (err.code === "auth/user-not-found") {
        alert("User not found, please sign up");
      } else {
        alert("Login failed: " + err.message);
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email address first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent! Check your inbox.");
    } catch (err) {
      alert("Failed to send reset email: " + err.message);
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

      <div style={{ textAlign: "right", marginTop: "-8px" }}>
        <span
          onClick={handleForgotPassword}
          style={{ fontSize: "12px", color: "#6a0dad", cursor: "pointer" }}
        >
          Forgot password?
        </span>
      </div>

      <button type="submit">Login</button>

      <p className="signup-link">
        Don’t have an account? <a href="/signup">Sign up</a>
      </p>
    </form>
  );
};

export default LoginForm;