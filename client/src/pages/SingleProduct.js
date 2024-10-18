import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  Divider,
  VStack,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { MdLocalShipping } from "react-icons/md";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { BiPurchaseTag } from "react-icons/bi";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../redux/wishlist/action";
import { getSingleProduct } from "../redux/products/action";
import ReviewCard from "../components/products/ReviewCard";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { addItemToCart } from "../redux/cart/action";
import SubmitNewReview from "../components/products/SubmitNewReview";
import { NEW_REVIEW_RESET } from "../redux/products/actionTypes";
import { toast } from "react-toastify";
const SingleProduct = () => {
  const [currentFocus, setCurrentFocus] = useState(0);
  const [currentProduct, setCurrentProduct] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const imageRef = useRef();
  const btnRef = useRef();
  const cartBtnRef = useRef();
  // const toast = useToast();

  const { id } = useParams();

  const dispatch = useDispatch();

  const { isLoading, product } = useSelector(
    (store) => store.singleProduct
  );
  const { isAuthenticated } = useSelector((state) => state.auth);

  const {
    colors,
    brand,
    title,
    mrp,
    offer,
    noOfReviews,
    rating,
    stock,
    reviews,
  } = product;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { success } = useSelector((state) => state.newReview);
  useEffect(() => {
    dispatch(getSingleProduct(id));

    if (success) {
      dispatch({ type: NEW_REVIEW_RESET });
    }
    // }, [id, dispatch]);
  }, [id, dispatch, success]);

  const handleAddToCart = () => {
    dispatch(
      addItemToCart(
        id,
        selectedSize,
        quantity,
        colors?.[currentProduct]?.images?.[0]
      )
    );
    toast.success("Item Added To Cart");

    cartBtnRef.current.disabled = true;
  };

  const handleAddToWishlist = () => {
    const payload = {
      image: colors?.[0]?.images?.[0],
      brand,
      title,
      mrp,
      offer,
    };

    dispatch(addToWishlist(payload, toast));
  };

  const showImage = (image, id) => {
    imageRef.current.setAttribute("src", image);
    setCurrentFocus(id);
  };
  const handleChangeColor = (id) => {
    setCurrentProduct(id);
  };
  const ratingOptions = {
    count: 5,
    // onChange:{ratingChanged},
    value: rating,
    edit: false,
    size: 24,
    activeColor: "#ffd700",
  };

  const sizeRef = useRef();

  const handleSize = (size) => {
    setSelectedSize(size);
    sizeRef.current.style.backgroundColor = "red";
  };
  // const handleSubmitReview = () => {};

  const handleQtyDecrement = () => {
    setQuantity(quantity - 1);
  };
  const handleQtyIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 20 }}
      >
        {isLoading ? (
          <>
            <Loader heightProps={"600px"} widthProps={"100%"} />
            <Loader heightProps={"600px"} widthProps={"100%"} />
          </>
        ) : (
          <>
            <Box w="100%" boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px">
              <Image
                rounded={"md"}
                ref={imageRef}
                alt={title}
                src={colors?.[currentProduct]?.images?.[0]}
                objectFit="fill"
                align={"center"}
                w={"100%"}
                h="auto"
                mt="20px"
              />
              <Flex
                justify={"start"}
                align={"center"}
                gap={{ base: "5px", sm: "10px", md: "10px", lg: "10px" }}
                w={{ base: "100%", sm: "60%", md: "45%", lg: "45%" }}
                m="20px auto"
              >
                {colors?.[currentProduct]?.images.map((image, id) => {
                  return (
                    <Image
                      border={currentFocus === id ? "1px solid red" : ""}
                      key={id}
                      alt={title}
                      src={image}
                      fit="contain"
                      align={"center"}
                      w={"100%"}
                      h="100px"
                      ref={btnRef}
                      onClick={() => showImage(image, id)}
                      cursor={"pointer"}
                    />
                  );
                })}
              </Flex>
            </Box>
            <Stack
              spacing={{ base: 6, md: 10 }}
              boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
              p={{
                base: "20px 5px",
                sm: "20px 40px",
                md: "20px 40px",
                lg: "20px 40px",
              }}
            >
              <Box as={"header"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                >
                  {brand}
                </Heading>
                <Flex
                  align={{
                    base: "start",
                    sm: "start",
                    md: "start",
                    lg: "center",
                  }}
                  flexDirection={{
                    base: "column",
                    sm: "row",
                    md: "row",
                    lg: "row",
                  }}
                  gap="20px"
                  my="10px"
                >
                  <Text
                    color={"crimson"}
                    fontWeight={400}
                    fontSize={"xl"}
                    textDecoration="line-through"
                  >
                    MRP: {mrp}
                  </Text>
                  <Text fontWeight={600} fontSize={"lg"}>
                    Price: {Math.round(mrp - (mrp * offer) / 100)}
                  </Text>
                </Flex>
                <Text color={"#e3c810"} fontWeight={600} fontSize={"xl"}>
                  OFFER: {offer}%
                </Text>
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
                divider={<StackDivider borderColor={"gray"} />}
              >
                <Box spacing={{ base: 4, sm: 6 }} justify="start">
                  <Text color={"gray"} fontSize={"2xl"} fontWeight={"300"}>
                    {title}
                  </Text>

                  <Flex alignItems={"center"} gap="20px">
                    <ReactStars {...ratingOptions} />
                    <Text fontSize={"md"} fontWeight={"500"}>
                      {noOfReviews} Reviews
                    </Text>
                  </Flex>
                  <Text fontSize={"md"} fontWeight={"500"} my="10px">
                    Availability:{" "}
                    <span style={{ color: stock < 1 ? "red" : "green" }}>
                      {stock < 1 ? "Out Of Stock" : "In Stock"}
                    </span>
                  </Text>
                  <Heading as="h4" size={"sm"} mt="10px">
                    Select Size
                  </Heading>
                  <Flex
                    align={"center"}
                    gap={{ base: "5px", sm: "10px", md: "10px", lg: "10px" }}
                    my="10px"
                  >
                    {colors?.[currentProduct]?.sizes.map((size, id) => {
                      return (
                        <Text
                          key={id}
                          h="50px"
                          // p="10px 15px"
                          border="3px solid #e3dfdf"
                          onClick={() => handleSize(size)}
                          w="50px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          borderRadius="50%"
                          textAlign="center"
                          background="rgba(0,0,0,0.05)"
                          fontWeight={600}
                          transition="all 0.4s"
                          cursor={"pointer"}
                          _hover={{
                            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                            background: "#000",
                            color: "#fff",
                          }}
                          ref={sizeRef}
                        >
                          {size}
                        </Text>
                      );
                    })}
                  </Flex>
                  <Heading as="h4" size={"sm"} mt="10px">
                    Select color
                  </Heading>
                  <Flex
                    align={"center"}
                    gap={{ base: "5px", sm: "10px", md: "10px", lg: "10px" }}
                    my="10px"
                  >
                    {colors?.map((item, id) => {
                      return (
                        <Text
                          key={id}
                          h="50px"
                          // p="10px 15px"
                          w="50px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          borderRadius="50%"
                          textAlign="center"
                          background={item?.color}
                          fontSize={"15px"}
                          textTransform={"capitalize"}
                          color="#fff"
                          opacity={"0.8"}
                          filter={"brightness(90%)"}
                          transition="all 0.2s"
                          cursor={"pointer"}
                          _hover={{
                            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                            opacity: "0.5",
                            color: "#fff",
                            fontWeight: "500",
                            zIndex: "1000",
                          }}
                          onClick={() => handleChangeColor(id)}
                        >
                          {item?.color}
                        </Text>
                      );
                    })}
                  </Flex>
                  <Divider />
                  <Box my="50px">
                    <Text color="gray.700" mt="5px" fontSize={"15px"}>
                      100% Original Products
                    </Text>
                    <Text color="gray.700" mt="5px" fontSize={"15px"}>
                      Pay on delivery might be available
                    </Text>
                    <Text color="gray.700" mt="5px" fontSize={"15px"}>
                      100% Original Products Easy 14 days returns and exchanges
                    </Text>
                    <Text color="gray.700" mt="5px" fontSize={"15px"}>
                      Try & Buy might be available
                    </Text>

                    <Flex align={"center"} gap="10px">
                      <Heading as="h2" size="sm" my="15px">
                        Best Offers
                      </Heading>
                      <BiPurchaseTag fontSize={"20px"} />
                    </Flex>
                    <Text fontWeight={500}>
                      Best Price: {"   "}
                      <span style={{ color: "tomato" }}>
                        Rs. {Math.round(mrp - (mrp * offer) / 100)}
                      </span>
                    </Text>
                    <ul
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                        margin: "20px 0",
                      }}
                    >
                      <li>
                        Applicable on: Orders above Rs. 2999 (only on first
                        purchase)
                      </li>
                      <li>
                        Coupon code:{" "}
                        <span style={{ fontWeight: 700 }}>FASHIONFIRST200</span>{" "}
                      </li>
                      <li>
                        Coupon Discount: Rs. 45 off (check cart for final
                        savings)
                      </li>
                    </ul>
                  </Box>
                </Box>
              </Stack>

              <HStack w="100px" m="auto">
                <Button
                  size="sm"
                  variant={"ghost"}
                  border="1px solid"
                  bg={"#000"}
                  color={"white"}
                  _hover={{
                    bg: "#fff",
                    color: "#000",
                    borderColor: "gray",
                  }}
                  fontSize={{
                    base: "14px",
                    sm: "16px",
                    md: "17px",
                    lg: "17px",
                  }}
                  isDisabled={quantity <= 1}
                  onClick={handleQtyDecrement}
                  // isDisabled={cartItem.qty <= 1}
                >
                  <AiOutlineMinus fontWeight={800} />
                </Button>
                <Text fontWeight={600}>{quantity}</Text>
                <Button
                  size="sm"
                  variant={"ghost"}
                  border="1px solid"
                  bg={"#000"}
                  color={"white"}
                  _hover={{
                    bg: "#fff",
                    color: "#000",
                    borderColor: "gray",
                  }}
                  fontSize={{
                    base: "14px",
                    sm: "16px",
                    md: "17px",
                    lg: "17px",
                  }}
                  isDisabled={quantity >= product.stock}
                  onClick={handleQtyIncrement}
                >
                  <AiOutlinePlus fontWeight={800} />
                </Button>
              </HStack>
              {/* BUTTONS */}

              <Flex align={"center"} gap={"20px"}>
                <Button
                  size="lg"
                  bg="#e3ae52"
                  color="#000"
                  _hover={{
                    bg: "#000",
                    color: "white",
                  }}
                  fontSize={{
                    base: "14px",
                    sm: "16px",
                    md: "17px",
                    lg: "17px",
                  }}
                  onClick={handleAddToWishlist}
                >
                  Add to Wishlist
                </Button>
                <Button
                  size="lg"
                  ref={cartBtnRef}
                  bg={"#000"}
                  color={"white"}
                  _hover={{
                    bg: "#e3ae52",
                    color: "#000",
                  }}
                  fontSize={{
                    base: "14px",
                    sm: "16px",
                    md: "17px",
                    lg: "17px",
                  }}
                  onClick={handleAddToCart}
                >
                  Add to cart
                </Button>
              </Flex>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent={"center"}
              >
                <MdLocalShipping />
                <Text>2-3 business days delivery</Text>
              </Stack>
            </Stack>
          </>
        )}
      </SimpleGrid>
      <Box p="10px">
        <Heading as="h2" size={"lg"} textAlign={"center"}>
          Reviews
        </Heading>
        {reviews && reviews[0] ? (
          <VStack justifyContent="start" alignItems="start" gap="10px">
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
            <Divider />
            {isAuthenticated && (
              <Box>
                <SubmitNewReview
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onClose={onClose}
                  id={id}
                />
              </Box>
            )}
          </VStack>
        ) : (
          <VStack my="40px" justifyContent="center" alignItems="center">
            <Text fontSize="25px" color="gray" textAlign={"center"}>
              No Reviews Yet
            </Text>
            {/* <Button
              size="sm"
              variant={"none"}
              color={"blue"}
              fontSize={"15px"}
              _hover={{
                color: "red",
              }}
              onClick={handleSubmitReview}
            >
              Submit Review
            </Button> */}
            {isAuthenticated && (
              <SubmitNewReview
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                id={id}
              />
            )}
          </VStack>
        )}
      </Box>
    </Container>
  );
};
export default SingleProduct;
