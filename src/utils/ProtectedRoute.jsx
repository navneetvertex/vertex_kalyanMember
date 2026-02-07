import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef } from 'react'
import { selectIsAuthenticated, selectCurrentToken, logout } from '../features/auth/authSlice'
import { isTokenExpired, setupTokenExpiryCheck } from './tokenUtils'

const ProtectedRoute = ({ children, redirectTo = '/login' }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const token = useSelector(selectCurrentToken)
  const location = useLocation()
  const timeoutRef = useRef(null)

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // If Redux state says authenticated but no token in localStorage, logout
    if (isAuthenticated && !localStorage.getItem('token')) {
      dispatch(logout())
      return
    }
    
    // If token in localStorage but Redux state not authenticated, resync
    if (!isAuthenticated && localStorage.getItem('token')) {
      window.location.href = '/login'
      return
    }

    // Check if current token is expired
    if (token && isTokenExpired(token)) {
      dispatch(logout())
      navigate('/login')
      return
    }

    // Setup automatic logout when token expires
    if (token && isAuthenticated) {
      timeoutRef.current = setupTokenExpiryCheck(token, dispatch, navigate)
    }

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isAuthenticated, token, dispatch, navigate])

  if (!isAuthenticated || !token || isTokenExpired(token)) {
    // Redirect to login page but save the attempted location
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute