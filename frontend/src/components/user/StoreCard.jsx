import { useState } from "react"
import API from "../../api/axios"

const StoreCard = ({ store, refresh }) => {
  const [rating, setRating] = useState(store.user_rating || "")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!rating) return alert("Select rating")

    try {
      setLoading(true)

      await API.post("/ratings", {
        storeId: store.id,  // ✅ use id
        rating: Number(rating),
      })

      alert("Rating submitted successfully")
      refresh()

    } catch (error) {
      console.error("Rating error", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border">

      <h3 className="text-lg font-semibold text-indigo-600">
        {store.name}
      </h3>

      <p className="text-sm text-gray-500 mb-2">
        {store.address}
      </p>

      <p className="text-sm font-medium mb-3">
        ⭐ Overall Rating: {Number(store.overall_rating).toFixed(1)}
      </p>

      {store.user_rating && (
        <p className="text-sm text-green-600 mb-2">
          Your Rating: ⭐ {store.user_rating}
        </p>
      )}

      <div className="flex gap-2 items-center">
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">Rate</option>
          {[1,2,3,4,5].map(num => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
        >
          {loading ? "Saving..." : store.user_rating ? "Update" : "Submit"}
        </button>
      </div>

    </div>
  )
}

export default StoreCard