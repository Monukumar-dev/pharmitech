// redux/Store.js
import { configureStore } from "@reduxjs/toolkit";
import getToastDetails from '../constants/ToastConstant.js';
import rootReducer from "./slices/index.js";

// Custom middleware to show toast
const customMiddleware = store => next => action => {
  if (action.type.startsWith('global/showErrorToast')) {
    return next(action); 
  }
  next(action);
  toggleToast(store, action);
};

async function toggleToast(store, action) {
  const toastDetails = getToastDetails(action);

  if (toastDetails && toastDetails.message) {
    store.dispatch({
      type: 'global/showErrorToast',
      payload: toastDetails.message
    });

    setTimeout(() => {
      store.dispatch({ type: 'global/resetErrorToast' });
    }, 5000);
  }
}

export default function Store(initialState) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        serializableCheck: {
          ignoredActionPaths: ['payload'],
          ignoredActions: ['GET_BUYER_LIST'],
        }
      }).concat(customMiddleware)
  });

  return store;
}
