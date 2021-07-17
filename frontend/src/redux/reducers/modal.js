const initialState = {
  isActive: false,
};

function modal(state = initialState, action) {
  switch (action.type) {
    case 'SET_ACTIVE_MODAL':
      return {
        isActive: action.value
      };
    default:
      return state
  }
}

export default modal;