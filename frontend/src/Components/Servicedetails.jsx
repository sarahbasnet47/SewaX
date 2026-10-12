
import { Link, useParams } from "react-router-dom";
import { useGetServicebySlugQuery } from "../../redux/features/ServiceSlice";


function ServiceDetails() {
  const { slug } = useParams();

  console.log("SLUG:", slug);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetServicebySlugQuery(slug);

  console.log("SERVICE DATA:", data);
  console.log("SERVICE ERROR:", error);

  if (isLoading) {
    return <div className="p-10 text-center">Loading service...</div>;
  }

  if (isError) {
    return (
      <div className="p-10 text-center text-red-600">
        Failed to load service
        <p className="text-sm mt-2">
          {error?.data?.message || error?.error || "Unknown error"}
        </p>
      </div>
    );
  }

  // IMPORTANT: adjust this depending on your backend response
  const service = data?.service;

  if (!service) {
    return (
      <div className="p-10 text-center">
        Service not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow">

        <Link
          to="/services"
          className="text-blue-600"
        >
          ← Back to Services
        </Link>

        <h1 className="text-3xl font-bold mt-6">
          {service.title}
        </h1>

        <p className="text-gray-600 mt-4">
          {service.description}
        </p>

        {service.location && (
          <p className="mt-4 text-gray-500">
            📍 {service.location}
          </p>
        )}

      </div>
    </div>
  );
}

export default ServiceDetails;

