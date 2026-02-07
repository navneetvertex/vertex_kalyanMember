import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logout, setCredentials } from '../features/auth/authSlice'

// Base query configuration
const baseQuery = fetchBaseQuery({
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
})

// Enhanced base query with automatic token refresh
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  
  // If we get a 401 (unauthorized), try to refresh the token
  if (result?.error?.status === 401) {
    // Try to refresh the token
    const refreshResult = await baseQuery(
      { url: '/auth/refresh', method: 'POST' },
      api,
      extraOptions
    )
    
    if (refreshResult?.data) {
      // Store the new token
      api.dispatch(setCredentials(refreshResult.data))
      // Retry the original query with new token
      result = await baseQuery(args, api, extraOptions)
    } else {
      // Refresh failed, logout user
      api.dispatch(logout())
      window.location.href = '/login'
    }
  }
  
  return result
}

// Base API configuration
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth', 'User', 'Data'],
  endpoints: () => ({}),
})