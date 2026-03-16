import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as url from "@/utils/Url";


/* ---------- FETCH PRODUCT ---------- */

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (slug) => {

    const res = await fetch(`${url.BASE_URL}/api/product/${slug}`);
    const data = await res.json();

    if (data?.status) {
      return data.data;
    }

    throw new Error("Product not found");
  }
);


const productSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })

      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

  },
});

export default productSlice.reducer;