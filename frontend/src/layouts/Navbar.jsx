import { useNavigate } from "react-router-dom"
import Button from "../components/ui/Button"

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <div className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">

      <h1 className="text-xl font-semibold text-indigo-600">
        Store Rating System
      </h1>

      <Button variant="secondary" onClick={handleLogout}>
        Logout
      </Button>

    </div>
  )
}

export default Navbar