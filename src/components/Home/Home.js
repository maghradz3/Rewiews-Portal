import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllReviews } from "../../redux/slice";
import { useReview } from "../../hooks";
import { Button } from "../../atoms";
import { AllReviewItem } from "./AllReviewItem";

export const Home = () => {
  const dispatch = useDispatch();

  const { reviews } = useReview();
  console.log(reviews);

  useEffect(() => {
    dispatch(getAllReviews());
  }, []);

  const ReviewsHandler = () => {
    dispatch(getAllReviews());
  };
  return (
    <div className="container mx-auto  flex justify-center gap-[50px] flex-wrap border-solid border-2 border-rose  ">
      {reviews.map((review) => (
        <AllReviewItem key={review._id} review={review} />
      ))}
    </div>
  );
};
