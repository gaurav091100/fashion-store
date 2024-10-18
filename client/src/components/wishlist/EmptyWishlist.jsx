import { Box, Button, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const EmptyWishlist = () => {
  const navigate = useNavigate();
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="xl" my={8}>
        Empty Wishlist
      </Heading>
      <Text>Seems Like you haven't added anything to your Wishlist.</Text>
      <Button
        bg="#e3ae52"
        color="#000"
        _hover={{
          bg: "#000",
          color: "white",
        }}
        my={8}
        onClick={() => navigate("/store")}
      >
        Add Now to Wishlist
      </Button>
    </Box>
  );
};

export default EmptyWishlist;
