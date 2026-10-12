import { indexSlice } from "./indexSlice";

export const userApis = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Register user
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    // Get currently logged-in user
    getCurrentUser: builder.query({
      query: () => ({
        url: "/auth/getuser",
        method: "GET",
      }),
    }),

    // Login user
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    // Update user
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/auth/update/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    // Delete user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/auth/delete/${id}`,
        method: "DELETE",
      }),
    }),

    // Logout user
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    // Get all users
    getUsers: builder.query({
      query: () => ({
        url: "/auth/getAlluser",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetCurrentUserQuery,
} = userApis;
