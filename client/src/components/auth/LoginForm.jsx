import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/auth/action";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userInput;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isAuthenticated, user, message, error } = useSelector(
    (store) => store.auth
  );

  console.log({ user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleLogin = () => {
    // e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter valid email");
    } else if (password.length < 8) {
      toast.error("Password must be of length 8.");
    } else {
      dispatch(loginUser(userInput));
    }
  };

  useEffect(() => {
    if (isAuthenticated && user.role === "admin") {
      navigate("/admin/dashboard");
      toast.success(message);
    }
    if (isAuthenticated && user.role === "user") {
      navigate("/");
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [isAuthenticated, navigate, user, error, message]);
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          {/* <button onClick={() => toast("Wow so easy!")}>click</button>/ */}
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={userInput.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={userInput.password}
                onChange={handleChange}
              />
            </FormControl>

            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link href="password/forget-password" color={"blue.400"}>
                  Forgot password?
                </Link>
              </Stack>
              <Button
                bg={"#000"}
                color={"white"}
                _hover={{
                  bg: "#e3ae52",
                  color: "#000",
                }}
                isDisabled={!email || !password}
                onClick={handleLogin}
                isLoading={isLoading}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
          <Stack pt={6}>
            <Text align={"center"}>
              Don't have an account?{" "}
              <Link href="/register" color={"blue.400"}>
                Register Now
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginForm;
