import React from "react";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../redux/slice";
import { MdDarkMode } from "react-icons/md";
import { useTheme } from "../hooks";
import { BsFillSunFill } from "react-icons/bs";

export const ThemeBtn = () => {
  const { theme } = useTheme();

  return <>{theme === "dark" ? <BsFillSunFill /> : <MdDarkMode />}</>;
};
