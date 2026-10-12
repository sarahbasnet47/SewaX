import { useState } from "react";
import {
  useDeleteVendorMutation,
  useGetVendorsQuery,
  useUpdateVendorMutation,
} from "../../redux/features/VendorSlice";

import {
  FaUsers,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaMapMarkerAlt,
  FaPhone,
  FaUserTie,
} from "react-icons/fa";
import DeleteModal from "../Components/shared.jsx/DeleteModal";

function AdminVendor() {
  const { data, isLoading, isError, error, refetch } = useGetVendorsQuery();

  const [deleteVendor, { isLoading: isDeleting }] = useDeleteVendorMutation();

  const [updateVendor, { isLoading: isUpdating }] = useUpdateVendorMutation();

  const [editingVendor, setEditingVendor] = useState(null);
  const [message, setMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  // Supports an array response or an object containing vendors.
  const vendors = Array.isArray(data) ? data : data?.vendors || [];

  // Open edit modal
  const handleEdit = (vendor) => {
    setEditingVendor({
      id: vendor.id,
      user_id: vendor.user_id ?? "",
      name: vendor.name ?? "",
      address: vendor.address ?? "",
      number: vendor.number ?? "",
      service_id: vendor.service_id ?? "",
    });

    setMessage("");
    setActionError("");
  };

  // Update form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditingVendor((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Update vendor
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingVendor) return;

    setMessage("");
    setActionError("");

    try {
      await updateVendor({
        id: editingVendor.id,
        data: {
          user_id: editingVendor.user_id,
          name: editingVendor.name.trim(),
          address: editingVendor.address.trim(),
          number: editingVendor.number.trim(),
          service_id: editingVendor.service_id,
        },
      }).unwrap();

      setMessage("Vendor updated successfully!");
      setEditingVendor(null);

      await refetch();
    } catch (err) {
      console.error("Update vendor error:", err);

      setActionError(err?.data?.message || "Failed to update vendor.");
    }
  };

  // Delete vendor
  // Open confirmation modal
  const handleDelete = (vendor) => {
    setSelectedVendor(vendor);
    setShowDeleteModal(true);
  };

  // Delete vendor after confirmation
  const confirmDelete = async () => {
    if (!selectedVendor || isDeleting) return;

    try {
      await deleteVendor(selectedVendor.id).unwrap();

      setShowDeleteModal(false);
      setSelectedVendor(null);

      await refetch();
    } catch (error) {
      console.error("Failed to delete vendor:", error?.data?.message || error);
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    if (isDeleting) return;

    setShowDeleteModal(false);
    setSelectedVendor(null);
  };
  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F5EF]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#E5EDE7] border-t-[#245747]" />
          <p className="font-semibold text-[#245747]">Loading vendors...</p>
        </div>
      </div>
    );
  }

  // Fetch error
  if (isError) {
    return (
      <div className="min-h-screen bg-[#F7F5EF] p-6">
        <div className="rounded-2xl border border-red-200 bg-white p-6">
          <h2 className="font-bold text-red-600">
            {error?.data?.message || "Failed to fetch vendors."}
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Check your API endpoint, login session, and backend.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-lg bg-[#245747] px-5 py-2 text-white hover:bg-[#193f34]"
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
              <FaUserTie size={22} />
            </div>

            <h1 className="text-2xl font-bold sm:text-3xl">
              Vendor Management
            </h1>
          </div>

          <p className="text-sm text-gray-500">
            View, update, and manage registered SEWAX vendors.
          </p>
        </div>

        <div className="rounded-xl border border-[#E7E2D7] bg-white px-5 py-3 shadow-sm">
          <p className="text-sm text-gray-500">Total Vendors</p>
          <p className="text-2xl font-bold text-[#245747]">{vendors.length}</p>
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

      {/* Action error */}
      {actionError && (
        <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          <p>{actionError}</p>

          <button
            type="button"
            onClick={() => handleDelete(vendor)}
            disabled={isDeleting}
            className="flex items-center gap-2 rounded-lg bg-[#F6E5DE] px-3 py-2 text-sm font-semibold text-[#B45F43] transition hover:bg-[#EFD2C6] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaTrash />
            Delete
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
            <p className="text-sm text-gray-500">Registered Vendors</p>
            <p className="text-2xl font-bold text-[#245747]">
              {vendors.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-[#E7E2D7] bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-[#F4E8D5] p-4 text-[#91672D]">
            <FaMapMarkerAlt size={22} />
          </div>

          <div>
            <p className="text-sm text-gray-500">Vendors with an Address</p>
            <p className="text-2xl font-bold text-[#91672D]">
              {vendors.filter((vendor) => vendor.address).length}
            </p>
          </div>
        </div>
      </div>

      {/* Vendor table */}
      <div className="overflow-hidden rounded-2xl border border-[#E7E2D7] bg-white shadow-sm">
        <div className="border-b border-[#E7E2D7] px-5 py-4 sm:px-6">
          <h2 className="text-lg font-bold text-[#245747]">All Vendors</h2>
          <p className="mt-1 text-sm text-gray-500">
            Vendor details retrieved from your database.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-212.5 text-left">
            <thead className="bg-[#245747] text-white">
              <tr>
                <th className="px-5 py-4">ID</th>
                <th className="px-5 py-4">Vendor Name</th>
                <th className="px-5 py-4">Address</th>
                <th className="px-5 py-4">Phone</th>
                <th className="px-5 py-4">User ID</th>
                <th className="px-5 py-4">Service ID</th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {vendors.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-5 py-12 text-center">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#E5EDE7] text-[#245747]">
                      <FaUserTie size={24} />
                    </div>

                    <p className="font-semibold text-gray-700">
                      No vendors found
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      No vendor records were returned by the API.
                    </p>
                  </td>
                </tr>
              ) : (
                vendors.map((vendor) => (
                  <tr
                    key={vendor.id}
                    className="border-b border-[#E7E2D7] transition hover:bg-[#F7F5EF]"
                  >
                    <td className="px-5 py-4 font-medium">{vendor.id}</td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E5EDE7] font-bold text-[#245747]">
                          {vendor.name?.charAt(0)?.toUpperCase() || "V"}
                        </div>

                        <span className="font-semibold text-[#343830]">
                          {vendor.name || "Unnamed vendor"}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaMapMarkerAlt className="shrink-0 text-[#245747]" />
                        {vendor.address || "Not provided"}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaPhone className="shrink-0 text-[#245747]" />
                        {vendor.number || "Not provided"}
                      </div>
                    </td>

                    <td className="px-5 py-4">{vendor.user_id ?? "—"}</td>

                    <td className="px-5 py-4">{vendor.service_id ?? "—"}</td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(vendor)}
                          className="flex items-center gap-2 rounded-lg bg-[#E5EDE7] px-3 py-2 text-sm font-semibold text-[#245747] transition hover:bg-[#d1e2d5]"
                        >
                          <FaEdit />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(vendor)}
                          disabled={isDeleting}
                          className="flex items-center gap-2 rounded-lg bg-[#F6E5DE] px-3 py-2 text-sm font-semibold text-[#B45F43] transition hover:bg-[#efd2c6] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <FaTrash />
                          {isDeleting ? "Deleting..." : "Delete"}
                        </button>
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
            Showing {vendors.length} vendor
            {vendors.length === 1 ? "" : "s"}
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

      {/* Edit vendor modal */}
      {editingVendor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isUpdating) {
              setEditingVendor(null);
            }
          }}
        >
          <div className="my-auto w-full max-w-2xl rounded-2xl border border-[#E7E2D7] bg-[#F7F5EF] shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between rounded-t-2xl bg-[#245747] px-6 py-5 text-white">
              <div>
                <h2 className="text-xl font-bold sm:text-2xl">Edit Vendor</h2>
                <p className="mt-1 text-sm text-white/75">
                  Update the vendor information below.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditingVendor(null)}
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
                    htmlFor="vendor-name"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Vendor Name
                  </label>

                  <input
                    id="vendor-name"
                    name="name"
                    type="text"
                    value={editingVendor.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-[#E7E2D7] bg-white px-4 py-3 outline-none transition focus:border-[#245747] focus:ring-2 focus:ring-[#245747]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="vendor-phone"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Phone Number
                  </label>

                  <input
                    id="vendor-phone"
                    name="number"
                    type="text"
                    value={editingVendor.number}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-[#E7E2D7] bg-white px-4 py-3 outline-none transition focus:border-[#245747] focus:ring-2 focus:ring-[#245747]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="vendor-address"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Address
                  </label>

                  <input
                    id="vendor-address"
                    name="address"
                    type="text"
                    value={editingVendor.address}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#E7E2D7] bg-white px-4 py-3 outline-none transition focus:border-[#245747] focus:ring-2 focus:ring-[#245747]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="vendor-user-id"
                    className="mb-2 block text-sm font-semibold"
                  >
                    User ID
                  </label>

                  <input
                    id="vendor-user-id"
                    name="user_id"
                    type="number"
                    min="1"
                    value={editingVendor.user_id}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-[#E7E2D7] bg-white px-4 py-3 outline-none transition focus:border-[#245747] focus:ring-2 focus:ring-[#245747]/10"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="vendor-service-id"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Service ID
                  </label>

                  <input
                    id="vendor-service-id"
                    name="service_id"
                    type="number"
                    min="1"
                    value={editingVendor.service_id}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-[#E7E2D7] bg-white px-4 py-3 outline-none transition focus:border-[#245747] focus:ring-2 focus:ring-[#245747]/10"
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    Enter an existing service ID if your backend requires one.
                  </p>
                </div>
              </div>

              {/* Modal actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-[#E7E2D7] pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setEditingVendor(null)}
                  disabled={isUpdating}
                  className="flex items-center justify-center gap-2 rounded-lg border border-[#E7E2D7] bg-white px-5 py-3 font-semibold text-[#343830] transition hover:bg-[#E7E2D7] disabled:opacity-50"
                >
                  <FaTimes />
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#245747] px-5 py-3 font-semibold text-white transition hover:bg-[#193f34] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FaSave />
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <DeleteModal onCancel={cancelDelete} onDelete={confirmDelete} />
      )}
    </div>
  );
}

export default AdminVendor;
