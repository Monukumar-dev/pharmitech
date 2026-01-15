import { createSlice } from "@reduxjs/toolkit";
import {
  getWishlistProducts,
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
} from "../action/wishlistActions";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
    message: null,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // getWishlistProducts
      .addCase(getWishlistProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWishlistProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getWishlistProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // addToWishlist
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "Product added to wishlist!";
        if (action.payload?.data) {
          state.items.push(action.payload.data);
        }
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong!";
      })

      // removeFromWishlist
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.product_id !== action.payload);
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // toggleWishlist
      .addCase(toggleWishlist.fulfilled, (state) => {
        // no direct state change needed; handled by add/remove thunks
      });
  },
});

export default wishlistSlice.reducer;
