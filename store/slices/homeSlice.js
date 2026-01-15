import { createSlice } from "@reduxjs/toolkit";
import { fetchBanners, fetchHomePageData } from "../action/homeActions";



// 2️⃣ Initial State
const initialState = {
  loading: false,
  error: null,
  homeData: null,
  banners: [], 
};

// 3️⃣ Slice
const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    clearHomeData: (state) => {
      state.homeData = null;
      state.banners = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(fetchHomePageData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Success
      .addCase(fetchHomePageData.fulfilled, (state, action) => {
        state.loading = false;
        state.homeData = action.payload;
      })
      // Error
      .addCase(fetchHomePageData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* -------- Banners -------- */
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearHomeData } = homeSlice.actions;
export default homeSlice.reducer;
