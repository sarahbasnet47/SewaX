import { Link } from "react-router-dom";
import { FaArrowRight, FaSearch, FaCheckCircle, FaTools } from "react-icons/fa";

function Hero() {
  return (
    <section className="bg-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          {/* LEFT SIDE */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-6">
              <FaCheckCircle />
              Trusted Service Marketplace
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">
              Find the right
              <span className="block text-blue-600">service for you.</span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-xl">
              SEWAX connects you with trusted service providers near you.
              Discover reliable professionals and get your work done with
              confidence.
            </p>

            {/* Search */}
            <div className="mt-8 max-w-xl">
              <div className="flex items-center bg-white p-2 rounded-xl shadow-lg">
                <FaSearch className="ml-4 text-gray-400" />

                <input
                  type="text"
                  placeholder="What service are you looking for?"
                  className="flex-1 px-4 py-3 outline-none text-gray-700"
                />

                <button className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                  Search
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/services"
                className="flex items-center gap-3 px-6 py-3 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800 transition"
              >
                Explore Services
                <FaArrowRight />
              </Link>

              <Link
                to="/register"
                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:border-blue-600 hover:text-blue-600 transition"
              >
                Become a Provider
              </Link>
            </div>

            {/* Trust */}
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Verified Providers
              </div>

              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Easy Booking
              </div>

              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Local Services
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden lg:block">
            <div className="relative bg-blue-600 rounded-3xl p-12 shadow-xl">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="w-24 h-24 rounded-2xl bg-blue-500 flex items-center justify-center">
                  <FaTools className="text-white text-5xl" />
                </div>
              </div>

              <h2 className="text-4xl font-bold text-white text-center mt-8">
                Everything you need,
              </h2>

              <h3 className="text-4xl font-bold text-blue-100 text-center mt-2">
                in one place.
              </h3>

              <p className="text-blue-100 text-center mt-6 leading-7">
                From home repairs to professional services, find the right
                provider for your needs.
              </p>

              {/* Provider Card */}
              <div className="bg-white rounded-xl p-5 mt-10 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <FaCheckCircle className="text-green-500 text-xl" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Service Status</p>

                    <p className="font-bold text-gray-900">Provider Found</p>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="bg-white rounded-xl p-4 mt-4 shadow-lg">
                <p className="text-sm text-gray-500">Trusted by users</p>

                <div className="flex items-center gap-3 mt-1">
                  <span className="text-2xl font-bold text-gray-900">4.9</span>

                  <span className="text-yellow-400">★★★★★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
