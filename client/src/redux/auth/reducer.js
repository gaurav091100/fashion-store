import * as types from "./actionTypes";

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case types.REGISTER_REQUEST:
    case types.LOGIN_REQUEST:
    case types.LOAD_USER_REQUEST:
    case types.LOGOUT_REQUEST:
      return {
        isLoading: true,
        isAuthenticated: false,
      };
    case types.REGISTER_SUCCESS:
    case types.LOGIN_SUCCESS:
    case types.LOAD_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        message: action.payload.message,
      };

    case types.LOGOUT_SUCCESS:
      return {
        isLoading: false,
        isAuthenticated: false,
        user: null,
        success: true,
        message: action.payload.message,
      };
    case types.REGISTER_ERROR:
    case types.LOGIN_ERROR:
    case types.LOGOUT_ERROR:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case types.LOAD_USER_ERROR:
      return {
        isLoading: false,
        isAuthenticated: false,
        user: null,
        loadError: action.payload,
      };
    default:
      return state;
  }
};
