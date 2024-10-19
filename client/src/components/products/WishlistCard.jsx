import {
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Text,
    useToast,
  } from "@chakra-ui/react";
  import React, { useEffect } from "react";
  import { AiOutlineClose } from "react-icons/ai";
  import { toastProps } from "../../constants/constants";
  import { useDispatch, useSelector } from "react-redux";
  import { removeFromWishlist } from "../../redux/wishlist/action";
  
  const WishlistCard = ({ item }) => {
    const toast = useToast();
  
    const { isRemoved } = useSelector((store) => store.wishlist);
  
    const dispatch = useDispatch();
  
    // useEffect(() => {
    //   if (isRemoved) {
    //     toast({
    //       ...toastProps,
    //       title: "Success",
    //       description: "dsf",
    //       status: "success",
    //     });
    //   }
    // }, [isRemoved,toast]);
  
    return (
      <Box
        className="product-card"
        // border="1px solid red"
        bgColor="#fff"
        w="250px"
        borderRadius="5px"
  
        // _hover={{}}
      >
        <Flex direction="column" p="10px" gap="7px">
          {/* <Flex> */}
          <Box position="relative">
            <Box>
              <Image
                src={item?.image}
                alt={item?.title}
                // h="200px"
                minH="250px"
                w="100%"
              />
            </Box>
            <Button
              variant="link"
              position="absolute"
              top="0px"
              right="0px"
              onClick={() => dispatch(removeFromWishlist(item._id, toast))}
            >
              <AiOutlineClose fontSize="25px" color="gray" />
            </Button>
          </Box>
  
          <Heading as="h6" size="xs">
            {item?.brand}
          </Heading>
  
          <Text color="gray.400" fontSize="15px">
            {item?.title?.length > 25
              ? `${item?.title?.slice(0, 25)}....`
              : item?.title}
          </Text>
          <Heading as="h6" size="xs">
            $10.00
          </Heading>
          {/* </Flex> */}
        </Flex>
      </Box>
    );
  };
  
  export default WishlistCard;
  