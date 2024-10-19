import axios from "axios";
import * as types from "./actionTypes";

axios.defaults.withCredentials = true;

// get All Users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: types.ALL_USERS_REQUEST });
    const { data } = await axios.get(`http://localhost:4500/users/admin/allusers`);
    console.log("users", data);
    dispatch({ type: types.ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({
      type: types.ALL_USERS_ERROR,
      payload: error.response.data.message,
    });
  }
};

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.USER_DETAILS_REQUEST });
    const { data } = await axios.get(`http://localhost:4500/users/admin/user/${id}`);

    dispatch({ type: types.USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: types.USER_DETAILS_ERROR,
      payload: error.response.data.message,
    });
  }
};

// Update User
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `http://localhost:4500/users/admin/user/update/${id}`,
      userData,
      config
    );

    dispatch({ type: types.UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: types.UPDATE_USER_ERROR,
      payload: error.response.data.message,
    });
  }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_USER_REQUEST });

    const { data } = await axios.delete(`http://localhost:4500/users/admin/user/delete/${id}`);

    dispatch({ type: types.DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: types.DELETE_USER_ERROR,
      payload: error.response.data.message,
    });
  }
};
