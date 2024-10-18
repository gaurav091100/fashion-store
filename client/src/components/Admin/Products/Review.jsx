import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { BiTrash } from "react-icons/bi";

const Review = ({ item, loading: isLoading, deleteReviewHandler }) => {
  console.log(item);
  return (
    <tr>
      <td data-label="ReviewID">{item?._id}</td>
      <td data-label="User">{item?.name}</td>
      <td data-label="Comment">{item?.comment}</td>
      <td data-label="Rating">{item?.rating}</td>

      <td data-label="Delete" onClick={() => deleteReviewHandler(item._id)}>
        <Flex justify="center" align="center" cursor="pointer">
          <Button variant="link" pointerEvents={isLoading && "none"}>
            <BiTrash fontSize={"20px"} color="red" />
          </Button>
        </Flex>
      </td>
    </tr>
  );
};

export default Review;
