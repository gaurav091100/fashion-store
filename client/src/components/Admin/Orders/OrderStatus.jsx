import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

const OrderStatus = ({ order }) => {
  return (
    <Box>
      <Heading w="100%" fontWeight={600} size="lg" my="20px">
        Order Status
      </Heading>

      <div>
        <Text
          fontWeight={500}
          color={
            order.orderStatus && order.orderStatus === "Delivered"
              ? "green"
              : "red"
          }
        >
          {order.orderStatus && order.orderStatus}
        </Text>
      </div>
    </Box>
  );
};

export default OrderStatus;
