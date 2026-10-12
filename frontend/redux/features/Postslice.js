import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PostSlice = createApi({
  reducerPath: "PostSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include",
  }),
  tagTypes: ["Post"],

  endpoints: (builder) => ({
    // Create post
    createPost: builder.mutation({
      query: (data) => ({
        url: "/post",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),

    // Get logged-in user's posts
    getMyPost: builder.query({
      query: () => ({
        url: "/post/getmypost",
        method: "GET",
      }),
      providesTags: ["Post"],
    }),

    // Get post by ID
    getPostById: builder.query({
      query: (id) => ({
        url: `/post/get/${id}`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),

    // Get post by slug
    getPostBySlug: builder.query({
      query: (slug) => ({
        url: `/post/get/slug/${slug}`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),

    // Update post
    updatePost: builder.mutation({
      query: ({ id, data }) => ({
        url: `/post/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
    //getallpost for user
  
// Get all users' posts
getAllPost: builder.query({
  query: () => ({
    url: "/post/getallposts",
    method: "GET",
  }),
  providesTags: ["Post"],
}),

    // Delete post
    deletePost: builder.mutation({
      query: (postid) => ({
        url: `/post/delete/${postid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetMyPostQuery,
  useGetPostByIdQuery,
  useGetPostBySlugQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetAllPostQuery,
} = PostSlice;
