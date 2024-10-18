import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteReviews, getAllReviews } from "../redux/products/action";
import {
  CLEAR_ERRORS,
  DELETE_REVIEW_RESET,
} from "../redux/products/actionTypes";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import ReviewTable from "../components/Admin/Products/ReviewTable";
import NoReviews from "../components/Admin/Products/NoReviews";

const ProductReviews = () => {
  const dispatch = useDispatch();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, isLoading } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };
  console.log(error, deleteError);

  useEffect(() => {
    // if (productId.length === 24) {
    //   dispatch(getAllReviews(productId));
    // }
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERRORS });
    }

    if (deleteError) {
      toast.error(deleteError);
    }

    if (isDeleted) {
      toast.success("Review Deleted Successfully");
      //   history.push("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, productId]);

  return (
    <>
      <Box minH="100vh">
        <Stack w="100%" align="center" justifyContent="center">
          <form onSubmit={productReviewsSubmitHandler}>
            <Heading w="100%" textAlign={"center"} fontWeight={600} my="20px">
              All REVIEWS
            </Heading>
            <Flex justify="center" align={"center"} gap="10px" my="20px">
              <FormControl>
                <Input
                  type="type"
                  placeholder="Product Id"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </FormControl>

              <Button
                colorScheme="#000"
                bgColor="#000"
                _hover={{ bgColor: "#e3ae52", color: "#000" }}
                color="white"
                variant="solid"
                type="submit"
                isDisabled={
                  isLoading ? true : false || productId === "" ? true : false
                }
              >
                Search
              </Button>
            </Flex>
          </form>
        </Stack>

        {isLoading ? (
          <Heading
            w="100%"
            textAlign={"center"}
            size="lg"
            fontWeight={600}
            my="60px"
          >
            Loading...
          </Heading>
        ) : reviews?.length === 0 ? (
          <NoReviews />
        ) : (
          <ReviewTable
            isLoading={isLoading}
            reviews={reviews}
            deleteReviewHandler={deleteReviewHandler}
          />
          // <table className="table">
          //   <thead>
          //     <tr>
          //       <th>ReviewID</th>
          //       <th>User</th>
          //       <th>Comment</th>
          //       <th>rating</th>
          //       <th>Delete</th>
          //     </tr>
          //   </thead>
          //   <tbody>
          //     {reviews?.map((item) => (
          //       <Review
          //         key={item._id}
          //         item={item}
          //         loading={isLoading}
          //         deleteReviewHandler={deleteReviewHandler}
          //       />
          //     ))}
          //   </tbody>
          // </table>
        )}
      </Box>
    </>
  );
};

export default ProductReviews;
