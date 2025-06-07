import React from 'react';
import { BarChart3, Download, Upload } from 'lucide-react';
import { useFeedback } from '../../context/FeedbackContext';

const StatsPanel = () => {
    const { feedbacks, exportData, importData } = useFeedback();

    const handleExport = () => {
        const data = exportData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `feedback-board-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImport = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    importData(e.target.result);
                    alert('Данные успешно импортированы!');
                } catch (error) {
                    alert('Ошибка при импорте данных');
                }
            };
            reader.readAsText(file);
        }
    };

    const totalVotes = feedbacks.reduce((sum, f) => sum + f.likes + f.dislikes, 0);
    const avgRating = totalVotes > 0 ? (feedbacks.reduce((sum, f) => sum + f.likes, 0) / totalVotes * 100) : 0;

    return (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-500" />
                    Статистика
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={handleExport}
                        className="p-2 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                        title="Экспорт данных"
                    >
                        <Download className="w-4 h-4" />
                    </button>
                    <label className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors cursor-pointer" title="Импорт данных">
                        <Upload className="w-4 h-4" />
                        <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{feedbacks.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Предложений</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{feedbacks.reduce((sum, f) => sum + f.likes, 0)}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Лайков</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">{feedbacks.reduce((sum, f) => sum + f.dislikes, 0)}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Дизлайков</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{Math.round(avgRating)}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Рейтинг</div>
                </div>
            </div>
        </div>
    );
};

export default StatsPanel; 