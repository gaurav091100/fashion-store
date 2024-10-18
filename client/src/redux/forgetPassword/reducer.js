import * as types from "./actionTypes";

export const forgetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case types.FORGET_PASSWORD_REQUEST:
    case types.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case types.FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload,
      };
    case types.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payload,
      };

    case types.FORGET_PASSWORD_ERROR:
    case types.RESET_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };

    default:
      return state;
  }
};
