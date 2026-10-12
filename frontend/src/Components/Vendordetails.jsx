import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaUserTie,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";

import { useGetVendorByIdQuery } from "../../redux/features/VendorSlice";

const VendorDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useGetVendorByIdQuery(id);

  console.log("VENDOR ID:", id);
  console.log("VENDOR DATA:", data);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading vendor...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl text-red-600">Failed to load vendor</p>

        <p className="text-gray-500 mt-2">
          {error?.data?.message || error?.error}
        </p>

        <Link to="/vendor" className="mt-5 text-blue-600">
          ← Back to Vendors
        </Link>
      </div>
    );
  }

  const vendor = data?.vendorservice;

  if (!vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Vendor not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <Link to="/vendor" className="inline-flex items-center gap-2 mb-6">
            <FaArrowLeft />
            Back to Vendors
          </Link>

          <h1 className="text-4xl font-bold">{vendor.name}</h1>

          <p className="mt-2 text-blue-100">Service Provider</p>
        </div>
      </section>

      {/* Vendor Details */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl">
            <FaUserTie />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-6">
            {vendor.name}
          </h2>

          <div className="mt-6 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <FaMapMarkerAlt />
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase">Location</p>

                <p className="font-medium text-gray-800">{vendor.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <FaPhone />
              </div>

              <div>
                <p className="text-xs text-gray-400 uppercase">Phone</p>

                <p className="font-medium text-gray-800">{vendor.number}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VendorDetails;
