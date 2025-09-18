import React from "react";
import AuthForm from "../components/AuthForm";
import api from "../api";

function Register() {
  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("");

  const handleRegister = async (formData) => {
    try {
      const res = await api.post("/auth/register", {
        name: formData["Name"],
        username: formData["Username"],
        email: formData["Email"],
        password: formData["Password"],
      });
      setMessage(res.data.msg || "Registered successfully!");
      setMessageType("success");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Registration failed");
      setMessageType("error");
    }
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
      message={message}
      messageType={messageType}
    />
  );
}

export default Register;
