import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Stack
        justify={"center"}
        align={"center"}
        my="30px"
        position={"relative"}
      >
        <Image
          src="https://semisearch.in/site-assets/images/no-cart.gif"
          alt="Empty Cart"
          // w="100%"
        />
        <Heading ase="h2" size={"lg"} position={"absolute"} top="40px">
          Your Cart Is Empty
        </Heading>
        <Flex
          position={"absolute"}
          bottom="-50px"
          left="50%"
          transform={"translate(-50%,-50%)"}
          direction={"column"}
          gap="15px"
        >
          <Text fontWeight={500} color={"gray"}>
            Looks like you haven't added anything to your cart.
          </Text>
          <Button
            bg="#e3ae52"
            color="#000"
            _hover={{
              bg: "#000",
              color: "white",
            }}
            onClick={() => navigate("/store")}
          >
            Shop Now
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default EmptyCart;
