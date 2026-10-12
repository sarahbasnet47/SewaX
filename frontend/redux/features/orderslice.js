import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderSlice = createApi({
  reducerPath: "orderApi",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),

  endpoints: (builder) => ({
    // GET ALL ORDERS
    getOrders: builder.query({
      query: () => ({
        url: "/order/get",
        method: "GET",
      }),
    }),

    // GET ORDER BY ID
    getOrderById: builder.query({
      query: (id) => ({
        url: `/order/getbyid/${id}`,
        method: "GET",
      }),
    }),

    // CREATE ORDER
    createOrder: builder.mutation({
      query: (data) => ({
        url: "/order",
        method: "POST",
        body: data,
      }),
    }),

    // UPDATE ORDER
    updateOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `/order/update/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    // DELETE ORDER
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/order/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderSlice;
