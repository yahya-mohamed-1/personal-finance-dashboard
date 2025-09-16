import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar at top */}
        <Navbar />

        {/* Page content */}
        <main className="flex-1 bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<h1 className="p-6 text-center">404 - Page Not Found</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
