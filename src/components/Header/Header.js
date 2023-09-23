import * as React from "react";

import { UserIcon } from "./UserIcon";
import { Button, ThemeBtn } from "../../atoms";
import { useNavigate } from "react-router";
import { SearchBar } from "../Home/SearchBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllReviews } from "../../redux/slice";
import { FcHome } from "react-icons/fc";
import { useTheme, useUser } from "../../hooks";
import { toggleTheme } from "../../redux/slice";
import { MdDarkMode } from "react-icons/md";
import { isUserAdmin } from "../../helpers";

export const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userInfo } = useUser();
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
    <div className="navbar bg-base-100 px-4 xs:pl-1 md:px-8 lg:px-8">
      <div className="flex-1 flex items-center justify-start">
        <a
          onClick={() => navigate("/")}
          className="btn btn-ghost btn-gray-400 normal-case text-xl"
        >
          {/* <button
            className="text-xs sm:text-sm md:text-base"
            onClick={() => navigate("/")}
          > */}
          <FcHome className="text-4xl" />
          {/* </button> */}
        </a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <SearchBar />
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center gap-2 md:gap-4">
        <ul className="menu menu-vertical lg:menu-horizontal bg-base-200  rounded-box  ">
          {userInfo && (
            <>
              <li>
                <a onClick={moveToAuthorReviewsHandler}>MY REVIEWS</a>
              </li>
              <li>
                <a onClick={moveToUploadHandler}>WRITE A REVIEW</a>
              </li>
            </>
          )}
          {isUserAdmin(userInfo) && (
            <li>
              <a onClick={moveToAdminPanelHandler}>ADMIN PANEL</a>
            </li>
          )}
        </ul>

        <div className="flex items-center justify-end">
          <button
            className="btn btn-ghost text-xs sm:text-sm md:text-base"
            onClick={() => dispatch(toggleTheme())}
          >
            <ThemeBtn />
          </button>
        </div>
      </div>
      <UserIcon />
    </div>
  );
};
