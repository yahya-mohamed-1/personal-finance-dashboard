import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply dark mode class to <html>
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <nav className="bg-blue-600 text-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand / Logo */}
          <Link to="/" className="text-xl font-bold">
            💰 FinanceApp
          </Link>

          {/* Desktop menu */}
          <div className="hidden sm:flex items-center space-x-6">
            <Link to="/" className="hover:text-gray-200 dark:hover:text-gray-300">
              Dashboard
            </Link>
            <Link to="/login" className="hover:text-gray-200 dark:hover:text-gray-300">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-200 dark:hover:text-gray-300">
              Register
            </Link>
            {/* Removed Reset Password link */}

            {/* Light/Dark toggle for desktop */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="ml-4 p-2 rounded hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors duration-300 focus:outline-none"
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l1.414-1.414M6.05 6.05L4.636 4.636M12 7a5 5 0 100 10 5 5 0 000-10z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Hamburger button (mobile only) */}
          <button
            className="sm:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu (full screen) */}
      {isOpen && (
        <div className="sm:hidden fixed inset-0 bg-blue-600 dark:bg-gray-900 flex flex-col items-center justify-center space-y-6 z-50 transition-opacity duration-300">
          
          {/* Top-right buttons */}
          <div className="absolute top-4 right-4 flex items-center space-x-4">
            {/* Light/Dark toggle - left of X */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="text-white dark:text-gray-100 focus:outline-none"
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l1.414-1.414M6.05 6.05L4.636 4.636M12 7a5 5 0 100 10 5 5 0 000-10z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                  />
                </svg>
              )}
            </button>

            {/* Close button */}
            <button
              className="text-white dark:text-gray-100 focus:outline-none"
              onClick={() => setIsOpen(false)}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile links */}
          <Link
            to="/"
            className="text-white text-2xl font-semibold hover:text-gray-200 dark:text-gray-100 dark:hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/login"
            className="text-white text-2xl font-semibold hover:text-gray-200 dark:text-gray-100 dark:hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-white text-2xl font-semibold hover:text-gray-200 dark:text-gray-100 dark:hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Register
          </Link>
          {/* Removed Reset Password link */}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
