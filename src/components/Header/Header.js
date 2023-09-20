import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Container from "@mui/material/Container";

import { UserIcon } from "./UserIcon";
import { Button } from "../../atoms";
import { useNavigate } from "react-router";

export const Header = () => {
  const navigate = useNavigate();
  const moveToUploadHandler = () => {
    navigate("/reviewUpload");
  };
  const moveToAuthorReviewsHandler = () => {
    navigate("/authorReviews");
  };

  return (
    <AppBar sx={{ backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar className="flex justify-between ">
          <Box sx={{ flexGrow: 0 }}>
            <UserIcon />
          </Box>
          <Box>
            <Button onClick={moveToAuthorReviewsHandler}>My Reviews</Button>
            <Button onClick={moveToUploadHandler}>Write a Review</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
