import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-blue-600 text-white dark:bg-gray-900 dark:text-gray-100 text-center py-4 transition-all duration-300">
      <p>&copy; {new Date().getFullYear()} FinanceApp. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
