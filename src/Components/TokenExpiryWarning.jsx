import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectIsAuthenticated } from '../features/auth/authSlice';
import { getTimeUntilExpiry } from '../utils/tokenUtils';

const TokenExpiryWarning = () => {
  const token = useSelector(selectCurrentToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      setShowWarning(false);
      return;
    }

    const checkExpiry = () => {
      const timeUntilExpiry = getTimeUntilExpiry(token);
      const minutesLeft = Math.floor(timeUntilExpiry / (1000 * 60));
      
      setTimeLeft(minutesLeft);
      
      // Show warning when 10 minutes or less remaining
      if (minutesLeft <= 10 && minutesLeft > 0) {
        setShowWarning(true);
      } else {
        setShowWarning(false);
      }
    };

    // Check immediately
    checkExpiry();
    
    // Check every minute
    const interval = setInterval(checkExpiry, 60000);
    
    return () => clearInterval(interval);
  }, [token, isAuthenticated]);

  if (!showWarning) return null;

  return (
    <div className="fixed top-4 right-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-lg z-50 max-w-sm">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium">Session Expiring Soon</p>
          <p className="text-xs mt-1">
            Your session will expire in {timeLeft} minute{timeLeft !== 1 ? 's' : ''}. 
            Please save your work.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TokenExpiryWarning;