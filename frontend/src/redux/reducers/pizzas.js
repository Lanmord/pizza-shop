const initialState = {
  items: [],
  isLoaded: false
};

function pizzas(state = initialState, action) {
  switch (action.type) {
    case 'SET_PIZZAS':
      return {
        ...state,
        items: action.value,
          isLoaded: true,
      };

    case 'SET_LOADED':
      return {
        ...state,
        isLoaded: action.value,
      };

    default:
      return state
  }
}

export default pizzas;