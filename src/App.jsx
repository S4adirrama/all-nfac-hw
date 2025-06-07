import React, { useState, useEffect } from 'react';

import { FeedbackProvider } from './context/FeedbackContext';
import ThemeProvider from './components/ThemeProvider';

import ThemeToggle from './components/UI/ThemeToggle';
import StatsPanel from './components/panels/StatsPanel';
import FilterPanel from './components/panels/FilterPanel';
import FeedbackForm from './components/forms/FeedbackForm';
import FeedbackList from './components/feedback/FeedbackList';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  return (
    <FeedbackProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 relative overflow-hidden transition-colors duration-300">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-20 left-40 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
          </div>

          <ThemeToggle />

          <header className={`relative z-10 transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
            }`}>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border-b border-white/50 dark:border-gray-700/50">
              <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="mb-4">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                    Product Feedback Board
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
                    Поделитесь своими идеями по улучшению продукта
                  </p>
                </div>
              </div>
            </div>
          </header>

          <main className={`relative z-10 max-w-6xl mx-auto px-6 py-12 space-y-8 transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: '200ms' }}>
            <StatsPanel />

            <FilterPanel />

            <FeedbackForm />

            <FeedbackList />
          </main>


        </div>
      </ThemeProvider>
    </FeedbackProvider>
  );
};

export default App;