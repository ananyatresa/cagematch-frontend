import React from "react";
import SignupForm from "../components/SignupForm";
import "../components/SignupPage.css"; // for styling background/layout

const SignupPage = () => {
  return (
    <div className="signup-page"
    style={{
        backgroundImage: 'url("/images/login_bg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
    }}
    >
      <div className="signup-overlay">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
