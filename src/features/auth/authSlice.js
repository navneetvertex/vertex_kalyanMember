import { createSlice } from '@reduxjs/toolkit'

// Get initial state from localStorage
const getInitialState = () => {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  
  return {
    token: token || null,
    user: user ? JSON.parse(user) : null,
    isAuthenticated: !!token,
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setCredentials: (state, action) => {
      const { token, user, accessToken, data } = action.payload
      
      // Handle different response structures
      const authToken = token || accessToken
      const userData = user || data
      
      state.token = authToken
      state.user = userData
      state.isAuthenticated = !!authToken
      
      // Persist to localStorage if token exists
      if (authToken) {
        localStorage.setItem('token', authToken)
      }
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData))
      }
    },
    
    logout: (state) => {
      state.token = null
      state.user = null
      state.isAuthenticated = false
      
      // Clear localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
      localStorage.setItem('user', JSON.stringify(state.user))
    },
  },
})

export const { setCredentials, logout, updateUser } = authSlice.actions

export default authSlice.reducer

// Selectors
export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated