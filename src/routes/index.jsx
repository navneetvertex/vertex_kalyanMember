import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '../App'
import ProtectedRoute from '../utils/ProtectedRoute'

// Pages
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import Dashboard from '../Pages/Dashboard'
import NotFound from '../Pages/NotFound'
import SahyogCard from '../Pages/credit-card-detaills.jsx';

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
        path: 'signup',
        element: <Signup />,
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
        path: 'sahyog-card',
        element: (
          <ProtectedRoute>
            <SahyogCard />
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