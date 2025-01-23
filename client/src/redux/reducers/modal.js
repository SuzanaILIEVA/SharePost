const modalReducer = (state = { modal: false }, action) => {
  switch (action.type) {
    case "MODAL":
      return {
        ...state,
        modal: action.payload,
      };

    default:
      return state;
  }
};

export default modalReducer;
