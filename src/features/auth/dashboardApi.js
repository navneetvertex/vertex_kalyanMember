import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dashboardApi = createApi({
  reducerPath: 'dashboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Dashboard', 'Notifications'],
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => '/dashboard/user',
      providesTags: ['Dashboard'],
    }),
    getNotifications: builder.query({
      query: () => '/notifications/quickUser',
      providesTags: ['Notifications'],
    }),
  }),
});

export const { useGetDashboardDataQuery, useGetNotificationsQuery } = dashboardApi;