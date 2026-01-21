import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '../features/auth/authSlice'

const PublicRoute = ({ children, redirectTo = '/dashboard' }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)

  if (isAuthenticated) {
    // Redirect to dashboard if already authenticated
    return <Navigate to={redirectTo} replace />
  }

  return children
}

export default PublicRoute