import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../helpers";

export const uploadReview = createAsyncThunk(
  "reviews/uploadReview",
  async ({ formValues }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/review/upload", formValues);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    loading: false,
    error: null,
    reviews: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadReview.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(uploadReview.fulfilled, (state, action) => {
      state.loading = false;
      state.reviews.push(action.payload.review);
    });
    builder.addCase(uploadReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const reviewsReducer = reviewsSlice.reducer;
