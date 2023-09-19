// import styled from "@emotion/styled";
import { TextField, styled } from "@mui/material";
import React from "react";

const StyledTextField = styled(TextField)(() => ({
  "& .MuiInputBase-input": {
    color: "white",
  },
}));

export const Input = ({
  type = "text",
  name,
  label,
  onChange,
  error,
  value,
}) => {
  return (
    <StyledTextField
      type={type}
      name={name}
      label={label}
      onChange={onChange}
      error={Boolean(error)}
      value={value}
      helperText={error}
      InputLabelProps={{ sx: { color: "white" } }}
    />
  );
};
