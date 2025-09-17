import React from "react";
import AuthForm from "../components/AuthForm";
import api from "../api";

function Login() {
  const handleLogin = async (formData) => {
    try {
      const res = await api.post("/auth/login", {
        username: formData["Username"],
        password: formData["Password"],
      });
      localStorage.setItem("token", res.data.token); // Save JWT
      alert("Login successful!");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
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
    />
  );
}

export default Login;
