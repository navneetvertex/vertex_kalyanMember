import { Outlet } from 'react-router-dom'
import { useTokenExpiry } from './hooks/useTokenExpiry'
import TokenExpiryWarning from './Components/TokenExpiryWarning'
import './App.css'

function App() {
  // Setup token expiry monitoring globally
  useTokenExpiry()

  return (
   <>
    <Outlet />
    <TokenExpiryWarning />
   </>
  )
}

export default App
