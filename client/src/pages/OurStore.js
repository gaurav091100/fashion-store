import { Box, HStack, Flex, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import FilterPanel from "../components/products/FilterPanel";
import Meta from "../components/Meta";
import ProductCard from "../components/products/ProductCard";
import { getProducts } from "../redux/products/action";
import { useSelector, useDispatch } from "react-redux";
import "../styles/ourStore.css";
import Loader from "../components/Loader";
import SortingPanel from "../components/products/SortingPanel";
import Pagination from "react-js-pagination";

const OurStore = () => {
  const [price, setPrice] = useState([0, 15000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const {
    isLoading,
    products,
    productsCount,
    resultPerPage,
    // filteredProductsCount,
  } = useSelector((store) => store.products);
  console.log(products);
  const dispatch = useDispatch();

  // const queryParams = new URLSearchParams(window.location.search);
 

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (e) => {
    setPrice(e);
  };

  useEffect(() => {
    dispatch(getProducts(currentPage, price, category, rating));
  }, [dispatch, currentPage, price, category, rating]);

  

  return (
    <Box bgColor="#f5f5f7">
      <Meta title={"Our Store"} />
      <BreadCrumb title={"Our Store"} />
      <HStack
        spacing={{ base: "0", sm: "0", md: "0", lg: "20px" }}
        align="flex-start"
        justify="space-between"
        py="20px"
        px={{ base: "10px", sm: "10px", md: "50px", lg: "100px" }}
      >
        {/* <FilterPanel /> */}
        <VStack w="100%">
          <Box bgColor="#fff" w="100%" px="20px" py="10px" borderRadius="5px">
            <Flex
              align="center"
              gap={{ base: "10px", sm: "10px", md: "20px", lg: "40px" }}
              w="100%"
            >
              <SortingPanel />
              <FilterPanel
                price={price}
                priceHandler={priceHandler}
                setCategory={setCategory}
                rating={rating}
                setRating={setRating}
              />
            </Flex>
          </Box>
          <Flex
            justify={"center"}
            align={"center"}
            flexWrap={"wrap"}
            gap="20px"
          >
            {/* ===========================map data here =========================== */}
            {isLoading
              ? products?.map((product, id) => {
                  return (
                    // <GridItem key={id}>
                    <Loader key={id} heightProps="350px" widthProps="250px" />
                    // </GridItem>
                  );
                })
              : products?.map((product) => {
                  return (
                    // <GridItem key={product._id}>
                    <ProductCard key={product._id} productData={product} />
                    // </GridItem>
                  );
                })}
          </Flex>
        </VStack>
      </HStack>
      <Flex justifyContent="center" p="2rem">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={productsCount}
          onChange={setCurrentPageNo}
          nextPageText="Next"
          prevPageText="Prev"
          firstPageText="First"
          lastPageText="Last"
          itemClass="page-item"
          linkClass="page-link"
          activeClass="pageItemActive"
          activeLinkClass="pageLinkActive"
        />
      </Flex>
    </Box>
  );
};

export default OurStore;
