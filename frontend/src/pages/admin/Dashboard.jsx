import DashboardCards from "../../components/admin/DashboardCard"

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-700">
        Dashboard Overview
      </h2>

      <DashboardCards />
    </div>
  )
}

export default Dashboard