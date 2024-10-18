import * as types from "./actionTypes";

export const updatePasswordReducer = (state = { state: {} }, action) => {
  switch (action.type) {
    case types.UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isUpdated: action.payload.success,
        message: action.payload.message,
      };

    case types.UPDATE_PASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
        isUpdated: false,
        message: null,
        error: action.payload,
      };
    case types.UPDATE_PASSWORD_RESET:
      return {
        ...state,
        isUpdated: false,
        message: null,
      };
    case types.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
