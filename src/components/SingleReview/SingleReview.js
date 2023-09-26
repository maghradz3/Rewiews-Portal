import React from "react";
import { useReview } from "../../hooks";
import { Comment } from "../Comments";
import { LoadingWrapper } from "../../atoms";
import { useTheme } from "../../hooks";

export const SingleReview = () => {
  const { singleReview, loading } = useReview();
  const { theme } = useTheme();

  const bgColor = theme === "dark" ? "bg-[#1a242f]" : "bg-[#F0F0F0]";

  const contColor = theme === "dark" ? "bg-[#F0F0F0]" : "bg-[#1a242f]";

  const txtColor = theme !== "dark" ? "text-[#F0F0F0]" : "text-[#1a242f]";

  const authorInits =
    singleReview?.author?.firstName.toUpperCase().charAt(0) +
    singleReview?.author?.lastName.toUpperCase().charAt(0);

  return (
    <LoadingWrapper isLoading={loading}>
      <div className={`${bgColor} min-h-screen p-4 md:p-8`}>
        <div
          className={`max-w-3xl mx-auto ${contColor}  p-6 rounded-lg shadow-md space-y-6`}
        >
          <h1 className={`${txtColor} text-3xl font-bold mb-4`}>
            {singleReview?.title}
          </h1>
          {singleReview?.image && (
            <div className="mb-4 rounded-lg overflow-hidden">
              <img
                src={singleReview?.image}
                alt={singleReview?.title}
                className="w-full object-cover object-center md:h-[500px]"
              />
            </div>
          )}
          <p className={`${txtColor} text-gray-600 mb-4`}>
            {" "}
            Category: {singleReview?.category}
          </p>
          <div className={` ${txtColor}  prose mb-6`}>
            {singleReview?.content}
          </div>

          {singleReview?.textarrea && (
            <div className="bg-gray-200 p-4 rounded-lg ">
              {singleReview?.textarrea}
            </div>
          )}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <h1 className="text-black-500 text-2xl">{authorInits}</h1>{" "}
            </div>
            <div>
              <p className={` ${txtColor} font-semibold`}>
                {singleReview?.author.firstName}
              </p>
              <p className="text-sm text-gray-500">
                {singleReview?.author.lastName}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 mb-6">
            <span className="bg-blue-200 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold">
              {singleReview?.likes.length} Likes
            </span>
            {singleReview?.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
              >
                #{tag}
              </span>
            ))}
          </div>
          <Comment
            reviewId={singleReview?._id}
            comments={singleReview?.comments}
          />
        </div>
      </div>
    </LoadingWrapper>
  );
};
