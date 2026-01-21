import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Base API configuration
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
    credentials: 'include', // This handles cookies automatically
    prepareHeaders: (headers, { getState }) => {
      // Set content type for all requests
      headers.set('Content-Type', 'application/json')
      
      // Get token from auth state
      const token = getState().auth.token
      
      // If token exists, add it to headers
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      
      return headers
    },
  }),
  tagTypes: ['Auth', 'User', 'Data'],
  endpoints: () => ({}),
})