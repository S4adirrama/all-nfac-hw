import React from 'react';
import { Filter } from 'lucide-react';
import { useFeedback } from '../../context/FeedbackContext';
import { CATEGORIES, SORT_TYPES } from '../../constants';

const FilterPanel = () => {
    const { sortBy, filterCategory, setSortBy, setFilterCategory } = useFeedback();

    return (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Фильтры:</span>
                </div>

                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                    <option value="ALL">Все категории</option>
                    {Object.entries(CATEGORIES).map(([key, cat]) => (
                        <option key={key} value={key}>{cat.name}</option>
                    ))}
                </select>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                    <option value={SORT_TYPES.DATE_DESC}>Сначала новые</option>
                    <option value={SORT_TYPES.DATE_ASC}>Сначала старые</option>
                    <option value={SORT_TYPES.LIKES_DESC}>По популярности ↓</option>
                    <option value={SORT_TYPES.LIKES_ASC}>По популярности ↑</option>
                </select>
            </div>
        </div>
    );
};

export default FilterPanel; 