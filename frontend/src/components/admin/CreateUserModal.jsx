import { useState } from "react"
import API from "../../api/axios"

import Modal from "../ui/Modal"
import Input from "../ui/Input"
import Button from "../ui/Button"

const CreateUserModal = ({ isOpen, onClose, onSuccess }) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "USER"
    })

    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const validateForm = (form) => {
        const errors = {}

        if (form.name.length < 20 || form.name.length > 60) {
            errors.name = "Name must be 20–60 characters"
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(form.email)) {
            errors.email = "Invalid email format"
        }

        const passwordRegex =
            /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/

        if (!passwordRegex.test(form.password)) {
            errors.password =
                "8–16 chars, 1 uppercase & 1 special character required"
        }

        if (form.address.length > 400) {
            errors.address = "Address must be under 400 characters"
        }

        return errors
    }

    const handleCreateUser = async (e) => {
        e.preventDefault()

        const validationErrors = validateForm(form)
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length > 0) return

        setLoading(true)

        try {
            await API.post("/admin/users", form)
            onSuccess()
            onClose()
            setForm({
                name: "",
                email: "",
                password: "",
                address: "",
                role: "USER"
            })
            setErrors({})
        } catch (err) {
            alert(err.response?.data?.message || "Error creating user")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create New User"
        >
            <form onSubmit={handleCreateUser} className="space-y-4">

                <Input
                    label="Name"
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
                    label="Password"
                    value={form.password}
                    error={errors.password}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
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
                        Role
                    </label>
                    <select
                        value={form.role}
                        onChange={(e) =>
                            setForm({ ...form, role: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-indigo-500"
                    >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="OWNER">OWNER</option>
                    </select>
                </div>

                <div className="flex justify-end">
                    <Button type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create User"}
                    </Button>
                </div>

            </form>
        </Modal>
    )
}

export default CreateUserModal