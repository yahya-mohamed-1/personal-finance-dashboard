import React from "react";
import { useSearchParams } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import api from "../api";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleResetRequest = async (formData) => {
    try {
      const res = await api.post("/auth/reset-password", {
        email: formData["Email"],
        frontend_url: window.location.origin,
      });
      alert(res.data.msg || "Password reset link sent!");
    } catch (err) {
      alert(err.response?.data?.msg || "Reset request failed");
    }
  };

  const handlePasswordReset = async (formData) => {
    try {
      const res = await api.post(`/auth/reset-password/${token}`, {
        password: formData["New Password"],
      });
      alert(res.data.msg || "Password reset successfully!");
      // Redirect to login after successful reset
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.msg || "Password reset failed");
    }
  };

  if (token) {
    // Show form to enter new password
    return (
      <AuthForm
        title="Reset Your Password 🔑"
        buttonText="Reset Password"
        fields={[
          { label: "New Password", type: "password", placeholder: "Enter new password" },
        ]}
        footerText="Remembered your password?"
        footerLink="/login"
        footerLinkText="Login"
        onSubmit={handlePasswordReset}
      />
    );
  }

  // Show form to request reset link
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
      onSubmit={handleResetRequest}
    />
  );
}

export default ResetPassword;
