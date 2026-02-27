import { Outlet, NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

import { useState } from "react"
import ChangePasswordModal from "../pages/auth/ChangePasswordModal"

const [openModal, setOpenModal] = useState(false)

const OwnerLayout = () => {
  const { logout, user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Navbar */}
      <header className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">

        <div>
          <h1 className="text-lg font-semibold text-indigo-600">
            Store Owner Panel
          </h1>
          <p className="text-xs text-gray-500">
            Welcome, {user?.name}
          </p>
        </div>

        <div className="flex items-center gap-6">

          <NavLink
            to="/owner/dashboard"
            className={({ isActive }) =>
              `text-sm font-medium ${isActive
                ? "text-indigo-600"
                : "text-gray-600 hover:text-indigo-600"
              }`
            }
          >
            Dashboard
          </NavLink>

          <button
            onClick={() => setOpenModal(true)}
            className="text-sm font-medium text-gray-600 hover:text-indigo-600"
          >
            Change Password
          </button>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Logout
          </button>

        </div>

      </header>

      {/* Content */}
      <main className="px-10 py-10 flex-1 bg-gray-100">
        <Outlet />
      </main>
      <ChangePasswordModal
  isOpen={openModal}
  onClose={() => setOpenModal(false)}
  onSuccess={() => {
    logout()
  }}
/>

    </div>
  )
}

export default OwnerLayout