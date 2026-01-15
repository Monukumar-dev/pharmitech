import { createSlice } from "@reduxjs/toolkit";
import { getProductByAlias } from "../action/productDetailsActions";

const initialState = {
  productDetails: null,
  loading: false,
  error: null,
};

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {}, // (optional, for local reducers)
  extraReducers: (builder) => {
    builder
      .addCase(getProductByAlias.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductByAlias.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(getProductByAlias.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productDetailsSlice.reducer;
