import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

const OrderItem = ({ item, loading: isLoading, handleDeleteOrder }) => {
  return (
    <tr>
      <td data-label="OrderID">{item?._id}</td>
      <td
        data-label="Status"
        className={
          item.orderStatus === "Processing"
            ? "orderProcessing"
            : "orderDelivered"
        }
      >
        {item?.orderStatus}
      </td>
      <td data-label="Qty">{item?.orderItems.length}</td>
      <td data-label="Amount">{item?.totalPrice.toFixed(2)}</td>
      <td data-label="Update">
        <Link to={`/admin/orders/update/${item._id} `}>
          <Flex justify="center" align="center">
            <BiEdit fontSize={"20px"} />
          </Flex>
        </Link>
      </td>
      <td data-label="Delete" onClick={() => handleDeleteOrder(item._id)}>
        <Flex justify="center" align="center" cursor="pointer">
          <Button variant="link" pointerEvents={isLoading && "none"}>
            <BiTrash fontSize={"20px"} color="red" />
          </Button>
        </Flex>
      </td>
    </tr>
  );
};

export default OrderItem;
