import { useEffect, useState } from "react"
import API from "../../api/axios"

import Modal from "../ui/Modal"
import Input from "../ui/Input"
import Button from "../ui/Button"
import Loader from "../ui/Loader"

const CreateStoreModal = ({ isOpen, onClose, onSuccess }) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        owner_id: ""
    })

    const [owners, setOwners] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingOwners, setLoadingOwners] = useState(false)
    const [errors, setErrors] = useState({})
    const [page, setPage] = useState(1)
const [totalPages, setTotalPages] = useState(1)


    useEffect(() => {
        if (!isOpen) return

        const fetchOwners = async () => {
            try {
                setLoadingOwners(true)
                const res = await API.get("/admin/users?role=OWNER")
                setOwners(res.data.data)
            } catch (err) {
                alert("Failed to fetch owners")
            } finally {
                setLoadingOwners(false)
            }
        }

        fetchOwners()
    }, [isOpen])

    const handleCreateStore = async (e) => {
        e.preventDefault()

        const validationErrors = validateForm(form)
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length > 0) return

        setLoading(true)

        try {
            await API.post("/admin/stores", form)
            onSuccess()
            onClose()
            setForm({
                name: "",
                email: "",
                address: "",
                owner_id: ""
            })
            setErrors({})
        } catch (err) {
            alert(err.response?.data?.message || "Error creating store")
        } finally {
            setLoading(false)
        }
    }

    const validateForm = (form) => {
        const errors = {}

        if (!form.name || form.name.length < 3 || form.name.length > 60) {
            errors.name = "Store name must be 3–60 characters"
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(form.email)) {
            errors.email = "Invalid email format"
        }

        if (form.address.length > 400) {
            errors.address = "Address must be under 400 characters"
        }

        if (!form.owner_id) {
            errors.owner_id = "Please select a store owner"
        }

        return errors
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create Store"
        >
            <form onSubmit={handleCreateStore} className="space-y-4">

                <Input
                    label="Store Name"
                    value={form.name}
                    error={errors.name}
                    onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                    }
                />

                <Input
                    label="Email"
                    value={form.email}
                    error={errors.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />

                <Input
                    label="Address"
                    value={form.address}
                    error={errors.address}
                    onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                    }
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Store Owner
                    </label>

                    {loadingOwners ? (
                        <Loader />
                    ) : (
                        <select
                            value={form.owner_id}
                            onChange={(e) =>
                                setForm({ ...form, owner_id: e.target.value })
                            }
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500"
                        >
                            <option value="">Select Owner</option>

                            {owners.map((owner) => (
                                <option key={owner.id} value={owner.id}>
                                    {owner.name} ({owner.email})
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <div className="flex justify-end">
                    <Button type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create Store"}
                    </Button>
                </div>

            </form>
        </Modal>
    )
}

export default CreateStoreModal