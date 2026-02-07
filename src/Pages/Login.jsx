
import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../features/auth/authApi'
import { setCredentials } from '../features/auth/authSlice'
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Users,
  TrendingUp,
  LogIn,
  AlertCircle
} from "lucide-react";
import bgImage from '../assets/images/bg-auth-overlay.png'
import mainLogo from '../assets/images/mainlogo.png'

// Enhanced Animation Styles
const bubbleStyles = `
  @keyframes float-up {
    0% {
      transform: translateY(100vh) translateX(0) rotate(0deg) scale(0);
      opacity: 0;
    }
    10% {
      opacity: 0.3;
    }
    25% {
      transform: translateY(75vh) translateX(-30px) rotate(90deg) scale(0.7);
    }
    50% {
      transform: translateY(50vh) translateX(30px) rotate(180deg) scale(1);
    }
    75% {
      transform: translateY(25vh) translateX(-20px) rotate(270deg) scale(0.8);
    }
    90% {
      opacity: 0.2;
    }
    100% {
      transform: translateY(-10vh) translateX(0) rotate(360deg) scale(0.5);
      opacity: 0;
    }
  }

  @keyframes logo-float {
    0%, 100% {
      transform: translateY(0px) scale(1);
    }
    50% {
      transform: translateY(-8px) scale(1.03);
    }
  }

  @keyframes pulse-glow {
    0%, 100% {
      filter: drop-shadow(0 0 10px rgba(139, 69, 19, 0.6));
    }
    50% {
      filter: drop-shadow(0 0 25px rgba(139, 69, 19, 0.9));
    }
  }

  .bubble {
    position: absolute;
    bottom: -100px;
    background: radial-gradient(circle at 30% 30%, rgba(139, 69, 19, 0.4), rgba(101, 67, 33, 0.2));
    border-radius: 50%;
    animation: float-up linear infinite;
    pointer-events: none;
  }

  .logo-animated {
    animation: logo-float 3s ease-in-out infinite, pulse-glow 2.5s ease-in-out infinite;
  }

  .feature-card {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    border: 1px solid rgba(139, 69, 19, 0.3);
    width: 60%;
  }

  .feature-card:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 15px 35px rgba(139, 69, 19, 0.4);
    border-color: rgba(139, 69, 19, 0.6);
  }

  .feature-card .icon-wrapper {
    transition: all 0.5s ease;
  }

  .feature-card:hover .icon-wrapper {
    transform: rotate(360deg) scale(1.1);
    background-color: rgba(139, 69, 19, 0.8) !important;
  }

  @media (max-width: 991px) {
  .feature-card {
    width: 100%;
    max-width: 420px;
  }
}


  .btn-signin {
    background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
    position: relative;
    overflow: hidden;
  }

  .btn-signin::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }

  .btn-signin:hover::before {
    left: 100%;
  }

  .btn-signin:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(139, 69, 19, 0.5);
  }

  .input-group {
    border-radius: 0.375rem;
    overflow: hidden;
  }

  .input-group .input-group-text {
    border-right: none !important;
  }

  .input-group .form-control {
    border-left: none !important;
  }

  .input-group:focus-within {
    box-shadow: 0 0 0 0.2rem rgba(139, 69, 19, 0.2);
    border-radius: 0.375rem;
  }

  .input-group:focus-within .input-group-text,
  .input-group:focus-within .form-control,
  .input-group:focus-within .btn {
    border-color: #8B4513 !important;
    background-color: rgba(255, 248, 220, 1) !important;
  }

  .login-card {
    backdrop-filter: blur(20px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 991px) {
    .mobile-branding {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 1rem;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      border: 2px solid rgba(139, 69, 19, 0.2);
    }
  }
`;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  // Use dynamic viewport units and disable fixed background on small screens
  const isSmallScreen = typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches;

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('LOGIN BUTTON CLICKED')
    
    if (!userId || !password) {
      setError('Please enter both User ID and Password')
      return
    }
    
    doLogin()
  }
  
  const doLogin = async () => {
    try {
      console.log('=== STARTING LOGIN PROCESS ===')
      console.log('API call starting...')
      
      const result = await login({ username: userId, password }).unwrap()
      console.log('=== API CALL SUCCESS ===')
      console.log('Full result:', result)
      console.log('Token:', result.accessToken || result.token)
      console.log('User:', result.user || result.data)
      
      const credentials = {
        token: result.accessToken || result.token,
        user: result.user || result.data,
      }
      
      console.log('=== STORING CREDENTIALS ===')
      console.log('Credentials to store:', credentials)
      dispatch(setCredentials(credentials))
      
      console.log('=== CHECKING STORAGE ===')
      console.log('Token in localStorage:', localStorage.getItem('token'))
      console.log('User in localStorage:', localStorage.getItem('user'))
      
      console.log('=== NAVIGATING TO DASHBOARD ===')
      window.location.href = '/dashboard'
      
    } catch (err) {
      console.error('=== LOGIN FAILED ===')
      console.error('Error:', err)
      console.error('Error data:', err?.data)
      console.error('Error message:', err?.message)
      setError('Login failed. Please check your credentials.')
    }
  }

  const FeatureCards = () => (
    <div className="d-flex flex-column gap-3 align-items-center justify-content-center">

      <div
        className="feature-card d-flex align-items-center p-3 rounded-3 mx-auto"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(15px)',
          maxWidth: '420px',
          width: '100%',
        }}
      >
        <div className="icon-wrapper rounded-3 p-3 me-3 flex-shrink-0">
          <ShieldCheck size={26} style={{ color: '#8B4513' }} />
        </div>
        <div>
          <h6 className="fw-bold mb-1" style={{ color: '#8B4513' }}>100% Secure</h6>
          <p className="mb-0 small" style={{ color: '#654321' }}>
            Bank-level security with encrypted transactions
          </p>
        </div>
      </div>

      <div
        className="feature-card d-flex align-items-center p-3 rounded-3 mx-auto"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(15px)',
          maxWidth: '420px',
          width: '100%',
        }}
      >
        <div className="icon-wrapper rounded-3 p-3 me-3 flex-shrink-0">
          <Users size={26} style={{ color: '#8B4513' }} />
        </div>
        <div>
          <h6 className="fw-bold mb-1" style={{ color: '#8B4513' }}>Trusted Community</h6>
          <p className="mb-0 small" style={{ color: '#654321' }}>
            Join 10,000+ satisfied members nationwide
          </p>
        </div>
      </div>

      <div
        className="feature-card d-flex align-items-center p-3 rounded-3 mx-auto"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(15px)',
          maxWidth: '420px',
          width: '100%',
        }}
      >
        <div className="icon-wrapper rounded-3 p-3 me-3 flex-shrink-0">
          <TrendingUp size={26} style={{ color: '#8B4513' }} />
        </div>
        <div>
          <h6 className="fw-bold mb-1" style={{ color: '#8B4513' }}>Growing Fast</h6>
          <p className="mb-0 small" style={{ color: '#654321' }}>
            Expanding services every quarter
          </p>
        </div>
      </div>

    </div>
  );

  return (
    <>
      <style>{bubbleStyles}</style>
      <div
        className="d-flex flex-column position-relative"
        style={{
          /* Viewport-anchored hero background: shows exactly once */
          minHeight: '100dvh',
          overflowX: 'hidden',   // allow vertical scroll
          overflowY: 'auto',
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundAttachment: isSmallScreen ? 'scroll' : 'fixed',
          backgroundColor: '#F4D03F'
        }}
      >
        {/* Bright Golden Background Overlay */}
        <div
          className="position-fixed top-0 start-0 w-100"
          style={{
            height: '100dvh',
            background: `linear-gradient(
  135deg,
  rgba(240, 220, 63, 0.96) 0%,
  rgba(240, 220, 63, 0.65) 100%
)`,
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />

        {/* Animated Bubbles - confine to viewport height */}
        <div className="position-fixed top-0 start-0 w-100" style={{ height: '100dvh', zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="bubble"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${25 + Math.random() * 60}px`,
                height: `${25 + Math.random() * 60}px`,
                animationDuration: `${12 + Math.random() * 15}s`,
                animationDelay: `${Math.random() * 8}s`,
                opacity: 0.15 + Math.random() * 0.25
              }}
            />
          ))}
        </div>

        <div className="container-fluid position-relative d-flex flex-column flex-grow-1 py-3 py-lg-0" style={{ zIndex: 2 }}>

          {/* Mobile Branding - Only visible on small screens */}
          {/* <div className="d-lg-none mb-3 w-70 mx-auto">
            <div className="mobile-branding text-center">
              <h1 className="h4 fw-bold mb-2" style={{ color: '#8B4513',  }}>
                Vertex Kalyan Cooperative
              </h1>
              <p className="small mb-0" style={{ color: '#654321' }}>
                Your trusted partner in financial growth
              </p>
            </div>
          </div> */}

          <div className="row g-0 flex-grow-1 align-items-center align-items-lg-start pt-lg-5">

            {/* Left Side - Login Form */}
            <div className="col-12 col-lg-5 d-flex align-items-center align-items-lg-start justify-content-center justify-content-lg-end">
              <div className="w-100 px-3 px-sm-4 px-lg-5" style={{ maxWidth: '480px' }}>
                <div
                  className="card shadow-lg border-0 login-card mb-3 mb-lg-0"
                  style={{
                    borderRadius: '1.25rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    border: '2px solid rgba(139, 69, 19, 0.2)'
                  }}
                >
                  <div className="card-body p-4">

                    {/* Logo at Top */}
                    <div className="d-flex justify-content-center mb-3">
                      <img
                        src={mainLogo}
                        alt="Vertex Kalyan Cooperative"
                        className="img-fluid logo-animated"
                        style={{ maxWidth: '100px', width: '100%', height: 'auto' }}
                      />
                    </div>

                    <div className="text-center mb-3">
                      <h5 className="fw-bold mb-1" style={{ color: '#8B4513', fontSize: '1.3rem' }}>Welcome Back!</h5>
                      <p className="text-muted mb-0 small">Sign in to access your account</p>
                    </div>

                    {/* Error Alert */}
                    {error && (
                      <div className="alert alert-danger d-flex align-items-center mb-3 py-2 small" role="alert" style={{ borderRadius: '0.5rem', backgroundColor: '#FFF3CD', borderColor: '#8B4513', color: '#654321' }}>
                        <AlertCircle size={16} className="me-2 flex-shrink-0" />
                        <div>{error}</div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      {/* User ID Input */}
                      <div className="mb-3">
                        <label htmlFor="userId" className="form-label fw-semibold mb-2 d-flex align-items-center gap-2 small" style={{ color: '#8B4513' }}>
                          <User size={14} />
                          User ID
                        </label>
                        <div className="input-group input-group-sm">
                          <span className="input-group-text" style={{ backgroundColor: '#FFF8DC', borderColor: '#D2691E' }}>
                            <User size={16} style={{ color: '#8B4513' }} />
                          </span>
                          <input
                            type="text"
                            id="userId"
                            className="form-control"
                            placeholder="Enter your User ID "
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                            style={{ backgroundColor: '#FFF8DC', borderColor: '#D2691E' }}
                          />
                        </div>
                      </div>

                      {/* Password Input */}


                      <div className="mb-3">
                        <label
                          htmlFor="password"
                          className="form-label fw-semibold mb-2 d-flex align-items-center gap-2 small"
                          style={{ color: '#8B4513' }}
                        >
                          <Lock size={14} />
                          Password
                        </label>

                        <div className="input-group input-group-sm">
                          {/* Left Icon */}
                          <span
                            className="input-group-text"
                            style={{
                              backgroundColor: '#FFF8DC',
                              borderColor: '#D2691E',
                            }}
                          >
                            <Lock size={16} style={{ color: '#8B4513' }} />
                          </span>

                          {/* Input */}
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                              backgroundColor: '#FFF8DC',
                              borderColor: '#D2691E',
                            }}
                          />

                          {/* Eye Button */}
                          <button
                            type="button"
                            className="btn"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                              backgroundColor: '#FFF8DC',
                              borderColor: '#D2691E',
                              borderLeft: '0', // seamless join
                            }}
                          >
                            {showPassword ? (
                              <EyeOff size={16} style={{ color: '#8B4513' }} />
                            ) : (
                              <Eye size={16} style={{ color: '#8B4513' }} />
                            )}
                          </button>
                        </div>
                      </div>


                      {/* Remember Me & Forgot Password */}
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            style={{ borderColor: '#8B4513' }}
                          />
                          <label className="form-check-label" htmlFor="rememberMe" style={{ fontSize: '0.85rem', color: '#654321' }}>
                            Remember me
                          </label>
                        </div>
                        <a href="#" className="text-decoration-none fw-semibold" style={{ color: '#8B4513', fontSize: '0.85rem' }}>
                          Forgot Password?
                        </a>
                      </div>

                      {/* Sign In Button */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-signin w-100 text-white fw-semibold mb-3 d-flex align-items-center justify-content-center gap-2"
                        style={{
                          border: 'none',
                          borderRadius: '0.6rem',
                          padding: '0.65rem',
                          fontSize: '0.95rem',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Signing in...
                          </>
                        ) : (
                          <>
                            <LogIn size={18} />
                            Sign In
                          </>
                        )}
                      </button>

                      {/* Sign Up Button */}
                      <button
                        type="button"
                        onClick={() => navigate('/signup')}
                        className="btn w-100 fw-semibold mb-3"
                        style={{
                          borderRadius: '0.6rem',
                          borderWidth: '2px',
                          borderColor: '#8B4513',
                          color: '#8B4513',
                          background: 'transparent',
                          padding: '0.65rem',
                          fontSize: '0.95rem',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = 'rgba(139, 69, 19, 0.1)';
                          e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.transform = 'translateY(0)';
                        }}
                      >
                        Dont Have Account? Sign Up
                      </button>

                      
                    </form>
                  </div>
                </div>

                {/* Feature Cards Below Login Form - Mobile Only */}
                <div className="d-lg-none px-2">
                  <FeatureCards />
                </div>
              </div>
            </div>

            {/* Right Side - Branding - Desktop Only */}
            <div className="col-lg-7 d-none d-lg-flex align-items-start justify-content-start px-4 px-xl-5">
              <div className="w-100" style={{ maxWidth: '650px' }}>
                <h1 className="fw-bold mb-4 text-center" style={{ color: '#8B4513', fontSize: '3rem', textShadow: '3px 3px 6px rgba(139, 69, 19, 0.3)', lineHeight: '1.2' }}>
                  Welcome to<br />
                  <span className="p-2" style={{ color: '#654321' }}>Vertex Kalyan</span>
                  Cooperative
                </h1>
                <p className="mb-4" style={{ color: '#654321', fontSize: '1.15rem', textShadow: '2px 2px 4px rgba(139, 69, 19, 0.2)' }}>
                  Your trusted partner in financial growth and community development.
                </p>

                {/* Feature Cards - Desktop */}
                <FeatureCards />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-3 d-none d-lg-block bg-amber-100-200 mt-auto">
            <p className="small mb-0 font-bold" style={{ color: '#654321' }}>
              All rights reserved @ Vertex Kalyan Cooperative Society.
            </p>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="text-center py-3 d-lg-none bg-amber-100" style={{ position: 'relative', zIndex: 2, marginTop: 'auto' }}>
          <p className="small mb-0" style={{ color: '#654321' }}>
            All rights reserved @ Vertex Kalyan Cooperative Society.
          </p>
        </div>
      </div>
    </>
  );
}