import { createSlice } from "@reduxjs/toolkit";
import { fetchCompany } from "../action/companyActions";

const initialState = {
  companyDetails: null,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    clearCompany(state) {
      state.companyDetails = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompany.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.companyDetails = action.payload || null;
      })
      .addCase(fetchCompany.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Something went wrong";
      });
  },
});

export const { clearCompany } = companySlice.actions;
export default companySlice.reducer;