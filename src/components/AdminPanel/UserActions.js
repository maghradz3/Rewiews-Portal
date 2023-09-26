import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../redux/slice";
import { blockUser, unBlockUser, makeAdmin } from "../../redux/slice";
import { useTranslation } from "react-i18next";

export const UserActions = ({ user }) => {
  const { t } = useTranslation();
  const userInitials =
    user.firstName.toUpperCase().charAt(0) +
    user.lastName.toUpperCase().charAt(0);
  const dispatch = useDispatch();

  const deleteUserHandler = () => {
    dispatch(deleteUser(user._id));
  };
  const blockUserHandler = () => {
    dispatch(blockUser(user._id));
  };
  const unBlockUserHandler = () => {
    dispatch(unBlockUser(user._id));
  };

  const makeAdminHandler = () => {
    dispatch(makeAdmin(user._id));
  };

  const adminColor = user.role === "admin" ? "text-green-500" : "";

  return (
    <div className="flex flex-col md:flex-row items-center p-4 bg-white rounded-xl shadow-md border-2 border-red-500 hover:scale-105 transform transition-all ease-in-out duration-200 dark:bg-gray-700   ">
      <div className="flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-gray-200 dark:bg-gray-600 rounded-full">
        <h1 className=" text-6xl md:text-8xl text-gray-800 dark:text-white">
          {userInitials}
        </h1>
      </div>
      <div className="flex flex-col items-center mt-4 md:mt-0 md:ml-4">
        <div className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {user.firstName + " " + user.lastName}
        </div>
        <p className="text-base text-gray-600 dark:text-gray-300">
          {user.email}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {user.dateJoined}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {t("role")}:<span className={`${adminColor}`}> {user.role}</span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {t("status")}: {user.status[0]}
        </p>
        <button
          onClick={deleteUserHandler}
          className="bg-red-500 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 focus:ring-opacity-50"
        >
          {t("deleteProfile")}
        </button>
        <button
          onClick={blockUserHandler}
          className="bg-rose-500 mt-2 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 focus:ring-opacity-50"
        >
          {t("block")}
        </button>
        <button
          onClick={unBlockUserHandler}
          className="bg-green-500 mt-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 focus:ring-opacity-50"
        >
          {t("unblock")}
        </button>
        <button
          onClick={makeAdminHandler}
          className="bg-green-500 mt-2 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 focus:ring-opacity-50"
        >
          {t("makeAdmin")}
        </button>
      </div>
    </div>
  );
};
