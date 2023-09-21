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
import { FcHome } from "react-icons/fc";

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
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">
          <FcHome className="text-4xl" />
        </a>
      </div>
      <div className="flex-1">
        <Button onClick={moveToAuthorReviewsHandler}>My Reviews</Button>
        <Button onClick={moveToUploadHandler}>Write a Review</Button>
        <Button onClick={moveToAdminPanelHandler}>Admin Panel</Button>
      </div>
      <div></div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <SearchBar />
        </div>
      </div>
      <UserIcon />
    </div>
  );
};
