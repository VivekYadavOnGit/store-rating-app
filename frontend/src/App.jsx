import { Routes, Route, Navigate } from "react-router-dom"

import ProtectedRoute from "./layouts/ProtectedRoute"
import AdminLayout from "./layouts/AdminLayout"
import Login from "./pages/auth/Login"
import Dashboard from "./pages/admin/Dashboard"
import Users from "./pages/admin/Users"


const Stores = () => <div>Stores Page</div>

const OwnerDashboard = () => <div>Owner Dashboard</div>
const StoreList = () => <div>User Store List</div>

function App() {
  return (
    <Routes>

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        {/* <Route path="dashboard" element={<AdminDashboard />} /> */}
        <Route path="users" element={<Users />} />
        <Route path="stores" element={<Stores />} />
      </Route>

      {/* Owner Route */}
      <Route
        path="/owner/dashboard"
        element={
          <ProtectedRoute role="OWNER">
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      {/* User Route */}
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