import {
  Heading,
  Stack,
  Box,
  Flex,
  Button,

} from "@chakra-ui/react";
import { AiFillCreditCard } from "react-icons/ai";
import React, {  useRef } from "react";
// import "react-credit-cards/es/styles-compiled.css";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../redux/orders/action";

const PaymentMethod = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  console.log(orderInfo);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const payBtn = useRef(null);
  const stripe = useStripe();
  const elements = useElements();

  const { isLoading } = useSelector((state) => state.payment);
  // console.log(isLoading);

  // card no 4000 0027 6000 3184

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (paymentInfo !== null) {
  //     window.location.href = `${paymentInfo?.url}`;
  //   }
  // }, [paymentInfo]);
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };
  // const submitHandler = () => {
  //   dispatch(payment(orderInfo?.totalPrice));
  // };

  const submitHandler = async () => {
    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.firstName,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pincode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        // alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate("/payment/success");
        } else {
          alert("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      //   alert.error(error.response.data.message);
    }
  };

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Card Info
      </Heading>

      <Flex
        // minH={"100vh"}
        align={"center"}
        justify={"center"}
        // bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} w="400px" py={12} px={6}>
          <Box
            rounded={"lg"}
            // bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <Box>
                <AiFillCreditCard />
                <CardNumberElement />
              </Box>
              <Box>
                <AiFillCreditCard />
                <CardExpiryElement />
              </Box>
              <Box>
                <AiFillCreditCard />
                <CardCvcElement />
              </Box>
              <Stack spacing={10}>
                <Button
                  bg={"#000"}
                  color={"white"}
                  _hover={{
                    bg: "#e3ae52",
                    color: "#000",
                  }}
                  ref={payBtn}
                  onClick={submitHandler}
                  isLoading={isLoading}
                >
                  {`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default PaymentMethod;
