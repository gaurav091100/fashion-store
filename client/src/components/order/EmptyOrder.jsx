import { Box, Button, Heading } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const EmptyOrder = () => {
  const navigate = useNavigate();
  return (
    <Box textAlign="center" py={10} px={6}>
      <InfoIcon boxSize={"50px"} color={"tomato"} />
      <Heading as="h2" size="xl" my={8} mb={2}>
        No Orders Found.
      </Heading>
      <Button
        bg="#e3ae52"
        color="#000"
        _hover={{
          bg: "#000",
          color: "white",
        }}
        my={8}
        onClick={() => navigate("/store")}
      >
        Shop Now
      </Button>
    </Box>
  );
};

export default EmptyOrder;
