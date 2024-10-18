import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails, updateOrder } from "../../../redux/orders/action";
import { UPDATE_ORDER_RESET } from "../../../redux/orders/actionTypes";
import { Box, Flex, Stack } from "@chakra-ui/react";
import { toast } from "react-toastify";
import ShippingInfo from "./ShippingInfo";
import PaymentStatus from "./PaymentStatus";
import OrderStatus from "./OrderStatus";
import CartItems from "./CartItems";
import ProcessOrder from "./ProcessOrder";

const UpdateOrder = () => {
  const { order, error, isLoading } = useSelector(
    (state) => state.orderDetails
  );

  // console.log(order);
  const [status, setStatus] = useState("");
  const { id } = useParams();
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(updateOrder(id, { status }));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (updateError) {
      toast.error(updateError);
    }
    if (isUpdated) {
      toast.success(`Order ${status}`);
    }
    dispatch({ type: UPDATE_ORDER_RESET });

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, isUpdated, status, updateError]);

  return (
    <>
      {/* <MetaData title="Process Order" /> */}

      {/* <SideBar /> */}
      <Box bgColor="#f5f5f7">
        <Stack
          margin="auto"
          py="20px"
          bgColor="#fff"
          w={{ base: "100%", sm: "100%", md: "100%", lg: "80vw" }}
          p={{
            base: "15px",
            sm: "20px",
            md: "35px",
            lg: "40px",
          }}
        >
          {isLoading ? (
            "loading....."
          ) : (
            <>
              <Flex
                direction={{
                  base: "column",
                  sm: "column",
                  md: "row",
                  lg: "row",
                }}
                gap="20px"
                justifyContent="space-between"
              >
                <Stack
                  w={{
                    base: "100%",
                    sm: "100%",
                    md: "40%",
                    lg: "50%",
                  }}
                >
                  {/* Shipping Info */}
                  <ShippingInfo order={order} />

                  {/* PAYMENT STATUS */}
                  <PaymentStatus order={order} />

                  {/* Order Status */}
                  <OrderStatus order={order} />
                </Stack>

                {/* CART ITEMS */}
                <CartItems order={order} />
              </Flex>
              {/*  */}
              <ProcessOrder
                isLoading={isLoading}
                order={order}
                updateOrderSubmitHandler={updateOrderSubmitHandler}
                status={status}
                setStatus={setStatus}
              />
            </>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default UpdateOrder;
