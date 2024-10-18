import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import {
  newProductReducer,
  newReviewReducer,
  productReducer,
  productReviewsReducer,
  productsReducer,
  reviewReducer,
  singleProductReducer,
} from "./products/reducer";
import { popularProductsReducer } from "./popularProducts/reducer";
import { featuredProductsReducer } from "./featuredCollections/reducer";
import { authReducer } from "./auth/reducer";
import { wishlistReducer } from "./wishlist/reducer";
import { updatePasswordReducer } from "./profile/reducer";
import { forgetPasswordReducer } from "./forgetPassword/reducer";
import { cartReducer } from "./cart/reducer";
import { paymentReducer } from "./payment/reducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./orders/reducer";
import {
  allUsersReducer,
  userDetailsReducer,
  userReducer,
} from "./users/reducer";
// import { updatePassword } from './profile/action';
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  auth: authReducer,
  updatePassword: updatePasswordReducer,
  forgetPassword: forgetPasswordReducer,
  cart: cartReducer,
  products: productsReducer,
  singleProduct: singleProductReducer,
  popularProductsReducer,
  featuredProductsReducer,
  wishlist: wishlistReducer,
  payment: paymentReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  orderDetails: orderDetailsReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
});

export const store = legacy_createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
