import { useSelector } from "react-redux";

export const useUser = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  return {
    userInfo,
  };
};
