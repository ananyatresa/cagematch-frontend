import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/LoginPage.css";
import { auth, db } from "../utils/firebase_config";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const FIREBASE_ERROR_MESSAGES = {
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/user-not-found": "No account found with this email. Please sign up.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/invalid-credential": "Incorrect email or password. Please try again.",
  "auth/too-many-requests": "Too many failed attempts. Please wait a moment and try again.",
  "auth/user-disabled": "This account has been disabled. Please contact support.",
  "auth/network-request-failed": "Network error. Please check your connection and try again.",
};

const LoginForm = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setResetMessage("");
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);

      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      if (userDoc.exists()) {
        localStorage.setItem("username", userDoc.data().username);
        localStorage.setItem("watchlist", userDoc.data().watchlist);
      }

      setIsAuthenticated(true);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError(FIREBASE_ERROR_MESSAGES[err.code] || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setResetMessage("");

    if (!email) {
      setError("Please enter your email address above before resetting your password.");
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      const msg = FIREBASE_ERROR_MESSAGES[err.code];
      setError(msg || "Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form-wrapper">
      {isLoading && (
        <div className="login-loading-overlay">
          <div className="login-spinner" />
        </div>
      )}

      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>

        {error && <div className="login-error">{error}</div>}
        {resetMessage && <div className="login-success">{resetMessage}</div>}

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />

        <div style={{ textAlign: "right", marginTop: "-8px" }}>
          <span
            onClick={!isLoading ? handleForgotPassword : undefined}
            style={{
              fontSize: "12px",
              color: isLoading ? "#aaa" : "#6a0dad",
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            Forgot password?
          </span>
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in…" : "Login"}
        </button>

        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
