import { TextField } from "@mui/material";
import React from "react";

export const Input = ({
  type = "text",
  name,
  label,
  onChange,
  error,
  value,
}) => {
  return (
    <TextField
      type={type}
      name={name}
      label={label}
      onAbort={onChange}
      error={Boolean(error)}
      value={value}
      helperText={error}
      InputLabelProps={{ style: { color: "white" } }}
    />
  );
};
