import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useGetAllServicesQuery } from "../../redux/features/ServiceSlice";

function Services() {
  const { data, isLoading, isError } = useGetAllServicesQuery();

  console.log("API DATA:", data);

  // Your API response is:
  // {
  //   message: "...",
  //   allServices: [...]
  // }

  const services = data?.allServices || [];

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading services...</p>
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600">Failed to load services.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <p className="text-blue-100 font-semibold uppercase text-sm">
            SEWAX Services
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            Find the right service for you
          </h1>

          <p className="max-w-2xl mx-auto mt-5 text-blue-100 text-lg">
            Discover trusted service providers and get the help you need for
            your home, office, and everyday needs.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold">OUR SERVICES</p>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Explore Our Services
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Choose from a variety of professional services and find the right
            provider for your needs.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
                🔧
              </div>

              {/* Service Name */}
              <h3 className="text-xl font-bold text-gray-900 mt-5">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mt-3 leading-6">
                {service.description}
              </p>

              {/* Location */}
              {service.location && (
                <p className="text-sm text-gray-500 mt-3">
                  📍 {service.location}
                </p>
              )}

              {/* View Service */}
              <Link
                to={`/services/${service.slug}`}
                className="inline-flex items-center gap-2 mt-5 text-blue-600 font-semibold hover:text-blue-800"
              >
                View Service
                <FaArrowRight />
              </Link>
            </div>
          ))}
        </div>

        {/* No Services */}
        {services.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No services available.</p>
          </div>
        )}
      </section>

      {/* Provider CTA */}
      <section className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-white">
            Are you a service provider?
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Join SEWAX and connect with customers looking for professional
            services.
          </p>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 mt-7 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Become a Provider
            <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Services;
