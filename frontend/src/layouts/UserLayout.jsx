import { Outlet, NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"
import ChangePasswordModal from "../pages/auth/ChangePasswordModal"

const UserLayout = () => {
  const { logout, user } = useAuth()
  const [openModal, setOpenModal] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Navbar */}
      <header className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">

        {/* Left Section */}
        <div>
          <h1 className="text-lg font-semibold text-indigo-600">
            Store Rating System
          </h1>
          <p className="text-xs text-gray-500">
            Welcome, {user?.name}
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">

          {/* Browse Stores */}
          <NavLink
            to="/user/dashboard"
            className={({ isActive }) =>
              `text-sm font-medium transition ${
                isActive
                  ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
                  : "text-gray-600 hover:text-indigo-600"
              }`
            }
          >
            Browse Stores
          </NavLink>

          {/* Change Password (Modal Trigger) */}
          <button
            onClick={() => setOpenModal(true)}
            className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition"
          >
            Change Password
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm shadow-sm transition"
          >
            Logout
          </button>

        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8 flex-1">
        <Outlet />
      </main>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={() => {
          logout() // force re-login after password change
        }}
      />

    </div>
  )
}

export default UserLayout