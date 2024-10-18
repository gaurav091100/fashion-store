import { Box, Heading, Stack } from "@chakra-ui/react";
import React from "react";

const ShippingInfo = ({order}) => {
  return (
    <Box>
      <Heading w="100%" fontWeight={600} size="lg" my="20px">
        Shipping Info
      </Heading>
      <Stack gap="5px" p="5px">
        <Box>
          <b>Name: </b>
          <span>{order.user && order.user.email}</span>
        </Box>
        <Box>
          <b>Phone: </b>
          <span>{order.shippingInfo && order.shippingInfo.phone}</span>
        </Box>
        <Box>
          <b>Address: </b>
          <span>
            {order.shippingInfo &&
              `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pincode}, ${order.shippingInfo.country}`}
          </span>
        </Box>
      </Stack>
    </Box>
  );
};

export default ShippingInfo;
