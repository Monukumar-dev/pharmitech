import { createSlice } from "@reduxjs/toolkit";
import { getAllReviews } from "../action/prodReviewAction";

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // When fetching starts
      .addCase(getAllReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // When fetching succeeds
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        // Some APIs wrap response data in a `data` property
        state.reviews = action.payload?.data || action.payload;
      })
      // When fetching fails
      .addCase(getAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;
