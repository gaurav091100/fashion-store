import React from "react";
import OrderItem from "./OrderItem";

const OrderTable = ({ loading, orders, handleDeleteOrder }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>OrderID</th>
          <th>Status</th>
          <th>Qty</th>
          <th>Amount</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {orders?.map((item) => (
          <OrderItem
            key={item._id}
            item={item}
            loading={loading}
            handleDeleteOrder={handleDeleteOrder}
          />
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
