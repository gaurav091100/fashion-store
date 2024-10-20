import * as types from "./actionTypes";
import axios from "axios";

export const getFeaturedProducts = () => async (dispatch) => {
  dispatch({
    type: types.GET_FEATURED_PRODUCTS_LOADING,
  });
  try {
    let res = await axios.get("https://api-fashion-store.vercel.app/products");
    dispatch({
      type: types.GET_FEATURED_PRODUCTS_SUCCESS,
      payload: res.data.products,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.GET_FEATURED_PRODUCTS_ERROR,
    });
  }
};
