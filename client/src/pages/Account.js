import {
  Avatar,
  Box,
  Button,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Account = () => {
  const navigate = useNavigate();
  const { isLoading, user } = useSelector((state) => state.auth);

  return (
    <>
      <Stack
        justifyContent={"space-around"}
        direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
        align={"center"}
        p={{ base: "40px", sm: "40px", md: "40px", lg: "80px" }}
      >
        {!isLoading ? (
          <>
            <VStack gap="30px" align={"center"} justifyContent={"center"}>
              <Heading as="h2" size="lg" fontWeight={500}>
                My Account
              </Heading>
              <Avatar
                name={user?.firstName}
                bgColor={"gray.200"}
                size={"2xl"}
                height={200}
                w={200}
              />
              <Button
                size="md"
                px="60px"
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
              >
                Edit Profile
              </Button>
            </VStack>
            <VStack
              w={{ base: "90%", sm: "50%", md: "40%", lg: "30%" }}
              m="auto"
              justifyContent={"center"}
              alignItems={"start"}
              pt="40px"
              gap="20px"
            >
              <Box>
                <Heading as="h5" size="sm" fontWeight={500} textAlign={"left"}>
                  Username
                </Heading>
                <Text color="gray" size={"md"}>
                  {user?.firstName}
                </Text>
              </Box>
              <Box>
                <Heading as="h5" size="sm" fontWeight={500} textAlign={"left"}>
                  Email
                </Heading>
                <Text color="gray" size={"md"}>
                  {user?.email}
                </Text>
              </Box>
              <Box>
                <Heading as="h5" size="sm" fontWeight={500} textAlign={"left"}>
                  Joined On
                </Heading>
                <Text color="gray" size={"md"}>
                  {String(user?.createdAt).substr(0, 10)}
                </Text>
              </Box>

              <Button
                size="md"
                px="60px"
                w="100%"
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
                onClick={() => navigate("/my-orders")}
              >
                My Orders
              </Button>
              <Button
                size="md"
                px="60px"
                w="100%"
                variant="outline"
                colorScheme="blackAlpha"
                color={"#000"}
                _hover={{
                  bg: "#000",
                  color: "#fff",
                }}
                fontSize={{
                  base: "14px",
                  sm: "16px",
                  md: "17px",
                  lg: "17px",
                }}
                onClick={() => navigate("/update-password")}
              >
                Change Password
              </Button>
            </VStack>
          </>
        ) : (
          <>
            <Loader heightProps={"600px"} widthProps={"100%"} />
            <Loader heightProps={"600px"} widthProps={"100%"} />
          </>
        )}
      </Stack>
    </>
  );
};

export default Account;
