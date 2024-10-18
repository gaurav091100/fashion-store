import {
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Progress,
    Text,
  } from "@chakra-ui/react";
  import React, { useRef } from "react";
  import ReactStars from "react-rating-stars-component";
  import { Link } from "react-router-dom";
  import { useDispatch } from "react-redux";
  import { addItemToCart } from "../../redux/cart/action";
  import "../../styles/specialProductCard.css";
  import { toast } from "react-toastify";
  
  const SpecialProductCard = ({ item }) => {
    const { _id: id, brand, title, offer, mrp, stock, rating, colors } = item;
  
    const btnRef = useRef();
  
    const dispatch = useDispatch();
    const handleAddToCart = () => {
      dispatch(addItemToCart(id, 1, colors?.[0]?.images?.[0]));
      toast.success("Item Added To Cart");
  
      btnRef.current.disabled = true;
    };
    return (
      <Link to={`/store/${id}`}>
        <Box className="special-product-card">
          <Flex justify="space-between" gap="20px">
            <Box w="50%">
              <Image
                src={colors?.[0]?.images?.[0]}
                alt="img"
                // h="50%"
                maxW="150px"
                minW="150px"
              />
            </Box>
            <Flex
              direction="column"
              gap="10px"
              minW="50%"
              className="special-product-details"
            >
              <Heading as="h6" size="xs" fontWeight={500} color="#ed5b5b">
                {brand}
              </Heading>
              <Text fontWeight="bold">
                {title.length > 24 ? `${title.slice(0, 24)}...` : title}
              </Text>
              <ReactStars
                count={5}
                // onChange={ratingChanged}
                value={rating}
                edit={false}
                size={15}
                activeColor="#ffd700"
              />
              <Text>
                <span style={{ color: "red" }}>
                  Rs.{Math.round(mrp - (mrp * offer) / 100)}
                </span>
                &nbsp;
                <strike style={{ color: "grey" }}>Rs.{mrp}</strike>
              </Text>
  
              <Box>
                <Text color="gray">Products: {stock}</Text>
                <Progress
                  colorScheme={
                    stock <= 5
                      ? "red"
                      : stock > 5 && stock <= 20
                      ? "orange"
                      : "green"
                  }
                  borderRadius="5px"
                  size="sm"
                  value={stock}
                />
              </Box>
              <Button
                colorScheme="blackAlpha"
                fontWeight="400"
                borderRadius="5px"
                size="sm"
                // w="35%"
                ref={btnRef}
                transition="0.5s"
                bgColor="black"
                my="10px"
                onClick={handleAddToCart}
                isDisabled={stock === 0}
              >
                Add To Cart
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Link>
    );
  };
  
  export default SpecialProductCard;
  