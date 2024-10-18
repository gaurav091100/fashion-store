import { Box, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeaturedProducts } from "../../redux/featuredCollections/action";
import ProductCard from "./ProductCard";
import Loader from "../Loader";

const FeaturedCollection = () => {
  const { featuredProducts, isLoading } = useSelector(
    (store) => store.featuredProductsReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // if (featuredProducts.length === 0) {
    dispatch(getFeaturedProducts());
    // }
  }, [dispatch]);
  return (
    <Box>
      <Heading as="h2" size="lg" fontWeight={500} my="30px">
        Featured Collection
      </Heading>
      <Flex overflowX="auto" className="hide-scrollbar" gap="20px">
        {isLoading
          ? featuredProducts
              .slice(0, 5)
              .map((item) => (
                <Loader key={item._id} heightProps="350px" widthProps="250px" />
              ))
          : featuredProducts.map((product) => {
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

export default FeaturedCollection;
