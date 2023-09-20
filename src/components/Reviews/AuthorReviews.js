import React from "react";
import { useReview } from "../../hooks/useReview";
import { useUser } from "../../hooks";
import { AllReviewItem } from "../Home/AllReviewItem";

export const AuthorReviews = () => {
  const { reviews } = useReview();
  const { userInfo } = useUser();

  return (
    <div className="container mx-auto  flex justify-center gap-[50px] flex-wrap border-solid border-2 border-rose  ">
      {reviews
        .filter((review) => review.author._id === userInfo._id)
        .map((review) => (
          <AllReviewItem key={review._id} review={review} />
        ))}
    </div>
  );
};
