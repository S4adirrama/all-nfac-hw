import { SORT_TYPES } from '../constants';
import { loadFromStorage, saveToStorage } from '../utils/storage';

export const initialState = {
  feedbacks: [],
  sortBy: SORT_TYPES.DATE_DESC,
  filterCategory: 'ALL',
  theme: 'light',
  stats: {
    totalFeedbacks: 0,
    totalLikes: 0,
    totalDislikes: 0
  }
};

export const feedbackReducer = (state, action) => {
  let newState;

  switch (action.type) {
    case 'INIT_STATE':
      return loadFromStorage(initialState);

    case 'ADD_FEEDBACK':
      const newFeedback = {
        id: Date.now() + Math.random(),
        text: action.payload.text.trim(),
        category: action.payload.category || 'OTHER',
        likes: 0,
        dislikes: 0,
        userVote: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      newState = {
        ...state,
        feedbacks: [newFeedback, ...state.feedbacks],
        stats: {
          ...state.stats,
          totalFeedbacks: state.stats.totalFeedbacks + 1
        }
      };
      break;

    case 'DELETE_FEEDBACK':
      newState = {
        ...state,
        feedbacks: state.feedbacks.filter(f => f.id !== action.payload),
        stats: {
          ...state.stats,
          totalFeedbacks: Math.max(0, state.stats.totalFeedbacks - 1)
        }
      };
      break;

    case 'UPDATE_FEEDBACK':
      newState = {
        ...state,
        feedbacks: state.feedbacks.map(f =>
          f.id === action.payload.id
            ? { ...f, ...action.payload.updates, updatedAt: new Date().toISOString() }
            : f
        )
      };
      break;

    case 'VOTE_FEEDBACK':
      newState = {
        ...state,
        feedbacks: state.feedbacks.map(f => {
          if (f.id === action.payload.id) {
            const prevVote = f.userVote;
            const voteType = action.payload.voteType;
            let newLikes = f.likes;
            let newDislikes = f.dislikes;
            let newUserVote = voteType;

            if (prevVote === 'like') newLikes--;
            if (prevVote === 'dislike') newDislikes--;

            if (voteType === 'like' && prevVote !== 'like') {
              newLikes++;
            } else if (voteType === 'dislike' && prevVote !== 'dislike') {
              newDislikes++;
            } else if (voteType === prevVote) {
              newUserVote = null;
            }

            return {
              ...f,
              likes: Math.max(0, newLikes),
              dislikes: Math.max(0, newDislikes),
              userVote: newUserVote
            };
          }
          return f;
        })
      };

      newState.stats = {
        ...newState.stats,
        totalLikes: newState.feedbacks.reduce((sum, f) => sum + f.likes, 0),
        totalDislikes: newState.feedbacks.reduce((sum, f) => sum + f.dislikes, 0)
      };
      break;

    case 'SET_SORT_BY':
      newState = { ...state, sortBy: action.payload };
      break;

    case 'SET_FILTER_CATEGORY':
      newState = { ...state, filterCategory: action.payload };
      break;

    case 'TOGGLE_THEME':
      newState = { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
      break;

    case 'IMPORT_DATA':
      try {
        const data = JSON.parse(action.payload);
        if (data.feedbacks && Array.isArray(data.feedbacks)) {
          newState = {
            ...state,
            feedbacks: data.feedbacks,
            stats: data.stats || state.stats
          };
        } else {
          return state;
        }
      } catch (error) {
        console.error('Import failed:', error);
        return state;
      }
      break;

    default:
      return state;
  }

  saveToStorage(newState);
  return newState;
}; 