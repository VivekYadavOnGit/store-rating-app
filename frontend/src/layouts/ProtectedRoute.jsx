import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Role restriction
  if (role && user.role !== role) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute