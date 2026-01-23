import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchServiceBySlug, fetchServices } from "../action/servicesAction";

const servicesSlice = createSlice({
  name: "services",
  initialState: {
    list: [],
    selected: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearSelectedService: (state) => {
      state.selected = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // ✅ Fetch Services List
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Fetch Service By Slug
      .addCase(fetchServiceBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchServiceBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedService } = servicesSlice.actions;
export default servicesSlice.reducer;
