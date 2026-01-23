import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/Url";

// ✅ Get product reviews by product ID
export const getAllReviews = createAsyncThunk(
  "reviews/getAllReviews",
  async ({ prodId, page = 1, perPage = 10 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/customer/guest/product/${prodId}/reviews`,
        {
          params: { per_page: perPage, page },
        }
      );

      return response.data; // adjust if API wraps in data.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product reviews"
      );
    }
  }
);
