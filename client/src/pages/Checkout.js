import React, { useState } from "react";
import { Progress, Box, ButtonGroup, Button, Flex } from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";
import ShippingAddress from "../components/Checkout/ShippingAddress";
import ReviewOrder from "../components/Checkout/ReviewOrder";
import PaymentMethod from "../components/Checkout/PaymentMethod";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../redux/cart/action";
import { toastProps } from "../constants/constants";

const Checkout = () => {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const { shippingInfo } = useSelector((state) => state.cart);
  const [userInput, setUserInput] = useState({
    address: shippingInfo.address,
    city: shippingInfo.city,
    state: shippingInfo.state,
    country: shippingInfo.country,
    pincode: shippingInfo.pincode,
    phone: shippingInfo.phone,
  });

  const dispatch = useDispatch();

  const handleReviewOrder = () => {
    if (step === 1) {
      if (userInput.phone.length < 10 || userInput.phone.length > 10) {
        return toast({
          ...toastProps,
          title: "Validation Failed",
          description: "Phone Number must be of 10 numbers.",
          status: "error",
        });
      } else if (userInput.pincode.length < 6 || userInput.pincode.length > 6) {
        return toast({
          ...toastProps,
          title: "Validation Failed",
          description: "Pincode must be of 6 Digits.",
          status: "error",
        });
      } else {
        dispatch(saveShippingInfo(userInput));
        setStep(step + 1);
        setProgress(progress + 33.33);
      }
    }
  };

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={1400}
        p={6}
        m="10px auto"
        as="form"
      >
        <Progress
          hasStripe
          h={1}
          bgColor="blackAlpha"
          colorScheme={"yellow"}
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>
        {step === 1 ? (
          <ShippingAddress userInput={userInput} setUserInput={setUserInput} />
        ) : step === 2 ? (
          <ReviewOrder
            step={step}
            setStep={setStep}
            progress={progress}
            setProgress={setProgress}
          />
        ) : (
          <PaymentMethod />
        )}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                variant="solid"
                w="7rem"
                mr="5%"
                size="lg"
                bg="#e3ae52"
                color="#000"
                _hover={{
                  bg: "#000",
                  color: "white",
                }}
                my="20px"
              >
                Back
              </Button>
              <Button
                onClick={handleReviewOrder}
                variant="outline"
                size="lg"
                bg={"#000"}
                isDisabled={
                  step === 1 &&
                  userInput.city &&
                  userInput.address &&
                  userInput.phone &&
                  userInput.pincode
                    ? false
                    : true
                }
                display={step === 2 ? "none" : "block"}
                color={"white"}
                _hover={{
                  bg: "#e3ae52",
                  color: "#000",
                }}
                my="20px"
              >
                Review Order
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                size="lg"
                bg={"#000"}
                color={"white"}
                _hover={{
                  bg: "#e3ae52",
                  color: "#000",
                }}
                my="20px"
                onClick={() => {
                  toast({
                    title: "Account created.",
                    description: "We've created your account for you.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                }}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
};

export default Checkout;
