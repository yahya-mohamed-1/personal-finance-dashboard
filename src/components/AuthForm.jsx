import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * A simple, reusable authentication form
 * Props let us control title, button text, fields, and navigation link.
 */
function AuthForm({ title, buttonText, fields, footerText, footerLink, footerLinkText, footerText2, footerLink2, footerLinkText2, onSubmit, message, messageType }) {
  const [formData, setFormData] = useState({});
  const [visibleMessage, setVisibleMessage] = useState(false);

  useEffect(() => {
    let timer;
    if (message) {
      setVisibleMessage(true);
      timer = setTimeout(() => setVisibleMessage(false), 3000);
    } else {
      setVisibleMessage(false);
    }
    return () => clearTimeout(timer);
  }, [message]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(formData);
  };

  return (
    <div className="flex items-center justify-center py-8 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mx-4">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">{title}</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-100">{field.label}</label>
              <input
                name={field.label}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.label] || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-500"
                required
              />
            </div>
          ))}

          {/* Message */}
          {message && visibleMessage && (
            <p className={`text-sm mt-2 text-center ${messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition mt-4"
          >
            {buttonText}
          </button>
        </form>

        {/* Footer Links */}
        {footerText && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
            {footerText}{" "}
            <Link to={footerLink} className="text-blue-600 dark:text-blue-400 hover:underline">
              {footerLinkText}
            </Link>
          </p>
        )}
        {footerText2 && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 text-center">
            {footerText2}{" "}
            <Link to={footerLink2} className="text-blue-600 dark:text-blue-400 hover:underline">
              {footerLinkText2}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default AuthForm;