import { useSelector } from "react-redux";

export const useReview = () => {
  const reviews = useSelector((state) => state?.reviews?.reviews);
  const reviewError = useSelector((state) => state?.reviews?.error);
  return {
    reviews,
    reviewError,
  };
};
