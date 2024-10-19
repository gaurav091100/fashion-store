import axios from "axios";
import * as types from "./actionTypes";

axios.defaults.withCredentials = true;

// UPDATE PASSWORD

export const updatePassword = (password) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_PASSWORD_REQUEST });
    const { data } = await axios.put("http://localhost:4500/users/user/password/update", password);
    console.log(data);
    dispatch({
      type: types.UPDATE_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.UPDATE_PASSWORD_ERROR,
      payload: error.response.data.message || "Something went wrong!",
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: types.CLEAR_ERRORS });
};
