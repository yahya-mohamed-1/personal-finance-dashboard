import React from "react";
import { useSearchParams } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import api from "../api";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("");

  const handleResetRequest = async (formData) => {
    try {
      const res = await api.post("/auth/reset-password", {
        email: formData["Email"],
        frontend_url: window.location.origin,
      });
      setMessage(res.data.msg || "Password reset link sent!");
      setMessageType("success");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Reset request failed");
      setMessageType("error");
    }
  };

  const handlePasswordReset = async (formData) => {
    try {
      const res = await api.post(`/auth/reset-password/${token}`, {
        password: formData["New Password"],
      });
      setMessage(res.data.msg || "Password reset successfully!");
      setMessageType("success");
      setTimeout(() => (window.location.href = "/login"), 900);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Password reset failed");
      setMessageType("error");
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
        message={message}
        messageType={messageType}
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
      message={message}
      messageType={messageType}
    />
  );
}

export default ResetPassword;
