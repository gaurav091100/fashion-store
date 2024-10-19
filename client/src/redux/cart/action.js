import axios from "axios";
import * as types from "./actionTypes";
import { store } from "../store";

axios.defaults.withCredentials = true;

export const addItemToCart = (id, quantity, img) => async (dispatch) => {
  const { data } = await axios.get(`http://localhost:4500/products/${id}`);
  let price = Math.round(
    data.product.mrp - (data.product.mrp * data.product.offer) / 100
  );

  dispatch({
    type: types.ADD_TO_CART,
    payload: {
      product: data.product._id,
      brand: data.product.brand,
      title: data.product.title,
      price,
      mrp: data.product.mrp,
      offer: data.product.offer,
      img,
      stock: data.product.stock,
      quantity,
    },
  });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(store.getState().cart.cartItems)
  );
};
export const deleteCartItem = (id) => async (dispatch) => {
  dispatch({
    type: types.DELETE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(store.getState().cart.cartItems)
  );
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: types.SAVE_SHIPPING_INFO,
    payload: data,
  });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
