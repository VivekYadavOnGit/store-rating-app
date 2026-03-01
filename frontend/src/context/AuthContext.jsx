import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api/axios"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // 🔄 Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // 🔐 Register (Aligned with backend controller)
  const register = async (formData) => {
    try {
      const res = await API.post("/auth/register", formData)
      return res.data
    } catch (error) {
      console.log("FULL ERROR:", error)
      console.log("ERROR RESPONSE:", error.response)
      console.log("ERROR DATA:", error.response?.data)
  
      throw error.response?.data?.message || "Registration failed"
    }
  }

  // 🔐 Login
  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password })

      const { token, user } = res.data

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      setUser(user)

      // 🔁 Role-Based Redirect
      if (user.role === "ADMIN") {
        navigate("/admin/dashboard")
      } else if (user.role === "OWNER") {
        navigate("/owner/dashboard")
      } else if (user.role === "USER") {
        navigate("/user/dashboard")
      } else {
        navigate("/login")
      }

    } catch (error) {
      throw error.response?.data?.message || "Login failed"
    }
  }

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    navigate("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)