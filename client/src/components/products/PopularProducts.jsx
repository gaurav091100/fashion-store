import { Box, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularProducts } from "../../redux/popularProducts/action";
import ProductCard from "./ProductCard";
import Loader from "../Loader";

const PopularProducts = () => {
  const { popularProducts, isLoading } = useSelector(
    (store) => store.popularProductsReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // if (popularProducts.length === 0) {
    dispatch(getPopularProducts());
    // }
  }, [dispatch]);
  return (
    <Box pb="30px">
      <Heading as="h2" size="lg" fontWeight={500} my="30px" border>
        Popular Products
      </Heading>
      <Flex overflow="auto" className="hide-scrollbar" gap="20px">
        {isLoading
          ? popularProducts.slice(0, 5).map((item) => {
              return (
                <Loader key={item._id} heightProps="350px" widthProps="250px" />
              );
            })
          : popularProducts.map((product) => {
              return (
                <Box key={product._id}>
                  <ProductCard productData={product} />
                </Box>
              );
            })}
      </Flex>
    </Box>
  );
};

export default PopularProducts;
