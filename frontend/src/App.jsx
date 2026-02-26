import { Routes, Route, Navigate } from "react-router-dom"

import ProtectedRoute from "./layouts/ProtectedRoute"

const AdminDashboard = () => <div>Admin Dashboard</div>
const OwnerDashboard = () => <div>Owner Dashboard</div>
const StoreList = () => <div>User Store List</div>
const Login = () => <div>Login Page</div>

function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner/dashboard"
        element={
          <ProtectedRoute role="OWNER">
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/stores"
        element={
          <ProtectedRoute role="USER">
            <StoreList />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App