import { useGetVendorServicesQuery } from "../../redux/features/VendorserviceSlice";

import {
  FaTools,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClipboardList,
} from "react-icons/fa";

function AdminVendorService() {
  const { data, isLoading, isError, error, refetch } =
    useGetVendorServicesQuery();

  console.log("Vendor service API response:", data);

  // Supports { vendorservices: [...] } or a direct array response.
  const services = Array.isArray(data) ? data : data?.vendorservices || [];

  // =========================
  // LOADING STATE
  // =========================
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F5EF]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#E5EDE7] border-t-[#245747]" />

          <p className="font-semibold text-[#245747]">
            Loading vendor services...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR STATE
  // =========================
  if (isError) {
    return (
      <div className="min-h-screen bg-[#F7F5EF] p-6">
        <div className="rounded-2xl border border-[#E7E2D7] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#B45F43]">
            {error?.data?.message || "Failed to fetch vendor services."}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Check your API endpoint and backend server.
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
              <FaTools size={22} />
            </div>

            <h1 className="text-2xl font-bold text-[#245747] sm:text-3xl">
              Vendor Services
            </h1>
          </div>

          <p className="text-sm text-gray-500">
            View and manage all services offered by SEWAX vendors.
          </p>
        </div>

        {/* Total vendor services */}
        <div className="rounded-xl border border-[#E7E2D7] bg-white px-5 py-3 shadow-sm">
          <p className="text-sm text-gray-500">Total Vendor Services</p>

          <p className="text-2xl font-bold text-[#245747]">{services.length}</p>
        </div>
      </div>

      {/* =========================
          SUMMARY CARDS
      ========================= */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl border border-[#E7E2D7] bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-[#E5EDE7] p-4 text-[#245747]">
            <FaClipboardList size={22} />
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Services</p>

            <p className="text-2xl font-bold text-[#245747]">
              {services.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-[#E7E2D7] bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-[#F4E8D5] p-4 text-[#91672D]">
            <FaMoneyBillWave size={22} />
          </div>

          <div>
            <p className="text-sm text-gray-500">Listed Prices</p>

            <p className="text-2xl font-bold text-[#91672D]">
              {
                services.filter(
                  (service) =>
                    service.price !== null &&
                    service.price !== undefined &&
                    service.price !== "",
                ).length
              }
            </p>
          </div>
        </div>
      </div>

      {/* =========================
          VENDOR SERVICES TABLE
      ========================= */}
      <div className="overflow-hidden rounded-2xl border border-[#E7E2D7] bg-white shadow-sm">
        {/* Table heading */}
        <div className="flex flex-col gap-3 border-b border-[#E7E2D7] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-[#245747]">
              All Vendor Services
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Vendor IDs, service details, locations, and prices.
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

        {/* Scrollable table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-275text-left">
            <thead className="bg-[#245747] text-white">
              <tr>
                <th className="px-5 py-4">ID</th>
                <th className="px-5 py-4">Vendor ID</th>
                <th className="px-5 py-4">Slug</th>
                <th className="px-5 py-4">Service Title</th>
                <th className="px-5 py-4">Description</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Price</th>
              </tr>
            </thead>

            <tbody>
              {services.length > 0 ? (
                services.map((service) => (
                  <tr
                    key={service.id}
                    className="border-b border-[#E7E2D7] transition hover:bg-[#F7F5EF]"
                  >
                    {/* ID */}
                    <td className="px-5 py-4 font-medium">{service.id}</td>

                    {/* VENDOR ID */}
                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-[#E5EDE7] px-3 py-1.5 font-semibold text-[#245747]">
                        {service.vendor_id ?? "—"}
                      </span>
                    </td>

                    {/* SLUG */}
                    <td className="max-w-45 px-5 py-4">
                      <span className="wrap-break-word text-sm text-gray-500">
                        {service.slug || "—"}
                      </span>
                    </td>

                    {/* TITLE */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E5EDE7] text-[#245747]">
                          <FaTools />
                        </div>

                        <span className="font-semibold text-[#343830]">
                          {service.title || "Untitled service"}
                        </span>
                      </div>
                    </td>

                    {/* DESCRIPTION */}
                    <td className="max-w-65px-5 py-4 text-sm text-gray-600">
                      <p className="line-clamp-3">
                        {service.description || "No description"}
                      </p>
                    </td>

                    {/* LOCATION */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaMapMarkerAlt className="shrink-0 text-[#245747]" />

                        <span>{service.location || "Not provided"}</span>
                      </div>
                    </td>

                    {/* PRICE */}
                    <td className="px-5 py-4">
                      {service.price !== null &&
                      service.price !== undefined &&
                      service.price !== "" ? (
                        <span className="whitespace-nowrap rounded-lg bg-[#F4E8D5] px-3 py-2 font-semibold text-[#91672D]">
                          Rs. {service.price}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">
                          Not listed
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-5 py-12 text-center">
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#E5EDE7] text-[#245747]">
                      <FaTools size={24} />
                    </div>

                    <p className="font-semibold text-gray-700">
                      No vendor services found
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      No vendor service records were returned by the API.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer */}
        <div className="flex flex-col gap-2 bg-[#FCFBF8] px-5 py-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Showing {services.length} vendor service
            {services.length === 1 ? "" : "s"}
          </p>

          <p className="text-xs">SEWAX Admin Dashboard</p>
        </div>
      </div>
    </div>
  );
}

export default AdminVendorService;
