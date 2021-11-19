export const CHECK_REDUX = "CHECK_REDUX";

export const check_redux = () => ({
  type: CHECK_REDUX,
});

const initialState = {
  count: "alarms",
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_REDUX:
      return { ...state, count: state.count + " checking redux" };

    default:
      return state;
  }
};
