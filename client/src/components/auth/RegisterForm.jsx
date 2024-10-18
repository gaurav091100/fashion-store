import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/auth/action";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userInput, setUserInput] = useState({
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { firstName, email, password, confirmPassword } = userInput;
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, message, error } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      alert("please enter valid email");
    } else if (password.length < 6) {
      alert("Password must be of length 6.");
    } else if (password !== confirmPassword) {
      alert("Password does not matches");
    } else {
      dispatch(registerUser(userInput));
    }
  };

  // const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [isAuthenticated, error, message, navigate]);
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} w="xl" py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}></Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="firstName" isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                name="firstName"
                value={userInput.firstName}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={userInput.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userInput.password}
                  onChange={handleChange}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="confirm-password" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={"password"}
                  name="confirmPassword"
                  value={userInput.confirmPassword}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"#000"}
                color={"white"}
                _hover={{
                  bg: "#e3ae52",
                  color: "#000",
                }}
                onClick={handleRegister}
                isLoading={isLoading}
                isDisabled={
                  !firstName || !email || !password || !confirmPassword
                }
              >
                Register
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link href="/login" color={"blue.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default RegisterForm;
