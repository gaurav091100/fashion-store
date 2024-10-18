import React from "react";
import { Button, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addItemToCart, deleteCartItem } from "../../redux/cart/action";
const CartItem = ({ cartItem }) => {
  const { product, title, price, quantity, stock, img } = cartItem;

  const dispatch = useDispatch();

  // console.log({ quantity, stock });

  const handleQtyIncrement = (id, quantity, img, stock) => {
    let newQty = quantity + 1;
    console.log(quantity);
    console.log(newQty);
    dispatch(addItemToCart(id, newQty, img));
  };
  const handleQtyDecrement = (id, quantity, img, stock) => {
    let newQty = quantity - 1;
    dispatch(addItemToCart(id, newQty, img));
  };

  const handleDeleteCartItem = (id) => {
    dispatch(deleteCartItem(id));
  };

  return (
    <Flex
      justify={"space-between"}
      align={{
        base: "center",
        sm: "space-between",
        md: "space-between",
        lg: "space-between",
      }}
      borderRadius={"5px"}
      boxShadow="rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
      gap="10px"
      p={"10px"}
      direction={{ base: "column", sm: "row", md: "row", lg: "row" }}
      mt="10px"
    >
      <Image boxSize="150px" objectFit="cover" src={img} alt={title} />
      <Flex
        align={"center"}
        justify={"center"}
        flexDirection={{ base: "column", sm: "row", md: "row", lg: "column" }}
        gap={{ base: "15px", sm: "15px", md: "15px", lg: "30px" }}
        p="10px"
        w="100%"
      >
        <Text fontWeight={600}>{title}</Text>
        <Flex justify={"space-around"} align={"center"} w={"100%"}>
          <HStack border={"1px solid gray"} borderRadius="5px">
            <Button
              size="sm"
              variant={"ghost"}
              isDisabled={quantity <= 1}
              onClick={() => handleQtyDecrement(product, quantity, img, stock)}
            >
              <AiOutlineMinus fontWeight={800} />
            </Button>
            <Text fontWeight={600}>{quantity}</Text>
            <Button
              size="sm"
              variant={"ghost"}
              isDisabled={quantity >= stock}
              onClick={() => handleQtyIncrement(product, quantity, img, stock)}
            >
              <AiOutlinePlus fontWeight={800} />
            </Button>
          </HStack>
          <Text>₹ {price * quantity}</Text>
          <Button
            size="sm"
            variant={"link"}
            onClick={() => handleDeleteCartItem(product)}
          >
            <BsTrashFill color="red" fontSize={"25px"} />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CartItem;
