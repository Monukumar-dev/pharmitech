import { createSlice } from "@reduxjs/toolkit";
import {
  fetchHomepageBlogs,
  fetchBlogs,
  fetchBlogBySlug,
} from "../action/blogActions";

const initialState = {
  loading: false,
  homepageBlogs: [],
  blogs: [],
  blogDetails: null,
  error: null,
  pagination: {
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 12,
  },
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ---------------- HOMEPAGE BLOGS ---------------- */
      .addCase(fetchHomepageBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHomepageBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.homepageBlogs = action.payload;
      })
      .addCase(fetchHomepageBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------------- BLOG LIST ---------------- */
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;

        state.blogs = action.payload.items;

        state.pagination = action.payload.pagination;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------------- BLOG DETAILS ---------------- */
      .addCase(fetchBlogBySlug.pending, (state) => {
        state.loading = true;
        state.blogDetails = null;
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.blogDetails = action.payload;
      })
      .addCase(fetchBlogBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.blogDetails = null;
      });
  },
});

export default blogSlice.reducer;
