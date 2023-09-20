import { useSelector } from "react-redux";

export const useUser = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const users = useSelector((state) => state.user.users);

  return {
    userInfo,
    users,
  };
};
