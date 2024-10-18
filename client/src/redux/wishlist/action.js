import axios from "axios";
import * as types from "./actionTypes";
import { toastProps } from "../../constants/constants";

export const getWishlistItems = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_WISHLIST_REQUEST });
    let { data } = await axios.get("https://api-fashion-store.vercel.app/wishlist");
    // let data = await res.json();
    dispatch({ type: types.GET_WISHLIST_REQUEST, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.GET_WISHLIST_REQUEST,
      payload: "Something Wetn Wrong.",
    });
  }
};
export const addToWishlist = (payload, toast) => async (dispatch) => {
  dispatch({ type: types.ADD_TO_WISHLIST_REQUEST });
  try {
    const res = await axios.post(`https://api-fashion-store.vercel.app/wishlist/add`, payload);

    toast({
      ...toastProps,
      title: "Success",
      description: res.data.message,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    toast({
      ...toastProps,
      title: "Error",
      description: error.message,
      status: "error",
    });
  }
};

export const removeFromWishlist = (id, toast) => async (dispatch) => {
  dispatch({ type: types.REMOVE_FROM_WISHLIST_REQUEST });
  try {
    const res = await axios.delete(`https://api-fashion-store.vercel.app/wishlist/delete/${id}`);
    dispatch({
      type: types.REMOVE_FROM_WISHLIST_SUCCESS,
    });

    console.log(res);
    toast({
      ...toastProps,
      title: "Success",
      description: res.data.message,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.REMOVE_FROM_WISHLIST_ERROR,
    });
    toast({
      ...toastProps,
      title: "Error",
      description: error.message,
      status: "error",
    });
  }
};
