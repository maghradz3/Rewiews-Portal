import { useSelector } from "react-redux";

export const useReview = () => {
  const reviews = useSelector((state) => state?.reviews?.reviews);

  return {
    reviews,
  };
};
