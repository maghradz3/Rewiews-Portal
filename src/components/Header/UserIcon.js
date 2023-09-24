import { styled, Box } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useUser } from "../../hooks";
import { Button } from "../../atoms";
import { logoutUser } from "../../redux/slice";
import { getUserInitials } from "../../helpers";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";

export const UserIcon = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useUser();

  const { t, i18n } = useTranslation();

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn  btn-gray-300 btn-circle avatar">
        <div className="w-10 rounded-full flex justify-center items-center">
          {!userInfo ? (
            <div className="flex justify-center align-center">
              <BsFillPersonPlusFill className="text-3xl  my-[5px]" />
            </div>
          ) : (
            <h1 className="text-2xl"> {getUserInitials(userInfo)}</h1>
          )}
        </div>
      </label>

      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
      >
        {!userInfo ? (
          <>
            <li>
              <Button onClick={() => navigate("/register")}>
                {t("register")}
                <span className="badge">New</span>
              </Button>
            </li>
            <li>
              <Button onClick={() => navigate("/login")}>{t("LogIn")}</Button>
            </li>
            <li>
              <Button onClick={() => navigate("/")}>{t("menu")}</Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Button
                onClick={() => {
                  dispatch(logoutUser());
                  navigate("/login");
                }}
              >
                {" "}
                {t("logout")}
              </Button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
