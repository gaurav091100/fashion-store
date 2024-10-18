import { Box, Button, Heading, Select } from "@chakra-ui/react";
import React from "react";

const ProcessOrder = ({
  isLoading,
  order,
  updateOrderSubmitHandler,
  status,
  setStatus,
}) => {
  return (
    <div
      style={{
        display: order.orderStatus === "Delivered" ? "none" : "block",
      }}
    >
      <form onSubmit={updateOrderSubmitHandler}>
        <Heading w="100%" fontWeight={600} size="lg" my="20px">
          Process Order
        </Heading>

        <Box>
          <Select
            variant="filled"
            size="md"
            onChange={(e) => setStatus(e.target.value)}
            w={{
              base: "100%",
              sm: "200px",
              md: "250px",
              lg: "300px",
            }}
            my="20px"
          >
            <option value="">Choose Category</option>
            {order.orderStatus === "Processing" && (
              <option value="Shipped">Shipped</option>
            )}

            {order.orderStatus === "Shipped" && (
              <option value="Delivered">Delivered</option>
            )}
          </Select>
        </Box>
        <Button
          colorScheme="#000"
          bgColor="#000"
          _hover={{ bgColor: "#e3ae52", color: "#000" }}
          type="submit"
          w={{
            base: "100%",
            sm: "200px",
            md: "250px",
            lg: "300px",
          }}
          isDisabled={isLoading ? true : false || status === "" ? true : false}
        >
          Process
        </Button>
      </form>
    </div>
  );
};

export default ProcessOrder;
