import React from "react";

import { Box, Flex, Heading } from "@chakra-ui/react";
import AddProductForm from "../components/Admin/Products/AddProductForm";
const AddProduct = () => {
  return (
    <Box bgColor="#f5f5f7">
      <Heading w="100%" textAlign={"center"} fontWeight={600} py="20px">
        Add New Product
      </Heading>
      <Flex justify={"center"} gap="20px" position="relative">
        <AddProductForm />
      </Flex>
    </Box>
  );
};

export default AddProduct;
