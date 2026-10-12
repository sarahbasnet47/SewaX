import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const servicesSlice = createApi({
  reducerPath: "servicesApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),

  endpoints: (builder) => ({
    // CREATE SERVICE
    createService: builder.mutation({
      query: (data) => ({
        url: "/service/create",
        method: "POST",
        body: data,
      }),
    }),

    // GET ALL SERVICES
    getAllServices: builder.query({
      query: () => ({
        url: "/service/getallservices",
        method: "GET",
      }),
    }),

    // GET SERVICE BY ID
    getServiceById: builder.query({
      query: (id) => ({
        url: `/service/getbyid/${id}`,
        method: "GET",
      }),
    }),
    //getservicebyslug
    getServicebySlug:builder.query({
      query:(slug)=>({
        url:`/service/getbyslug/${slug}`,
        method:"GET",
      })
    }),

    // UPDATE SERVICE
    updateService: builder.mutation({
      query: ({ id, data }) => ({
        url: `/service/update/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    // DELETE SERVICE
    deleteService: builder.mutation({
      query: (serviceid) => ({
        url: `/service/delete/${serviceid}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useGetAllServicesQuery,
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetServicebySlugQuery,
} = servicesSlice;
