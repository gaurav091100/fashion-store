import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Image,
    Tag,
    Text,
  } from "@chakra-ui/react";
  import React from "react";
  import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
  import ReactStars from "react-rating-stars-component";
  import { HiOutlineShoppingBag } from "react-icons/hi2";
  import "../../styles/productCard.css";
  import { Link, useNavigate } from "react-router-dom";
  import { useDispatch } from "react-redux";
  import { addItemToCart } from "../../redux/cart/action";
  import { addToWishlist } from "../../redux/wishlist/action";
  import { toast } from "react-toastify";
  const ProductCard = ({ productData }) => {
    const {
      _id: id,
      colors,
      brand,
      title,
      mrp,
      offer,
  
      new: newer,
      rating,
      stock,
    } = productData;
    // console.log(productData);
    // console.log(id);
  
    // console.log(productData);
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleAddToCart = () => {
      dispatch(addItemToCart(id, 1, colors?.[0]?.images?.[0]));
      toast.success("Item Added To Cart");
      // toast({
      //   ...toastProps,
      //   title: "Success",
      //   description: "Item Added To Cart",
      //   status: "success",
      // });
    };
  
    const handleAddToWishlist = () => {
      const payload = {
        image: colors?.[0]?.images?.[0],
        brand,
        title,
        mrp,
        offer,
      };
      console.log(payload);
  
      dispatch(addToWishlist(payload, toast));
    };
  
    const ratingOptions = {
      count: 5,
      // onChange:{ratingChanged},
      value: rating,
      edit: false,
      size: 24,
      activeColor: "#ffd700",
    };
  
    return (
      <Box
        className="product-card"
        bgColor="#fff"
        borderRadius="5px"
        w="250px"
        pointerEvents={stock < 1 && "none"}
        opacity={stock < 1 ? "0.5" : "1"}
      >
        <HStack justify="space-between" p="5px" align={"center"}>
          {newer ? (
            <Tag size="sm" key="sm" variant="solid" colorScheme="green">
              New
            </Tag>
          ) : (
            <Tag size="sm" key="sm" variant="ghost" colorScheme="green"></Tag>
          )}
  
          <Button variant="link" onClick={handleAddToWishlist}>
            {/* <AiFillHeart color="red" />  */}
            <AiOutlineHeart />
          </Button>
        </HStack>
        <Flex direction="column" p="10px" gap="7px">
          <Box className="product-details" position={"relative"}>
            <Box className="product-image">
              <Image
                src={colors?.[0]?.images?.[0]}
                alt={title}
                minH="300px"
                maxH="300px"
                w="100%"
              />
              <Image
                src={colors?.[0]?.images?.[1]}
                alt="product_img"
                minH="300px"
                maxH="300px"
                w="100%"
              />
            </Box>
            {stock < 1 ? (
              <Text
                position={"absolute"}
                bottom="50%"
                left={"50%"}
                transform={"translate(-50%)"}
                backgroundColor="gray.50"
                w={"100%"}
                textAlign="center"
                fontWeight={500}
                py="10px"
                color="red"
              >
                Out Of Stock
              </Text>
            ) : null}
            <Link to={`/store/${id}`}>
              <Text
                border={"1px solid gray"}
                position={"absolute"}
                bottom="-15px"
                left={"50%"}
                px="40px"
                py="5px"
                fontWeight={500}
                color="#fff"
                background={"rgba(0,0,0,0.5)"}
                transform={"translate(-50%)"}
                borderRadius={"3px"}
                transition="all 0.5s"
                className="view-btn"
                _hover={{
                  background: "rgba(0, 0, 0, 0.8)",
                }}
              >
                VIEW
              </Text>
            </Link>
          </Box>
          <Heading color="#ed5b5b" as="h6" size="xs" mt="15px">
            {brand}
          </Heading>
          <Heading as="h6" size="xs">
            {title?.length > 25 ? `${title?.slice(0, 25)}....` : title}
          </Heading>
          <ReactStars {...ratingOptions} />
          <Text>Rs.{Math.round(mrp - (mrp * offer) / 100)}</Text>
        </Flex>
        <Flex
          className="product-side-bar"
          direction="column"
          gap="15px"
          align="center"
          justify="center"
        >
          <Button variant="link" onClick={() => navigate(`/store/${id}`)}>
            <AiOutlineEye fontSize="20px" />
          </Button>
          <Button variant="link">
            <HiOutlineShoppingBag fontSize="20px" onClick={handleAddToCart} />
          </Button>
        </Flex>
      </Box>
    );
  };
  
  export default ProductCard;
  