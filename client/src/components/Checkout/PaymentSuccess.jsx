import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <Flex justify="center" alignItems="center" h="100vh">
      <Box textAlign="center" py={10} px={6}>
        <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
        <Text my="20px" color={"gray.900"} fontSize={"4xl"}>
          Your Order has been placed Successfully.
        </Text>
        <Button
          colorScheme="#000"
          bgColor="#000"
          _hover={{ bgColor: "#e3ae52", color: "#000" }}
          color="white"
          variant="solid"
          onClick={() => navigate("/my-orders")}
        >
          View Orders
        </Button>
      </Box>
    </Flex>
  );
};

export default PaymentSuccess;
