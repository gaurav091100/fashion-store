import { Box, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const DashboardCard = ({ title, count, url }) => {
  return (
    <GridItem
      w="100%"
      className="dashboard-item"
      borderRadius="5px"
      textAlign="center"
    >
      <Link to={`${url}`}>
        <Box py="80px">
          <Text fontSize="25px" fontWeight={600}>
            {title}
          </Text>
          <Text fontSize="25px">{count}</Text>
        </Box>
      </Link>
    </GridItem>
  );
};

export default DashboardCard;
