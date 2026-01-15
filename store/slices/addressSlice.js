import { createSlice } from "@reduxjs/toolkit";
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../action/addressActions";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    list: [],
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearAddressMessages: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(getAddresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
        state.message = "Address added successfully";
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
        state.message = "Address updated successfully";
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((item) => item.id !== action.payload);
        state.message = "Address deleted successfully";
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Default
      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        state.list = state.list.map((addr) => ({
          ...addr,
          make_default_address: addr.id === action.payload ? 1 : null,
        }));
        state.message = "Default address set successfully";
      })
      .addCase(setDefaultAddress.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearAddressMessages } = addressSlice.actions;
export default addressSlice.reducer;
