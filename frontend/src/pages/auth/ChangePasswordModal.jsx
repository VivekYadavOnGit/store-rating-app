import { useState } from "react"
import API from "../../api/axios"
import Input from "../../components/ui/Input"
import Button from "../../components/ui/Button"

const ChangePasswordModal = ({ isOpen, onClose, onSuccess }) => {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match")
    }

    try {
      const res = await API.put("/users/update-password", {
        oldPassword,
        newPassword
      })

      setSuccess("Password updated successfully. Please login again.")
      setError("")

    } catch (err) {
      setError(err.response?.data?.message || "Error updating password")
    }
  }

  const handleOk = () => {
    onSuccess()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">

        {!success ? (
          <>
            <h2 className="text-xl font-semibold">
              Change Password
            </h2>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              <Input
                type="password"
                label="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />

              <Input
                type="password"
                label="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <Input
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <div className="flex justify-end gap-3">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={onClose}
                >
                  Cancel
                </Button>

                <Button type="submit">
                  Update
                </Button>
              </div>

            </form>
          </>
        ) : (
          <>
            <p className="text-green-600 text-sm">
              {success}
            </p>

            <div className="flex justify-end">
              <Button onClick={handleOk}>
                OK
              </Button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default ChangePasswordModal