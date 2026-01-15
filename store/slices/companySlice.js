import { createSlice } from "@reduxjs/toolkit";
import { fetchCompany } from "../action/companyActions";


const initialState = {
  companyDetails: null,
  footerCopyright: '',
  loading: false,
  error: null,
  lastFetchedAt: null,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompany(state, action) {
      const { company, footerText } = action.payload || {};
      if (companyDetails !== undefined) state.companyDetails = company;
      if (footerCopyright !== undefined) state.footerCopyright = footerText;
      state.error = null;
    },
    clearCompany(state) {
      state.company = null;
      state.footerCopyright = '';
      state.error = null;
      state.loading = false;
      state.lastFetchedAt = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.companyDetails = action.payload?.data?.company_details;
        state.footerCopyright = action.payload?.data?.footer_text;
        //state.lastFetchedAt = Date.now();
      })
      .addCase(fetchCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Something went wrong';
      });
  },
});

export const { setCompany, clearCompany } = companySlice.actions;
export default companySlice.reducer;


