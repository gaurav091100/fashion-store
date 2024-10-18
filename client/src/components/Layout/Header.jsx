import React from "react";
import { Box } from "@chakra-ui/react";
import TopNav from "../header/TopNav";
import MainNav from "../header/MainNav";
import NavLinks from "../header/NavLinks";

const Header = () => {
 
  return (
    <>
      <Box bgColor="#000" zIndex={10} position={"sticky"} top={"0px"}>
        {/*------------------->> Top Nav <<--------------------*/}
        <TopNav />

        {/*------------------->> Main Nav <<--------------------*/}
        <MainNav />

        {/*------------------->> HEADER CATEGORIES AND NAVLINK  PART  <<--------------------------------*/}
        <NavLinks />
      </Box>
    </>
  );
};

export default Header;
