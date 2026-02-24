import { createAsyncThunk } from "@reduxjs/toolkit";
import * as url from "@/utils/Url";

// ============================
// ✅ Fetch Company / Footer Data
// ============================
export const fetchCompany = createAsyncThunk(
  "company/fetchCompany",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url.BASE_URL}/api/footer-data`);
      if (!res.ok) {
        return rejectWithValue({message: `HTTP error! Status: ${res.status}`,});
      }

      const data = await res.json();

      // ❌ API level error (status:false)
      if (!data?.status) {
        return rejectWithValue({
          message: data?.message || "API returned status=false",
        });
      }

      // ✅ return only useful data
      return data.data;

    } catch (error) {
      return rejectWithValue({
        message: error.message || "Network error",
      });
    }
  }
);