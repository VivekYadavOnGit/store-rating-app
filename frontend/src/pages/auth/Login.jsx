import { useState } from "react"
import { useAuth } from "../../context/AuthContext"

import Card from "../../components/ui/Card"
import Input from "../../components/ui/Input"
import Button from "../../components/ui/Button"
import Loader from "../../components/ui/Loader"

const Login = () => {
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await login(email, password)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <Card className="w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Store Rating Platform
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Sign in to continue
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </Button>

        </form>

        {loading && <Loader />}

      </Card>

    </div>
  )
}

export default Login