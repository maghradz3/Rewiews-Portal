import * as React from "react";

import { UserIcon } from "./UserIcon";
import { ThemeBtn } from "../../atoms";
import { useNavigate } from "react-router";
import { SearchBar } from "../Home/SearchBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllReviews } from "../../redux/slice";
import { FcHome } from "react-icons/fc";
import { useTheme, useUser } from "../../hooks";
import { toggleTheme } from "../../redux/slice";

import { isUserAdmin } from "../../helpers";
import { Translate } from "../Translation";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

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
    <div className="navbar bg-base-100 px-4 xs:pl-1 md:px-8 lg:px-8 flex">
      <div className="flex-1 flex items-center justify-start">
        <a
          onClick={() => navigate("/")}
          className="btn btn-ghost btn-gray-400 normal-case text-xl"
        >
          <FcHome className="text-4xl" />
        </a>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="form-control">
          <SearchBar />
        </div>
      </div>

      <div className=" flex-1 flex items-center justify-end">
        <UserIcon />
      </div>
    </div>
  );
};
