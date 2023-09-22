import { Box, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { Button, Input } from "../../atoms";
import { generateReviewsFormValues } from "./generateReviewsFormValue";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks";
import { uploadReview } from "../../redux/slice";
import { useUser, useReview } from "../../hooks";
import FileBase64 from "react-file-base64";
import { TextareaAutosize } from "@mui/material";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export const AddReviewForm = () => {
  const [image, setImage] = useState("");
  const {
    formValues: reviewFormValues,
    onFormChange,
    setFormValues: setReviewFormValues,
  } = useForm(generateReviewsFormValues());
  const { userInfo } = useUser();
  const { selectedReview } = useReview();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedReview) {
      setReviewFormValues(generateReviewsFormValues(selectedReview));
      setImage(selectedReview.image);
    }
  }, [selectedReview]);

  const onSubmit = () => {
    const title = reviewFormValues.title.value;
    const artworkName = reviewFormValues.pieceName.value;
    const content = reviewFormValues.content.value;
    const category = reviewFormValues.category.value;
    const tags = reviewFormValues.tags.value;
    const rating = reviewFormValues.rating.value;
    const textarrea = reviewFormValues.textarrea.value;

    dispatch(
      uploadReview({
        formValues: {
          title,
          artworkName,
          category,
          content,
          tags,
          rating,
          textarrea,
          image,
          author: userInfo._id,
        },
        reviewId: selectedReview?._id,
      })
    )
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box className="flex flex-col items-center justify-center gap-4 p-6 md:p-10 bg-gray-200 dark:bg-gray-800 rounded-lg max-w-md mx-auto mt-10 shadow-lg">
      <Input
        name="title"
        label="Title"
        value={reviewFormValues.title.value}
        error={reviewFormValues.title.error}
        onChange={onFormChange}
      />
      <Input
        name="pieceName"
        label="Artwork Name"
        value={reviewFormValues.pieceName.value}
        error={reviewFormValues.pieceName.error}
        onChange={onFormChange}
      />
      <Input
        name="tags"
        label="Tags"
        placeholder="Use comma to separate"
        value={reviewFormValues.tags.value}
        onChange={onFormChange}
      />
      <Input
        name="content"
        label="Content"
        value={reviewFormValues.content.value}
        error={reviewFormValues.content.error}
        onChange={onFormChange}
        multiline
        rows={4}
      />

      <Input
        name="rating"
        label="Rating"
        type="number"
        min="0"
        max="10"
        value={reviewFormValues.rating.value}
        error={reviewFormValues.rating.error}
        onChange={onFormChange}
      />
      <div className="flex center gap-10 ">
        <select
          className="select select-info w-full max-w-xs"
          name="category"
          onChange={onFormChange}
          value={reviewFormValues.category.value}
          error={reviewFormValues.category.error}
        >
          <option disabled selected className="text-black" value="">
            Select Category
          </option>
          <option value="Movies">Movies</option>
          <option value="Books">Books</option>
          <option value="Games">Games</option>
        </select>
      </div>

      <textarea
        className="textarea textarea-info"
        placeholder="Deep Description"
        name="textarrea"
        value={reviewFormValues.textarrea.value}
        onChange={onFormChange}
        //   minRows={3}
      />

      <label className="mt-4 text-gray-300 cursor-pointer transition duration-500 ease-in-out inline-block text-center p-2 w-full rounded-md border border-black hover:bg-blue-500 hover:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        <span>Upload Image</span>
        <FileBase64
          type="file"
          multiple={false}
          onDone={({ base64 }) => setImage(base64)}
        />
      </label>
      <Button onClick={onSubmit}>Add Review</Button>
    </Box>
  );
};
