import * as types from "./actionTypes";
import axios from "axios";

export const getProducts =
  (currentPage = 1, price = [0, 15000], category, rating = 0) =>
  async (dispatch) => {
    try {
      dispatch({
        type: types.GET_PRODUCTS_REQUEST,
      });
      // let URL = `/products?page=${currentPage}&mrp[gte]=${price[0]}&mrp[lte]=${price[1]}&rating=${rating}`;

      // if (category) {
      //  let URL = `/products?page=${currentPage}&mrp[gte]=${price[0]}&mrp[lte]=${price[1]}&category=${category}&rating=${rating}`;
      // }
      // let { data } = await axios.get(URL);
      let { data } = await axios.get("https://api-fashion-store.vercel.app/products");

      const { products, productsCount, resultPerPage } = data;
      dispatch({
        type: types.GET_PRODUCTS_SUCCESS,
        payload: { products, productsCount, resultPerPage },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.GET_PRODUCTS_ERROR,
        payload: error,
      });
    }
  };
export const getSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.GET_SINGLE_PRODUCT_LOADING,
    });
    let { data } = await axios.get(`https://api-fashion-store.vercel.app/products/${id}`);

    dispatch({
      type: types.GET_SINGLE_PRODUCT_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.GET_SINGLE_PRODUCT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: types.NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `https://api-fashion-store.vercel.app/products/reviews/add`,
      reviewData,
      config
    );

    // console.log({ data });

    dispatch({
      type: types.NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: types.NEW_REVIEW_ERROR,
      payload: error.response.data.message,
    });
  }
};

// Get All Products For Admin
export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ADMIN_PRODUCTS_REQUEST });

    const { data } = await axios.get("https://api-fashion-store.vercel.app/products/admin/products");

    dispatch({
      type: types.GET_ADMIN_PRODUCTS_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: types.GET_ADMIN_PRODUCTS_ERROR,
      payload: error.response.data.message,
    });
  }
};

// Create Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: types.NEW_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      "https://api-fashion-store.vercel.app/products/admin/add",
      productData,
      config
    );

    dispatch({
      type: types.NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.NEW_PRODUCT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
  console.log("ID", id);
  try {
    dispatch({ type: types.UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.patch(
      `https://api-fashion-store.vercel.app/products/admin/update/${id}`,
      productData,
      config
    );
    console.log({ data });

    dispatch({
      type: types.UPDATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.UPDATE_PRODUCT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`https://api-fashion-store.vercel.app/products/admin/delete/${id}`);
    console.log(data);
    dispatch({
      type: types.DELETE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_PRODUCT_ERROR,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`https://api-fashion-store.vercel.app/products/admin/reviews?id=${id}`);

    dispatch({
      type: types.ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: types.ALL_REVIEW_ERROR,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `https://api-fashion-store.vercel.app/products/admin/reviews/delete?id=${reviewId}&productId=${productId}`
    );

    dispatch({
      type: types.DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_REVIEW_ERROR,
      payload: error.response.data.message,
    });
  }
};
