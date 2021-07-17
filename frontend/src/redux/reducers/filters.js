const initialState = {
  category: 0,
  sortBy: 'rating',
};

function filters(state = initialState, action) {
  if (action.type === 'SET_SORT_BY') {
    return {
      ...state,
      sortBy: action.value,
    };
  }
  if (action.type === 'SET_CATEGORY') {
    return {
      ...state,
      category: action.value,
    };
  }
  return state;
}

export default filters;