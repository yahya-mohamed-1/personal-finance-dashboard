import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";

// Helper component to conditionally apply layout
function LayoutWrapper({ children }) {
  const location = useLocation();
  const isHomeOrAuthPage = ['/', '/login', '/register', '/reset-password'].includes(location.pathname);
  
  if (isHomeOrAuthPage) {
    // Code 1 layout - centered for authentication pages
    return (
      <main className="flex-1 flex items-center justify-center bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
        {children}
      </main>
    );
  } else {
    // Code 2 layout - full width for other pages
    return (
      <main className="flex-1 bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
        {children}
      </main>
    );
  }
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navbar at top */}
        <Navbar />

        {/* Conditionally styled page content */}
        <LayoutWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<h1 className="p-6 text-center">404 - Page Not Found</h1>} />
          </Routes>
        </LayoutWrapper>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;