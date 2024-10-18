import React from "react";
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from "@chakra-ui/react";
import { MdPhone, MdEmail, MdLocationOn, MdOutlineEmail } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
const Contact = () => {
  return (
    <Container bg="#f5f5f7" maxW="full" mt={0} centerContent overflow="hidden">
      <Box w="110%">
        <Meta title={"Contact"} />
        <BreadCrumb title={"Contact"} />
      </Box>
      <Flex>
        <Box
          bg="#000"
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
        >
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading>Get in touch with us.</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                    Fill up the form below to contact
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack pl={0} spacing={3} alignItems="flex-start">
                      <Button
                        size="md"
                        height="48px"
                        width="250px"
                        variant="ghost"
                        color="#e3ae52"
                        _hover={{ border: "2px solid #e3ae52" }}
                        leftIcon={<MdPhone color="#e3ae52" size="20px" />}
                      >
                        +91-9898989898
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="250px"
                        variant="ghost"
                        color="#e3ae52"
                        _hover={{ border: "2px solid #e3ae52" }}
                        leftIcon={<MdEmail color="#e3ae52" size="20px" />}
                      >
                        fashionstore@gmail.com
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="250px"
                        variant="ghost"
                        color="#e3ae52"
                        _hover={{ border: "2px solid #e3ae52" }}
                        leftIcon={<MdLocationOn color="#e3ae52" size="20px" />}
                      >
                        Delhi, India
                      </Button>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormControl id="name">
                        <FormLabel>Your Name</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<BsPerson color="gray.800" />}
                          />
                          <Input type="text" size="md" />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Mail</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<MdOutlineEmail color="gray.800" />}
                          />
                          <Input type="text" size="md" />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Message</FormLabel>
                        <Textarea
                          borderColor="gray.300"
                          _hover={{
                            borderRadius: "gray.300",
                          }}
                          placeholder="message"
                        />
                      </FormControl>
                      <FormControl id="name" float="right">
                        <Button
                          variant="solid"
                          bg="#000"
                          color="white"
                          _hover={{
                            bg: "#e3ae52",
                            color: "#000",
                          }}
                        >
                          Send Message
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default Contact;
