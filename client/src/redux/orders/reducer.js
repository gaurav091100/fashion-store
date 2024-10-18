import * as types from "./actionTypes";

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case types.CREATE_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case types.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        order: action.payload,
      };

    case types.CREATE_ORDER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case types.MY_ORDERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case types.MY_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: action.payload,
      };

    case types.MY_ORDERS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case types.ALL_ORDERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case types.ALL_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: action.payload,
      };

    case types.ALL_ORDERS_ERROR:
      return {
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case types.UPDATE_ORDER_REQUEST:
    case types.DELETE_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case types.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isUpdated: action.payload,
      };

    case types.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isDeleted: action.payload,
      };

    case types.UPDATE_ORDER_ERROR:
    case types.DELETE_ORDER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case types.UPDATE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case types.DELETE_ORDER_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case types.ORDER_DETAILS_REQUEST:
      return {
        isLoading: true,
      };

    case types.ORDER_DETAILS_SUCCESS:
      return {
        isLoading: false,
        order: action.payload,
      };

    case types.ORDER_DETAILS_ERROR:
      return {
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
