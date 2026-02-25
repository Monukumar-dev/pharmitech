import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as url from "../../utils/Url";

// 🔹 Fetch Events
export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async ({ page = 1, recPerPg = 10 }, { rejectWithValue }) => {
    try {
      //const { data } = await axios.get(`${BASE_URL}/api/events?recPerPg=${recPerPg}&page=${page}`);
      const res = await fetch(`${url.BASE_URL}/api/events?recPerPg=${recPerPg}&page=${page}`); 
      const data = await res.json();

      if (!data.status) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const initialState = {
  loading: false,
  events: [],
  upcomingEvents: [],
  pastEvents: [],
  pagination: {},
  error: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.data;
        state.pagination = action.payload.pagination;

        // 🔹 Separate upcoming & past
        state.upcomingEvents = action.payload.data.filter(
          (event) => event.event_type === "upcoming"
        );

        state.pastEvents = action.payload.data.filter(
          (event) => event.event_type === "past"
        );
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;