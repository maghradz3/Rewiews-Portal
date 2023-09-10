import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    userInfo: [],
  },
  reducers: {
    logoutUser: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
  },

  extraReducers: (builder) => {},
});

export const { logoutUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
