import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Your Personal Finance Manager";

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 70);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br p-4">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto py-8">
        {/* Logo */}
        <div className="mb-6 flex items-center justify-center space-x-2">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Personal Finance Dashboard</h1>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Take Control of Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Financial Future</span>
        </h1>

        {/* Animated Text */}
        <div className="h-10 mb-4 flex items-center justify-center">
          <p className="text-lg md:text-xl text-blue-700 dark:text-blue-300 font-medium">
            {displayText}
          </p>
        </div>

        {/* Description */}
        <p className="text-base text-gray-700 dark:text-gray-300 mb-6 max-w-2xl">
          Personal Finance Dashboard helps you track expenses, manage budgets, and visualize your financial health
          with intuitive tools and beautiful dashboards. Start your journey to financial freedom today.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link 
            to="/register" 
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            Get Started Free
          </Link>
          <Link 
            to="/login" 
            className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-800"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;