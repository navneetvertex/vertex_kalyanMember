import { configureStore } from '@reduxjs/toolkit';
import { dashboardApi } from './auth/dashboardApi';
import { apiSlice } from '../services/api';
import authReducer from './auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(dashboardApi.middleware)
      .concat(apiSlice.middleware),
});