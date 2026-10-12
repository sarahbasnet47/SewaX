import { useState } from "react";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../redux/features/UserSlice";

import {
  FaUsers,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import DeleteModal from "../Components/shared.jsx/DeleteModal";

function User() {
  const { data, isLoading, isError, error, refetch } = useGetUsersQuery();

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const users = Array.isArray(data) ? data : data?.users || [];

  const [editingUser, setEditingUser] = useState(null);

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    role: "user",
  });

  const [message, setMessage] = useState("");
  const [actionError, setActionError] = useState("");

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");

  // Open edit modal
  const handleEdit = (user) => {
    setEditingUser(user);

    setForm({
      username: user.username || "",
      email: user.email || "",
      phone: user.phone || "",
      role: user.role || "user",
    });

    setMessage("");
    setActionError("");
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Update user
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingUser) return;

    setMessage("");
    setActionError("");

    try {
      await updateUser({
        id: editingUser.id,
        data: {
          username: form.username.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          role: form.role,
        },
      }).unwrap();

      setMessage("User updated successfully!");
      setEditingUser(null);

      await refetch();
    } catch (err) {
      setActionError(err?.data?.message || "Failed to update user.");
    }
  };

  // Open delete confirmation modal
  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
    setMessage("");
    setActionError("");
  };

  // Delete user after confirmation
  const confirmDelete = async () => {
    if (!selectedUser || isDeleting) return;

    setMessage("");
    setActionError("");

    try {
      await deleteUser(selectedUser.id).unwrap();

      setMessage("User deleted successfully!");
      setShowDeleteModal(false);
      setSelectedUser(null);

      await refetch();
    } catch (err) {
      setActionError(err?.data?.message || "Failed to delete user.");
    }
  };

  // Cancel delete modal
  const cancelDelete = () => {
    if (isDeleting) return;

    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F5EF]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#E5EDE7] border-t-[#245747]" />

          <p className="font-semibold text-[#245747]">Loading users...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-[#F7F5EF] p-6">
        <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-red-600">
            {error?.data?.message || "Failed to fetch users."}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Check your API endpoint, login session, and admin permissions.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-lg bg-[#245747] px-5 py-2 font-semibold text-white transition hover:bg-[#193F34]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5EF] p-4 text-[#343830] sm:p-6 lg:p-8">
      {/* Page heading */}
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <div className="rounded-xl bg-[#245747] p-3 text-white">
              <FaUsers size={22} />
            </div>

            <h1 className="text-2xl font-bold sm:text-3xl">User Management</h1>
          </div>

          <p className="text-sm text-gray-500">
            View, update, and manage registered SEWAX users.
          </p>
        </div>

        <div className="rounded-xl border border-[#E7E2D7] bg-white px-5 py-3 shadow-sm">
          <p className="text-sm text-gray-500">Total Users</p>

          <p className="text-2xl font-bold text-[#245747]">{users.length}</p>
        </div>
      </div>

      {/* Success message */}
      {message && (
        <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
          <p>{message}</p>

          <button
            type="button"
            onClick={() => setMessage("")}
            aria-label="Dismiss success message"
          >
            <FaTimes />
          </button>
        </div>
      )}

      {/* Error message */}
      {actionError && (
        <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          <p>{actionError}</p>

          <button
            type="button"
            onClick={() => setActionError("")}
            aria-label="Dismiss error message"
          >
            <FaTimes />
          </button>
        </div>
      )}

      {/* Summary cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl border border-[#E7E2D7] bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-[#E5EDE7] p-4 text-[#245747]">
            <FaUsers size={22} />
          </div>

          <div>
            <p className="text-sm text-gray-500">Registered Users</p>

            <p className="text-2xl font-bold text-[#245747]">{users.length}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-[#E7E2D7] bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-[#F4E8D5] p-4 text-[#91672D]">
            <FaUsers size={22} />
          </div>

          <div>
            <p className="text-sm text-gray-500">Registered Vendors</p>

            <p className="text-2xl font-bold text-[#91672D]">
              {users.filter((user) => user.role === "vendor").length}
            </p>
          </div>
        </div>
      </div>

      {/* Users table */}
      <div className="overflow-hidden rounded-2xl border border-[#E7E2D7] bg-white shadow-sm">
        <div className="border-b border-[#E7E2D7] px-5 py-4 sm:px-6">
          <h2 className="text-lg font-bold text-[#245747]">All Users</h2>

          <p className="mt-1 text-sm text-gray-500">
            User information retrieved from your database.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-187.5 text-left">
            <thead className="bg-[#245747] text-white">
              <tr>
                <th className="px-5 py-4">ID</th>
                <th className="px-5 py-4">Username</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Phone</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-5 py-12 text-center">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#E5EDE7] text-[#245747]">
                      <FaUsers size={24} />
                    </div>

                    <p className="font-semibold text-gray-700">
                      No users found
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      No user records were returned by the API.
                    </p>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-[#E7E2D7] transition hover:bg-[#F7F5EF]"
                  >
                    <td className="px-5 py-4 font-medium">{user.id}</td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E5EDE7] font-bold text-[#245747]">
                          {user.username?.charAt(0)?.toUpperCase() || "U"}
                        </div>

                        <span className="font-semibold">
                          {user.username || "Unnamed user"}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaEnvelope className="shrink-0 text-[#245747]" />
                        {user.email || "Not provided"}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaPhone className="shrink-0 text-[#245747]" />
                        {user.phone || "Not provided"}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-[#F4E8D5] text-[#91672D]"
                            : user.role === "vendor"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-[#E5EDE7] text-[#245747]"
                        }`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* Hide actions for logged-in user */}
                        {String(user.id) !== String(loggedInUser.id) && (
                          <>
                            <button
                              type="button"
                              onClick={() => handleEdit(user)}
                              title="Edit user"
                              className="flex items-center gap-2 rounded-lg bg-[#E5EDE7] px-3 py-2 text-sm font-semibold text-[#245747] transition hover:bg-[#D1E2D5]"
                            >
                              <FaEdit />
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(user)}
                              disabled={isDeleting}
                              title="Delete user"
                              className="flex items-center gap-2 rounded-lg bg-[#F6E5DE] px-3 py-2 text-sm font-semibold text-[#B45F43] transition hover:bg-[#EFD2C6] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <FaTrash />
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer */}
        <div className="flex flex-col gap-2 bg-[#FCFBF8] px-5 py-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Showing {users.length} user{users.length === 1 ? "" : "s"}
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="self-start font-semibold text-[#245747] hover:underline sm:self-auto"
          >
            Refresh list
          </button>
        </div>
      </div>

      {/* Edit user modal */}
      {editingUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isUpdating) {
              setEditingUser(null);
            }
          }}
        >
          <div className="my-auto w-full max-w-2xl rounded-2xl border border-[#E7E2D7] bg-[#F7F5EF] shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between rounded-t-2xl bg-[#245747] px-6 py-5 text-white">
              <div>
                <h2 className="text-xl font-bold sm:text-2xl">Edit User</h2>

                <p className="mt-1 text-sm text-white/75">
                  User ID: {editingUser.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditingUser(null)}
                disabled={isUpdating}
                className="rounded-lg p-2 transition hover:bg-white/15 disabled:opacity-50"
                aria-label="Close edit form"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Modal form */}
            <form onSubmit={handleUpdate} className="p-6 sm:p-8">
              <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="username"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Username
                  </label>

                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={form.username}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-[#E7E2D7] bg-white px-4 py-3 outline-none transition focus:border-[#245747] focus:ring-2 focus:ring-[#245747]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-[#E7E2D7] bg-white px-4 py-3 outline-none transition focus:border-[#245747] focus:ring-2 focus:ring-[#245747]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Phone
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#E7E2D7] bg-white px-4 py-3 outline-none transition focus:border-[#245747] focus:ring-2 focus:ring-[#245747]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Role
                  </label>

                  <select
                    id="role"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-[#E7E2D7] bg-white px-4 py-3 outline-none transition focus:border-[#245747] focus:ring-2 focus:ring-[#245747]/10"
                  >
                    <option value="user">User</option>
                    <option value="vendor">Vendor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              {/* Modal actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-[#E7E2D7] pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  disabled={isUpdating}
                  className="flex items-center justify-center gap-2 rounded-lg border border-[#E7E2D7] bg-white px-5 py-3 font-semibold text-[#343830] transition hover:bg-[#E7E2D7] disabled:opacity-50"
                >
                  <FaTimes />
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#245747] px-5 py-3 font-semibold text-white transition hover:bg-[#193F34] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FaSave />
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reusable delete confirmation modal */}
      {showDeleteModal && (
        <DeleteModal onCancel={cancelDelete} onDelete={confirmDelete} />
      )}
    </div>
  );
}

export default User;
