import { useEffect, useState } from "react"
import API from "../../api/axios"

import Table from "../../components/ui/Table"
import Button from "../../components/ui/Button"
import Loader from "../../components/ui/Loader"
import Input from "../../components/ui/Input"
import CreateStoreModal from "../../components/admin/CreateStoreModal"
import RatingStars from "../../components/user/RatingStars"

const Stores = () => {
    const [stores, setStores] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [openModal, setOpenModal] = useState(false)

    const [sortKey, setSortKey] = useState("name")
    const [order, setOrder] = useState("asc")

    const [filterName, setFilterName] = useState("")
    const [filterAddress, setFilterAddress] = useState("")
    const [page, setPage] = useState(1)
const [totalPages, setTotalPages] = useState(1)

const fetchStores = async () => {
    try {
      const res = await API.get(
        `/admin/stores?name=${filterName}&address=${filterAddress}&sort=${sortKey}&order=${order}`
      )
  
      setStores(res.data.data)
      setTotalPages(1)
  
    } catch (err) {
      setError("Failed to fetch stores")
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

    const handleResetTable = () => {
        setFilterName("")
        setFilterAddress("")
        setSortKey("name")
        setOrder("asc")
        setError("")
    }

    useEffect(() => {
        fetchStores()
    }, [sortKey, order, page])

    if (loading) return <Loader />

    return (
        <div className="space-y-6">

            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-700">
                    Stores Management
                </h2>

                <Button onClick={() => setOpenModal(true)}>
                    + Add Store
                </Button>
            </div>

            {error && <div className="text-red-500">{error}</div>}

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm flex gap-4 items-end">

                <div className="w-48">
                    <Input
                        label="Store Name"
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                    />
                </div>

                <div className="w-48">
                    <Input
                        label="Address"
                        value={filterAddress}
                        onChange={(e) => setFilterAddress(e.target.value)}
                    />
                </div>

                <Button onClick={fetchStores}>
                    Search
                </Button>

                <Button
                    variant="secondary"
                    onClick={handleResetTable}
                >
                    Reset Table
                </Button>

            </div>

            <Table
                columns={[
                    { key: "name", label: "Name", onSort: handleSort },
                    { key: "email", label: "Email", onSort: handleSort },
                    { key: "address", label: "Address", onSort: handleSort },
                    { key: "average_rating", label: "Rating", onSort: handleSort }
                ]}
                data={stores.map((store) => ({
                    ...store,
                    average_rating: (
                        <div className="flex items-center gap-2">
                          <RatingStars value={Number(store.average_rating) || 0} />
                          <span className="text-sm text-gray-500">
                            ({Number(store.average_rating) || 0})
                          </span>
                        </div>
                      )
                }))}
                sortKey={sortKey}
                order={order}
            />

            <div className="flex justify-between items-center mt-6">

                <Button
                    variant="secondary"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </Button>

                <span className="text-sm text-gray-600">
                    Page {page} of {totalPages}
                </span>

                <Button
                    variant="secondary"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </Button>

            </div>

            <CreateStoreModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onSuccess={fetchStores}
            />

        </div>
    )
}

export default Stores