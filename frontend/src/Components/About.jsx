
import {
  FaSearch,
  FaUsers,
  FaTools,
  FaHandshake,
  FaCheckCircle,
} from "react-icons/fa";

function About() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            About SEWAX
          </h1>

          <p className="max-w-3xl mx-auto text-lg text-blue-100 leading-relaxed">
            SEWAX is a service marketplace platform that connects customers
            with vendors and service providers in a simple and convenient way.
          </p>

        </div>
      </section>


      {/* About Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-5">
              What is SEWAX?
            </h2>

            <p className="text-gray-600 leading-7 mb-4">
              SEWAX is an online platform designed to make it easier for
              customers to find and connect with service providers. Users
              can explore different services, view vendors, and find the
              information they need before contacting a service provider.
            </p>

            <p className="text-gray-600 leading-7">
              The platform provides a convenient digital environment where
              service providers can present their services and customers
              can discover suitable services according to their needs.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8">

            <h3 className="text-2xl font-bold text-gray-800 mb-5">
              Our Purpose
            </h3>

            <ul className="space-y-4">

              <li className="flex gap-3">
                <FaCheckCircle className="text-blue-600 mt-1" />
                <span className="text-gray-600">
                  Make service discovery easier for customers.
                </span>
              </li>

              <li className="flex gap-3">
                <FaCheckCircle className="text-blue-600 mt-1" />
                <span className="text-gray-600">
                  Help vendors present their services online.
                </span>
              </li>

              <li className="flex gap-3">
                <FaCheckCircle className="text-blue-600 mt-1" />
                <span className="text-gray-600">
                  Provide useful vendor and service information.
                </span>
              </li>

              <li className="flex gap-3">
                <FaCheckCircle className="text-blue-600 mt-1" />
                <span className="text-gray-600">
                  Create a simple and user-friendly service marketplace.
                </span>
              </li>

            </ul>

          </div>

        </div>

      </section>


      {/* What We Do */}
      <section className="bg-white py-16">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">

            <h2 className="text-3xl font-bold text-gray-800">
              What We Do
            </h2>

            <p className="text-gray-500 mt-3">
              SEWAX provides a simple platform for discovering and managing
              service-related information.
            </p>

          </div>


          <div className="grid md:grid-cols-3 gap-8">

            <div className="p-8 bg-gray-50 rounded-2xl text-center">

              <FaSearch className="text-4xl text-blue-600 mx-auto mb-5" />

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Find Services
              </h3>

              <p className="text-gray-600 leading-6">
                Customers can browse available services and search for
                services that match their requirements.
              </p>

            </div>


            <div className="p-8 bg-gray-50 rounded-2xl text-center">

              <FaUsers className="text-4xl text-blue-600 mx-auto mb-5" />

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Discover Vendors
              </h3>

              <p className="text-gray-600 leading-6">
                Customers can view vendor information such as name,
                location, and contact details.
              </p>

            </div>


            <div className="p-8 bg-gray-50 rounded-2xl text-center">

              <FaTools className="text-4xl text-blue-600 mx-auto mb-5" />

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Manage Services
              </h3>

              <p className="text-gray-600 leading-6">
                Service providers can manage their services and make their
                offerings easier for customers to discover.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* Mission */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="bg-blue-50 rounded-3xl p-10 md:p-14 text-center">

          <FaHandshake className="text-5xl text-blue-600 mx-auto mb-5" />

          <h2 className="text-3xl font-bold text-gray-800 mb-5">
            Our Mission
          </h2>

          <p className="max-w-3xl mx-auto text-gray-600 leading-7 text-lg">
            Our mission is to make the process of finding and connecting
            with service providers simpler, faster, and more convenient
            through technology.
          </p>

        </div>

      </section>


      {/* How It Works */}
      <section className="bg-white py-16">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">

            <h2 className="text-3xl font-bold text-gray-800">
              How SEWAX Works
            </h2>

          </div>


          <div className="grid md:grid-cols-3 gap-8">

            <div className="text-center">

              <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Explore
              </h3>

              <p className="text-gray-600">
                Browse the services available on the platform.
              </p>

            </div>


            <div className="text-center">

              <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Find a Vendor
              </h3>

              <p className="text-gray-600">
                View vendor information and select a suitable service provider.
              </p>

            </div>


            <div className="text-center">

              <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Connect
              </h3>

              <p className="text-gray-600">
                Use the available information to contact or connect with
                the service provider.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* Bottom CTA */}
      <section className="bg-blue-600 text-white py-16">

        <div className="max-w-4xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Find the Service You Need
          </h2>

          <p className="text-blue-100 text-lg">
            Explore SEWAX and discover services and vendors that match
            your requirements.
          </p>

        </div>

      </section>

    </div>
  );
}

export default About;

