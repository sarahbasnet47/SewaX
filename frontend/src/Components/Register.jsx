import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRegisterMutation } from "../../redux/features/UserSlice";
import { IoIosEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";
import {
  FaTools,
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaArrowRight,
  FaUsers,
} from "react-icons/fa";

const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const [showpassword, setshowpassword] = useState(false);

  const [data, setdata] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    role: "user",
  });

  const handleChange = (e) => {
    setdata({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await register(data).unwrap();
      toast.success(res.message || "Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-slate-950 via-blue-950 to-indigo-900 px-4 py-3">
      {/* Background decoration */}
      <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />

      {/* Register card */}
      <div className="relative w-full max-w-md rounded-3xl border border-white/20 bg-white p-5 shadow-2xl sm:p-6">
        {/* Logo */}
        <div className="mb-3 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-md">
            <FaTools size={20} />
          </div>

          <h1 className="text-2xl font-extrabold tracking-wide text-slate-900">
            SEWAX
          </h1>
        </div>

        {/* Heading */}
        <div className="mb-4 text-center">
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
            Join our community
          </p>

          <h2 className="text-2xl font-extrabold text-slate-900">
            Create Account
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Discover trusted services with SEWAX.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-xs font-semibold text-slate-700"
            >
              Username
            </label>

            <div className="relative">
              <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={data.username}
                onChange={handleChange}
                autoComplete="username"
                required
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-xs font-semibold text-slate-700"
            >
              Email Address
            </label>

            <div className="relative">
              <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={data.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-xs font-semibold text-slate-700"
            >
              Password
            </label>

            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                id="password"
                type={showpassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={data.password}
                onChange={handleChange}
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-10 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />

              <button
                type="button"
                aria-label={showpassword ? "Hide password" : "Show password"}
                onClick={() => setshowpassword((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-blue-600"
              >
                {showpassword ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <IoIosEye size={21} />
                )}
              </button>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="mb-1 block text-xs font-semibold text-slate-700"
            >
              Phone Number
            </label>

            <div className="relative">
              <FaPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={data.phone}
                onChange={handleChange}
                autoComplete="tel"
                required
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label
              htmlFor="role"
              className="mb-1 block text-xs font-semibold text-slate-700"
            >
              Register As
            </label>

            <div className="relative">
              <FaUsers className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />

              <select
                id="role"
                name="role"
                value={data.role}
                onChange={handleChange}
                className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-9 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                <option value="user">User</option>
                <option value="vendor">Vendor</option>
              </select>

              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                ▼
              </span>
            </div>
          </div>

          {/* Register button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Registering..." : "Create Account"}

            {!isLoading && (
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            )}
          </button>
        </form>

        {/* Login link */}
        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />

          <span className="text-[10px] font-medium text-slate-400">
            ALREADY A MEMBER?
          </span>

          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <p className="text-center text-sm text-slate-600">
          Already have an account?
          <Link
            to="/login"
            className="ml-1 font-bold text-blue-600 transition hover:text-indigo-700"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
