import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Spacer,
  Text,
  Menu,
  MenuItem,
  MenuGroup,
  MenuDivider,
  MenuList,
  MenuButton,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BiCart, BiHeart, BiSearch, BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getCartItems } from "../redux/cart/action";
import { logoutUser } from "../../redux/auth/action";
// import TopNav from "./header/TopNav";
// import MainNav from "./header/MainNav";
import { toast } from "react-toastify";
const MainNav = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated, user, message, error, success } = useSelector(
    (state) => state.auth
  );
  console.log({ isAuthenticated, user });
  // const [query, setQuery] = useState("");
  // const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  // const location = queryParams.get("location");

  // console.log({ queryParams, term });

  // console.log("header", user);
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleSearch = () => {};

  // const handleSearch = () => {
  //   // console.log(query);
  //   if (query.trim()) {
  //     // history.push(`/store/${query}`);
  //     setSearchParams({ query: query });

  //     // navigate("/store");
  //   }
  // };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(message);
    }
  }, [error, success, message]);
  return (
    <Flex
      px={{ base: "10px", sm: "10px", md: "50px", lg: "100px" }}
      py="20px"
      align="center"
      justify="space-between"
      // color="#fff"
    >
      <Link to="/">
        <Heading fontWeight="400" as="h2" size="lg" color="#fff">
          Fashion
        </Heading>
      </Link>
      <Spacer />
      {/* <HStack> */}
      <InputGroup
        w="45%"
        display={{ base: "none", sm: "none", md: "none", lg: "flex" }}
        color="#fff"
      >
        <Input
          type="text"
          placeholder="search product here"
          // onChange={(e) => setQuery(e.target.value)}
        />
        <InputRightAddon
          _hover={{ bgColor: "#ce9739" }}
          bgColor="#e3ae52"
          color="#000"
          cursor="pointer"
          children={<BiSearch />}
          onClick={handleSearch}
        />
      </InputGroup>

      {/* </HStack> */}
      <Spacer />
      <HStack
        spacing={{ base: "10px", sm: "10px", md: "20px", lg: "20px" }}
        fontSize="12px"
      >
        <Link to="/wishlist">
          <Flex justify="center" align="center" gap="5px" color="#fff">
            <BiHeart fontSize="25px" />
            <Box
              display={{
                base: "none",
                sm: "none",
                md: "none",
                lg: "block",
              }}
            >
              <Text>Wishlist</Text>
            </Box>
            <Text
              display={{
                base: "block",
                sm: "block",
                md: "block",
                lg: "none",
              }}
            >
              Wishlist
            </Text>
          </Flex>
        </Link>
        {isAuthenticated ? (
          <Menu>
            <Flex justify="center" align="center" gap="5px">
              <BiUser fontSize="25px" color="#fff" />
              <MenuButton
                as={Button}
                m="-10px"
                p="0"
                fontSize="12px"
                colorScheme="#000"
                textTransform={"uppercase"}
              >
                {user?.firstName}
              </MenuButton>
            </Flex>
            <MenuList>
              <MenuGroup title="My Account">
                {user?.role === "admin" && (
                  <Link to="/admin/dashboard">
                    <MenuItem>Dashboard</MenuItem>
                  </Link>
                )}
                <Link to="/profile">
                  <MenuItem>Profile</MenuItem>
                </Link>
                <Link to="/my-orders">
                  <MenuItem>Orders</MenuItem>
                </Link>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title="Help">
                <MenuItem>Docs</MenuItem>
                <MenuItem>FAQ</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        ) : (
          <Menu>
            <Flex justify="center" align="center" gap="5px">
              <BiUser fontSize="25px" color="#fff" />
              <MenuButton
                as={Button}
                m="-10px"
                p="0"
                fontSize="12px"
                colorScheme="#000"
                textTransform={"uppercase"}
              >
                User
              </MenuButton>
            </Flex>
            <MenuList>
              <MenuGroup title="User">
                <Link to="/register">
                  <MenuItem>Register</MenuItem>
                </Link>
                <Link to="/login">
                  <MenuItem>Login</MenuItem>
                </Link>
              </MenuGroup>
            </MenuList>
          </Menu>
        )}
        <Link to="/cart">
          <Flex justify="center" align="center" gap="5px">
            <BiCart fontSize="25px" color="#e3ae52" />
            <Box>
              <Text
                bgColor="white"
                color="#000"
                // py="5px"
                px="5px"
                borderRadius="50%"
              >
                {cartItems?.length}
              </Text>
              {/* <Text>$0.00</Text> */}
            </Box>
          </Flex>
        </Link>
      </HStack>
    </Flex>
  );
};

export default MainNav;
