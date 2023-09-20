import React from "react";
import { getUserInitials } from "../../helpers";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../redux/slice";

export const UserActions = ({ user }) => {
  const userInitials =
    user.firstName.toUpperCase().charAt(0) +
    user.lastName.toUpperCase().charAt(0);
  const dispatch = useDispatch();

  const deleteUserHandler = () => {
    dispatch(deleteUser(user._id));
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden  border-2 border-solid border-red-500 hover:scale-105 ease-in duration-200   ">
      <div className="w-full h-48 flex justify-center items-center">
        <h1 className=" text-8xl">{userInitials}</h1>
      </div>
      <div className="p-6">
        <div className="font-bold text-xl mb-2">
          {user.firstName + " " + user.lastName}
        </div>
        <p className="text-gray-800 text-base">{user.email}</p>
        <p className="text-gray-400 text-base">{user.dateJoined}</p>
        <button
          onClick={deleteUserHandler}
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete Profile
        </button>
      </div>
    </div>
  );
};
