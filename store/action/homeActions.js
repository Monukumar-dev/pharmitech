import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "@/services/Request";
import * as url from "../../utils/Url";


// ----------------------------
// Generic API Client
// ----------------------------
const API = request(url.BASE_URL);


// 1️⃣ Async action (API call)
export const fetchHomePageData = createAsyncThunk(
  "home/fetchHomePageData",
  async (_, { rejectWithValue }) => {
    try {
      const data = await API.get("/api/homepage");
      if (!data.status) {
        return rejectWithValue(data.message);
      }
      return data.data; 
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

/* -------------------- 
API 2: BANNERS 
-------------------- */
export const fetchBanners = createAsyncThunk(
  "home/fetchBanners",
  async (_, { rejectWithValue }) => {
    try {
      const data = await API.get("/api/banners");
      
      if (!data.status) {
        return rejectWithValue(data.message);
      }

      return data.data; // array of banners
    } catch (error) {
      return rejectWithValue("Failed to fetch banners");
    }
  }
);

