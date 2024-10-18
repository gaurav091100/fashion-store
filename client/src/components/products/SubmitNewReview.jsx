import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
  } from "@chakra-ui/react";
  import ReactStars from "react-rating-stars-component";
  import React, { useState } from "react";
  import { useDispatch } from "react-redux";
  import { newReview } from "../../redux/products/action";
  
  const SubmitNewReview = ({ isOpen, onOpen, onClose, id: productID }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const ratingChanged = (newRating) => {
      // console.log(newRating);
      setRating(newRating);
    };
  
    const dispatch = useDispatch();
  
    const reviewData = {
      productID,
      comment,
      rating,
    };
    const handleSubmitReview = () => {
      // console.log("submitted");
      dispatch(newReview(reviewData));
      onClose();
    };
  
    return (
      <>
        <Button
          size="sm"
          // textDecoration={"none"}
          my="20px"
          variant={"none"}
          color={"blue"}
          fontSize={"15px"}
          _hover={{
            color: "red",
          }}
          onClick={() => onOpen()}
        >
          Submit Review
        </Button>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(90deg)"
          />
          <ModalContent w="350px">
            <ModalHeader>Submit Review</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ReactStars
                count={5}
                onChange={ratingChanged}
                edit={true}
                size={24}
                activeColor={"#ffd700"}
              />
  
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write Review here"
                size="sm"
              />
            </ModalBody>
            <ModalFooter gap={"10px"}>
              <Button
                //   size="lg"
                bg={"#000"}
                color={"white"}
                _hover={{
                  bg: "#e3ae52",
                  color: "#000",
                }}
                fontSize={{
                  base: "14px",
                  sm: "16px",
                  md: "17px",
                  lg: "17px",
                }}
                onClick={handleSubmitReview}
              >
                Submit
              </Button>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default SubmitNewReview;
  