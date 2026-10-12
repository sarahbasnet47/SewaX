
import { useState } from "react";

import {
  useGetOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} from "../../redux/features/orderslice";

import {
  FaShoppingCart,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaMapMarkerAlt,
  FaUser,
  FaUserTie,
  FaTools,
  FaMoneyBillWave,
} from "react-icons/fa";

const AdminOrders = () => {
  // Get all orders
  const { data, isLoading, isError, error, refetch } =
    useGetOrdersQuery();

  // Update order
  const [updateOrder, { isLoading: isUpdating }] =
    useUpdateOrderMutation();

  // Delete order
  const [deleteOrder, { isLoading: isDeleting }] =
    useDeleteOrderMutation();

  // Store the order currently being edited
  const [editingOrder, setEditingOrder] = useState(null);

  // Get orders from API response
  const orders = data?.orders || [];

  // =========================
  // UPDATE ORDER
  // =========================
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingOrder?.id) return;

    try {
      await updateOrder({
        id: editingOrder.id,
        data: {
          vendor_id: editingOrder.vendor_id,
          vendor_service_id: editingOrder.vendor_service_id,
          quantity: Number(editingOrder.quantity),
          price: Number(editingOrder.price),
          location: editingOrder.location,
          status: editingOrder.status,
        },
      }).unwrap();

      setEditingOrder(null);

      await refetch();
    } catch (error) {
      console.error("UPDATE ERROR:", error);

      window.alert(
        error?.data?.message || "Failed to update order."
      );
    }
  };

  // =========================
  // DELETE ORDER
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    try {
      await deleteOrder(id).unwrap();

      if (editingOrder?.id === id) {
        setEditingOrder(null);
      }

      await refetch();
    } catch (error) {
      console.error("DELETE ERROR:", error);

      window.alert(
        error?.data?.message || "Failed to delete order."
      );
    }
  };

  // =========================
  // LOADING
  // =========================
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F5EF]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#E5EDE7] border-t-[#245747]" />

          <p className="font-semibold text-[#245747]">
            Loading orders...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (isError) {
    return (
      <div className="min-h-screen bg-[#F7F5EF] p-6">
        <div className="rounded-2xl border border-[#E7E2D7] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#B45F43]">
            {error?.data?.message || "Failed to load orders."}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Please check your API endpoint and backend server.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 rounded-lg bg-[#245747] px-5 py-2.5 font-semibold text-white transition hover:bg-[#193F34]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5EF] p-4 text-[#343830] sm:p-6 lg:p-8">
      {/* =========================
          PAGE HEADER
      ========================= */}
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <div className="rounded-xl bg-[#245747] p-3 text-white">
              <FaShoppingCart size={22} />
            </div>

            <h1 className="text-2xl font-bold text-[#245747] sm:text-3xl">
              Admin Orders
            </h1>
          </div>

          <p className="text-sm text-gray-500">
            View and manage orders placed through SEWAX.
          </p>
        </div>

        {/* Total orders */}
        <div className="rounded-xl border border-[#E7E2D7] bg-white px-5 py-3 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Orders
          </p>

          <p className="text-2xl font-bold text-[#245747]">
            {orders.length}
          </p>
        </div>
      </div>

      {/* =========================
          SUMMARY CARDS
      ========================= */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total orders */}
        <div className="flex items-center gap-4 rounded-2xl border border-[#E7E2D7] bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-[#E5EDE7] p-4 text-[#245747]">
            <FaShoppingCart size={22} />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Total Orders
            </p>

            <p className="text-2xl font-bold text-[#245747]">
              {orders.length}
            </p>
          </div>
        </div>

        {/* Pending orders */}
        <div className="flex items-center gap-4 rounded-2xl border border-[#E7E2D7] bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-[#F4E8D5] p-4 text-[#91672D]">
            <FaTools size={22} />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Pending Orders
            </p>

            <p className="text-2xl font-bold text-[#91672D]">
              {
                orders.filter(
                  (order) => order.status === "pending"
                ).length
              }
            </p>
          </div>
        </div>

        {/* Completed orders */}
        <div className="flex items-center gap-4 rounded-2xl border border-[#E7E2D7] bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-[#E5EDE7] p-4 text-[#245747]">
            <FaMoneyBillWave size={22} />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Completed Orders
            </p>

            <p className="text-2xl font-bold text-[#245747]">
              {
                orders.filter(
                  (order) => order.status === "completed"
                ).length
              }
            </p>
          </div>
        </div>
      </div>

      {/* =========================
          ORDERS TABLE
      ========================= */}
      <div className="overflow-hidden rounded-2xl border border-[#E7E2D7] bg-white shadow-sm">
        {/* Table heading */}
        <div className="flex flex-col gap-3 border-b border-[#E7E2D7] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-[#245747]">
              All Orders
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Review order details, status, and pricing.
            </p>
          </div>

          <button
            type="button"
            onClick={() => refetch()}
            className="self-start rounded-lg bg-[#E5EDE7] px-4 py-2 text-sm font-semibold text-[#245747] transition hover:bg-[#D1E2D5] sm:self-auto"
          >
            Refresh List
          </button>
        </div>

        {/* Responsive table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-350 text-left">
            <thead className="bg-[#245747] text-white">
              <tr>
                <th className="px-5 py-4">Order ID</th>
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Vendor</th>
                <th className="px-5 py-4">Service</th>
                <th className="px-5 py-4">Quantity</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4">Total</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-[#E7E2D7] transition hover:bg-[#F7F5EF]"
                  >
                    {/* ORDER ID */}
                    <td className="px-5 py-4 font-semibold">
                      #{order.id}
                    </td>

                    {/* USER */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E5EDE7] text-[#245747]">
                          <FaUser />
                        </div>

                        <span className="font-medium">
                          {order.username || "Unknown user"}
                        </span>
                      </div>
                    </td>

                    {/* VENDOR */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <FaUserTie className="shrink-0 text-[#245747]" />

                        <span>
                          {order.vendor_name || "Unknown vendor"}
                        </span>
                      </div>
                    </td>

                    {/* SERVICE */}
                    <td className="px-5 py-4 font-medium">
                      {order.service_title || "Unknown service"}
                    </td>

                    {/* QUANTITY */}
                    <td className="px-5 py-4">
                      {order.quantity ?? "—"}
                    </td>

                    {/* PRICE */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      Rs. {order.price ?? "—"}
                    </td>

                    {/* TOTAL */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="rounded-lg bg-[#F4E8D5] px-3 py-2 font-semibold text-[#91672D]">
                        Rs. {order.total_price ?? "—"}
                      </span>
                    </td>

                    {/* LOCATION */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="shrink-0 text-[#245747]" />

                        <span>
                          {order.location || "Not provided"}
                        </span>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
                          order.status === "completed"
                            ? "bg-[#E5EDE7] text-[#245747]"
                            : order.status === "pending"
                              ? "bg-[#F4E8D5] text-[#91672D]"
                              : order.status === "cancelled"
                                ? "bg-[#F6E5DE] text-[#B45F43]"
                                : order.status === "accepted" ||
                                    order.status === "in_progress"
                                  ? "bg-[#E5EDE7] text-[#245747]"
                                  : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {(order.status || "unknown")
                          .replaceAll("_", " ")
                          .replace(/\b\w/g, (char) =>
                            char.toUpperCase()
                          )}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingOrder({ ...order })}
                          className="flex items-center gap-2 rounded-lg bg-[#E5EDE7] px-3 py-2 text-sm font-semibold text-[#245747] transition hover:bg-[#D1E2D5]"
                        >
                          <FaEdit />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(order.id)}
                          disabled={isDeleting}
                          className="flex items-center gap-2 rounded-lg bg-[#F6E5DE] px-3 py-2 text-sm font-semibold text-[#B45F43] transition hover:bg-[#EFD2C6] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <FaTrash />
                          {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="10"
                    className="px-5 py-12 text-center"
                  >
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#E5EDE7] text-[#245747]">
                      <FaShoppingCart size={24} />
                    </div>

                    <p className="font-semibold text-gray-700">
                      No orders found
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      No order records were returned by the API.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* TABLE FOOTER */}
        <div className="flex flex-col gap-2 bg-[#FCFBF8] px-5 py-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Showing {orders.length} order
            {orders.length === 1 ? "" : "s"}
          </p>

          <p className="text-xs">
            SEWAX Admin Dashboard
          </p>
        </div>
      </div>

      {/* =========================
          EDIT ORDER MODAL
      ========================= */}
      {editingOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isUpdating) {
              setEditingOrder(null);
            }
          }}
        >
          <div className="my-auto w-full max-w-2xl rounded-2xl border border-[#E7E2D7] bg-[#F7F5EF] shadow-2xl">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between rounded-t-2xl bg-[#245747] px-6 py-5 text-white">
              <div>
                <h2 className="text-xl font-bold sm:text-2xl">
                  Edit Order #{editingOrder.id}
                </h2>

                <p className="mt-1 text-sm text-white/75">
                  Update quantity, price, location, and status.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditingOrder(null)}
                disabled={isUpdating}
                className="rounded-lg p-2 transition hover:bg-white/15 disabled:opacity-50"
                aria-label="Close edit form"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* EDIT FORM */}
            <form onSubmit={handleUpdate} className="p-6 sm:p-8">
              <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* QUANTITY */}
                <div>
                  <label
                    htmlFor="order-quantity"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Quantity
                  </label>

                  <input
                    id="order-quantity"
                    type="number"
                    min="1"
                    value={editingOrder.quantity ?? ""}
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        quantity: e.target.value,
                      })
                    }
                    required
                    className="w-full rounded-lg border border-[#E7E2D7] bg-white px-4 py-3 outline-none transition focus:border-[#245747] focus:ring-2 focus:ring-[#245747]/10"
                  />
                </div>

                {/* PRICE */}
                <div>
                  <label
                    htmlFor="order-price"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Price
                  </label>

                  <input
                    id="order-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={editingOrder.price ?? ""}
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        price: e.target.value,
                      })
                    }
                    required
                    className="w-full rounded-lg border border-[#E7E2D7] bg-white px-4 py-3 outline-none transition focus:border-[#245747] focus:ring-2 focus:ring-[#245747]/10"
                  />
                </div>

                {/* LOCATION */}
                <div>
                  <label
                    htmlFor="order-location"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Location
                  </label>

                  <input
                    id="order-location"
                    type="text"
                    value={editingOrder.location || ""}
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        location: e.target.value,
                      })
                    }
                    required
                    className="w-full rounded-lg border border-[#E7E2D7] bg-white px-4 py-3 outline-none transition focus:border-[#245747] focus:ring-2 focus:ring-[#245747]/10"
                  />
                </div>

                {/* STATUS */}
                <div>
                  <label
                    htmlFor="order-status"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Order Status
                  </label>

                  <select
                    id="order-status"
                    value={editingOrder.status || "pending"}
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        status: e.target.value,
                      })
                    }
                    required
                    className="w-full rounded-lg border border-[#E7E2D7] bg-white px-4 py-3 outline-none transition focus:border-[#245747] focus:ring-2 focus:ring-[#245747]/10"
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* FORM BUTTONS */}
              <div className="flex flex-col-reverse gap-3 border-t border-[#E7E2D7] pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setEditingOrder(null)}
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
                  {isUpdating ? "Updating..." : "Update Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;