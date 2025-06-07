import React, { useState, useEffect } from 'react';
import { Trash2, Edit, ThumbsUp, ThumbsDown, TrendingUp } from 'lucide-react';
import { useFeedback } from '../../context/FeedbackContext';
import { CATEGORIES } from '../../constants';
import EditModal from '../modals/EditModal';

const FeedbackItem = ({ feedback, index }) => {
    const { deleteFeedback, voteFeedback, updateFeedback } = useFeedback();
    const [isVisible, setIsVisible] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), index * 100);
        return () => clearTimeout(timer);
    }, [index]);

    const handleDelete = () => {
        setIsDeleting(true);
        setTimeout(() => deleteFeedback(feedback.id), 300);
    };

    const handleVote = (voteType) => {
        voteFeedback(feedback.id, voteType);
    };

    const category = CATEGORIES[feedback.category] || CATEGORIES.OTHER;
    const CategoryIcon = category.icon;
    const score = feedback.likes - feedback.dislikes;

    return (
        <>
            <div
                className={`relative overflow-hidden transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    } ${isDeleting ? 'scale-95 opacity-0 -translate-x-full' : ''}`}
                style={{ transitionDelay: `${index * 50}ms` }}
            >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 rounded-2xl`}></div>

                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-transparent group">
                    <div className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                    <div className="relative p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 bg-gradient-to-r ${category.color} rounded-lg text-white`}>
                                    <CategoryIcon className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{category.name}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {new Date(feedback.createdAt).toLocaleDateString('ru-RU')}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
                                    title="Редактировать"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors disabled:opacity-50"
                                    title="Удалить"
                                >
                                    <Trash2 className={`w-4 h-4 ${isDeleting ? 'animate-spin' : ''}`} />
                                </button>
                            </div>
                        </div>

                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed mb-4">
                            {feedback.text}
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleVote('like')}
                                    className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all transform hover:scale-105 ${feedback.userVote === 'like'
                                        ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 scale-105'
                                        : 'hover:bg-green-50 dark:hover:bg-green-900 text-gray-600 dark:text-gray-400'
                                        }`}
                                >
                                    <ThumbsUp className="w-4 h-4" />
                                    <span className="text-sm font-medium">{feedback.likes}</span>
                                </button>

                                <button
                                    onClick={() => handleVote('dislike')}
                                    className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all transform hover:scale-105 ${feedback.userVote === 'dislike'
                                        ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 scale-105'
                                        : 'hover:bg-red-50 dark:hover:bg-red-900 text-gray-600 dark:text-gray-400'
                                        }`}
                                >
                                    <ThumbsDown className="w-4 h-4" />
                                    <span className="text-sm font-medium">{feedback.dislikes}</span>
                                </button>
                            </div>

                            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-medium transition-all ${score > 0 ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' :
                                score < 0 ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' :
                                    'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                }`}>
                                <TrendingUp className="w-3 h-3" />
                                {score > 0 ? '+' : ''}{score}
                            </div>
                        </div>
                    </div>

                    <div className={`h-1 bg-gradient-to-r ${category.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                </div>
            </div>

            {isEditing && (
                <EditModal
                    feedback={feedback}
                    onClose={() => setIsEditing(false)}
                    onSave={updateFeedback}
                />
            )}
        </>
    );
};

export default FeedbackItem; 