# RTK Query & Protected Routes Setup

This document explains the RTK Query setup and protected routes implementation in this project.

## 🚀 Features Implemented

### 1. RTK Query Setup
- ✅ Base API configuration with automatic token injection
- ✅ Authentication endpoints (login, logout, register, etc.)
- ✅ Token management via Redux store
- ✅ Automatic refetch on focus/reconnect
- ✅ Request/response interceptors

### 2. Protected Routes
- ✅ Protected route wrapper component
- ✅ Automatic redirection to login for unauthenticated users
- ✅ Redirect back to intended page after login
- ✅ Token persistence in localStorage

## 📁 Project Structure

```
src/
├── app/
│   └── store.js                 # Redux store configuration
├── features/
│   └── auth/
│       └── authSlice.js         # Authentication state management
├── services/
│   ├── api.js                   # Base RTK Query API slice
│   └── authApi.js               # Authentication API endpoints
├── routes/
│   ├── index.jsx                # Router configuration
│   └── ProtectedRoute.jsx      # Protected route wrapper
└── Pages/
    ├── Login.jsx                # Login page
    ├── Dashboard.jsx            # Protected dashboard page
    └── NotFound.jsx             # 404 page
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### API Base URL

The default API base URL is `http://localhost:3000/api`. You can change this by:
1. Setting the `VITE_API_BASE_URL` environment variable
2. Modifying the `baseUrl` in `src/services/api.js`

## 📝 Usage Examples

### 1. Using RTK Query Hooks in Components

```jsx
import { useLoginMutation, useGetCurrentUserQuery } from '../services/authApi'

function MyComponent() {
  // Mutation hook for login
  const [login, { isLoading, error }] = useLoginMutation()
  
  // Query hook for fetching current user
  const { data: user, isLoading: userLoading } = useGetCurrentUserQuery()
  
  const handleLogin = async () => {
    try {
      const result = await login({ email, password }).unwrap()
      console.log('Login successful:', result)
    } catch (err) {
      console.error('Login failed:', err)
    }
  }
  
  return <div>{/* Your component */}</div>
}
```

### 2. Adding New API Endpoints

Create a new API file (e.g., `src/services/userApi.js`):

```jsx
import { apiSlice } from './api'

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['User'],
    }),
    
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const { useGetUsersQuery, useUpdateUserMutation } = userApi
```

### 3. Creating Protected Routes

In `src/routes/index.jsx`:

```jsx
{
  path: 'profile',
  element: (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  ),
}
```

### 4. Accessing Auth State

```jsx
import { useSelector } from 'react-redux'
import { selectCurrentUser, selectIsAuthenticated } from '../features/auth/authSlice'

function MyComponent() {
  const user = useSelector(selectCurrentUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  
  return (
    <div>
      {isAuthenticated && <p>Welcome, {user?.name}!</p>}
    </div>
  )
}
```

## 🔐 Authentication Flow

1. **Login**: User submits credentials → API call → Store token & user data → Redirect to dashboard
2. **Token Persistence**: Token is saved in localStorage and Redux store
3. **API Requests**: All API requests automatically include the Bearer token in headers
4. **Protected Routes**: Unauthenticated users are redirected to login page
5. **Logout**: Clear token from localStorage and Redux store → Redirect to login

## 🧪 Testing with Mock Data

The login page includes demo credentials for testing:
- **Email**: demo@example.com
- **Password**: password123

To test the protected routes:
1. Navigate to `/dashboard` without logging in → Redirected to `/login`
2. Log in with demo credentials → Redirected to `/dashboard`
3. Access is granted to protected routes

## 🎯 API Response Format

Expected API response format for authentication:

```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  }
}
```

## 🔄 Token Refresh

To implement token refresh, use the `refreshToken` endpoint:

```jsx
import { useRefreshTokenMutation } from '../services/authApi'

const [refreshToken] = useRefreshTokenMutation()

// Call when token expires
const handleRefresh = async () => {
  try {
    const result = await refreshToken(currentRefreshToken).unwrap()
    dispatch(setCredentials({
      token: result.token,
      user: result.user,
    }))
  } catch (err) {
    // Handle refresh failure
    dispatch(logout())
  }
}
```

## 📚 Available RTK Query Hooks

### Auth API Hooks
- `useLoginMutation()` - Login user
- `useRegisterMutation()` - Register new user
- `useLogoutMutation()` - Logout user
- `useGetCurrentUserQuery()` - Fetch current user data
- `useRefreshTokenMutation()` - Refresh access token
- `useVerifyTokenQuery()` - Verify token validity

## 🛠️ Customization

### Custom Redirect Path

Change the redirect path for unauthenticated users:

```jsx
<ProtectedRoute redirectTo="/custom-login">
  <YourComponent />
</ProtectedRoute>
```

### Custom Error Handling

Add error handling in `src/services/api.js`:

```jsx
baseQuery: fetchBaseQuery({
  baseUrl: '...',
  prepareHeaders: (headers, { getState }) => {
    // ...
  },
  // Custom error handling
  validateStatus: (response) => {
    if (response.status === 401) {
      // Handle unauthorized
    }
    return response.status >= 200 && response.status < 300
  },
})
```

## 🚨 Important Notes

1. **Security**: Never store sensitive data in localStorage without encryption
2. **Token Expiry**: Implement token refresh mechanism for better security
3. **HTTPS**: Always use HTTPS in production
4. **CORS**: Configure CORS properly on your backend
5. **Error Handling**: Add proper error boundaries and error handling

## 📖 Additional Resources

- [RTK Query Documentation](https://redux-toolkit.js.org/rtk-query/overview)
- [React Router Documentation](https://reactrouter.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)

---

**Need Help?** Check the inline comments in the source files for detailed explanations.