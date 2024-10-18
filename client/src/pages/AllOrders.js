import React, { useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getAllOrders } from "../redux/orders/action";
import { DELETE_ORDER_RESET } from "../redux/orders/actionTypes";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import OrderTable from "../components/Admin/Orders/OrderTable";
const AllOrders = () => {
  const dispatch = useDispatch();
  const { isLoading, orders, error } = useSelector((state) => state.allOrders);

  const {
    error: deleteError,
    isLoading: loading,
    isDeleted,
  } = useSelector((state) => state.order);

  const handleDeleteOrder = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (deleteError) {
      toast.error(deleteError);
    }
    if (isDeleted) {
      toast.success("Order Deleted Successfully.");
    }
    dispatch({ type: DELETE_ORDER_RESET });
    dispatch(getAllOrders());
  }, [error, dispatch, isDeleted, deleteError]);
  return (
    <Box>
      <Heading w="100%" textAlign={"center"} fontWeight={600} my="20px">
        All Orders
      </Heading>

      {isLoading ? (
       new Array(10).map((item) => {
        return (
          <Box key={item._id} my="10px">
            <Loader heightProps="20px" widthProps={"100vw"} />
          </Box>
          );
        })
      ) : (
        <OrderTable
          loading={loading}
          orders={orders}
          handleDeleteOrder={handleDeleteOrder}
        />
      )}
    </Box>
  );
};

export default AllOrders;
