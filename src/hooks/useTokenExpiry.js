import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, selectCurrentToken, selectIsAuthenticated } from '../features/auth/authSlice';
import { isTokenExpired, getTimeUntilExpiry } from '../utils/tokenUtils';

export const useTokenExpiry = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Only setup expiry check if user is authenticated and has a token
    if (!isAuthenticated || !token) {
      return;
    }

    // Check if token is already expired
    if (isTokenExpired(token)) {
      dispatch(logout());
      navigate('/login');
      return;
    }

    // Setup timeout to logout when token expires
    const timeUntilExpiry = getTimeUntilExpiry(token);
    if (timeUntilExpiry > 0) {
      timeoutRef.current = setTimeout(() => {
        dispatch(logout());
        navigate('/login');
      }, timeUntilExpiry);
    }

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [token, isAuthenticated, dispatch, navigate]);

  // Return cleanup function for manual use if needed
  return () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
};