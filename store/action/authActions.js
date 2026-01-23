import { createAsyncThunk } from "@reduxjs/toolkit";
import * as url from "../../utils/Url";
import {
  clearLocalStorage,
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/utils/localStorage";
import { request } from "@/services/Request";

// ----------------------------
// Create Auth API Instance
// ----------------------------
const API = request(url.BASE_URL);

// ----------------------------
// Helper: Normalize Errors
// ----------------------------
const handleError = (error, fallback = "Something went wrong") => {
  return error?.response?.data?.message || error?.message || fallback;
};

// ============================
// ✅ Register User
// ============================
export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await API.post("/api/customer/register", payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error, "Registration failed"));
    }
  }
);

// ============================
// ✅ Login User
// ============================
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/api/customer/login", { email, password });
      setLocalStorageItem("user-info", data);
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error, "Login failed"));
    }
  }
);

// ============================
// ✅ Get Logged-In User Profile
// ============================
export const getProfile = createAsyncThunk(
  "auth/logged",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/api/customer/profile");
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error, "Failed to fetch profile"));
    }
  }
);

// ============================
// ✅ Update User Profile
// ============================
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await API.put("/api/customer/profile/update", payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error, "Failed to update profile"));
    }
  }
);

// ============================
// ✅ Change Password
// ============================
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/api/customer/update/password", payload);
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error, "Failed to change password"));
    }
  }
);

// ============================
// ✅ Logout User
// ============================
export const userLogout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/api/customer/logout");
      clearLocalStorage();
      return data;
    } catch (error) {
      return rejectWithValue(handleError(error, "Logout failed"));
    }
  }
);
