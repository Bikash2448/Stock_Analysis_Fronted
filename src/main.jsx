import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="46294756080-jbvokng6ntr0vmjusifvhkui6n05n62v.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    <Toaster position="top-right" reverseOrder={false} />
  </StrictMode>,
)
