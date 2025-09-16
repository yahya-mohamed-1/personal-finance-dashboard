import React from "react";
import { Link } from "react-router-dom";

/**
 * A simple, reusable authentication form
 * Props let us control title, button text, fields, and navigation link.
 */
function AuthForm({ title, buttonText, fields, footerText, footerLink, footerLinkText, onSubmit }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">{title}</h1>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault(); // prevent page reload
            onSubmit && onSubmit(e); // call parent handler if passed
          }}
          className="space-y-4"
        >
          {fields.map((field, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-100">{field.label}</label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-500"
                required
              />
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
          >
            {buttonText}
          </button>
        </form>

        {/* Footer Link */}
        {footerText && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
            {footerText}{" "}
            <Link to={footerLink} className="text-blue-600 dark:text-blue-400 hover:underline">
              {footerLinkText}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default AuthForm;
