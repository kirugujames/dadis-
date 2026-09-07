import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Wrap a route tree with this to require login, and optionally restrict it
 * to a set of roles. Used to keep, e.g., /admin/* only reachable by admins.
 */
export default function ProtectedRoute({ roles, children }) {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} replace />
  }
  return children
}
