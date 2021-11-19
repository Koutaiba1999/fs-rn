import * as actions from "./actionTypes";

export const retrieveToken = (userToken) => {
  return {
    type: actions.RETRIEVE_TOKEN,
    payload: {
      userToken,
      isLoading: false,
    },
  };
};
export const login = (userToken) => {
  return {
    type: actions.LOGIN,
    payload: {
      userToken,
      isLoading: false,
    },
  };
};
export const logout = () => {
  return {
    type: actions.LOGOUT,
    payload: {
      userToken: null,
      isLoading: false,
    },
  };
};
export const register = (data, token) => {
  return {
    type: actions.REGISTER,
    payload: {
      ...data,
      userToken: token,
      isLoading: false,
    },
  };
};
