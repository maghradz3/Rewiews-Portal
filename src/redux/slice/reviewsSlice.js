import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../helpers";

export const uploadReview = createAsyncThunk(
  "reviews/uploadReview",
  async ({ formValues }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/review/upload", formValues);

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getAllReviews = createAsyncThunk(
  "reviews/getAllReviews",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/review/");
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
    });
    builder.addCase(uploadReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getAllReviews.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllReviews.fulfilled, (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    });
    builder.addCase(getAllReviews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const reviewsReducer = reviewsSlice.reducer;
