import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import UpdateProductForm from "../components/Admin/Products/UpdateProductForm";
const UpdateProduct = () => {
  return (
    <Box bgColor="#f5f5f7">
      <Heading w="100%" textAlign={"center"} fontWeight={600} py="20px">
        Update Product
      </Heading>
      <Flex justify={"center"} gap="20px" position="relative">
        <UpdateProductForm />
      </Flex>
    </Box>
  );
};

export default UpdateProduct;
