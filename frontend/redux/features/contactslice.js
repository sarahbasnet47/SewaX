import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ContactSlice = createApi({
  reducerPath: "ContactSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
  }),
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    createContactMessage: builder.mutation({
      query: (data) => ({
        url: "/contact",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateContactMessageMutation } = ContactSlice;
