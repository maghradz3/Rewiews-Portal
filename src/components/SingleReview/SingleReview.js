import React from "react";
import { useReview } from "../../hooks";
import { Comment } from "../Comments";
import { LoadingWrapper } from "../../atoms";

export const SingleReview = () => {
  const { singleReview, loading } = useReview();

  const authorInits =
    singleReview?.author?.firstName.toUpperCase().charAt(0) +
    singleReview?.author?.lastName.toUpperCase().charAt(0);

  return (
    <LoadingWrapper isLoading={loading}>
      <div className="bg-gray-100 min-h-screen p-4 md:p-8">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1>{singleReview?.title}</h1>
          {singleReview?.image && (
            <div className="mb-4">
              <img
                src={singleReview?.image}
                alt={singleReview?.title}
                className="rounded-lg w-full h-[500px] object-cover object-center"
              />
            </div>
          )}
          <p className="text-gray-600 mb-4">
            {" "}
            Category: {singleReview?.category}
          </p>
          <div className="prose mb-6">{singleReview?.content}</div>

          {singleReview?.textarrea && (
            <div className="bg-gray-200 p-4 rounded-lg mb-6">
              {singleReview?.textarrea}
            </div>
          )}
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full mr-4">
              <h1 className="text-black-500 text-3xl">{authorInits}</h1>{" "}
            </div>
            <div>
              <p className="font-semibold">{singleReview?.author.firstName}</p>
              <p className="text-sm text-gray-500">
                {singleReview?.author.lastName}
              </p>
            </div>
          </div>
          <div className="mb-6">
            <span className="inline-block bg-blue-200 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold mr-2">
              {singleReview?.likes.length} Likes
            </span>
            {singleReview?.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
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
