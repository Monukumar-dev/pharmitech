import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "@/services/Request";
import * as url from "@/utils/Url";




// ----------------------------
// Generic API Client
// ----------------------------
const API = request(url.BASE_URL);


// 1️⃣ Get all addresses
export const getAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get("/api/customer/addresses");
      return data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch addresses");
    }
  }
);

// 2️⃣ Add new address
export const addAddress = createAsyncThunk(
  "address/addAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/api/customer/addresses", addressData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add address");
    }
  }
);

// 3️⃣ Update address
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const { data } = await API.put(`/api/customer/addresses/${id}`, updatedData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update address");
    }
  }
);

// 4️⃣ Delete address
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/api/customer/addresses/${id}`);
      return id; // return deleted ID for filtering from state
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete address");
    }
  }
);

// 5️⃣ Set default address
export const setDefaultAddress = createAsyncThunk(
  "address/setDefaultAddress",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.post(`/api/customer/addresses/${id}/default`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to set default address");
    }
  }
);
