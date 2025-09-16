import React from "react";
import AuthForm from "../components/AuthForm";

/**
 * Reset Password Page
 * Users enter their email to receive a reset link
 */
function ResetPassword() {
  const handleReset = () => {
    console.log("Reset password request submitted");
  };

  return (
    <AuthForm
      title="Forgot Your Password? 🔑"
      buttonText="Send Reset Link"
      fields={[
        { label: "Email", type: "email", placeholder: "you@example.com" },
      ]}
      footerText="Remembered your password?"
      footerLink="/login"
      footerLinkText="Login"
      onSubmit={handleReset}
    />
  );
}

export default ResetPassword;
