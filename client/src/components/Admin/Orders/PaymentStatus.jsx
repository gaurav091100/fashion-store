import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";

const PaymentStatus = ({ order }) => {
  return (
    <Box>
      <Heading w="100%" fontWeight={600} size="lg" my="20px">
        Payment
      </Heading>

      <Stack gap="2px">
        <div>
          <b>Status: </b>
          <Text
            className={
              order.paymentInfo && order.paymentInfo.status === "succeeded"
                ? "greenColor"
                : "redColor"
            }
            fontWeight={500}
            display="inline"
            color={
              order.paymentInfo && order.paymentInfo.status === "succeeded"
                ? "green"
                : "red"
            }
          >
            {order.paymentInfo && order.paymentInfo.status === "succeeded"
              ? "PAID"
              : "NOT PAID"}
          </Text>
        </div>

        <div>
          <b>Amount: </b>
          <Text
            display="inline"
            fontWeight={500}
            color={
              order.paymentInfo && order.paymentInfo.status === "succeeded"
                ? "green"
                : "red"
            }
          >
            {order.totalPrice && order.totalPrice}
          </Text>
        </div>
      </Stack>
    </Box>
  );
};

export default PaymentStatus;
