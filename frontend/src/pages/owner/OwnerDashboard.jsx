import { useEffect, useState } from "react"
import API from "../../api/axios"

import Card from "../../components/ui/Card"
import Table from "../../components/ui/Table"
import Loader from "../../components/ui/Loader"
import RatingStars from "../../components/user/RatingStars"

const OwnerDashboard = () => {
    const [store, setStore] = useState(null)
    const [ratings, setRatings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [sortKey, setSortKey] = useState("name")
    const [order, setOrder] = useState("asc")
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const fetchDashboard = async () => {
        try {
            const res = await API.get(
                `/owner/dashboard?sort=${sortKey}&order=${order}&page=${page}&limit=5`
            )

            const dashboardData = res.data.data

            setStore({
                ...dashboardData.store,
                average_rating: dashboardData.average_rating
            })

            setRatings(dashboardData.rated_users || [])
            setTotalPages(dashboardData.totalPages || 1)

        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to load dashboard"
            )
        } finally {
            setLoading(false)
        }
    }

    const handleSort = (key) => {
        if (sortKey === key) {
            setOrder(order === "asc" ? "desc" : "asc")
        } else {
            setSortKey(key)
            setOrder("asc")
        }
    }

    useEffect(() => {
        fetchDashboard()
    }, [sortKey, order, page])

    if (loading) return <Loader />

    if (error) {
        return (
            <div className="text-center text-red-500">
                {error}
            </div>
        )
    }

    if (!store) {
        return (
            <div className="text-center text-gray-500">
                No store assigned to this owner.
            </div>
        )
    }

    return (
        <div className="space-y-10 max-w-7xl mx-auto">

            <h2 className="text-2xl font-semibold text-gray-700">
                Store Owner Dashboard
            </h2>

            {/* Store Info */}
            <Card className="p-8 bg-white rounded-3xl shadow-lg border border-gray-200">

                <div className="flex justify-between items-center">

                    <div>
                        <h3 className="text-3xl font-semibold text-gray-800">
                            {store.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-2">
                            {store.address}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-sm text-gray-600 mb-3">
                            Average Rating
                        </p>

                        <div className="flex items-center gap-3 justify-end">
                            <RatingStars
                                value={Number(store.average_rating) || 0}
                                size="text-2xl"
                            />
                            <span className="text-xl font-semibold text-gray-700">
                                ({Number(store.average_rating) || 0})
                            </span>
                        </div>
                    </div>

                </div>

            </Card>

            {/* Ratings Table */}
            <Card className="p-8 bg-white rounded-3xl shadow-lg border border-gray-200">

                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">
                        Users Who Rated Your Store
                    </h3>
                    <span className="text-sm text-gray-500">
                        {ratings.length} Ratings
                    </span>
                </div>

                <Table
                    columns={[
                        { key: "name", label: "User Name", onSort: handleSort },
                        { key: "email", label: "Email", onSort: handleSort },
                        { key: "rating", label: "Rating", onSort: handleSort }
                    ]}
                    data={ratings.map((r) => ({
                        ...r,
                        rating: <RatingStars value={Number(r.rating)} />
                    }))}
                />

                <div className="flex justify-between items-center mt-6">

                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <span className="text-sm text-gray-600">
                        Page {page} of {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                    >
                        Next
                    </button>

                </div>

            </Card>

        </div>
    )
}

export default OwnerDashboard