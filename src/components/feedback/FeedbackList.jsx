import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useFeedback } from '../../context/FeedbackContext';
import FeedbackItem from './FeedbackItem';

const FeedbackList = () => {
    const { getFilteredFeedbacks } = useFeedback();
    const feedbacks = getFilteredFeedbacks();

    if (feedbacks.length === 0) {
        return (
            <div className="text-center py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20 rounded-3xl"></div>

                <div className="relative">
                    <div className="relative inline-block mb-6">
                        <MessageSquare className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Пока нет предложений
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                        Добавьте первое предложение по улучшению продукта
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                    Предложения
                </h2>
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-full">
                    <span className="text-purple-700 dark:text-purple-300 font-semibold">{feedbacks.length}</span>
                </div>
            </div>

            <div className="space-y-4">
                {feedbacks.map((feedback, index) => (
                    <FeedbackItem
                        key={feedback.id}
                        feedback={feedback}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default FeedbackList; 