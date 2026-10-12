import { useState } from "react";

import {
  useGetAllServicesQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} from "../../redux/features/ServiceSlice";



import {
  FaTools,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaClipboardList,
  FaSyncAlt,
} from "react-icons/fa";
import DeleteModal from "../Components/shared.jsx/DeleteModal";

function AdminServices() {
  const { data, isLoading, isError, error, refetch } = useGetAllServicesQuery();

  const [updateService, { isLoading: isUpdating }] = useUpdateServiceMutation();

  const [deleteService, { isLoading: isDeleting }] = useDeleteServiceMutation();

  const [editingService, setEditingService] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [actionError, setActionError] = useState("");

  // Support the API response containing allServices.
  const services = Array.isArray(data?.allServices) ? data.allServices : [];

  // Open the edit modal.
  const handleEdit = (service) => {
    setEditingService(service);

    setForm({
      name: service.name || service.title || "",
      description: service.description || "",
    });

    setMessage("");
    setActionError("");
  };

  // Update form fields.
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Close the edit modal.
  const handleClose = () => {
    if (isUpdating) return;

    setEditingService(null);
    setForm({ name: "", description: "" });
    setActionError("");
  };

  // Update a service.
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (editingService?.id == null) {
      setActionError("Service ID not found.");
      return;
    }

    if (!form.name.trim() || !form.description.trim()) {
      setActionError("Please enter both service name and description.");
      return;
    }

    setMessage("");
    setActionError("");

    try {
      await updateService({
        id: editingService.id,
        data: {
          name: form.name.trim(),
          description: form.description.trim(),
        },
      }).unwrap();

      setMessage("Service updated successfully!");
      setEditingService(null);
      setForm({ name: "", description: "" });

      await refetch();
    } catch (err) {
      console.error("UPDATE SERVICE ERROR:", err);
      setActionError(err?.data?.message || "Failed to update service.");
    }
  };

  // Open the delete confirmation modal.
  const handleDelete = (service) => {
    console.log("Selected service:", service);
    console.log("Selected service ID:", service?.id);

    if (service?.id == null) {
      setActionError("This service does not have an ID.");
      return;
    }

    setMessage("");
    setActionError("");
    setSelectedService(service);
    setShowDeleteModal(true);
  };

  // Cancel deletion.
  const cancelDelete = () => {
    if (isDeleting) return;

    setShowDeleteModal(false);
    setSelectedService(null);
  };

  // Confirm deletion.
  const confirmDelete = async () => {
    if (selectedService?.id == null) {
      setActionError("Service ID not found.");
      setShowDeleteModal(false);
      setSelectedService(null);
      return;
    }

    setMessage("");
    setActionError("");

    try {
      await deleteService(selectedService.id).unwrap();

      setMessage("Service deleted successfully!");
      setShowDeleteModal(false);
      setSelectedService(null);

      if (String(editingService?.id) === String(selectedService.id)) {
        setEditingService(null);
        setForm({ name: "", description: "" });
      }

      await refetch();
    } catch (err) {
      console.error("DELETE SERVICE ERROR:", err);

      setActionError(err?.data?.message || "Failed to delete service.");

      setShowDeleteModal(false);
      setSelectedService(null);
    }
  };

  // Loading state.
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F5EF]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#E5EDE7] border-t-[#245747]" />
          <p className="font-semibold text-[#245747]">Loading services...</p>
        </div>
      </div>
    );
  }

  // API loading error.
  if (isError) {
    return (
      <div className="min-h-screen bg-[#F7F5EF] p-6">
        <div className="rounded-2xl border border-[#E7E2D7] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#B45F43]">
            {error?.data?.message || "Failed to load services."}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Please check your API endpoint and backend server.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 rounded-lg bg-[#245747] px-5 py-2.5 font-semibold text-white hover:bg-[#193F34]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5EF] p-4 text-[#343830] sm:p-6 lg:p-8">
      {/* PAGE HEADER */}
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <div className="rounded-xl bg-[#245747] p-3 text-white">
              <FaTools size={22} />
            </div>

            <h1 className="text-2xl font-bold text-[#245747] sm:text-3xl">
              Manage Services
            </h1>
          </div>

          <p className="text-sm text-gray-500">
            View, update, and manage services available on SEWAX.
          </p>
        </div>

        <div className="rounded-xl border border-[#E7E2D7] bg-white px-5 py-3 shadow-sm">
          <p className="text-sm text-gray-500">Total Services</p>
          <p className="text-2xl font-bold text-[#245747]">{services.length}</p>
        </div>
      </div>

      {/* SUCCESS MESSAGE */}
      {message && (
        <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
          <p>{message}</p>

          <button
            type="button"
            onClick={() => setMessage("")}
            aria-label="Dismiss success message"
            className="rounded-md p-1 hover:bg-green-100"
          >
            <FaTimes />
          </button>
        </div>
      )}

      {/* ACTION ERROR */}
      {actionError && !editingService && (
        <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          <p>{actionError}</p>

          <button
            type="button"
            onClick={() => setActionError("")}
            aria-label="Dismiss error message"
            className="rounded-md p-1 hover:bg-red-100"
          >
            <FaTimes />
          </button>
        </div>
      )}

      {/* SUMMARY CARDS */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl border border-[#E7E2D7] bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-[#E5EDE7] p-4 text-[#245747]">
            <FaClipboardList size={22} />
          </div>

          <div>
            <p className="text-sm text-gray-500">Available Services</p>
            <p className="text-2xl font-bold text-[#245747]">
              {services.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-[#E7E2D7] bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-[#F4E8D5] p-4 text-[#91672D]">
            <FaTools size={22} />
          </div>

          <div>
            <p className="text-sm text-gray-500">Service Management</p>
            <p className="text-lg font-bold text-[#91672D]">Active</p>
          </div>
        </div>
      </div>

      {/* SERVICES TABLE */}
      <div className="overflow-hidden rounded-2xl border border-[#E7E2D7] bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-[#E7E2D7] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-[#245747]">All Services</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage service names and descriptions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => refetch()}
            className="flex items-center justify-center gap-2 self-start rounded-lg bg-[#E5EDE7] px-4 py-2 text-sm font-semibold text-[#245747] hover:bg-[#D1E2D5] sm:self-auto"
          >
            <FaSyncAlt />
            Refresh List
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-175 text-left">
            <thead className="bg-[#245747] text-white">
              <tr>
                <th className="px-5 py-4 text-sm font-semibold">ID</th>
                <th className="px-5 py-4 text-sm font-semibold">
                  Service Name
                </th>
                <th className="px-5 py-4 text-sm font-semibold">Description</th>
                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {services.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#E5EDE7] text-[#245747]">
                      <FaTools size={24} />
                    </div>

                    <p className="font-semibold text-gray-700">
                      No services found
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      No service records were returned by the API.
                    </p>
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr
                    key={service.id}
                    className="border-b border-[#E7E2D7] transition hover:bg-[#F7F5EF]"
                  >
                    <td className="px-5 py-4 font-medium">
                      {service.id ?? "—"}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E5EDE7] font-bold text-[#245747]">
                          {(service.name || service.title || "S")
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <span className="font-semibold text-[#343830]">
                          {service.name || service.title || "No name"}
                        </span>
                      </div>
                    </td>

                    <td className="max-w-md px-5 py-4 text-sm text-gray-600">
                      <p className="line-clamp-2  wrap-break-word">
                        {service.description || "No description"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(service)}
                          className="flex items-center gap-2 rounded-lg bg-[#E5EDE7] px-3 py-2 text-sm font-semibold text-[#245747] hover:bg-[#D1E2D5]"
                        >
                          <FaEdit />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(service)}
                          disabled={isDeleting}
                          className="flex items-center gap-2 rounded-lg bg-[#F6E5DE] px-3 py-2 text-sm font-semibold text-[#B45F43] hover:bg-[#EFD2C6] disabled:cursor-not-allowed disabled:opacity-50"
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

        <div className="flex flex-col gap-2 bg-[#FCFBF8] px-5 py-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Showing {services.length} service
            {services.length === 1 ? "" : "s"}
          </p>
          <p className="text-xs">SEWAX Admin Dashboard</p>
        </div>
      </div>

      {/* EDIT SERVICE MODAL */}
      {editingService && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isUpdating) {
              handleClose();
            }
          }}
        >
          <div className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-[#E7E2D7] bg-[#F7F5EF] shadow-2xl">
            <div className="flex items-center justify-between bg-[#245747] px-6 py-5 text-white">
              <div>
                <h2 className="text-xl font-bold sm:text-2xl">Edit Service</h2>
                <p className="mt-1 text-sm text-white/75">
                  Update the selected service details.
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                disabled={isUpdating}
                aria-label="Close edit form"
                className="rounded-lg p-2 hover:bg-white/15 disabled:opacity-50"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 sm:p-8">
              <div className="mb-5">
                <label
                  htmlFor="service-name"
                  className="mb-2 block text-sm font-semibold text-[#343830]"
                >
                  Service Name
                </label>

                <input
                  id="service-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter service name"
                  required
                  className="w-full rounded-lg border border-[#E7E2D7] bg-white px-4 py-3 outline-none placeholder:text-gray-400 focus:border-[#245747] focus:ring-2 focus:ring-[#245747]/10"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="service-description"
                  className="mb-2 block text-sm font-semibold text-[#343830]"
                >
                  Service Description
                </label>

                <textarea
                  id="service-description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Enter service description"
                  rows={5}
                  required
                  className="w-full resize-y rounded-lg border border-[#E7E2D7] bg-white px-4 py-3 outline-none placeholder:text-gray-400 focus:border-[#245747] focus:ring-2 focus:ring-[#245747]/10"
                />
              </div>

              {actionError && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {actionError}
                </div>
              )}

              <div className="flex flex-col-reverse gap-3 border-t border-[#E7E2D7] pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isUpdating}
                  className="flex items-center justify-center gap-2 rounded-lg border border-[#E7E2D7] bg-white px-5 py-3 font-semibold text-[#343830] hover:bg-[#E7E2D7] disabled:opacity-50"
                >
                  <FaTimes />
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#245747] px-5 py-3 font-semibold text-white hover:bg-[#193F34] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FaSave />
                  {isUpdating ? "Updating..." : "Update Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteModal && (
        <DeleteModal onCancel={cancelDelete} onDelete={confirmDelete} />
      )}
    </div>
  );
}

export default AdminServices;
