import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../redux/forgetPassword/action";

const ResetPassword = () => {
  const [userInput, setUserInput] = useState({
    password: "",
    confirmPassword: "",
  });

  console.log(userInput);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();

  // const t = JSON.stringify(token);
  console.log(token);
  const { isLoading, success } = useSelector((store) => store.forgetPassword);
  const toast = useToast();
  const handleResetPassword = () => {
    dispatch(resetPassword(toast, token, userInput));
    // if (!isLoading && isUpdated) {
    //   navigate("/profile");
    // }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success,navigate]);
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Enter New Password
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>New Password</FormLabel>
          <Input
            placeholder="Enter new password"
            _placeholder={{ color: "gray.500" }}
            type="password"
            name="password"
            value={userInput.password}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Confirm New Password</FormLabel>
          <Input
            placeholder="Confirm new password"
            _placeholder={{ color: "gray.500" }}
            type="password"
            name="confirmPassword"
            value={userInput.confirmPassword}
            onChange={handleChange}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"#000"}
            color={"white"}
            _hover={{
              bg: "#e3ae52",
              color: "#000",
            }}
            isLoading={isLoading}
            onClick={handleResetPassword}
          >
            Change Password
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default ResetPassword;
