import { Box } from "@mui/material";
import React from "react";
import { Input } from "../../../atoms";

export const RegisterForm = () => {
  return (
    <Box>
      <form>
        <Input
          type="text"
          name="firstName"
          label="First Name"
          onChange={onFormChange}
        />
      </form>
    </Box>
  );
};
