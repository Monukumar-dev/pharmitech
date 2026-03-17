// store/slices/gallerySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as url from "@/utils/Url";

export const fetchGallery = createAsyncThunk(
  "gallery/fetchGallery",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url.BASE_URL}/api/project-gallery`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return Array.isArray(data?.data) ? data.data : [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    gallery: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGallery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGallery.fulfilled, (state, action) => {
        state.loading = false;
        state.gallery = action.payload;
      })
      .addCase(fetchGallery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default gallerySlice.reducer;