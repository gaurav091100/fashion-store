import axios from "axios";
import * as types from "./actionTypes";

axios.defaults.withCredentials = true;

export const payment = (totalAmt) => async (dispatch) => {
  try {
    dispatch({
      type: types.PAYMENT_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `http://localhost:4500/payment/create-checkout-session`,
      { totalAmt },
      config
    );
    // console.log("payment", data);
    dispatch({
      type: types.PAYMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.PAYMENT_ERROR,
      payload: error?.response?.message || "Something Went Wrong.",
    });
  }
};
