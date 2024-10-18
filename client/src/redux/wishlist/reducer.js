import * as types from "./actionTypes";
const initalState = {
  wishlistItems: [],
  isLoading: false,
  isError: false,
};

export const wishlistReducer = (state = initalState, action) => {
  // const { type, payload } = action;
  switch (action.type) {
    case types.GET_WISHLIST_REQUEST:
    case types.ADD_TO_WISHLIST_REQUEST:
    case types.REMOVE_FROM_WISHLIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case types.GET_WISHLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        wishlistItems: action.payload,
      };

    case types.ADD_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case types.REMOVE_FROM_WISHLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isRemoved: true,
        message: action.payload,
      };

    case types.GET_WISHLIST_ERROR:
    case types.ADD_TO_WISHLIST_ERROR:
    case types.REMOVE_FROM_WISHLIST_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      return state;
  }
};
