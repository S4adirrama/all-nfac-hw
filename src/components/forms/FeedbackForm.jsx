import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { useFeedback } from '../../context/FeedbackContext';
import { CATEGORIES } from '../../constants';

const FeedbackForm = () => {
    const { addFeedback } = useFeedback();
    const [text, setText] = useState('');
    const [category, setCategory] = useState('OTHER');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!text.trim()) return;

        setIsSubmitting(true);

        setTimeout(() => {
            addFeedback(text.trim(), category);
            setText('');
            setIsSubmitting(false);
        }, 500);
    };

    return (
        <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-3xl transform rotate-1"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl transform -rotate-1"></div>

            <div className={`relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 dark:border-gray-700/50 transition-all duration-300 ${isFocused ? 'shadow-2xl scale-[1.02] border-purple-200 dark:border-purple-700' : ''
                }`}>
                <div className="p-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Добавить предложение
                        </h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                Категория предложения
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-300 transition-all dark:bg-gray-700 dark:text-white"
                            >
                                {Object.entries(CATEGORIES).map(([key, cat]) => (
                                    <option key={key} value={key}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                Ваше предложение по улучшению продукта
                            </label>

                            <div className="relative">
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    placeholder="Опишите ваше предложение... ✨"
                                    className={`w-full px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:border-transparent resize-none transition-all duration-300 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm ${isFocused
                                        ? 'border-purple-300 ring-purple-100 shadow-lg transform scale-[1.01]'
                                        : 'border-gray-200 dark:border-gray-600 hover:border-purple-200 dark:hover:border-purple-700'
                                        } dark:text-white`}
                                    rows={4}
                                    maxLength={500}
                                    disabled={isSubmitting}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                                            handleSubmit(e);
                                        }
                                    }}
                                />

                                <div className={`absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-2xl opacity-0 transition-opacity duration-300 pointer-events-none ${isFocused ? 'opacity-20' : ''
                                    }`}></div>
                            </div>

                            <div className="flex justify-between items-center mt-3">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full transition-colors ${text.length > 400 ? 'bg-red-400 animate-pulse' :
                                        text.length > 250 ? 'bg-yellow-400' : 'bg-green-400'
                                        }`}></div>
                                    <span className={`text-sm font-medium transition-colors ${text.length > 400 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
                                        }`}>
                                        {text.length}/500 символов
                                    </span>
                                </div>
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                    <Zap className="w-3 h-3" />
                                    Ctrl+Enter для отправки
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={!text.trim() || isSubmitting}
                            className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-4 px-6 rounded-2xl disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-2xl group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div className="relative flex items-center justify-center gap-3">
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span className="font-semibold">Добавляется...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="font-semibold text-lg">Добавить предложение</span>
                                    </>
                                )}
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackForm; 