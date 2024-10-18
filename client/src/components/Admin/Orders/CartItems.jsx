import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const CartItems = ({ order }) => {
  return (
    <Box
      w={{
        base: "100%",
        sm: "100%",
        md: "60%",
        lg: "50%",
      }}
    >
      <Heading w="100%" fontWeight={600} size="lg" my="20px">
        Your Cart Items:
      </Heading>

      <Box maxH="450px" overflow={"auto"}>
        {order.orderItems &&
          order.orderItems.map((item) => (
            <Flex
              key={item.product}
              gap="20px"
              boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
              alignItems="center"
              mt="10px"
              borderTopRightRadius="5px"
              borderBottomRightRadius="5px"
            >
              <Image
                src={item.img}
                alt={item.title}
                h={120}
                w={100}
                borderTopLeftRadius="5px"
                borderBottomLeftRadius="5px"
              />
              <Flex
                // justifyContent="space-between"
                alignItems={{
                  base: "start",
                  sm: "start",
                  md: "center",
                  lg: "center",
                }}
                gap="20px"
                direction={{
                  base: "column",
                  sm: "column",
                  md: "row",
                  lg: "row",
                }}
              >
                <Link to={`/store/${item.product}`}>{item.title}</Link>
                <Text>
                  {item.quantity} X ₹{item.price} ={" "}
                  <b>₹{item.price * item.quantity}</b>
                </Text>
              </Flex>
            </Flex>
          ))}
      </Box>
    </Box>
  );
};

export default CartItems;
