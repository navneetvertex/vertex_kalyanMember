import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '../App'
import ProtectedRoute from '../utils/ProtectedRoute'

// Pages
import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard'
import NotFound from '../Pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

export default router