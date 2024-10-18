import * as types from "./actionTypes";
const initalState = {
  popularProducts: [],
  isLoading: false,
  isError: false,
};

export const popularProductsReducer = (state = initalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_POPULAR_PRODUCTS_LOADING:
      return { ...state, isLoading: true };
    case types.GET_POPULAR_PRODUCTS_SUCCESS:
      const filterProducts = payload.filter((item) => item.offer >= 70);
      // console.log(filterProducts);
      return { ...state, isLoading: false, popularProducts: filterProducts };
    case types.GET_POPULAR_PRODUCTS_ERROR:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};
