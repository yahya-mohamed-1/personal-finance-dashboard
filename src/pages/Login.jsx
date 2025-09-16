import React from "react";
import AuthForm from "../components/AuthForm";

/**
 * Login Page
 * Users enter email + password to access their account
 */
function Login() {
  const handleLogin = () => {
    // For now, just log something (later connect to API)
    console.log("Login form submitted");
  };

  return (
    <AuthForm
      title="Welcome Back 👋"
      buttonText="Login"
      fields={[
        { label: "Email", type: "email", placeholder: "you@example.com" },
        { label: "Password", type: "password", placeholder: "••••••••" },
      ]}
      footerText="Don't have an account?"
      footerLink="/register"
      footerLinkText="Register"
      onSubmit={handleLogin}
    />
  );
}

export default Login;
