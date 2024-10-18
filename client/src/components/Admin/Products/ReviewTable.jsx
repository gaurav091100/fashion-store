import React from "react";
import Review from "./Review";

const ReviewTable = ({ isLoading, reviews, deleteReviewHandler }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ReviewID</th>
          <th>User</th>
          <th>Comment</th>
          <th>rating</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {reviews?.map((item) => (
          <Review
            key={item._id}
            item={item}
            loading={isLoading}
            deleteReviewHandler={deleteReviewHandler}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ReviewTable;
