import { apiSlice } from '../../services/api'

// Auth API endpoints using RTK Query
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login endpoint - matches curl: localhost:8000/api/auth/user_login
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/user_login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: credentials, // expects { username, password }
      }),
      invalidatesTags: ['Auth'],
    }),
    
    // Register endpoint - matches curl: localhost:8000/api/auth/user_register
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/user_register',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: userData, // expects full registration object
      }),
    }),
    
    // Logout endpoint
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
    
    // Get current user profile
    getCurrentUser: builder.query({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),
    
    // Get user by ID - matches curl: localhost:8000/api/users/{id}
    getUserById: builder.query({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'GET',
      }),
      providesTags: (result, error, userId) => [{ type: 'User', id: userId }],
    }),
    
    // Update user profile - matches curl: localhost:8000/api/users/profile
    updateUserProfile: builder.mutation({
      query: (profileData) => ({
        url: '/users/profile',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: profileData,
      }),
      invalidatesTags: ['User'],
    }),
    
    // Refresh token endpoint
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: '/auth/refresh',
        method: 'POST',
        body: { refreshToken },
      }),
    }),
    
    // Verify token
    verifyToken: builder.query({
      query: () => '/auth/verify',
      providesTags: ['Auth'],
    }),
  }),
})

// Export hooks for usage in components
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useGetUserByIdQuery,
  useUpdateUserProfileMutation,
  useRefreshTokenMutation,
  useVerifyTokenQuery,
} = authApi