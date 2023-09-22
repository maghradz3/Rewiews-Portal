import { useSelector } from "react-redux";

export const useReview = () => {
  const reviews = useSelector((state) => state?.reviews?.reviews);
  const reviewError = useSelector((state) => state?.reviews?.error);
  const selectedReview = useSelector((state) => state?.reviews?.selectedReview);
  const singleReview = useSelector((state) => state?.reviews?.singleReview);
  const searchReviews = useSelector((state) => state?.reviews?.searchReviews);
  const loading = useSelector((state) => state?.reviews?.loading);
  const error = useSelector((state) => state?.reviews?.error);

  return {
    reviews,
    reviewError,
    searchReviews,
    selectedReview,
    singleReview,
    loading,
    error,
  };
};
