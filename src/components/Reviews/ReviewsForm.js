import { Box, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { Button, Input } from "../../atoms";
import { generateReviewsFormValues } from "./generateReviewsFormValue";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks";
import { uploadReview } from "../../redux/slice";
import { useUser } from "../../hooks";
import FileBase64 from "react-file-base64";
import { TextareaAutosize } from "@mui/material";
import { useNavigate } from "react-router";

export const AddReviewForm = () => {
  const [image, setImage] = useState("");
  const {
    formValues: reviewFormValues,
    onFormChange,
    setFormValues,
  } = useForm(generateReviewsFormValues());
  const { userInfo } = useUser();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = () => {
    const title = reviewFormValues.title.value;
    const artworkName = reviewFormValues.pieceName.value;
    const content = reviewFormValues.content.value;
    const category = reviewFormValues.category.value;
    const tags = reviewFormValues.tags.value;
    const rating = reviewFormValues.rating.value;
    const textarrea = reviewFormValues.textarrea.value;

    console.log(title, artworkName, content, tags, rating, image);

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
      })
    )
      .unwrap()
      .then(() => {
        navigate("/");
        console.log("Review Added");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
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
      <div className="flex center gap-10 ">
        <label className="text-white" htmlFor="category">
          Category
        </label>
        <select
          name="category"
          onChange={onFormChange}
          value={reviewFormValues.category.value}
          error={reviewFormValues.category.error}
        >
          <option className="text-black" value="">
            Select Category
          </option>
          <option value="Movies">Movies</option>
          <option value="Books">Books</option>
          <option value="Games">Games</option>
        </select>
      </div>
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
      <div className="flex flex-col justify-between gap-2">
        <label className="text-white" name="textarrea">
          Deep Description
        </label>
        <TextareaAutosize
          name="textarrea"
          value={reviewFormValues.textarrea.value}
          onChange={onFormChange}
          minRows={3}
        />
      </div>
      <FileBase64
        type="file"
        multiple={false}
        onDone={({ base64 }) => {
          setImage(base64);
        }}
      />
      <Button onClick={onSubmit}>Add Review</Button>
    </Box>
  );
};
