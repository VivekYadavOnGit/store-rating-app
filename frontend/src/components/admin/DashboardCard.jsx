import { useEffect, useState } from "react"
import API from "../../api/axios"
import Card from "../ui/Card"
import Loader from "../ui/Loader"

const DashboardCards = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/dashboard")
        setStats(res.data.data)
      } catch (err) {
        setError("Failed to load dashboard data")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) return <Loader />

  if (error)
    return (
      <div className="text-red-500 text-center mt-6">
        {error}
      </div>
    )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <Card>
        <h3 className="text-gray-500 text-sm mb-2">
          Total Users
        </h3>
        <p className="text-3xl font-bold text-indigo-600">
          {stats.totalUsers}
        </p>
      </Card>

      <Card>
        <h3 className="text-gray-500 text-sm mb-2">
          Total Stores
        </h3>
        <p className="text-3xl font-bold text-green-600">
          {stats.totalStores}
        </p>
      </Card>

      <Card>
        <h3 className="text-gray-500 text-sm mb-2">
          Total Ratings
        </h3>
        <p className="text-3xl font-bold text-purple-600">
          {stats.totalRatings}
        </p>
      </Card>

    </div>
  )
}

export default DashboardCards