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
    <div className="navbar bg-base-100 px-4 xs:pl-1 md:px-8 lg:px-8">
      <div className="flex-1 flex items-center justify-start">
        <a
          onClick={() => navigate("/")}
          className="btn btn-ghost btn-gray-400 normal-case text-xl"
        >
          <FcHome className="text-4xl" />
        </a>
      </div>
      <Translate />
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
                <a onClick={moveToAuthorReviewsHandler}>{t("my review")}</a>
              </li>
              <li>
                <a onClick={moveToUploadHandler}>{t("write Review")}</a>
              </li>
            </>
          )}
          {isUserAdmin(userInfo) && (
            <li>
              <a onClick={moveToAdminPanelHandler}>{t("admin panel")}</a>
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
