import React, { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import WishlistCard from "../components/products/WishlistCard";
import { useDispatch, useSelector } from "react-redux";
import { getWishlistItems } from "../redux/wishlist/action";
import Loader from "../components/Loader";
import EmptyWishlist from "../components/wishlist/EmptyWishlist";
const Wishlist = () => {
  const { isLoading, wishlistItems } = useSelector((store) => store.wishlist);

  const dispatch = useDispatch();
  console.log(wishlistItems);

  useEffect(() => {
    dispatch(getWishlistItems());
  }, [dispatch]);
  return (
    <Box bgColor="#f5f5f7">
      <Meta title={"Wishlist"} />
      <BreadCrumb title={"Wishlist"} />
      {wishlistItems.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <Flex
          justify={"center"}
          align={"center"}
          flexWrap={"wrap"}
          gap="20px"
          px={{ base: "0px", sm: "0px", md: "50px", lg: "100px" }}
          py="40px"
        >
          {isLoading
            ? wishlistItems?.map((item, id) => {
                return (
                  <Loader key={id} heightProps="300px" widthProps="250px" />
                );
              })
            : wishlistItems?.map((item) => (
                <WishlistCard key={item._id} item={item} />
              ))}
        </Flex>
      )}
    </Box>
  );
};

export default Wishlist;
