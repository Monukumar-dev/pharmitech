import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  updateCartItem,
  getCartItems,
  removeCartItem,
} from "../action/cartActions";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Get Cart
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.totalPrice = state.items.reduce(
          (sum, item) =>
            sum + item.quantity * (item.price || item.product?.price || 0),
          0
        );
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        const exists = state.items.find(
          (i) => i.cart_id === action.payload.cart_id
        );
        if (exists) {
          exists.quantity += action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
        state.totalPrice = state.items.reduce(
          (sum, item) =>
            sum + item.quantity * (item.price || item.product?.price || 0),
          0
        );
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Update Cart Item
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const { cartItemId, quantity } = action.payload;
        const item = state.items.find((i) => i.cart_id === cartItemId);
        if (item) item.quantity = quantity;
        state.totalPrice = state.items.reduce(
          (sum, i) => sum + i.quantity * (i.price || i.product?.price || 0),
          0
        );
      })

      // ✅ Remove Cart Item
      .addCase(removeCartItem.fulfilled, (state, action) => {
        const removedId =
          action.payload.cartItemId || action.payload || action.meta.arg;
        state.items = state.items.filter((i) => i.cart_id !== removedId);
        state.totalPrice = state.items.reduce(
          (sum, i) => sum + i.quantity * (i.price || i.product?.price || 0),
          0
        );
      });
  },
});

export default cartSlice.reducer;
