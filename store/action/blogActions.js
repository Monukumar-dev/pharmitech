import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "@/services/Request";
import * as url from "../../utils/Url";


/* -------------------- FETCH BLOGS -------------------- */

export const fetchBlogs = createAsyncThunk(
  "blog/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url.BASE_URL}/api/blogs`);
      const data = await res.json();

      if (!data.status) {
        return rejectWithValue(data.message);
      }

      return data.data; // array of blogs
    } catch (error) {
      return rejectWithValue("Failed to fetch blogs");
    }
  }
);