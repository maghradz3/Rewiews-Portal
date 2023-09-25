import React, { useState } from "react";
import { useReview } from "../../hooks";
import { Autocomplete, TextField } from "@mui/material";

import { useTranslation } from "react-i18next";

const TagsInput = ({ tags, addTag, removeTag }) => {
  const [input, setInput] = useState("");
  const { reviewTags } = useReview();
  const { t, i18n } = useTranslation();

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || (event.key === " " && input)) {
      event.preventDefault();
      addTag(input.trim());
      setInput(" ");
    }
  };

  const handleRemoveClick = (tag) => {
    removeTag(tag);
  };

  const onChangeHandler = (e) => {
    setInput(e.target.value);
  };
  console.log(input);

  const matchedTags = reviewTags.filter((tag) => input === tag);

  return (
    <div>
      <div className="flex flex-wrap justify-between mb-2   ">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="m-1 p-1 text-white bg-blue-500 border border-black rounded-[20px]"
          >
            {tag}
            <button
              onClick={() => handleRemoveClick(tag)}
              className="ml-2 text-red-500  rounded-full p-1"
            >
              x
            </button>
          </span>
        ))}
      </div>
      {/* <input
        type="text"
        name="tags"
        id="tags"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a tag..."
      /> */}
      <Autocomplete
        disablePortal
        id="tags"
        options={matchedTags}
        sx={{ width: 300, color: "white" }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t("tags")}
            type="text"
            name="tags"
            value={input}
            onKeyDown={handleKeyDown}
            onChange={onChangeHandler}
            InputLabelProps={{ sx: { color: "gray" } }}
            sx={{
              ".MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray",
                },
                "&:hover fieldset": {
                  borderColor: "gray",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "gray",
                },
              },
              ".MuiFormLabel-root.Mui-focused": {
                color: "gray",
              },
            }}
          />
        )}
      />
    </div>
  );
};

export default TagsInput;
