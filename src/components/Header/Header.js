import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Container from "@mui/material/Container";

import { UserIcon } from "./UserIcon";
import { Button } from "../../atoms";
import { useNavigate } from "react-router";
import { SearchBar } from "../Home/SearchBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllReviews } from "../../redux/slice";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const moveToUploadHandler = () => {
    navigate("/reviewUpload");
  };
  const moveToAuthorReviewsHandler = () => {
    navigate("/authorReviews");
  };

  const moveToAdminPanelHandler = () => {
    navigate("/adminPanel");
  };

  useEffect(() => {
    dispatch(getAllReviews());
  }, []);

  return (
    <AppBar sx={{ backgroundColor: "black" }}>
      <Container maxWidth="xl">
        <Toolbar className="flex justify-between ">
          <Box>
            <Button onClick={moveToAuthorReviewsHandler}>My Reviews</Button>
            <Button onClick={moveToUploadHandler}>Write a Review</Button>
            <Button onClick={moveToAdminPanelHandler}>Admin Panel</Button>
          </Box>
          <SearchBar />
          <Box sx={{ flexGrow: 0 }}>
            <UserIcon />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
