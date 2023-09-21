import React from "react";
import { Button as MUIButton } from "@mui/material";

export const Button = ({ onClick, children, ...rest }) => {
  return (
    <MUIButton
      className="text-sm md:text-base lg:text-lg px-2 md:px-4 lg:px-6 py-1 md:py-2 lg:py-3"
      onClick={onClick}
    >
      {children}
    </MUIButton>
  );
};
