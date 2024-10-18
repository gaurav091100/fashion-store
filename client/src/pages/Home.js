import React from "react";
import { Box } from "@chakra-ui/react";
import CustomerServices from "../components/heroSection/CustomerServices";
import HeroSection from "../components/heroSection/HeroSection";
import PopularProducts from "../components/products/PopularProducts";
import FeaturedCollection from "../components/products/FeaturedCollection";
import Meta from "../components/Meta";
import "../styles/home.css";
import SpecialProducts from "../components/products/SpecialProducts";
const Home = () => {
  return (
    <>
      <Meta title={"Home"} />
      <HeroSection />
      <Box
        px={{ base: "10px", sm: "10px", md: "50px", lg: "100px" }}
        bgColor="#f5f5f7"
      >
        <CustomerServices />

        {/* FEATURED COLLECTION STARTS HERE */}
        <FeaturedCollection />

        {/* SPECIAL PRODUCTS STARTS HERE */}
        <SpecialProducts />

        {/* OUR POPULAR PRODUCTS STARTS HERE */}
        <PopularProducts />
      </Box>
    </>
  );
};

export default Home;
