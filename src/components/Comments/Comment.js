import React, { useState, useEffect } from "react";

import { addCommentToReview, getAllUsers } from "../../redux/slice";
import { useDispatch } from "react-redux";
import { Button } from "../../atoms";
import { Box } from "@mui/material";
import { CommentSection } from "./CommentSection";
import { useUser } from "../../hooks";

export const Comment = ({ reviewId, comments }) => {
  const [inputValue, setInputValue] = useState("");
  const onChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const { users } = useUser();

  const onSubmitHandler = (e) => {
    dispatch(addCommentToReview({ inputValue, reviewId }));
    setInputValue("");
  };



  return (
    <div className="flex flex-col">
      <input
        className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="Add You comment Here"
        type="text"
        value={inputValue}
        onChange={onChangeHandler}
        name="search"
      />
      <Button onClick={onSubmitHandler} className="self-end">
        Add Comment
      </Button>
      <Box className="flex flex-col gap-1">
        {comments?.map((comment) => (
          <CommentSection
            users={users}
            comment={comment}
            key={comment._id}
            reviewId={reviewId}
          />
        ))}
      </Box>
    </div>
  );
};
