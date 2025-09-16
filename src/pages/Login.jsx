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
        { label: "Username", type: "text", placeholder: "johndoe" },
        { label: "Password", type: "password", placeholder: "••••••••" },
      ]}
      footerText="Don't have an account?"
      footerLink="/register"
      footerLinkText="Register"
      footerText2="Forgot your password?"
      footerLink2="/reset-password"
      footerLinkText2="Reset Password"
      onSubmit={handleLogin}
    />
  );
}

export default Login;
