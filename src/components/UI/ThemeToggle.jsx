import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useFeedback } from '../../context/FeedbackContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useFeedback();

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 z-50 p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-lg"
            title={`Переключить на ${theme === 'light' ? 'темную' : 'светлую'} тему`}
        >
            {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600" />
            ) : (
                <Sun className="w-5 h-5 text-yellow-500" />
            )}
        </button>
    );
};

export default ThemeToggle; 