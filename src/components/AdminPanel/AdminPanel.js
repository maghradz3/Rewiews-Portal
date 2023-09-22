import React from "react";
import { useUser } from "../../hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../redux/slice";
import { UserActions } from "./UserActions";

export const AdminPanel = () => {
  const { users } = useUser();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div className="flex flex-col items-center p-6 gap-6 bg-gray-200 dark:bg-gray-800 min-h-screen">
      <h1 className="text-4xl md:text-5xl text-white font-semibold">
        Admin Panel
      </h1>
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
        {users.map((user) => (
          <UserActions key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};
