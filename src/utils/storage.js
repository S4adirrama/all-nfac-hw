export const loadFromStorage = (initialState) => {
  try {
    const saved = localStorage.getItem('feedback-board-storage');
    if (saved) {
      const data = JSON.parse(saved);
      return { ...initialState, ...data };
    }
  } catch (error) {
    console.error('Error loading from storage:', error);
  }
  return initialState;
};

export const saveToStorage = (state) => {
  try {
    const dataToSave = {
      feedbacks: state.feedbacks,
      theme: state.theme,
      stats: state.stats
    };
    localStorage.setItem('feedback-board-storage', JSON.stringify(dataToSave));
  } catch (error) {
    console.error('Error saving to storage:', error);
  }
}; 