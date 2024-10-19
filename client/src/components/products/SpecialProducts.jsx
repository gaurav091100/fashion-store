import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/products/action";
import SpecialProductCard from "./SpecialProductCard";
import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import Loader from "../Loader";

const SpecialProducts = () => {
  const { products,isLoading } = useSelector((store) => store.products);
  const dispatch = useDispatch();
  // console.log(products);

  const specialProducts = products.filter((item) => item.offer >= 70);
  // console.log(specialProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <Box>
      <Heading as="h2" size="lg" fontWeight={500} my="30px" border>
        Special Products
      </Heading>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap="20px"
      >
        {isLoading
              ? new Array(5)
              .fill(0).map((_, id) => {
                  return (
                    <GridItem key={id}>
                    <Loader key={id} heightProps="250px" widthProps="100%" />
                     </GridItem>
                  );
                }) :
          specialProducts.map((item) => {
            return (
              <GridItem key={item._id}>
                <SpecialProductCard item={item} />
              </GridItem>
            );
          })}
      </Grid>
    </Box>
  );
};

export default SpecialProducts;
