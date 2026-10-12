import { useEffect, useState } from "react";

import {
  useGetCurrentUserQuery,
  useUpdateUserMutation,
} from "../../redux/features/UserSlice";

const Settings = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
  });

  // Get currently logged-in user
  const {
    data,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetCurrentUserQuery();

  const user = data?.user;

  // Update user
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  // Put current user information into the form
  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      alert("User information not found");
      return;
    }

    try {
      await updateUser({
        id: user.id,
        data: form,
      }).unwrap();

      alert("Profile updated successfully");
    } catch (error) {
      console.log("UPDATE PROFILE ERROR:", error);
      console.log("ERROR DATA:", error?.data);

      alert("Failed to update profile");
    }
  };

  // Loading current user
  if (isUserLoading) {
    return (
      <div className="p-6">
        <p>Loading profile...</p>
      </div>
    );
  }

  // Error loading current user
  if (isUserError) {
    return (
      <div className="p-6">
        <p className="text-red-500">Failed to load profile.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="bg-white p-6 rounded-lg shadow max-w-2xl">
        <h2 className="text-xl font-semibold mb-6">Admin Profile</h2>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Username</label>

            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-2 font-medium">Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Phone</label>

            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {/* Update button */}
          <button
            type="submit"
            disabled={isUpdating}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isUpdating ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
