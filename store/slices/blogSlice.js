import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBlogs } from "../action/blogActions";

const initialState = {
  loading: false,
  blogs: [],
  error: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    clearBlogs: (state) => {
      state.blogs = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBlogs } = blogSlice.actions;
export default blogSlice.reducer;
