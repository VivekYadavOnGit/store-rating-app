import { useEffect, useState } from "react"
import API from "../../api/axios"
import RatingStars from "../../components/user/RatingStars"

const StoreList = () => {
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [sortField, setSortField] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")

  useEffect(() => {
    fetchStores()
  }, [])

  const fetchStores = async () => {
    try {
      const res = await API.get("/stores")
      setStores(res.data.data)
    } catch (error) {
      console.error("Error fetching stores", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRating = async (storeId, rating) => {
    try {
      await API.post(`/stores/${storeId}/rate`, {
        rating
      })
      fetchStores()
    } catch (error) {
      console.error("Rating error", error.response?.data || error)
    }
  }

  // 🔎 Filter stores
  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(search.toLowerCase()) ||
    store.address.toLowerCase().includes(search.toLowerCase())
  )

  // 🔄 Sort stores
  const sortedStores = [...filteredStores].sort((a, b) => {
    let valueA
    let valueB

    if (sortField === "rating") {
      valueA = Number(a.overall_rating)
      valueB = Number(b.overall_rating)
    } else {
      valueA = a[sortField].toLowerCase()
      valueB = b[sortField].toLowerCase()
    }

    if (valueA < valueB) return sortOrder === "asc" ? -1 : 1
    if (valueA > valueB) return sortOrder === "asc" ? 1 : -1
    return 0
  })

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500">
        Loading stores...
      </div>
    )

  return (
    <div>

      {/* 🔎 Search + Sorting */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search by store name or address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Sorting Controls */}
        <div className="flex gap-3">
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="px-3 py-2 border rounded-lg shadow-sm"
          >
            <option value="name">Sort by Name</option>
            <option value="address">Sort by Address</option>
            <option value="rating">Sort by Rating</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-3 py-2 border rounded-lg shadow-sm"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* No Results */}
      {sortedStores.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          No stores found.
        </div>
      )}

      {/* Store Grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {sortedStores.map((store) => (
          <div
            key={store.id}
            className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition duration-300"
          >
            {/* Store Info */}
            <h3 className="text-xl font-bold text-indigo-600">
              {store.name}
            </h3>

            <p className="text-base text-gray-600 mt-1">
              {store.address}
            </p>

            <div className="my-4 border-t"></div>

            {/* Overall Rating */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Overall Rating
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <RatingStars
                    value={Number(store.overall_rating)}
                    editable={false}
                    size="text-lg"
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    {Number(store.overall_rating).toFixed(1)}
                  </span>
                </div>
              </div>
              <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                Public
              </span>
            </div>

            {/* Your Rating */}
            <div className="bg-indigo-50 p-4 rounded-xl">
              <p className="text-xs uppercase tracking-wide text-indigo-500">
                Your Rating
              </p>

              <div className="mt-2 flex items-center justify-between">
                <RatingStars
                  value={store.user_rating || 0}
                  editable={true}
                  size="text-2xl"
                  onChange={(newRating) =>
                    handleRating(store.id, newRating)
                  }
                />

                {store.user_rating ? (
                  <span className="text-sm font-medium text-indigo-600">
                    {store.user_rating} / 5
                  </span>
                ) : (
                  <span className="text-sm text-gray-500">
                    Not Rated
                  </span>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}

export default StoreList