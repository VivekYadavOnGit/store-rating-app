import { useEffect, useState } from "react"
import API from "../../api/axios"
import RatingStars from "../../components/user/RatingStars"

const MyRatings = () => {
  const [ratedStores, setRatedStores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRatedStores()
  }, [])

  const fetchRatedStores = async () => {
    try {
      const res = await API.get("/stores")
      const filtered = res.data.data.filter(
        (store) => store.user_rating !== null
      )
      setRatedStores(filtered)
    } catch (error) {
      console.error("Error fetching ratings", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500">
        Loading ratings...
      </div>
    )

  if (ratedStores.length === 0)
    return (
      <div className="text-center py-16 text-gray-500">
        You haven't rated any stores yet.
      </div>
    )

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
      {ratedStores.map((store) => (
        <div
          key={store.id}
          className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition duration-300"
        >
          <h3 className="text-xl font-bold text-indigo-600">
            {store.name}
          </h3>

          <p className="text-base text-gray-600 mt-1">
            {store.address}
          </p>

          <div className="mt-5">
            <p className="text-sm text-gray-500 mb-1">
              Your Rating
            </p>

            <RatingStars
              value={store.user_rating}
              editable={false}
              size="text-xl"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyRatings