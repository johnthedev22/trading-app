import { useAuth } from '../hooks/useAuth'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = () => {
  const { state: user } = useAuth()
  return user.isloggedin ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute