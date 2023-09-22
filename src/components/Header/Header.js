import * as React from "react";

import { UserIcon } from "./UserIcon";
import { Button } from "../../atoms";
import { useNavigate } from "react-router";
import { SearchBar } from "../Home/SearchBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllReviews } from "../../redux/slice";
import { FcHome } from "react-icons/fc";
import { useTheme } from "../../hooks";
import { toggleTheme } from "../../redux/slice";
import { MdDarkMode } from "react-icons/md";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useTheme();
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

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <div className="navbar bg-base-100 px-4 md:px-8 lg:px-8">
      <div className="flex-1 flex items-center justify-start">
        <a className="btn btn-ghost btn-gray-400 normal-case text-xl">
          <Button onClick={() => navigate("/")}>
            <FcHome className="text-4xl" />
          </Button>
        </a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <SearchBar />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center gap-2 md:gap-4">
        <Button
          className="text-sm md:text-base lg:text-lg px-2 md:px-4 lg:px-6 py-1 md:py-2 lg:py-3"
          onClick={moveToAuthorReviewsHandler}
        >
          My Reviews
        </Button>
        <Button
          className="text-sm md:text-base lg:text-lg px-2 md:px-4 lg:px-6 py-1 md:py-2 lg:py-3"
          onClick={moveToUploadHandler}
        >
          Write a Review
        </Button>
        <Button
          className="text-sm md:text-base lg:text-lg px-2 md:px-4 lg:px-6 py-1 md:py-2 lg:py-3"
          onClick={moveToAdminPanelHandler}
        >
          Admin Panel
        </Button>
      </div>
      <div className="flex items-center justify-end">
        <Button
          className="text-sm md:text-base lg:text-lg px-2 md:px-4 lg:px-6 py-1 md:py-2 lg:py-3"
          onClick={() => dispatch(toggleTheme())}
        >
          <MdDarkMode className="text-xl" />
        </Button>
      </div>

      <UserIcon />
    </div>
  );
};
