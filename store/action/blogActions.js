import { createAsyncThunk } from "@reduxjs/toolkit";
import * as url from "../../utils/Url";

/* -------------------- FETCH HOMEPAGE BLOGS -------------------- */

export const fetchHomepageBlogs = createAsyncThunk(
  "blog/fetchHomepageBlogs",
  async ({ page = 1, per_page = 4 }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${url.BASE_URL}/api/blogs?page=${page}&per_page=${per_page}`
      );
      const data = await res.json();

      if (!data.status) {
        return rejectWithValue(data.message);
      }

      return data.data.items;
    } catch (error) {
      return rejectWithValue("Failed to fetch homepage blogs");
    }
  }
);

/* -------------------- FETCH BLOG LIST -------------------- */

export const fetchBlogs = createAsyncThunk(
  "blog/fetchBlogs",
  async ({ page = 1, per_page = 12 }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${url.BASE_URL}/api/blogs?page=${page}&per_page=${per_page}`
      );
      const data = await res.json();

      if (!data.status) {
        return rejectWithValue(data.message);
      }

      return data.data; 
    } catch (error) {
      return rejectWithValue("Failed to fetch blogs");
    }
  }
);

/* -------------------- FETCH BLOG BY SLUG -------------------- */

export const fetchBlogBySlug = createAsyncThunk(
  "blog/fetchBlogBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url.BASE_URL}/api/blogs/${slug}`);
      const data = await res.json();

      if (!data.status) {
        return rejectWithValue(data.message);
      }

      return data.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch blog details");
    }
  }
);
