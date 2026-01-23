import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as url from "../../utils/Url";



export const submitContact = createAsyncThunk(
  "contact/submit",
  async (payload, { rejectWithValue }) => {
    try {
      const isFormData = payload instanceof FormData;
      const res = await fetch(`${url.BASE_URL}/api/contact`, {
          method: "POST",
          body: isFormData ? payload : JSON.stringify(payload),
          headers: isFormData
            ? undefined // browser sets multipart boundary
            : { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue("Network error");
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetContact: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitContact.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Submission failed";
      });
  },
});

export const { resetContact } = contactSlice.actions;
export default contactSlice.reducer;
