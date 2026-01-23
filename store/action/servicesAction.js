import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "@/services/Request";
import * as url from "@/utils/Url";

// ----------------------------
// Generic API Client
// ----------------------------
const API = request(url.BASE_URL);


// ✅ Fetch All Services
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      const data = await API.get("/api/services");

      if (!data?.status) {
        return rejectWithValue(data?.message || "Failed to fetch services");
      }

      return data?.data || [];
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

// ✅ Fetch Service Details by Slug (BUT API needs ID)
export const fetchServiceBySlug = createAsyncThunk(
  "services/fetchServiceBySlug",
  async (slug, { getState, dispatch, rejectWithValue }) => {
    try {
      const state = getState();
      let list = state?.services?.list || [];

      // ✅ if list is empty, fetch list first
      if (!list.length) {
        const res = await dispatch(fetchServices());
        if (res?.payload) list = res.payload;
      }

      // ✅ find service from list using slug
      const found = list.find((s) => s.slug === slug);

      if (!found?.id) {
        return rejectWithValue("Service not found");
      }

      // ✅ Now call details API by ID
      const data = await API.get(`/api/services/${found.id}`);

      if (!data?.status) {
        return rejectWithValue(data?.message || "Failed to fetch service details");
      }

      return data?.data || null;
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);
  

  