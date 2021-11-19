import * as actions from "./actionTypes";

const initState = {
  isLoading: true,
  userName: null,
  userToken: null,
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.RETRIEVE_TOKEN:
      return {
        ...state,
        ...action.payload,
      };
    case actions.LOGIN:
      return {
        ...state,
        ...action.payload,
      };
    case actions.LOGOUT:
      return {
        ...state,
        ...action.payload,
      };
    case actions.REGISTER:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
