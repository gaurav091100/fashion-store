import { Box, HStack, Flex, VStack, Heading } from "@chakra-ui/react";
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
import { useLocation } from "react-router-dom";



const OurStore = () => {
  const [price, setPrice] = useState([0, 15000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [sortOption, setSortOption] = useState(""); 
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  // const [selectedCategory, setSelectedCategory] = useState(""); // New state for search query

  const location = useLocation(); 

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

  // Sorting function for the product data structure you shared
const sortProducts = (products, sortOption) => {
switch (sortOption) {
    // case "all":
    //   return products; // No specific sorting for "Featured"
    // case "best-selling":
    //   return products; // Assuming "best-selling" is already sorted
    case "title-asc":
      return [...products].sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return [...products].sort((a, b) => b.title.localeCompare(a.title));
    case "price-asc":
      return [...products].sort((a, b) => a.mrp - b.mrp);
    case "price-desc":
      return [...products].sort((a, b) => b.mrp - a.mrp);
    case "created-asc":
      return [...products].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    case "created-desc":
      return [...products].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    default:
      return products; // Return unsorted products by default
  }
};


  // Sort the products before rendering
  const sortedProducts = sortProducts(products, sortOption);


  useEffect(() => {
    dispatch(getProducts(currentPage, price, category, rating,searchQuery));
  }, [dispatch, currentPage, price, category, rating,searchQuery]);

  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query"); // Get the 'query' param from the URL
    const categoryFromQueryParam = params.get("category"); 
    
    setSearchQuery(query || ""); // If no query is found, set it to an empty string
    setCategory(categoryFromQueryParam || "")
  }, [location.search]);

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
              <SortingPanel setSortOption={setSortOption} />
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
              ? new Array(10)
              .fill(0).map((_, id) => {
                  return (
                    // <GridItem key={id}>
                    <Loader key={id} heightProps="350px" widthProps="250px" />
                    // </GridItem>
                  );
                })
              : (!isLoading && sortedProducts?.length === 0) ? <Heading as="h2" variant="h2">No Result Found for {category} category.</Heading> :
              sortedProducts?.map((product) => {
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
