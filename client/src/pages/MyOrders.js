import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myOrders } from "../redux/orders/action";
import "../styles/order.css";
import OrderItem from "../components/order/OrderItem";
import EmptyOrder from "../components/order/EmptyOrder";
import Loader from "../components/Loader";

const MyOrders = () => {
  const { isLoading, orders } = useSelector((state) => state.myOrders);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  if (isLoading) {
    return (
      <>
        <Loader heightProps="40px" widthProps={"100vw"} />;
        <Loader heightProps="40px" widthProps={"100vw"} />;
        <Loader heightProps="40px" widthProps={"100vw"} />;
        <Loader heightProps="40px" widthProps={"100vw"} />;
        <Loader heightProps="40px" widthProps={"100vw"} />;
        <Loader heightProps="40px" widthProps={"100vw"} />;
        <Loader heightProps="40px" widthProps={"100vw"} />;
        <Loader heightProps="40px" widthProps={"100vw"} />;
        <Loader heightProps="40px" widthProps={"100vw"} />;
      </>
    );
  }

  return (
    <>
      {orders && orders.length >= 1 ? (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Buyer</th>
              <th>Date</th>
              <th>Payment</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((item) => (
              <OrderItem key={item._id} item={item} />
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyOrder />
      )}
    </>
  );
};

export default MyOrders;
