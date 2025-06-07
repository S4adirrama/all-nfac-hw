import React, { useEffect } from 'react';
import { useFeedback } from '../context/FeedbackContext';

const ThemeProvider = ({ children }) => {
    const { theme } = useFeedback();

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    return (
        <div className={`${theme === 'dark' ? 'dark' : ''} transition-colors duration-300`}>
            {children}
        </div>
    );
};

export default ThemeProvider; 