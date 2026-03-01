import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import AuthBg from "../../assets/auth-bg.png"
import Card from "../../components/ui/Card"
import Input from "../../components/ui/Input"
import Button from "../../components/ui/Button"
import Loader from "../../components/ui/Loader"

const AuthPage = () => {
  const { login, register } = useAuth()

  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "USER"
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)
  
    try {
      if (isLogin) {
        await login(formData.email, formData.password)
      } else {
        await register(formData)
  
        setSuccess("Registration successful! Redirecting to login...")
  
        setFormData(prev => ({
          ...prev,
          password: ""
        }))
  
        setTimeout(() => {
          setIsLogin(true)
          setSuccess("")
        }, 2000)
      }
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${AuthBg})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
  
      {/* Auth Card */}
      <div className="relative z-10 w-full px-4 flex justify-center">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-xl">
  
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
            Store Rating Platform
          </h2>
  
          <p className="text-center text-gray-600 mb-6">
            {isLogin ? "Sign in to continue" : "Create your account"}
          </p>
  
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}
  
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-600 rounded-md text-sm">
              {success}
            </div>
          )}
  
          <form onSubmit={handleSubmit} className="space-y-4">
  
            {!isLogin && (
              <>
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
  
                <Input
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
  
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700">
                    Register As
                  </label>
  
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="USER">User</option>
                    <option value="OWNER">Store Owner</option>
                  </select>
                </div>
              </>
            )}
  
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
  
            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
  
            <Button type="submit" disabled={loading}>
              {loading
                ? "Please wait..."
                : isLogin
                  ? "Login"
                  : "Register"}
            </Button>
  
          </form>
  
          {loading && <Loader />}
  
          <div className="mt-6 text-center text-sm text-gray-600">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Login
                </button>
              </>
            )}
          </div>
  
        </Card>
      </div>
    </div>
  )
}

export default AuthPage