import { useEffect, useState } from "react"
import API from "../../api/axios"
import Input from "../../components/ui/Input"
import Table from "../../components/ui/Table"
import Button from "../../components/ui/Button"
import Loader from "../../components/ui/Loader"
import CreateUserModal from "../../components/admin/CreateUserModal"

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [sortKey, setSortKey] = useState("name")
  const [order, setOrder] = useState("asc")
  const [filterName, setFilterName] = useState("")
  const [filterEmail, setFilterEmail] = useState("")
  const [filterRole, setFilterRole] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchUsers = async () => {
    try {
      const res = await API.get(
        `/admin/users?name=${filterName}&email=${filterEmail}&role=${filterRole}&sort=${sortKey}&order=${order}&page=${page}&limit=5`
      )

      // Backend returns array directly
      setUsers(res.data.data)

      // Since backend not paginated yet
      setTotalPages(1)

    } catch (err) {
      setError("Failed to fetch users")
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
    setFilterEmail("")
    setFilterRole("")
    setSortKey("name")
    setOrder("asc")
    setPage(1)
    setError("")
  }

  useEffect(() => {
    fetchUsers()
  }, [sortKey, order, page])


  if (loading) return <Loader />

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-700">
          Users Management
        </h2>

        <Button onClick={() => setOpenModal(true)}>
          + Add User
        </Button>
      </div>

      {error && (
        <div className="text-red-500">{error}</div>
      )}

      {/* Filter Form */}
      <div className="bg-white p-4 rounded-xl shadow-sm flex flex-wrap gap-4 items-end">

        <div className="w-48">
          <Input
            label="Name"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            placeholder="Search by name"
          />
        </div>

        <div className="w-48">
          <Input
            label="Email"
            value={filterEmail}
            onChange={(e) => setFilterEmail(e.target.value)}
            placeholder="Search by email"
          />
        </div>

        <div className="w-40">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500"
          >
            <option value="">All</option>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="OWNER">OWNER</option>
          </select>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => { setPage(1); fetchUsers() }}>
            Search
          </Button>

          <Button
            variant="secondary"
            onClick={handleResetTable}
          >
            Reset Table
          </Button>
        </div>

      </div>

      <Table
        columns={[
          { key: "name", label: "Name", onSort: handleSort },
          { key: "email", label: "Email", onSort: handleSort },
          { key: "address", label: "Address", onSort: handleSort },
          { key: "role", label: "Role", onSort: handleSort }
        ]}
        data={users}
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

      <CreateUserModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={fetchUsers}
      />

    </div>
  )
}

export default Users