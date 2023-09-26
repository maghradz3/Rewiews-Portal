import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllReviews } from "../../redux/slice";
import { useReview } from "../../hooks";

import { AllReviewItem } from "./AllReviewItem";
import { LoadingWrapper } from "../../atoms";
import { useTranslation } from "react-i18next";

export const Home = () => {
  const dispatch = useDispatch();
  const [sortOrder, setSortOrder] = useState("ratinghDesc");

  const { reviews, loading } = useReview();

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getAllReviews());
  }, []);

  const sortedReviews = [...(reviews || [])].sort((a, b) => {
    const [type, order] = sortOrder.split("h");
    const isAsc = order === "Asc";
  

    if (type === "likes") {
      const aLength = a.likes.length;
      const bLength = b.likes.length;
      return isAsc ? aLength - bLength : bLength - aLength;
    }

    return isAsc ? a.rating - b.rating : b.rating - a.rating;
  });

  return (
    <LoadingWrapper isLoading={loading}>
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <label
            htmlFor="sortOrder"
            className="block text-sm font-medium text-gray-400"
          >
            {t("sortBy")}
          </label>
          <select
            id="sortOrder"
            name="sortOrder"
            onChange={(e) => setSortOrder(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            defaultValue={sortOrder}
          >
            <option value="ratinghDesc">{t("ratingHigestFirst")}</option>
            <option value="ratinghAsc">{t("ratingLowestFirst")}</option>
            <option value="likeshDesc">{t("likesHigestFirst")}</option>
            <option value="likeshAsc">{t("likesLowestFirst")}</option>
          </select>
        </div>
        <div className="flex justify-center gap-4 md:gap-8 lg:gap-12 flex-wrap">
          {sortedReviews &&
            sortedReviews.map((review) => (
              <AllReviewItem key={review._id} review={review} />
            ))}
        </div>
      </div>
    </LoadingWrapper>
  );
};
