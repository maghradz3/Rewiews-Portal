import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../helpers";

export const uploadReview = createAsyncThunk(
  "reviews/uploadReview",
  async ({ formValues, reviewId }, { rejectWithValue }) => {
    try {
      const method = reviewId ? "put" : "post";
      const url = reviewId ? `/review/${reviewId}` : "/review/upload";
      const { data } = await axiosInstance[method](url, formValues);

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

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getSingleREview = createAsyncThunk(
  "reviews/getSingleReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/review/${reviewId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
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
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const addLikeToReview = createAsyncThunk(
  "reviews/addLikeToReview",
  async (reviewId, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axiosInstance.post(`/review/${reviewId}/likes/`);

      dispatch(getAllReviews());
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const addDisLikeToReview = createAsyncThunk(
  "reviews/addDisLikeToReview",
  async (reviewId, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await axiosInstance.delete(`/review/${reviewId}/likes/`);

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
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const searchReviews = createAsyncThunk(
  "reviews/search",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/review/search?q=${query}`);
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
    selectedReview: null,
    searchReviews: [],
    singleReview: null,
    reviews: [],
    tags: [],
  },
  reducers: {
    setSelectedReview: (state, action) => {
      state.selectedReview = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadReview.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(uploadReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getAllReviews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllReviews.fulfilled, (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
      state.tags = action?.payload
        .map((review) => review?.tags || [])
        .reduce((acc, tagsArray) => [...acc, ...tagsArray], []);
    });
    builder.addCase(getAllReviews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getSingleREview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSingleREview.fulfilled, (state, action) => {
      state.loading = false;
      state.singleReview = action.payload;
    });
    builder.addCase(getSingleREview.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteReview.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteCommentToReview.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(searchReviews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchReviews.fulfilled, (state, action) => {
      state.loading = false;
      state.searchReviews = action.payload;
    });
    builder.addCase(searchReviews.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const reviewsReducer = reviewsSlice.reducer;
export const { setSelectedReview } = reviewsSlice.actions;
