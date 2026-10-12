import {
  FaUsers,
  FaUserTie,
  FaTools,
  FaShoppingCart,
  FaChartLine,
  FaPlus,
  FaBell,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import { useGetUsersQuery } from "../../redux/features/UserSlice";
import { useGetVendorsQuery } from "../../redux/features/VendorSlice";
import { useGetAllServicesQuery } from "../../redux/features/ServiceSlice";
import { useGetOrdersQuery } from "../../redux/features/orderslice";

const Dashboard = () => {
  // Fetch real data from your backend
  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
  } = useGetUsersQuery();

  const {
    data: vendorsData,
    isLoading: vendorsLoading,
    isError: vendorsError,
  } = useGetVendorsQuery();

  const {
    data: servicesData,
    isLoading: servicesLoading,
    isError: servicesError,
  } = useGetAllServicesQuery();

  const {
    data: ordersData,
    isLoading: ordersLoading,
    isError: ordersError,
  } = useGetOrdersQuery();

  // Handle API responses returned as arrays or objects
  const users = Array.isArray(usersData) ? usersData : usersData?.users || [];

  const vendors = Array.isArray(vendorsData)
    ? vendorsData
    : vendorsData?.vendors || [];

  const services = Array.isArray(servicesData)
    ? servicesData
    : servicesData?.allServices || servicesData?.services || [];

  const orders = Array.isArray(ordersData)
    ? ordersData
    : ordersData?.orders || ordersData?.allOrders || [];

  const loading =
    usersLoading || vendorsLoading || servicesLoading || ordersLoading;

  const hasError = usersError || vendorsError || servicesError || ordersError;

  // Count orders by their real status
  const orderStatuses = [
    { label: "Pending", status: "pending" },
    { label: "Accepted", status: "accepted" },
    { label: "In Progress", status: "in_progress" },
    { label: "Completed", status: "completed" },
    { label: "Cancelled", status: "cancelled" },
  ];

  const statusCounts = orderStatuses.map((item) => ({
    ...item,
    count: orders.filter((order) => order.status === item.status).length,
  }));

  const maxStatusCount = Math.max(1, ...statusCounts.map((item) => item.count));

  // Dashboard statistic cards
  const stats = [
    {
      title: "Total Users",
      count: users.length,
      icon: <FaUsers />,
      color: "bg-[#E5EDE7] text-[#245747]",
      link: "/admin/users",
    },
    {
      title: "Total Vendors",
      count: vendors.length,
      icon: <FaUserTie />,
      color: "bg-[#F4E8D5] text-[#91672D]",
      link: "/admin/vendors",
    },
    {
      title: "Total Services",
      count: services.length,
      icon: <FaTools />,
      color: "bg-[#F6E5DE] text-[#B45F43]",
      link: "/admin/services",
    },
    {
      title: "Total Orders",
      count: orders.length,
      icon: <FaShoppingCart />,
      color: "bg-[#E8E7F0] text-[#615A83]",
      link: "/admin/orders",
    },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F5EF]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#E7E2D7] border-t-[#245747]" />
          <p className="mt-4 font-medium text-[#565950]">
            Loading your SEWAX dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <div className="min-h-screen bg-[#F7F5EF] p-8">
        <div className="rounded-2xl border border-[#E7E2D7] bg-white p-6">
          <h2 className="text-xl font-bold text-[#B45F43]">
            Unable to load dashboard data
          </h2>
          <p className="mt-2 text-[#565950]">
            Check your backend, API routes, login session, and browser console.
            Make sure each API returns the expected data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#343830]">
      {/* ================= HEADER ================= */}
      <header className="border-b border-[#E7E2D7] bg-white">
        <div className="flex items-center justify-between px-5 py-4 md:px-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#245747]">
              SEW<span className="text-[#D97757]">AX</span>
            </h1>
            <p className="text-sm text-[#777A70]">Admin Dashboard</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Notifications"
              className="rounded-full p-3 text-[#565950] transition hover:bg-[#F7F5EF] hover:text-[#245747]"
            >
              <FaBell className="text-lg" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#245747] font-bold text-white">
                A
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-[#343830]">Admin</p>
                <p className="text-xs text-[#777A70]">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] p-4 md:p-8">
        {/* ================= WELCOME ================= */}
        <section className="relative mb-8 overflow-hidden rounded-2xl bg-[#245747] p-6 shadow-sm md:p-8">
          <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full border-35 border-white/5" />
          <div className="pointer-events-none absolute -bottom-20 right-40 h-48 w-48 rounded-full bg-white/5" />

          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#D7E5D9]">
                SEWAX MANAGEMENT
              </p>
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Welcome to your dashboard
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#E2EBE5] md:text-base">
                Manage your service marketplace, monitor orders, and keep track
                of your users and vendors in one place.
              </p>
            </div>

            <Link
              to="/admin/services"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#F4E8D5] px-5 py-3 font-semibold text-[#245747] transition hover:bg-white"
            >
              <FaPlus />
              Manage Services
            </Link>
          </div>
        </section>

        {/* ================= STATISTICS ================= */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-[#343830]">At a glance</h2>
            <p className="mt-1 text-sm text-[#777A70]">
              Overview based on your database records
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <Link
                to={stat.link}
                key={stat.title}
                className="group rounded-2xl border border-[#E7E2D7] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-[#777A70]">
                      {stat.title}
                    </p>
                    <h3 className="mt-3 text-3xl font-bold tracking-tight text-[#343830]">
                      {stat.count.toLocaleString()}
                    </h3>
                    <p className="mt-3 text-xs text-[#777A70]">Total records</p>
                  </div>

                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl ${stat.color}`}
                  >
                    {stat.icon}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ================= ORDER OVERVIEW ================= */}
        <section className="mt-8 rounded-2xl border border-[#E7E2D7] bg-white p-6 shadow-sm md:p-8">
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E5EDE7] text-xl text-[#245747]">
              <FaChartLine />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#343830]">
                Order Overview
              </h2>
              <p className="mt-1 text-sm text-[#777A70]">
                Orders grouped by their current status
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {statusCounts.map((item) => (
              <div key={item.status}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-[#565950]">{item.label}</span>
                  <span className="text-sm font-semibold text-[#343830]">
                    {item.count}
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-[#F0EDE5]">
                  <div
                    className="h-full rounded-full bg-[#477A61] transition-all duration-500"
                    style={{
                      width: `${(item.count / maxStatusCount) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 text-xs text-[#777A70]">
            Counts are calculated from the orders returned by your API.
          </p>
        </section>

        {/* ================= RECENT RECORDS ================= */}
        <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Recent Users */}
          <div className="overflow-hidden rounded-2xl border border-[#E7E2D7] bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E7E2D7] p-6">
              <div>
                <h2 className="text-lg font-bold text-[#343830]">
                  Recent Users
                </h2>
                <p className="mt-1 text-sm text-[#777A70]">
                  Users returned by your database API
                </p>
              </div>

              <Link
                to="/admin/users"
                className="text-sm font-semibold text-[#245747] transition hover:text-[#D97757]"
              >
                View All
              </Link>
            </div>

            {users.length === 0 ? (
              <p className="p-6 text-sm text-[#777A70]">
                No users found in your database.
              </p>
            ) : (
              users
                .slice(-5)
                .reverse()
                .map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between gap-3 border-b border-[#F0EDE5] p-5 last:border-b-0"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E5EDE7] font-semibold text-[#245747]">
                        {(user.username || "U").charAt(0).toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-[#343830]">
                          {user.username || "Unnamed User"}
                        </p>
                        <p className="truncate text-sm text-[#777A70]">
                          {user.email || "No email"}
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-full bg-[#E5EDE7] px-3 py-1 text-xs font-medium text-[#245747]">
                      {user.role || "User"}
                    </span>
                  </div>
                ))
            )}
          </div>

          {/* Recent Services */}
          <div className="overflow-hidden rounded-2xl border border-[#E7E2D7] bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E7E2D7] p-6">
              <div>
                <h2 className="text-lg font-bold text-[#343830]">
                  Recent Services
                </h2>
                <p className="mt-1 text-sm text-[#777A70]">
                  Services returned by your database API
                </p>
              </div>

              <Link
                to="/admin/services"
                className="text-sm font-semibold text-[#245747] transition hover:text-[#D97757]"
              >
                View All
              </Link>
            </div>

            {services.length === 0 ? (
              <p className="p-6 text-sm text-[#777A70]">
                No services found in your database.
              </p>
            ) : (
              services
                .slice(-5)
                .reverse()
                .map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center gap-4 border-b border-[#F0EDE5] p-5 last:border-b-0"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F6E5DE] text-lg text-[#B45F43]">
                      <FaTools />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-[#343830]">
                        {service.name || service.title || "Unnamed Service"}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm text-[#777A70]">
                        {service.description || "No description"}
                      </p>
                    </div>
                  </div>
                ))
            )}
          </div>
        </section>

        {/* ================= QUICK ACTIONS ================= */}
        <section className="mt-8 rounded-2xl border border-[#E7E2D7] bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-lg font-bold text-[#343830]">Quick Actions</h2>
          <p className="mt-1 text-sm text-[#777A70]">
            Navigate to the areas you manage most often.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Link
              to="/admin/users"
              className="flex items-center gap-3 rounded-xl bg-[#E5EDE7] p-4 font-medium text-[#245747] transition hover:bg-[#D8E5DB]"
            >
              <FaUsers />
              Manage Users
            </Link>

            <Link
              to="/admin/vendors"
              className="flex items-center gap-3 rounded-xl bg-[#F4E8D5] p-4 font-medium text-[#91672D] transition hover:bg-[#EDDFC7]"
            >
              <FaUserTie />
              Manage Vendors
            </Link>

            <Link
              to="/admin/services"
              className="flex items-center gap-3 rounded-xl bg-[#F6E5DE] p-4 font-medium text-[#B45F43] transition hover:bg-[#F0D7CC]"
            >
              <FaTools />
              Manage Services
            </Link>

            <Link
              to="/admin/orders"
              className="flex items-center gap-3 rounded-xl bg-[#E8E7F0] p-4 font-medium text-[#615A83] transition hover:bg-[#DCD9E9]"
            >
              <FaShoppingCart />
              Manage Orders
            </Link>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="mt-8 flex flex-col justify-between gap-3 border-t border-[#E7E2D7] py-6 text-sm text-[#777A70] sm:flex-row sm:items-center">
          <p>© 2026 SEWAX. All rights reserved.</p>

          <Link
            to="/admin/settings"
            className="inline-flex items-center gap-2 transition hover:text-[#245747]"
          >
            <FaCog />
            Settings
          </Link>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
