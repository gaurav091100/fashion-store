import {
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  Text,
  useDisclosure,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Drawer,
  DrawerHeader,
  useToast,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { BiCategory, BiSearch, BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/auth/action";

const NavLinks = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const toast = useToast();

  const handleLogout = () => {
    dispatch(logoutUser(toast));
  };

  return (
    <Flex
      bgColor="#232f3e"
      px={{ base: "10px", sm: "10px", md: "50px", lg: "100px" }}
      color="#fff"
      py="10px"
      justify="space-between"
    >
      <Button
        ref={btnRef}
        onClick={onOpen}
        color="#fff"
        fontSize="25px"
        variant="link"
        borderRadius="5px"
        display={{ base: "block", sm: "block", md: "block", lg: "none" }}
      >
        <RxHamburgerMenu />
      </Button>

      {/* RESPONSIVE SMALL SCREEN AND MEDUIUM SCREEN SEARCH BOX */}
      <InputGroup
        w={{ base: "80%", sm: "80%", md: "50%", lg: "50%" }}
        display={{ base: "flex", sm: "flex", md: "flex", lg: "none" }}
      >
        <Input type="search" placeholder="search product here" />
        <InputRightAddon
          _hover={{ bgColor: "#ce9739" }}
          bgColor="#e3ae52"
          color="#000"
          cursor="pointer"
          children={<BiSearch />}
        />
      </InputGroup>
      <HStack
        borderRight="1px solid gray"
        display={{ base: "none", sm: "none", md: "none", lg: "flex" }}
      >
        <BiCategory fontSize="25px" />
        <Select
          variant="unstyled"
          bgColor="#232f3e"
          color="#a8a2a2"
          w="250px"
          fontSize="14px"
        >
          <option value="">SHOP CATEGORIES</option>
          <option value="option2">MEN</option>
          <option value="option3">WOMEN</option>
        </Select>
      </HStack>

      <Flex
        justify="space-around"
        align="center"
        w="35%"
        fontSize="14px"
        display={{ base: "none", sm: "none", md: "none", lg: "flex" }}
      >
        <Link to="/">HOME</Link>
        <Link to="/store">OUR STORE</Link>
        <Link to="/contact">CONTACT</Link>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bgColor="#232f3e" color="#fff">
          <DrawerCloseButton />
          <Link to="/" onClick={onClose}>
            <DrawerHeader>Fashion</DrawerHeader>
          </Link>

          <DrawerBody>
            <HStack pb="15px" mb="20px" borderBottom="1px solid gray">
              <BiCategory fontSize="25px" />
              <Select
                variant="unstyled"
                color="#a8a2a2"
                w="250px"
                fontSize="14px"
              >
                <option value="option1">SHOP CATEGORIES</option>
                <option value="option2">MEN</option>
                <option value="option3">WOMEN</option>
              </Select>
            </HStack>
            <Flex
              justify="space-around"
              direction="column"
              align="center"
              gap="20px"
              // w="35%"
              fontSize="14px"
            >
              <Link to="/" onClick={onClose}>
                Home
              </Link>
              <Link to="/store" onClick={onClose}>
                Our store
              </Link>
              <Link to="/contact" onClick={onClose}>
                Contact
              </Link>
              <>
                {isAuthenticated ? (
                  <Flex
                    justify="space-around"
                    direction="column"
                    align="center"
                    gap="20px"
                    // w="35%"
                    fontSize="14px"
                  >
                    <Link to="/profile" onClick={onClose}>
                      <Flex
                        justify="center"
                        align="center"
                        gap="5px"
                        // onClick={() => navigate("/profile")}
                      >
                        <BiUser fontSize="25px" color="#fff" />
                        <Text
                          textTransform={"uppercase"}
                          // // as={Button}
                          // m="-10px"
                          // p="0"
                          // variant="link"
                          // // variant="ghost"
                          // fontSize="12px"
                          // // colorScheme="#000"
                          // textTransform={"uppercase"}
                        >
                          {user?.firstName}
                        </Text>
                      </Flex>
                    </Link>

                    {user?.role === "admin" && (
                      <Link to="/admin/dashboard" onClick={onClose}>
                        Dashboard
                      </Link>
                    )}
                    <Link to="/my-orders" onClick={onClose}>
                      Orders
                    </Link>

                    <Button variant="link" color="#fff" onClick={handleLogout}>
                      Logout
                    </Button>
                  </Flex>
                ) : (
                  <Link to="/login" onClick={onClose}>
                    <Flex justify="center" align="center" gap="5px">
                      <BiUser fontSize="25px" />
                      <Text>Log in</Text>
                    </Flex>
                  </Link>
                )}
              </>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default NavLinks;
