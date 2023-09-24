import React from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useUser } from "../../hooks";
import { useTranslation } from "react-i18next";
import { isUserAdmin } from "../../helpers";
import { Translate } from "../Translation";
import { ThemeBtn } from "../../atoms";
import { toggleTheme } from "../../redux/slice";

export const NavBar2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { userInfo } = useUser();
  const moveToUploadHandler = () => {
    navigate("/reviewUpload");
  };
  const moveToAuthorReviewsHandler = () => {
    navigate("/authorReviews");
  };

  const moveToAdminPanelHandler = () => {
    navigate("/adminPanel");
  };
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
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
        </div>
        <Translate />
      </div>
      <div className="navbar-center hidden lg:flex">
        <div className="flex-1  flex items-center justify-center gap-4 md:gap-4">
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
        </div>
      </div>
      <div className="navbar-end">
        <button
          className="btn btn-ghost text-xs sm:text-sm md:text-base"
          onClick={() => dispatch(toggleTheme())}
        >
          <ThemeBtn />
        </button>
      </div>
    </div>
  );
};
