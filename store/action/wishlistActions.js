import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "@/services/Request";
import * as url from "@/utils/Url";

// ----------------------------
// Generic API Client
// ----------------------------
const API = request(url.BASE_URL);

// ----------------------------
// Helper: Normalize Errors
// ----------------------------
const handleError = (error, fallback = "Something went wrong") =>
  error?.response?.data?.message || error?.message || fallback;

// ============================
// ✅ Get Wishlist Products
// ============================
export const getWishlistProducts = createAsyncThunk(
  "wishlist/getWishlistProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/api/customer/wishlist");
      return data || []; 
    } catch (error) {
      return rejectWithValue(handleError(error, "Failed to fetch wishlist."));
    }
  }
);

// ============================
// ✅ Add to Wishlist
// ============================
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/api/customer/wishlist/add", {
        product_id: productId,
      });
      return data; 
    } catch (error) {
      const status = error?.response?.status;
      if (status === 409) {
        return rejectWithValue(error?.response?.data?.message || "Product already in wishlist.");
      }
      return rejectWithValue(handleError(error, "Failed to add to wishlist."));
    }
  }
);

// ============================
// ✅ Remove from Wishlist
// ============================
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await API.delete("/api/customer/wishlist/remove", {
        data: { product_id: productId },
      });
      return productId;
    } catch (error) {
      return rejectWithValue(handleError(error, "Failed to remove from wishlist."));
    }
  }
);

// ============================
// ✅ Toggle Wishlist (Add or Remove)
// ============================
export const toggleWishlist = createAsyncThunk(
  "wishlist/toggleWishlist",
  async ({ productId, isWishlisted }, { dispatch, rejectWithValue }) => {
    try {
      if (isWishlisted) {
        await dispatch(removeFromWishlist(productId));
      } else {
        await dispatch(addToWishlist(productId));
      }
      //return productId;
      // ✅ Get updated wishlist list instantly
      const { data } = await API.get("/api/customer/wishlist");
      return data || [];
    } catch (error) {
      return rejectWithValue(handleError(error, "Failed to toggle wishlist."));
    }
  }
);
