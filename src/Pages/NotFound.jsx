import { useNavigate } from 'react-router-dom'
import { Home } from 'lucide-react'

const NotFound = () => {
  const navigate = useNavigate()
  
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <h1 className="display-1 fw-bold text-primary">404</h1>
            <h2 className="mb-4">Page Not Found</h2>
            <p className="text-muted mb-4">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/dashboard')}
            >
              <Home size={20} className="me-2" style={{ verticalAlign: 'middle' }} />
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound