import React from "react";
import LoginForm from "../components/LoginForm";
import "../components/LoginPage.css";

const LoginPage = ({ setIsAuthenticated }) => {
  return (
    <div className="login-page"
        style={{
            backgroundImage: 'url("/images/login_bg.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            width: "100%",
        }}
        >
            <div className="login-overlay">
            <LoginForm setIsAuthenticated={setIsAuthenticated} />
            </div>
    </div>
  );
};

export default LoginPage;