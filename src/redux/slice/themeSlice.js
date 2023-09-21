import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  return savedTheme ? JSON.parse(savedTheme) : "light";
};

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: getInitialTheme(),
  },
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.value === "light" ? "dark" : "light";
      state.value = newTheme;
      localStorage.setItem("theme", JSON.stringify(newTheme));
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
