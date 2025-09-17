import React from "react";
import AuthForm from "../components/AuthForm";
import api from "../api";

function ResetPassword() {
  const handleReset = async (formData) => {
    try {
      // backend not implemented yet, but this is where you'd call it
      const res = await api.post("/auth/reset-password", {
        email: formData["Email"],
      });
      alert(res.data.msg || "Password reset link sent!");
    } catch (err) {
      alert(err.response?.data?.msg || "Reset request failed");
    }
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
