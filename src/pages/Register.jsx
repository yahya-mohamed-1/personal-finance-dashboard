import React from "react";
import AuthForm from "../components/AuthForm";

/**
 * Register Page
 * Users create an account with name, email, and password
 */
function Register() {
  const handleRegister = () => {
    console.log("Register form submitted");
  };

  return (
    <AuthForm
      title="Create Your Account ✨"
      buttonText="Register"
      fields={[
        { label: "Name", type: "text", placeholder: "John Doe" },
        { label: "Username", type: "text", placeholder: "johndoe" },
        { label: "Email", type: "email", placeholder: "you@example.com" },
        { label: "Password", type: "password", placeholder: "••••••••" },
      ]}
      footerText="Already have an account?"
      footerLink="/login"
      footerLinkText="Login"
      onSubmit={handleRegister}
    />
  );
}

export default Register;
