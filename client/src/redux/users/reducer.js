import * as types from "./actionTypes";
export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case types.ALL_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.ALL_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };

    case types.ALL_USERS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case types.USER_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.USER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };

    case types.USER_DETAILS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case types.UPDATE_USER_REQUEST:
    case types.DELETE_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isUpdated: action.payload,
      };

    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    case types.UPDATE_USER_ERROR:
    case types.DELETE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case types.UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case types.DELETE_USER_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    default:
      return state;
  }
};
