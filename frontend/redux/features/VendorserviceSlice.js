import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vendorserviceSlice = createApi({
  reducerPath: "vendorserviceApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),

  endpoints: (builder) => ({
    // CREATE VENDOR SERVICE
    createVendorService: builder.mutation({
      query: (data) => ({
        url: "/vendor/service",
        method: "POST",
        body: data,
      }),
    }),

    // DELETE VENDOR SERVICE
    deleteVendorService: builder.mutation({
      query: (id) => ({
        url: `/vendor/service/delete/${id}`,
        method: "DELETE",
      }),
    }),

    // UPDATE VENDOR SERVICE
    updateVendorService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/vendor/service/update/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    // GET ALL VENDOR SERVICES
    getVendorServices: builder.query({
      query: () => ({
        url: "/vendor/service/getall",
        method: "GET",
      }),
    }),

    // GET VENDOR SERVICE BY ID
    getVendorServiceById: builder.query({
      query: (id) => ({
        url: `/vendor/service/getservice/id/${id}`,
        method: "GET",
      }),
    }),

    // GET VENDOR SERVICE BY SLUG
    getVendorServiceBySlug: builder.query({
      query: (slug) => ({
        url: `/vendor/service/getservice/slug/${slug}`,
        method: "GET",
      }),
    }),

    // GET MY VENDOR SERVICES
    getMyVendorServices: builder.query({
      query: () => ({
        url: "/vendor/service/getmyvendor",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateVendorServiceMutation,
  useDeleteVendorServiceMutation,
  useUpdateVendorServiceMutation,
  useGetVendorServicesQuery,
  useGetVendorServiceByIdQuery,
  useGetVendorServiceBySlugQuery,
  useGetMyVendorServicesQuery,
} = vendorserviceSlice;
