import axios from "axios";
import * as types from "./actionTypes";

axios.defaults.withCredentials = true;

export const createOrder = (order) => async (dispatch) => {
  // console.log(order);
  try {
    dispatch({
      type: types.CREATE_ORDER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `http://localhost:4500/orders/new`,
      order,
      config
    );

    console.log(data);

    dispatch({
      type: types.CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.CREATE_ORDER_ERROR,
      payload: error?.response?.message || "Something Went Wrong.",
    });
  }
};

// GET MY ORDERS
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: types.MY_ORDERS_REQUEST,
    });

    const { data } = await axios.get(`http://localhost:4500/orders/myorders`);

    console.log(data);

    dispatch({
      type: types.MY_ORDERS_SUCCESS,
      payload: data.myOrders,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.MY_ORDERS_ERROR,
      payload: error?.response?.message || "Something Went Wrong.",
    });
  }
};

// Get All Orders (admin)

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: types.ALL_ORDERS_REQUEST });

    const { data } = await axios.get(
      "http://localhost:4500/orders/admin/allorders"
    );

    dispatch({ type: types.ALL_ORDERS_SUCCESS, payload: data.allOrders });
    console.log(data);
  } catch (error) {
    dispatch({
      type: types.ALL_ORDERS_ERROR,
      payload: error.response.data.message,
    });
  }
};

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `http://localhost:4500/admin/order/update/${id}`,
      order,
      config
    );

    dispatch({ type: types.UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: types.UPDATE_ORDER_ERROR,
      payload: error.response.data.message,
    });
  }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_ORDER_REQUEST });
    const { data } = await axios.delete(
      `http://localhost:4500/orders/admin/order/delete/${id}`
    );

    dispatch({ type: types.DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: types.DELETE_ORDER_ERROR,
      payload: error.response.data.message,
    });
  }
};

// order details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(
      `http://localhost:4500/orders/order/${id}`
    );
    console.log({ data });

    dispatch({ type: types.ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: types.ORDER_DETAILS_ERROR,
      payload: error.response.data.message,
    });
  }
};
