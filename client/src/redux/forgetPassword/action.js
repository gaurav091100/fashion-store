import axios from "axios";
import { toastProps } from "../../constants/constants";
import * as types from "./actionTypes";

axios.defaults.withCredentials = true;

// FORGET PASSWORD

export const forgetPassword = (toast, email) => async (dispatch) => {
  console.log({ email });
  try {
    dispatch({ type: types.FORGET_PASSWORD_REQUEST });
    const { data } = await axios.post("https://fashion-store-nmi0.onrender.com/users/password/forget", { email });
    console.log(data);
    dispatch({
      type: types.FORGET_PASSWORD_SUCCESS,
      payload: data.message,
    });

    toast({
      ...toastProps,
      title: "Success",
      description: data.message,
      status: "success",
    });
    // navigate("/");
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.FORGET_PASSWORD_ERROR,
      payload: error.response.data.message,
    });
    toast({
      ...toastProps,
      title: "Error",
      description: error.response.data.message || "Something went wrong!",
      status: "error",
    });
  }
};

// RESET PASSWORD

export const resetPassword = (toast, token, userInput) => async (dispatch) => {
  // console.log({ email });
  try {
    dispatch({ type: types.RESET_PASSWORD_REQUEST });
    const { data } = await axios.put(
      `https://fashion-store-nmi0.onrender.com/users/password/reset/${token}`,
      userInput
    );
    console.log(data);
    dispatch({
      type: types.RESET_PASSWORD_SUCCESS,
      payload: data.success,
    });

    toast({
      ...toastProps,
      title: "Success",
      description: data.message,
      status: "success",
    });
    // navigate("/");
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.RESET_PASSWORD_ERROR,
      payload: error.response.data.message,
    });
    toast({
      ...toastProps,
      title: "Error",
      description: error.response.data.message || "Something went wrong!",
      status: "error",
    });
  }
};
