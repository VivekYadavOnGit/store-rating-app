import { Outlet, NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const AdminLayout = () => {
  const { logout } = useAuth()

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-indigo-600">
            Admin Panel
          </h2>
        </div>

        <nav className="p-4 space-y-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-200"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-200"
              }`
            }
          >
            Users
          </NavLink>

          <NavLink
            to="/admin/stores"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-200"
              }`
            }
          >
            Stores
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-gray-700">
            Store Rating Admin
          </h1>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>

      </div>
    </div>
  )
}

export default AdminLayout