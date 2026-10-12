import { Link } from "react-router-dom";
import { FaSearch, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              SEW<span className="text-blue-600">AX</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              Home
            </Link>

            <Link
              to="/services"
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              Services
            </Link>

            <Link
              to="/vendor"
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              Vendors
            </Link>

            <Link
              to="/about"
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-gray-700 font-medium hover:text-blue-600 transition"
            >
              Contact
            </Link>
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search */}
            <button
              type="button"
              className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-blue-600"
            >
              <FaSearch />
            </button>

            {/* Login */}
            <Link
              to="/login"
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:border-blue-600 hover:text-blue-600 transition"
            >
              <FaUser />
              Login
            </Link>

            {/* Register */}
            <Link
              to="/register"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 text-xl"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 py-5">
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 font-medium hover:text-blue-600"
              >
                Home
              </Link>

              <Link
                to="/services"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 font-medium hover:text-blue-600"
              >
                Services
              </Link>

              <Link
                to="/vendors"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 font-medium hover:text-blue-600"
              >
                Vendors
              </Link>

              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 font-medium hover:text-blue-600"
              >
                About
              </Link>

              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 font-medium hover:text-blue-600"
              >
                Contact
              </Link>

              {/* Mobile Login */}
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-5 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium"
              >
                <FaUser />
                Login
              </Link>

              {/* Mobile Register */}
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="text-center px-5 py-3 bg-blue-600 text-white rounded-lg font-semibold"
              >
                Get Started
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
