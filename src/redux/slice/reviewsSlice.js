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

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axiosInstance.delete(`/review/${userId}`);
      dispatch(getAllReviews());
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addLikeToReview = createAsyncThunk(
  "reviews/addLikeToReview",
  async (reviewId, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axiosInstance.post(`/review/${reviewId}/likes/`);

      console.log(data);
      dispatch(getAllReviews());
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addDisLikeToReview = createAsyncThunk(
  "reviews/addDisLikeToReview",
  async (reviewId, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axiosInstance.delete(`/review/${reviewId}/likes/`);

      console.log(data);
      dispatch(getAllReviews());
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addCommentToReview = createAsyncThunk(
  "reviews/addCommentToReview",
  async ({ inputValue, reviewId }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axiosInstance.post(
        `/review/${reviewId}/comments/`,
        { text: inputValue }
      );
      console.log(data);
      dispatch(getAllReviews());
      return data;
    } catch (error) {}
  }
);

export const deleteCommentToReview = createAsyncThunk(
  "reviews/deleteCommentToReview",
  async ({ commentId, reviewId }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axiosInstance.delete(
        `/review/${reviewId}/comments/${commentId}`
      );
      console.log(data);
      dispatch(getAllReviews());
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
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
    builder.addCase(deleteReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(deleteCommentToReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const reviewsReducer = reviewsSlice.reducer;
