import * as types from "./actionTypes";
const productsInitalState = {
  products: [],
  isLoading: false,
  error: "",
  productsCount: 0,
  resultPerPage: 0,
};

export const productsReducer = (state = productsInitalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_PRODUCTS_REQUEST:
    case types.GET_ADMIN_PRODUCTS_REQUEST:
      return { ...state, isLoading: true };
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: payload.products,
        productsCount: payload.productsCount,
        resultPerPage: payload.resultPerPage,
      };
    case types.GET_ADMIN_PRODUCTS_SUCCESS:
      return {
        isLoading: false,
        products: payload,
      };
    case types.GET_PRODUCTS_ERROR:
    case types.GET_ADMIN_PRODUCTS_ERROR:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};

const singleProductInitalState = {
  product: {},
  isLoading: false,
  error: "",
};
export const singleProductReducer = (
  state = singleProductInitalState,
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_SINGLE_PRODUCT_LOADING:
      return { ...state, isLoading: true };
    case types.GET_SINGLE_PRODUCT_SUCCESS:
      return { ...state, isLoading: false, product: payload };
    case types.GET_SINGLE_PRODUCT_ERROR:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case types.NEW_REVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.NEW_REVIEW_SUCCESS:
      return {
        isLoading: false,
        success: action.payload,
      };
    case types.NEW_REVIEW_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.NEW_REVIEW_RESET:
      return {
        ...state,
        success: false,
      };

    default:
      return state;
  }
};

// new product admin

export const newProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case types.NEW_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.NEW_PRODUCT_SUCCESS:
      return {
        isLoading: false,
        success: action.payload.success,
        product: action.payload.product,
        message: action.payload.message,
      };
    case types.NEW_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.NEW_PRODUCT_RESET:
      return {
        ...state,
        success: false,
      };

    default:
      return state;
  }
};

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case types.DELETE_PRODUCT_REQUEST:
    case types.UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    case types.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isUpdated: action.payload.success,
        message: action.payload.message,
      };
    case types.DELETE_PRODUCT_ERROR:
    case types.UPDATE_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.DELETE_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case types.UPDATE_PRODUCT_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    default:
      return state;
  }
};

export const productReviewsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case types.ALL_REVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.ALL_REVIEW_SUCCESS:
      return {
        isLoading: false,
        reviews: action.payload,
      };
    case types.ALL_REVIEW_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.CLEAR_ERRORS:
      return {
        error: null,
      };

    default:
      return state;
  }
};

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case types.DELETE_REVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isDeleted: action.payload,
      };
    case types.DELETE_REVIEW_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.DELETE_REVIEW_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    default:
      return state;
  }
};
