import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../redux/features/UserSlice";
import { IoIosEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa6";
import { FaTools, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(form).unwrap();

      toast.success(res.message || "Login successful!");

      if (res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));

        if (res.user.role === "admin") {
          navigate("/dashboard");
        } else if (res.user.role === "vendor") {
          navigate("/vendor/dashboard");
        } else {
          navigate("/post");
        }
      } else {
        toast.error("User information was not returned by the server.");
      }
    } catch (error) {
      toast.error(
        error?.data?.message || "Login failed. Please check your credentials.",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 via-blue-950 to-indigo-900 px-4 py-10">
      {/* Background decoration */}
      <div className="absolute top-10 left-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-indigo-400/20 blur-3xl"></div>

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
        {/* Left side - Branding */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-blue-600 via-indigo-700 to-violet-800 p-12 text-white md:flex">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border-35 border-white/10"></div>
          <div className="absolute -bottom-20 -left-16 h-72 w-72 rounded-full border-45 border-white/10"></div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-lg">
              <FaTools size={24} />
            </div>
            <span className="text-3xl font-extrabold tracking-wide">SEWAX</span>
          </div>

          <div className="relative z-10 my-12">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-blue-200">
              Welcome back
            </p>

            <h1 className="text-4xl font-extrabold leading-tight lg:text-5xl">
              Services you need.
              <br />
              Trust you deserve.
            </h1>

            <p className="mt-6 max-w-sm text-base leading-7 text-blue-100">
              Connect with trusted service providers and discover services that
              make your everyday life easier.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-600 bg-amber-300 font-bold text-indigo-950">
                  S
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-600 bg-emerald-300 font-bold text-indigo-950">
                  V
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-600 bg-pink-300 font-bold text-indigo-950">
                  P
                </div>
              </div>
              <p className="text-sm text-blue-100">
                Customers and vendors, together
              </p>
            </div>
          </div>

          <p className="relative z-10 text-sm text-blue-200">
            © 2026 SEWAX. All rights reserved.
          </p>
        </div>

        {/* Right side - Login form */}
        <div className="flex items-center justify-center px-6 py-10 sm:px-10 md:px-12">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="mb-8 flex items-center justify-center gap-2 md:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <FaTools size={22} />
              </div>
              <span className="text-2xl font-extrabold text-slate-900">
                SEWAX
              </span>
            </div>

            <div className="mb-8">
              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-600">
                Your account
              </p>

              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Sign in
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Welcome back! Enter your details to access your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>
                </div>

                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-blue-600"
                  >
                    {showPassword ? (
                      <IoIosEye size={23} />
                    ) : (
                      <FaEyeSlash size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Login button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {isLoading ? "Signing in..." : "Sign in to your account"}

                {!isLoading && (
                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200"></div>
              <span className="text-xs font-medium text-slate-400">
                NEW TO SEWAX?
              </span>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>

            <p className="text-center text-sm text-slate-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-blue-600 transition hover:text-indigo-700"
              >
                Create account
              </Link>
            </p>

            <p className="mt-8 text-center text-xs leading-5 text-slate-400">
              By signing in, you agree to use SEWAX responsibly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
