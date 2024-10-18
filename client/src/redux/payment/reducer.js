import * as types from "./actionTypes";

export const paymentReducer = (state = { paymentInfo: null }, action) => {
  switch (action.type) {
    case types.PAYMENT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case types.PAYMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        paymentInfo: action.payload,
      };

    case types.PAYMENT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
