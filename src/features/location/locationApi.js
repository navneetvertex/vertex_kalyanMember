import { apiSlice } from '../../services/api'

// Location API endpoints
export const locationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all states
    getStates: builder.query({
      query: () => '/auth/states',
      providesTags: ['States'],
    }),
    
    // Get districts by state ID
    getDistricts: builder.query({
      query: (stateId) => `/auth/districts/${stateId}`,
      providesTags: ['Districts'],
    }),
    
    // Get areas by district ID
    getAreas: builder.query({
      query: (districtId) => `/auth/areas/${districtId}`,
      providesTags: ['Areas'],
    }),
  }),
})

// Export hooks for usage in components
export const {
  useGetStatesQuery,
  useGetDistrictsQuery,
  useGetAreasQuery,
} = locationApi