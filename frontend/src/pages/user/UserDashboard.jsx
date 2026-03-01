import { useState } from "react"
import StoreList from "./StoreList"
import MyRatings from "./MyRating"

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("stores")

  return (
    <div className="px-4 md:px-8">

      {/* Page Title */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          User Dashboard
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Browse stores and manage your ratings
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b mb-4">
        <button
          onClick={() => setActiveTab("stores")}
          className={`pb-3 text-sm font-semibold transition ${
            activeTab === "stores"
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-gray-500 hover:text-indigo-600"
          }`}
        >
          Browse Stores
        </button>

        <button
          onClick={() => setActiveTab("ratings")}
          className={`pb-3 text-sm font-semibold transition ${
            activeTab === "ratings"
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-gray-500 hover:text-indigo-600"
          }`}
        >
          My Ratings
        </button>
      </div>

      {/* Content */}
      <div className="min-h-[300px]">
        {activeTab === "stores" ? <StoreList /> : <MyRatings />}
      </div>

    </div>
  )
}

export default UserDashboard