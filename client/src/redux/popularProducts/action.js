import * as types from "./actionTypes";
import axios from "axios";

export const getPopularProducts = () => async (dispatch) => {
  dispatch({
    type: types.GET_POPULAR_PRODUCTS_LOADING,
  });
  try {
    let res = await axios.get("http://localhost:4500/products");
    dispatch({
      type: types.GET_POPULAR_PRODUCTS_SUCCESS,
      payload: res.data.products,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.GET_POPULAR_PRODUCTS_ERROR,
    });
  }
};
