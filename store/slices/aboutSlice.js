import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as url from "../../utils/Url";

// 🔥 Async Thunk
export const fetchAboutPage = createAsyncThunk(
  "about/fetchAboutPage",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url.BASE_URL}/api/pages/about-us`);

      const data = await res.json();

      if (!data.success) {
        return rejectWithValue(data.message || "Failed to fetch about page");
      }

      return data.data;

    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

const aboutSlice = createSlice({
  name: "about",
  initialState: {
    loading: false,
    error: null,
    aboutData: {
      business_scope: { items: [] },
      industries_served: { items: [] },
      board_of_directors: { members: [] },
      awards_and_honors: { items: [] },
    },
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ⏳ Pending
      .addCase(fetchAboutPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ✅ Fulfilled
      .addCase(fetchAboutPage.fulfilled, (state, action) => {
        state.loading = false;
        state.aboutData = action.payload;
      })

      // ❌ Rejected
      .addCase(fetchAboutPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default aboutSlice.reducer;
