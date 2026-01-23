import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as url from "../../utils/Url";

export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url.BASE_URL}/api/testimonials`);

      const data = await res.json();

      if (!res.ok || !data.status) {
        return rejectWithValue(data.message || "Failed to fetch testimonials");
      }

      return data.data; // 👈 return only useful data
    } catch (error) {
      return rejectWithValue("Network error");
    }
  }
);

const testimonialSlice = createSlice({
  name: "testimonials",
  initialState: {
    loading: false,
    error: null,
    data: null,        // full data object
    list: [],          // testimonials list shortcut
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.list = action.payload.list || [];
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default testimonialSlice.reducer;
