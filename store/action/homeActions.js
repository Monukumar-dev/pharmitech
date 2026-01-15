import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "@/services/Request";
import * as url from "@/utlis/Url";




// ----------------------------
// Generic API Client
// ----------------------------
const API = request(url.BASE_URL);



// 1️⃣ Async action (API call)
export const fetchHomePageData = createAsyncThunk(
  "home/fetchHomePageData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://pharmintechbackend.webiknows.in/api/homepage");
      const data = await response.json();
      //const data = await API.get("/api/homepage");


      if (!data.status) {
        return rejectWithValue(data.message);
      }

      return data.data; // <-- ONLY homepage data
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
      const res = await fetch("https://pharmintechbackend.webiknows.in/api/banners"); 
      const data = await res.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data; // array of banners
    } catch (error) {
      return rejectWithValue("Failed to fetch banners");
    }
  }
);
