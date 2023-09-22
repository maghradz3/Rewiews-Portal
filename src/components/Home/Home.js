import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllReviews } from "../../redux/slice";
import { useReview } from "../../hooks";

import { AllReviewItem } from "./AllReviewItem";
import { LoadingWrapper } from "../../atoms";

export const Home = () => {
  const dispatch = useDispatch();

  const { reviews, loading } = useReview();

  useEffect(() => {
    dispatch(getAllReviews());
  }, []);

  return (
    <LoadingWrapper isLoading={loading}>
      <div className="container mx-auto flex justify-center gap-4 md:gap-8 lg:gap-12 p-4 flex-wrap   ">
        {reviews.map((review) => (
          <AllReviewItem key={review._id} review={review} />
        ))}
      </div>
    </LoadingWrapper>
  );
};
