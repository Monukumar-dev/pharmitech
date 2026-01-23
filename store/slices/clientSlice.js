import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as url from "../../utils/Url";

/* ---------------- FETCH CLIENTS ---------------- */
export const fetchClients = createAsyncThunk(
  "client/fetchClients",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url.BASE_URL}/api/clients`); 
      const data = await res.json();

      if (!data.status) {
        return rejectWithValue(data.message);
      }

      return data.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch clients");
    }
  }
);


const initialState = {
  loading: false,
  clients: [],
  error: null,
};


const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default clientSlice.reducer;
