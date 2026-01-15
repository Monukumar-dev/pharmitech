import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showToast: false,
  message: "",
  error: false,
  notificationPayload: null,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.showToast = true;
      state.message = action.payload.message;
      state.error = action.payload.error || false;
    },
    hideToast: (state) => {
      state.showToast = false;
      state.message = "";
      state.error = false;
    },
    showErrorToast: (state, action) => {
      state.showToast = true;
      state.error = true;
      state.message = action.payload; // simple string
    },
    resetErrorToast: (state) => {
      state.showToast = false;
      state.error = false;
      state.message = null;
    },
    showNotification: (state, action) => {
      state.notificationPayload = action.payload;
    },
    resetNotificationData: (state) => {
      state.notificationPayload = null;
      state.showToast = false;
      state.error = false;
      state.message = null;
    },
  }
});

export const {
  showToast,
  hideToast,
  showErrorToast,
  resetErrorToast,
  showNotification,
  resetNotificationData
} = globalSlice.actions;

export default globalSlice.reducer;
