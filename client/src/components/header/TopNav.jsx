import { Flex, Select, Spacer, Text } from "@chakra-ui/react";
const TopNav = () => {
  return (
    <Flex
      color="gray"
      py="5px"
      align="center"
      justify="center"
      borderBottom="1px solid gray"
      px="100px"
      display={{ base: "none", sm: "none", md: "none", lg: "flex" }}
    >
      <Text fontSize="13px">Free Shipping Over $100 & Free Returns</Text>
      <Spacer />
      <Flex gap="10px">
        {/* <Text fontSize="13px">English</Text> */}
        <Select variant="unstyled">
          <option value="">English</option>
          <option value="option2">Hindi</option>
          <option value="option3">German</option>
        </Select>
        <Select variant="unstyled">
          <option value="option1">USD $</option>
          <option value="option2">Rs</option>
          <option value="option3">Pound</option>
        </Select>
      </Flex>
    </Flex>
  );
};

export default TopNav;
