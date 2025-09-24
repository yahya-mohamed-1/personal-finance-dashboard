import React from "react";

function Footer() {
  return (
    <footer className={`w-full bg-blue-600 text-white dark:bg-gray-900 dark:text-gray-100 transition-all duration-300`} role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="text-sm font-medium">&copy; {new Date().getFullYear()} Personal Finance Dashboard</div>
        <div className="text-sm text-gray-200">All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;
