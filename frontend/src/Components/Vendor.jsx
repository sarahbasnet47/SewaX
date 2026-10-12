
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaPhone,
  FaArrowRight,
  FaStore,
} from "react-icons/fa";

import { useGetVendorsQuery } from "../../redux/features/VendorSlice";

function Vendor() {
  const { data, isLoading, isError, error } = useGetVendorsQuery();

  const [search, setSearch] = useState("");

  // Get vendors from backend response
  const vendors = data || [];

  // Search vendors
  const filteredVendors = vendors.filter((vendor) => {
    const searchText = search.toLowerCase();

    return (
      vendor.name?.toLowerCase().includes(searchText) ||
      vendor.address?.toLowerCase().includes(searchText) ||
      vendor.number?.toString().includes(searchText)
    );
  });

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-600 text-lg">
            Loading vendors...
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Failed to load vendors
          </h2>

          <p className="text-gray-600">
            {error?.data?.message || "Something went wrong."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-700 to-blue-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-4 rounded-full">
              <FaStore className="text-4xl" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find a Vendor
          </h1>

          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Find trusted vendors and explore the services they provide.
          </p>

        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-12">

        {/* Search Box */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search vendor by name, address or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-5 py-4 bg-white border border-gray-200 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>
        </div>

        {/* Vendor Count */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Available Vendors
          </h2>

          <p className="text-gray-500 mt-1">
            {filteredVendors.length} vendor
            {filteredVendors.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* No Vendors */}
        {filteredVendors.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <FaStore className="text-5xl text-gray-300 mx-auto mb-4" />

            <h3 className="text-xl font-semibold text-gray-700">
              No vendors found
            </h3>

            <p className="text-gray-500 mt-2">
              Try searching with a different name or location.
            </p>
          </div>
        ) : (
          /* Vendor Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredVendors.map((vendor) => (
              <div
                key={vendor.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition duration-300"
              >

                {/* Vendor Icon */}
                <div className="flex items-center gap-4 mb-5">

                  <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    <FaStore className="text-2xl" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {vendor.name}
                    </h3>

                    <p className="text-sm text-gray-400">
                      Vendor ID: {vendor.id}
                    </p>
                  </div>

                </div>

                {/* Vendor Information */}
                <div className="space-y-3 mb-6">

                  <div className="flex items-center gap-3 text-gray-600">
                    <FaMapMarkerAlt className="text-blue-500" />

                    <span>
                      {vendor.address || "Address not available"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <FaPhone className="text-blue-500" />

                    <span>
                      {vendor.number || "Phone not available"}
                    </span>
                  </div>

                </div>

                {/* View Vendor Button */}
                <Link
                  to={`/vendor/${vendor.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                  View Vendor

                  <FaArrowRight className="text-sm" />
                </Link>

              </div>
            ))}

          </div>
        )}

      </section>
    </div>
  );
}

export default Vendor;

