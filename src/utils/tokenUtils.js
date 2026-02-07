import { logout } from '../features/auth/authSlice';

// Decode JWT token to get expiration time
export const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

// Check if token is expired
export const isTokenExpired = (token) => {
  if (!token) return true;
  
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

// Get time until token expires (in milliseconds)
export const getTimeUntilExpiry = (token) => {
  if (!token) return 0;
  
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return 0;
  
  const currentTime = Date.now() / 1000;
  const timeUntilExpiry = (decoded.exp - currentTime) * 1000;
  
  return Math.max(0, timeUntilExpiry);
};

// Setup automatic logout when token expires
export const setupTokenExpiryCheck = (token, dispatch, navigate) => {
  if (!token || isTokenExpired(token)) {
    dispatch(logout());
    navigate('/login');
    return null;
  }

  const timeUntilExpiry = getTimeUntilExpiry(token);
  
  // Set timeout to logout user when token expires
  const timeoutId = setTimeout(() => {
    dispatch(logout());
    navigate('/login');
  }, timeUntilExpiry);

  return timeoutId;
};