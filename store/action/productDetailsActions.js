import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/utils/Url";

export const getProductByAlias = createAsyncThunk(
  "product/getProductDetails",
  async (alias, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/customer/guest/product/details/${alias}`
      );
      return response?.data?.data?.details || {};
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product details"
      );
    }
  }
);
