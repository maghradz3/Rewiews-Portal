import React from "react";
import { FcEmptyTrash } from "react-icons/fc";
import { Alert, Button } from "../../atoms";
import { useDispatch } from "react-redux";
import { deleteCommentToReview } from "../../redux/slice";
import { useTheme, useAlert, useUser } from "../../hooks";

export const CommentSection = ({ comment, users, reviewId }) => {
  const { theme } = useTheme();
  const { alertState, handleClose, showAlert } = useAlert();
  const { userInfo } = useUser();
  console.log(users);

  const txtColor = theme !== "dark" ? "text-[#BD9696]" : "text-[#1a242f]";

  const userInit = users.filter((user) => user._id === comment.user)[0];
  const userInitials =
    userInit.firstName.charAt(0).toUpperCase() +
    userInit.firstName.slice(1) +
    " " +
    userInit.lastName.charAt(0).toUpperCase() +
    userInit.lastName.slice(1);

  const dateFormatHandler = (date) => {
    const datePart = date.split("T")[0];
    const [year, month, day] = datePart.split("-");
    return `${day}.${month}.${year}`;
  };

  const dispatch = useDispatch();

  const deleteCommentHandler = () => {
    dispatch(
      deleteCommentToReview({
        commentId: comment._id,
        reviewId: reviewId,
      })
    )
      .unwrap()
      .catch((error) => {
        const { message } = error;
        const userMessage = userInfo
          ? `This is not your comment!`
          : "You need to be logged in to delete comments!";
        const errorMessage = `${message} ${userMessage}`;
        console.log(errorMessage);
        showAlert("error", errorMessage);
      });
  };

  return (
    <div className=" border-b-2  border-dashed border-slate-600 ">
      <div className="flex flex-col ">
        <div className="bg-slate-800 flex justify-between pr-1 pl-1">
          <h1 className="text-gray-300 ">{userInitials}</h1>
          <span className="text-gray-400 bg-slate-800 text-sm">
            {dateFormatHandler(comment.date)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className={`${txtColor}`}>{comment.text}</span>
          <Button onClick={deleteCommentHandler}>
            <FcEmptyTrash className="cursor-pointer text-xl hover:text-2xl ease-in duration-300 " />
          </Button>
          <Alert {...alertState} handleClose={handleClose} />
        </div>
      </div>
    </div>
  );
};
