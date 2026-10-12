import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vendorSlice = createApi({
  reducerPath: "vendorApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),

  endpoints: (builder) => ({
    // CREATE VENDOR
    createVendor: builder.mutation({
      query: (data) => ({
        url: "/vendor",
        method: "POST",
        body: data,
      }),
    }),

    // GET ALL VENDORS
    getVendors: builder.query({
      query: () => ({
        url: "/vendor/get",
        method: "GET",
      }),
    }),

    // UPDATE VENDOR
    updateVendor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/vendor/update/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    // DELETE VENDOR
    deleteVendor: builder.mutation({
      query: (id) => ({
        url: `/vendor/delete/${id}`,
        method: "DELETE",
      }),
    }),
    //getvendorbyid
    getVendorById: builder.query({ 
      query: (id) => ({
        url:`/vendor/get/${id}`, 
  }), 
})
  }),
});

export const {
  useCreateVendorMutation,
  useGetVendorsQuery,
  useUpdateVendorMutation,
  useDeleteVendorMutation,
  useGetVendorByIdQuery,
} = vendorSlice;
