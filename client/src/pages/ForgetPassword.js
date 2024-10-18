import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../redux/forgetPassword/action";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  console.log(email);
  const dispatch = useDispatch();
  
  const { isLoading, message } = useSelector((store) => store.forgetPassword);
  console.log(message);
  const toast = useToast();
  const handleResetPassword = () => {
    dispatch(forgetPassword(toast, email));
  };



  // useEffect(() => {
  //   if (message) {
  //     navigate(`/password/reset-password/${token}`);
  //   }
  // }, [message]);

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
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          You&apos;ll get an email with a reset link
        </Text>
        <FormControl>
          <Input
            placeholder="Enter Your email"
            _placeholder={{ color: "gray.500" }}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
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
            onClick={handleResetPassword}
            isLoading={isLoading}
          >
            Reset Password
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default ForgetPassword;
