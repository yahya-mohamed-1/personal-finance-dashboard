import React from "react";
import AuthForm from "../components/AuthForm";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("");

  const handleLogin = async (formData) => {
    try {
      const res = await api.post("/auth/login", {
        username: formData["Username"],
        password: formData["Password"],
      });
      localStorage.setItem("token", res.data.token); // Save JWT
      // notify other components (Navbar) about auth change
      window.dispatchEvent(new CustomEvent("authChange", { detail: { loggedIn: true } }));
      setMessage("Login successful!");
      setMessageType("success");
      setTimeout(() => navigate("/dashboard"), 600);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Login failed");
      setMessageType("error");
    }
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
      message={message}
      messageType={messageType}
    />
  );
}

export default Login;
