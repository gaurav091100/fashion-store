import axios from "axios";
import * as types from "./actionTypes";

axios.defaults.withCredentials = true;

// REGISTER ACTION

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: types.REGISTER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("https://fashion-store-nmi0.onrender.com/users/register", userData, config);
    console.log(data);

    dispatch({
      type: types.REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.REGISTER_ERROR,
      payload: error.response.data.message || "Something went wrong!",
    });
  }
};

// LOGIN ACTION

export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("https://fashion-store-nmi0.onrender.com/users/login", userData, config);
    console.log(data);
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.LOGIN_ERROR,
      payload: error.response.data.message,
    });
  }
};

// LOGOUT ACTION
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: types.LOGOUT_REQUEST });
    const { data } = await axios.get("https://fashion-store-nmi0.onrender.com/users/logout");

    dispatch({
      type: types.LOGOUT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.LOGOUT_ERROR,
      payload: error.response.data.message || "Something went wrong!",
    });
  }
};

// LOAD USER ACTION
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: types.LOAD_USER_REQUEST });
    const { data } = await axios.get("https://fashion-store-nmi0.onrender.com/users/user");
    dispatch({
      type: types.LOAD_USER_SUCCESS,
      payload: data,
    });

    // navigate("/");
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.LOAD_USER_ERROR,
      payload: error.response.data.message,
    });
  }
};
