import {
  Box,
  chakra,
  Container,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  useColorModeValue,
  Heading,
  Button,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};
const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("#232f3e", "#232f3e")}
      color={useColorModeValue("#fff", "#fff")}
      w="100%"

      // top="0"
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Link to="/">
                <Heading fontWeight="400" as="h2" size="lg">
                  Fashion
                </Heading>
              </Link>
            </Box>
            <Text fontSize={"sm"}>
              © {new Date().getFullYear()} Fashion Store. All rights reserved
            </Text>
            <Stack direction={"row"} spacing={6}>
              <SocialButton label={"Twitter"} href={"#"}>
                <FaTwitter />
              </SocialButton>
              <SocialButton label={"YouTube"} href={"#"}>
                <FaYoutube />
              </SocialButton>
              <SocialButton label={"Instagram"} href={"#"}>
                <FaInstagram />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Link to={"/"}>About us</Link>
            <Link to={"/"}>Blog</Link>
            <Link to={"/"}>Contact us</Link>
            <Link to={"/"}>Pricing</Link>
            <Link to={"/"}>Testimonials</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <Link to={"/"}>Help Center</Link>
            <Link to={"/"}>Terms of Service</Link>
            <Link to={"/"}>Legal</Link>
            <Link to={"/"}>Privacy Policy</Link>
            <Link to={"/"}>Satus</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Stay up to date</ListHeader>
            <Stack direction={"row"} align={"center"}>
              <Input
                placeholder={"Your email address"}
                bg={useColorModeValue("white", "white")}
                border={0}
                _focus={{
                  bg: "whiteAlpha.100",
                }}
              />
              <Button
                bg={useColorModeValue("#000", "#000")}
                color={useColorModeValue("#fff", "#fff")}
                border="1px solid black"
                px="25px"
                py="22px"
                _hover={{
                  bg: "gray.700",
                  borderColor: "gray",
                }}
                aria-label="Subscribe"
              >
                Subscribe
              </Button>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Footer;
