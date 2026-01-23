import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "@/services/Request";
import * as url from "@/utils/Url";

// ----------------------------
// Generic API Client
// ----------------------------
const API = request(url.BASE_URL);

// ----------------------------
// Helper: Normalize Errors
// ----------------------------
const handleError = (error, fallback = "Something went wrong") =>
  error?.response?.data?.message || error?.message || fallback;

// ============================
// ✅ Fetch Company / Common Data
// ============================
export const fetchCompany = createAsyncThunk(
  "company/fetchCompany",
  async (_, { rejectWithValue }) => {
    try {
      const data  = await API.get("/api/homepage");
      
      if (!data?.status) {
        return rejectWithValue({
          message: "API returned status=false",
          data,
        });
      }
      // const { company_details, footer_text } = data.data || {};
      return data; 

    } catch (err) {
      return rejectWithValue({
        message: handleError(err, "Network error"),
      });
    }
  }
);
