import { Routes, Route, Navigate } from "react-router-dom"

import ProtectedRoute from "./layouts/ProtectedRoute"

import AdminLayout from "./layouts/AdminLayout"
import OwnerLayout from "./layouts/OwnerLayout"
import UserLayout from "./layouts/UserLayout"

import AuthPage from "./pages/auth/AuthPage"

import Dashboard from "./pages/admin/Dashboard"
import Users from "./pages/admin/Users"
import Stores from "./pages/admin/Stores"

import OwnerDashboard from "./pages/owner/OwnerDashboard"
import UserDashboard from "./pages/user/UserDashboard"

function App() {
  return (
    <Routes>

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public Route */}
      <Route path="/login" element={<AuthPage />} />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="stores" element={<Stores />} />
      </Route>

      {/* ================= OWNER ================= */}
      <Route
        path="/owner"
        element={
          <ProtectedRoute role="OWNER">
            <OwnerLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<OwnerDashboard />} />
      </Route>

      {/* ================= USER ================= */}
      <Route
        path="/user"
        element={
          <ProtectedRoute role="USER">
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<UserDashboard />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  )
}

export default App