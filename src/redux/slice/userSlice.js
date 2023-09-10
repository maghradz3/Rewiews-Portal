import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../helpers";

export const authenticatedUser = createAsyncThunk(
  "user/authenticatedUser",
  async ({ formValues, isLogin }, { rejectWithValue }) => {
    try {
      const route = `/users/${isLogin ? "login" : "register"}`;
      const { data } = await axiosInstance.post(route, formValues);
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

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

  extraReducers: (builder) => {
    builder.addCase(authenticatedUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(authenticatedUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.user;
    });
    builder.addCase(authenticatedUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logoutUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
