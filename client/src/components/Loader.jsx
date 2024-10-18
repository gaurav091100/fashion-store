import { Skeleton } from "@chakra-ui/react";
import React from "react";

const Loader = ({ heightProps, widthProps }) => (
  <Skeleton h={heightProps} w={widthProps} />
);
export default Loader;
