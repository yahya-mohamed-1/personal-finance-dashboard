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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center space-x-2">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-2xl text-white">💰</span>
          </div>
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">Personal Finance Dashboard</h1>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Take Control of Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Financial Future</span>
        </h1>

        {/* Animated Text */}
        <div className="h-12 mb-6 flex items-center justify-center">
          <p className="text-xl md:text-2xl text-blue-700 dark:text-blue-300 font-medium">
            {displayText}
          </p>
        </div>

        {/* Description */}
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
          Personal Finance Dashboard helps you track expenses, manage budgets, and visualize your financial health
          with intuitive tools and beautiful dashboards. Start your journey to financial freedom today.
        </p>
      </div>
    </div>
  );
}

export default Home;