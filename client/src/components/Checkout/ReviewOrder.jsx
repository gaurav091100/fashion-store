import {
  Heading,

  Box,
  Text,
  VStack,
  Flex,
  Image,
  Divider,
  Stack,
  Button,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

const ReviewOrder = ({ step, setStep, progress, setProgress }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  console.log(cartItems);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1500 ? 0 : 100;
  const tax = Number((subtotal * 0.18).toFixed(2));

  // console.log(typeof tax);
  const totalPrice = subtotal + shippingCharges + tax;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, (${shippingInfo.pincode}) | ${shippingInfo.country}`;

  const handleProccedToPayment = () => {
    setStep(step + 1);
    setProgress(progress + 33.33);
    const paymentDetails = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(paymentDetails));
  };
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Review Order
      </Heading>
      <Stack
        direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
        align="start"
      >
        <VStack
          minW={{ base: "100%", sm: "100%", md: "60%", lg: "60%" }}
          p="20px"
          align="start"
          gap="30px"
        >
          <Box>
            <Heading as="h4" size="lg" fontWeight={600}>
              Shipping Info
            </Heading>
            <VStack gap="5px" align="start" p="30px">
              <Text>
                <b>Name: </b>
                {user?.firstName}
              </Text>
              <Text>
                <b>Phone: </b>
                {shippingInfo?.phone}
              </Text>
              <Text>
                <b>Address: </b>
                {address}
              </Text>
            </VStack>
          </Box>
          <Box w="100%">
            <Heading as="h4" size="lg" fontWeight={600}>
              Your Cart Items :
            </Heading>
            <Box p="30px">
              {cartItems &&
                cartItems?.map(({ product, title, price, quantity, img }) => (
                  <Flex
                    key={product}
                    justify={"space-between"}
                    align={{
                      base: "center",
                      sm: "space-between",
                      md: "space-between",
                      lg: "space-between",
                    }}
                    borderRadius={"5px"}
                    boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
                    // border={"1px solid blue"}
                    gap="10px"
                    p={"10px"}
                    direction={{
                      base: "column",
                      sm: "row",
                      md: "row",
                      lg: "row",
                    }}
                    mt="10px"
                  >
                    <Image
                      boxSize="100px"
                      objectFit="cover"
                      src={img}
                      alt={title}
                    />
                    <Flex
                      align={"center"}
                      justify={"space-between"}
                      direction={{
                        base: "column",
                        sm: "row",
                        md: "column",
                        lg: "row",
                      }}
                      gap={{
                        base: "15px",
                        sm: "15px",
                        md: "15px",
                        lg: "30px",
                      }}
                      // w="auto"
                      p="10px"
                      w="100%"
                      // border={"1px solid green"}
                    >
                      <Text fontWeight={600}>{title}</Text>
                      <Text>
                        {quantity} x ₹{price} = <b>₹{price * quantity}</b>
                      </Text>
                    </Flex>
                  </Flex>
                ))}
            </Box>
          </Box>
        </VStack>
        {/* <Divider orientation="vertical" bgColor="red" w="10px" /> */}
        {/* <Stack direction="row" h="100px" p={4}> */}
        <Divider
          orientation="vertical"
          minH="100vh"
          display={{ base: "none", sm: "none", md: "block", lg: "block" }}
          // h="auto"
          bgColor="gray.400"
          w="1px"
        />
        {/* </Stack> */}

        <Box
          minW={{ base: "100%", sm: "100%", md: "40%", lg: "40%" }}
          p={{ base: "30px", sm: "50px", md: "30px", lg: "60px" }}
        >
          <Heading as="h4" textAlign="center" size="lg" fontWeight={600}>
            Order Summary
          </Heading>
          <Divider
            orientation="vertical"
            bgColor="gray.400"
            h="1px"
            my="40px"
          />
          <VStack gap="5px" align="start">
            <Flex align={"center"} justify={"space-between"} w="100%">
              <Text fontWeight={500}>Subtotal:</Text>
              <Text>₹ {subtotal}</Text>
            </Flex>
            <Flex align={"center"} justify={"space-between"} w="100%">
              <Text fontWeight={500}>Shipping Charges:</Text>
              <Text>₹ {shippingCharges}</Text>
            </Flex>
            <Flex
              align={"center"}
              // border={"1px solid red"}
              justify={"space-between"}
              w="100%"
            >
              <Text fontWeight={500}>GST:</Text>
              <Text>₹ {tax}</Text>
            </Flex>
          </VStack>
          <Divider
            orientation="vertical"
            bgColor="gray.400"
            h="1px"
            my="40px"
          />
          <Flex
            align={"center"}
            // border={"1px solid red"}
            justify={"space-between"}
            w="100%"
          >
            <Text fontWeight={500}>Total:</Text>
            <Text fontWeight={500}>₹ {totalPrice}</Text>
          </Flex>
          <Button
            size="lg"
            w="100%"
            bg="#e3ae52"
            color="#000"
            my="20px"
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
            onClick={handleProccedToPayment}
          >
            Proceed To Payment
          </Button>
        </Box>
      </Stack>
    </>
  );
};

export default ReviewOrder;
