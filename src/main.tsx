import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx' 
import { AuthProvider } from './context/AuthContext.tsx'
import { DeviceProvider } from './context/DeviceContext.tsx'
import { AccountProvider } from './context/AccountContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DeviceProvider>
      <ThemeProvider>
        <AuthProvider>
          <AccountProvider>
            <App />
          </AccountProvider>          
        </AuthProvider>      
      </ThemeProvider> 
    </DeviceProvider>   
  </StrictMode>
)
