import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

export function AuthGuard({ children }) {
  const { session, loading } = useAuthContext()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mm-bg">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-mm-orange animate-pulse" />
          <p className="font-mono text-sm text-mm-muted">Checking session...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
