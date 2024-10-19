import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OurStore from "./pages/OurStore";
import NotFound from "./pages/NotFound";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import SingleProduct from "./pages/SingleProduct";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import MyOrders from "./pages/MyOrders";
import Dashboard from "./pages/Dashboard";
import { store } from "./redux/store";
import { loadUser } from "./redux/auth/action";
import ProtectedRoute from "./components/ProtectedRoute";
import UpdatePassword from "./pages/UpdatePassword";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentSuccess from "./components/Checkout/PaymentSuccess";
import AllProducts from "./pages/AllProducts";
import AddProduct from "./pages/AddProduct";
import AdminProtectedRoute from "./components/Admin/AdminProtectedRoute";
import UpdateProduct from "./pages/UpdateProduct";
import AllOrders from "./pages/AllOrders";
import UpdateOrder from "./components/Admin/Orders/UpdateOrder";
import AllUsers from "./pages/AllUsers";
import UpdateUser from "./components/Admin/Users/UpdateUser";
import ProductReviews from "./pages/ProductReviews";
// import { useSelector } from "react-redux";

function App() {
  const [stripeapikey, setStripeapikey] = useState("");
  // console.log(stripeapikey);

  // const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log(stripeapikey);
  async function getStripeApiKey() {
    const { data } = await axios.get(
      "http://localhost:4500/payment/stripeapikey"
    );
    // console.log(data);
    // console.log(user);
    setStripeapikey(data.stripeApiKey);
  }
  useEffect(() => {
    // if (user) {
    store.dispatch(loadUser());
    getStripeApiKey();
    // }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="password/forget-password" element={<ForgetPassword />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route
            path="password/reset-password/:token"
            element={
              // <ProtectedRoute>
              <ResetPassword />
              // </ProtectedRoute>
            }
          />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/store" element={<OurStore />} />
            <Route path="/store/:id" element={<SingleProduct />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route path="/my-orders" element={<MyOrders />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            {/* <Route
              path="/checkout"
              element={
                // <ProtectedRoute>
                <Checkout />
                // </ProtectedRoute>
              }
            /> */}
            {/* {stripeapikey && ( */}
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Elements stripe={loadStripe(stripeapikey)}>
                    <Checkout />
                  </Elements>
                </ProtectedRoute>
              }
            />
            {/* )} */}
              <Route
              path="/admin/dashboard"
              element={
                <AdminProtectedRoute isAdmin={true}>
                  <Dashboard />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminProtectedRoute isAdmin={true}>
                  <AllProducts />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/products/update/:id"
              element={
                <AdminProtectedRoute isAdmin={true}>
                  <UpdateProduct />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/product/add"
              element={
                <AdminProtectedRoute isAdmin={true}>
                  <AddProduct />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminProtectedRoute isAdmin={true}>
                  <AllOrders />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/orders/update/:id"
              element={
                <AdminProtectedRoute isAdmin={true}>
                  <UpdateOrder />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminProtectedRoute isAdmin={true}>
                  <AllUsers />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/users/update/:id"
              element={
                <AdminProtectedRoute isAdmin={true}>
                  <UpdateUser />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/reviews"
              element={
                <AdminProtectedRoute isAdmin={true}>
                  <ProductReviews />
                </AdminProtectedRoute>
              }
            />
            {/* <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                /> */}
          </Route>
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </>
  );
}
export default App;
