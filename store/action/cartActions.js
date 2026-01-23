// store/cartActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "@/utils/Url";
import { getAuthHeaders } from "@/utils/getAuthHeaders";

// ✅ Add product to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const response = await axios.post(
        `${BASE_URL}/api/customer/guest/cart/add`,
        { product_id: productId, quantity },
        { headers }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add to cart");
    }
  }
);

// ✅ Update cart item
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ cartItemId, quantity }, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const response = await axios.put(
        `${BASE_URL}/api/customer/guest/cart/${cartItemId}`,
        { quantity },
        { headers }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update cart item");
    }
  }
);

// ✅ Get all cart items
export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      const response = await axios.get(`${BASE_URL}/api/customer/guest/cart`, { headers });
      return response.data.data.items || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch cart items");
    }
  }
);

// ✅ Remove a cart item
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (cartItemId, { rejectWithValue }) => {
    try {
      const headers = getAuthHeaders();
      await axios.delete(`${BASE_URL}/api/customer/guest/cart/${cartItemId}`, { headers });
      return cartItemId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to remove cart item");
    }
  }
);
