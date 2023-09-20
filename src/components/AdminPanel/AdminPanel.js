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
    <div className="flex flex-col flew-wrap border-2  p-3 gap-12 ">
      <h1 className="self-center text-white text-5xl">Admin Panel</h1>
      <div className="flex flex-wrap gap-2">
        {users.map((user) => (
          <UserActions
            className="width-1/3 border-2 border-solid border-red-500"
            key={user._id}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};
