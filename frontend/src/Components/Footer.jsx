
function Footer() {
  return (
    <footer className="bg-gray-900 text-white">

      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Column 1 - Logo and Description */}
          <div>
            <h2 className="text-3xl font-bold">
              SEWAX
            </h2>

            <p className="text-gray-400 mt-4 leading-6">
              SEWAX is a service marketplace that connects
              customers with trusted and reliable service
              providers.
            </p>
          </div>


          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-white"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/services"
                  className="text-gray-400 hover:text-white"
                >
                  Services
                </a>
              </li>

              <li>
                <a
                  href="/vendors"
                  className="text-gray-400 hover:text-white"
                >
                  Vendors
                </a>
              </li>

              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-white"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-white"
                >
                  Contact
                </a>
              </li>

            </ul>
          </div>


          {/* Column 3 - Services */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Services
            </h3>

            <ul className="space-y-3">

              <li className="text-gray-400">
                Plumbing
              </li>

              <li className="text-gray-400">
                Electrical
              </li>

              <li className="text-gray-400">
                Cleaning
              </li>

              <li className="text-gray-400">
                Home Repair
              </li>

              <li className="text-gray-400">
                Beauty Services
              </li>

            </ul>
          </div>


          {/* Column 4 - Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Contact Us
            </h3>

            <div className="space-y-3">

              <p className="text-gray-400">
                Nepal
              </p>

              <p className="text-gray-400">
                +977 98XXXXXXXX
              </p>

              <p className="text-gray-400">
                support@sewax.com
              </p>

            </div>
          </div>

        </div>

      </div>


      {/* Bottom Footer */}
      <div className="border-t border-gray-700">

        <div className="max-w-6xl mx-auto px-6 py-5">

          <div className="flex flex-col md:flex-row justify-between items-center">

            <p className="text-gray-500 text-sm">
              © 2026 SEWAX. All rights reserved.
            </p>

            <div className="flex gap-6 mt-3 md:mt-0">

              <a
                href="/privacy"
                className="text-gray-500 hover:text-white text-sm"
              >
                Privacy Policy
              </a>

              <a
                href="/terms"
                className="text-gray-500 hover:text-white text-sm"
              >
                Terms & Conditions
              </a>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
