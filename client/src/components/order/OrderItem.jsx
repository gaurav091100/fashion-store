import React from "react";

const OrderItem = ({ item }) => {
  return (
    <tr>
      <td data-label="#">{item._id}</td>
      <td
        data-label="Status"
        className={
          item.orderStatus === "Processing"
            ? "orderProcessing"
            : "orderDelivered"
        }
      >
        {/* <select
          value={item.orderStatus}
          // onChange={(e) => setOrderStatus(e.target.value)}
        >
          <option value="delivered">Delivered</option>
          <option value="pending">Pending</option>
          <option value="canceled">Canceled</option>
        </select> */}
        {item.orderStatus}
      </td>
      <td data-label="Buyer">Gaurav</td>
      <td data-label="Date">{String(item?.createdAt).substr(0, 10)}</td>
      <td data-label="Payment">{item.paymentInfo.status}</td>
      <td data-label="Quantity">{item.orderItems.length}</td>
    </tr>
  );
};

export default OrderItem;
