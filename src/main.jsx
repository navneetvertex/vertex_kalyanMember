import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { Provider } from 'react-redux'
import { store } from './features/store'
import { RouterProvider } from 'react-router-dom'
import router from './routes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
