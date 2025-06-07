import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { feedbackReducer, initialState } from './feedbackReducer';
import { SORT_TYPES } from '../constants';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
    const [state, dispatch] = useReducer(feedbackReducer, initialState);

    useEffect(() => {
        dispatch({ type: 'INIT_STATE' });
    }, []);
    const addFeedback = (text, category = 'OTHER') => {
        dispatch({ type: 'ADD_FEEDBACK', payload: { text, category } });
    };

    const deleteFeedback = (id) => {
        dispatch({ type: 'DELETE_FEEDBACK', payload: id });
    };

    const updateFeedback = (id, updates) => {
        dispatch({ type: 'UPDATE_FEEDBACK', payload: { id, updates } });
    };

    const voteFeedback = (id, voteType) => {
        dispatch({ type: 'VOTE_FEEDBACK', payload: { id, voteType } });
    };

    const setSortBy = (sortType) => {
        dispatch({ type: 'SET_SORT_BY', payload: sortType });
    };

    const setFilterCategory = (category) => {
        dispatch({ type: 'SET_FILTER_CATEGORY', payload: category });
    };

    const toggleTheme = () => {
        dispatch({ type: 'TOGGLE_THEME' });
    };

    const getFilteredFeedbacks = () => {
        let filtered = state.feedbacks;

        if (state.filterCategory !== 'ALL') {
            filtered = filtered.filter(f => f.category === state.filterCategory);
        }
        filtered.sort((a, b) => {
            switch (state.sortBy) {
                case SORT_TYPES.DATE_DESC:
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case SORT_TYPES.DATE_ASC:
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case SORT_TYPES.LIKES_DESC:
                    return (b.likes - b.dislikes) - (a.likes - a.dislikes);
                case SORT_TYPES.LIKES_ASC:
                    return (a.likes - a.dislikes) - (b.likes - b.dislikes);
                default:
                    return 0;
            }
        });

        return filtered;
    };

    const exportData = () => {
        const data = {
            feedbacks: state.feedbacks,
            stats: state.stats,
            exportDate: new Date().toISOString()
        };
        return JSON.stringify(data, null, 2);
    };

    const importData = (jsonData) => {
        dispatch({ type: 'IMPORT_DATA', payload: jsonData });
    };

    const value = {
        ...state,
        addFeedback,
        deleteFeedback,
        updateFeedback,
        voteFeedback,
        setSortBy,
        setFilterCategory,
        toggleTheme,
        getFilteredFeedbacks,
        exportData,
        importData
    };

    return (
        <FeedbackContext.Provider value={value}>
            {children}
        </FeedbackContext.Provider>
    );
};

export const useFeedback = () => {
    const context = useContext(FeedbackContext);
    if (!context) {
        throw new Error('useFeedback must be used within a FeedbackProvider');
    }
    return context;
}; 